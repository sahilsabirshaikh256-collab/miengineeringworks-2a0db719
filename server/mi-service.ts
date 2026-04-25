import path from "path";
import fs from "fs";
import { db } from "./db";
import {
  products, industries, standards, media, siteContent, pageSections,
  customers, ledgerEntries, contactSubmissions,
} from "../shared/schema";

const BACKUP_DIR = path.resolve("data/backups");
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

const TABLES = {
  products, industries, standards, media, siteContent, pageSections,
  customers, ledgerEntries, contactSubmissions,
} as const;

type TableKey = keyof typeof TABLES;

export type Snapshot = {
  version: 1;
  createdAt: string;
  tables: Record<TableKey, any[]>;
  counts: Record<TableKey, number>;
};

export async function dumpAllTables(): Promise<Snapshot> {
  const tables: any = {};
  const counts: any = {};
  for (const [name, table] of Object.entries(TABLES)) {
    const rows = await db.select().from(table as any);
    tables[name] = rows;
    counts[name] = rows.length;
  }
  return { version: 1, createdAt: new Date().toISOString(), tables, counts };
}

function timestampSlug() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export async function createBackup(label = "manual") {
  const snap = await dumpAllTables();
  const safe = label.replace(/[^a-z0-9-_]/gi, "-").slice(0, 32);
  const file = `backup-${timestampSlug()}-${safe}.json`;
  const full = path.join(BACKUP_DIR, file);
  fs.writeFileSync(full, JSON.stringify(snap, null, 2), "utf8");
  return { file, path: full, counts: snap.counts, totalRows: Object.values(snap.counts).reduce((a, b) => a + b, 0) };
}

export function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const full = path.join(BACKUP_DIR, f);
      const s = fs.statSync(full);
      let counts: Record<string, number> = {};
      let createdAt: string | undefined;
      try {
        const j = JSON.parse(fs.readFileSync(full, "utf8"));
        counts = j.counts || {};
        createdAt = j.createdAt;
      } catch {}
      return {
        file: f,
        size: s.size,
        modified: s.mtime.toISOString(),
        createdAt,
        totalRows: Object.values(counts).reduce((a, b) => a + b, 0),
        counts,
      };
    })
    .sort((a, b) => b.modified.localeCompare(a.modified));
}

/**
 * Restore from a snapshot file.
 * mode "replace" — clear table then insert backed-up rows
 * mode "merge"   — only insert rows whose id is not already present
 */
export async function restoreBackup(file: string, mode: "replace" | "merge" = "replace") {
  const safe = path.basename(file);
  const full = path.join(BACKUP_DIR, safe);
  if (!fs.existsSync(full)) throw new Error(`Backup file not found: ${safe}`);
  const snap: Snapshot = JSON.parse(fs.readFileSync(full, "utf8"));
  if (snap.version !== 1) throw new Error("Unsupported backup version");

  const restored: Record<string, number> = {};
  const skipped: Record<string, number> = {};

  for (const [name, table] of Object.entries(TABLES)) {
    const rows: any[] = (snap.tables as any)[name] || [];
    if (rows.length === 0) { restored[name] = 0; skipped[name] = 0; continue; }

    if (mode === "replace") {
      await db.delete(table as any);
      // Re-insert all rows preserving ids/timestamps
      const cleaned = rows.map((r) => normalizeRow(r));
      // Insert in chunks to avoid huge param arrays
      for (const chunk of chunkArray(cleaned, 100)) {
        await db.insert(table as any).values(chunk);
      }
      restored[name] = rows.length;
      skipped[name] = 0;
    } else {
      // merge: skip rows whose id already exists
      const existing = await db.select().from(table as any);
      const existingIds = new Set(existing.map((e: any) => e.id));
      const toInsert = rows.filter((r) => !existingIds.has(r.id)).map(normalizeRow);
      if (toInsert.length) {
        for (const chunk of chunkArray(toInsert, 100)) {
          await db.insert(table as any).values(chunk);
        }
      }
      restored[name] = toInsert.length;
      skipped[name] = rows.length - toInsert.length;
    }
  }
  return { file: safe, mode, restored, skipped };
}

function normalizeRow(r: any) {
  // Convert ISO date strings back to Date objects so drizzle can insert into timestamp columns
  const out: any = {};
  for (const [k, v] of Object.entries(r)) {
    if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) {
      out[k] = new Date(v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function chunkArray<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/* ---------- HEALTH CHECK ---------- */

export async function healthCheck() {
  const counts: Record<string, number> = {};
  for (const [name, table] of Object.entries(TABLES)) {
    const rows = await db.select().from(table as any);
    counts[name] = rows.length;
  }

  // Check uploaded files referenced from DB but missing on disk
  const uploadDir = path.resolve("uploads");
  const onDisk = fs.existsSync(uploadDir) ? new Set(fs.readdirSync(uploadDir)) : new Set<string>();

  const refs: { table: string; row: number; field: string; url: string }[] = [];
  const collectImageRefs = (rows: any[], table: string, fields: string[]) => {
    for (const r of rows) {
      for (const f of fields) {
        const v = r[f];
        if (typeof v === "string" && v.startsWith("/uploads/")) refs.push({ table, row: r.id, field: f, url: v });
      }
    }
  };
  const productsRows = await db.select().from(products);
  const industriesRows = await db.select().from(industries);
  const standardsRows = await db.select().from(standards);
  const mediaRows = await db.select().from(media);
  const sectionsRows = await db.select().from(pageSections);
  const contentRows = await db.select().from(siteContent);

  collectImageRefs(productsRows, "products", ["image"]);
  collectImageRefs(industriesRows, "industries", ["image"]);
  collectImageRefs(standardsRows, "standards", ["image"]);
  collectImageRefs(mediaRows, "media", ["url", "thumbnail"]);
  collectImageRefs(sectionsRows, "pageSections", ["image"]);
  for (const c of contentRows) {
    if (typeof c.value === "string" && c.value.startsWith("/uploads/")) {
      refs.push({ table: "siteContent", row: c.id, field: c.key, url: c.value });
    }
  }
  // Also nested industry use case images
  for (const ind of industriesRows) {
    const apps: any[] = (ind as any).applications || [];
    apps.forEach((a, i) => {
      if (a?.image && typeof a.image === "string" && a.image.startsWith("/uploads/")) {
        refs.push({ table: "industries.applications", row: ind.id, field: `[${i}].image`, url: a.image });
      }
    });
  }

  const missingFiles = refs.filter((r) => {
    const filename = r.url.replace(/^\/uploads\//, "");
    return !onDisk.has(filename);
  });

  // Issues summary
  const issues: { severity: "warn" | "error"; message: string }[] = [];
  if (counts.products === 0) issues.push({ severity: "warn", message: "No products in database" });
  if (counts.industries === 0) issues.push({ severity: "warn", message: "No industries in database" });
  if (counts.standards === 0) issues.push({ severity: "warn", message: "No standards in database" });
  if (missingFiles.length > 0) issues.push({
    severity: "error",
    message: `${missingFiles.length} uploaded image(s) referenced in DB are missing from /uploads folder`,
  });

  const backups = listBackups();
  if (backups.length === 0) issues.push({ severity: "warn", message: "No backups exist yet — type 'backup' to create one" });

  return {
    counts,
    totalRows: Object.values(counts).reduce((a, b) => a + b, 0),
    uploadedFilesOnDisk: onDisk.size,
    referencedUploadFiles: refs.length,
    missingFiles: missingFiles.slice(0, 30),
    missingFilesCount: missingFiles.length,
    issues,
    backups: backups.length,
    latestBackup: backups[0] || null,
  };
}

/* ---------- AUTO BOOT BACKUP ---------- */

export async function ensureFirstRunBackup() {
  try {
    if (listBackups().length > 0) return;
    const dump = await dumpAllTables();
    if (dump.counts.products === 0 && dump.counts.industries === 0 && dump.counts.standards === 0) return;
    const r = await createBackup("auto-first-run");
    console.log(`[mi] auto first-run backup created: ${r.file} (${r.totalRows} rows)`);
  } catch (e) {
    console.warn("[mi] first-run backup skipped:", (e as Error).message);
  }
}

/* ---------- CHAT INTENT PARSER ---------- */

export type ChatResponse = {
  reply: string;
  kind?: "text" | "health" | "backups" | "stats" | "ok" | "error" | "help";
  data?: any;
  actions?: { label: string; command: string }[];
};

const HELP = `Main MI Chat hoon. Aap mujhe yeh seedhi-saadhi commands de sakte ho:

• "backup" — abhi ke saare data ka backup banao (taaki kabhi gayab ho jaye to wapas mil jaye)
• "restore" — purane backup se data wapas le aao
• "list backups" — saare available backups dikhao
• "health" / "fix bug" — site check karo, kya broken hai bata do
• "stats" — kitne products, industries, standards hain dikhao
• "help" — yeh menu firse dikhao

English ya Hindi dono samjhta hoon.`;

function detectIntent(raw: string): string {
  const m = raw.toLowerCase().trim();
  if (!m) return "unknown";
  if (/^(help|menu|commands?|kya kar sakte|kya kr sakte|kaise|how)/.test(m)) return "help";
  if (/list.*(backup|snapshot)|(backup|snapshot).*list|sare backup|saare backup|show backup|dikhao backup/.test(m)) return "list-backups";
  if (/^backup$|backup banao|backup karo|save backup|create backup|snapshot|backup le|take backup/.test(m)) return "backup";
  if (/restore|wapas|recover|gayab|missing data|laoo|laao|undo|rollback/.test(m)) return "restore";
  if (/health|status|bug|error|broken|fix|kya issue|kya problem|theek|sahi hai|check karo/.test(m)) return "health";
  if (/stats|count|kitne|total|total kitne/.test(m)) return "stats";
  return "unknown";
}

export async function handleChat(rawMessage: string, opts?: { restoreFile?: string; restoreMode?: "replace" | "merge" }): Promise<ChatResponse> {
  const message = (rawMessage || "").trim();

  // explicit restore action with file
  if (opts?.restoreFile) {
    try {
      const r = await restoreBackup(opts.restoreFile, opts.restoreMode || "replace");
      const total = Object.values(r.restored).reduce((a, b) => a + b, 0);
      return {
        kind: "ok",
        reply: `✅ Restore complete from "${r.file}". Total ${total} rows wapas aaye (mode: ${r.mode}).`,
        data: r,
      };
    } catch (e: any) {
      return { kind: "error", reply: `❌ Restore fail: ${e.message}` };
    }
  }

  const intent = detectIntent(message);

  if (intent === "help") return { kind: "help", reply: HELP };

  if (intent === "backup") {
    const r = await createBackup("chat");
    return {
      kind: "ok",
      reply: `✅ Backup ban gaya: ${r.file}\n📦 ${r.totalRows} rows save hue.\n\nYeh file project ke andar data/backups/ folder me hai. Jab aap GitHub pe push karoge, yeh saath jayegi — aur Replit me wapas import karoge to data wapas mil jayega.`,
      data: r,
      actions: [{ label: "List all backups", command: "list backups" }],
    };
  }

  if (intent === "list-backups" || intent === "restore") {
    const backups = listBackups();
    if (backups.length === 0) {
      return {
        kind: "text",
        reply: "❌ Koi backup file nahi mili.\n\nSabse pehle ek backup banao:",
        actions: [{ label: "Create backup now", command: "backup" }],
      };
    }
    if (intent === "restore") {
      return {
        kind: "backups",
        reply: `🗂️ ${backups.length} backup mile. Jisse restore karna hai uska "Restore" button dabao.\n\n⚠️ Restore karne se abhi ka data REPLACE ho jayega backup wale data se.`,
        data: backups,
      };
    }
    return {
      kind: "backups",
      reply: `🗂️ ${backups.length} backup files available:`,
      data: backups,
    };
  }

  if (intent === "health") {
    const h = await healthCheck();
    let reply = `🩺 Health Check:\n\n📊 Total rows in DB: ${h.totalRows}\n📁 Uploads on disk: ${h.uploadedFilesOnDisk}\n🔗 Image references in DB: ${h.referencedUploadFiles}`;
    if (h.missingFilesCount > 0) reply += `\n\n⚠️ ${h.missingFilesCount} image(s) DB me hain par /uploads me file gayab hai.`;
    if (h.issues.length === 0) reply += `\n\n✅ Sab kuch theek dikh raha hai.`;
    else reply += `\n\nIssues:\n${h.issues.map((i) => `• [${i.severity.toUpperCase()}] ${i.message}`).join("\n")}`;
    if (h.latestBackup) reply += `\n\n💾 Last backup: ${h.latestBackup.file}`;
    const actions: { label: string; command: string }[] = [{ label: "Backup now", command: "backup" }];
    if (h.backups > 0) actions.push({ label: "Restore from backup", command: "restore" });
    return { kind: "health", reply, data: h, actions };
  }

  if (intent === "stats") {
    const dump = await dumpAllTables();
    const lines = Object.entries(dump.counts).map(([k, v]) => `• ${k}: ${v}`).join("\n");
    return { kind: "stats", reply: `📊 Database stats:\n\n${lines}`, data: dump.counts };
  }

  // unknown
  return {
    kind: "text",
    reply: `Maaf kijiye, "${message}" samjh nahi aaya.\n\n${HELP}`,
  };
}
