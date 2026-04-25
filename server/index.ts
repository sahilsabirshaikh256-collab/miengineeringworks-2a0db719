import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import { storage } from "./storage";
import { hashPassword, verifyPassword, signToken, requireAuth } from "./auth";
import { insertContactSchema, insertProductSchema, insertIndustrySchema, insertStandardSchema, insertMediaSchema, insertSiteContentSchema, insertPageSectionSchema } from "../shared/schema";
import { z } from "zod";
import { generateCatalogPdf } from "./catalog-pdf";
import { sendContactEmail } from "./mailer";
import { handleChat, createBackup, listBackups, restoreBackup, healthCheck, ensureFirstRunBackup } from "./mi-service";

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

// Ensure uploads dir
const UPLOAD_DIR = path.resolve("uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use("/uploads", express.static(UPLOAD_DIR));

const storageMulter = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-z0-9.\-]/gi, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});
const upload = multer({ storage: storageMulter, limits: { fileSize: 10 * 1024 * 1024 } });

// Auth
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "Email and password are required" });
  const submitted = String(username || "").trim().toLowerCase();
  const allowedEmails = (process.env.ADMIN_USERNAME || "miengineering@gmail.com,miengineering17@gmail.com")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (!allowedEmails.includes(submitted)) {
    return res.status(401).json({ error: "Only the admin email is allowed to sign in." });
  }
  const u = await storage.getAdminByUsername(submitted);
  if (!u) return res.status(401).json({ error: "Admin not initialised" });
  const ok = await verifyPassword(String(password), u.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid password" });
  res.json({ token: signToken({ id: u.id, username: u.username }) });
});

// Verify a token is still valid (used by RequireAdmin to harden client-side guard)
app.get("/api/admin/verify", requireAuth, (_req, res) => res.json({ ok: true }));

// Public reads
app.get("/api/products", async (_req, res) => res.json(await storage.listProducts()));
app.get("/api/products/:slug", async (req, res) => {
  const p = await storage.getProduct(req.params.slug);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});
app.get("/api/industries", async (_req, res) => res.json(await storage.listIndustries()));
app.get("/api/industries/:slug", async (req, res) => {
  const i = await storage.getIndustry(req.params.slug);
  if (!i) return res.status(404).json({ error: "Not found" });
  res.json(i);
});
app.get("/api/standards", async (_req, res) => res.json(await storage.listStandards()));
app.get("/api/standards/:slug", async (req, res) => {
  const s = await storage.getStandard(req.params.slug);
  if (!s) return res.status(404).json({ error: "Not found" });
  res.json(s);
});

// Contact submission (public)
app.post("/api/contact", async (req, res) => {
  const parsed = insertContactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid", details: parsed.error.flatten() });
  const submission = await storage.createContact(parsed.data);
  // Fire-and-forget email so the form responds quickly
  sendContactEmail(parsed.data as any).catch((e) => console.error("[mailer] error:", e));
  res.json({ ok: true, id: submission.id });
});

// Admin: upload
app.post("/api/admin/upload", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Admin: products CRUD
app.post("/api/admin/products", requireAuth, async (req, res) => {
  const parsed = insertProductSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  res.json(await storage.upsertProduct(parsed.data));
});
app.patch("/api/admin/products/:id", requireAuth, async (req, res) => {
  res.json(await storage.updateProduct(Number(req.params.id), req.body));
});
app.delete("/api/admin/products/:id", requireAuth, async (req, res) => {
  await storage.deleteProduct(Number(req.params.id));
  res.json({ ok: true });
});

// Admin: industries CRUD
app.post("/api/admin/industries", requireAuth, async (req, res) => {
  const parsed = insertIndustrySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  res.json(await storage.upsertIndustry(parsed.data));
});
app.patch("/api/admin/industries/:id", requireAuth, async (req, res) => {
  res.json(await storage.updateIndustry(Number(req.params.id), req.body));
});
app.delete("/api/admin/industries/:id", requireAuth, async (req, res) => {
  await storage.deleteIndustry(Number(req.params.id));
  res.json({ ok: true });
});

// Admin: standards CRUD
app.post("/api/admin/standards", requireAuth, async (req, res) => {
  const parsed = insertStandardSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  res.json(await storage.upsertStandard(parsed.data));
});
app.patch("/api/admin/standards/:id", requireAuth, async (req, res) => {
  res.json(await storage.updateStandard(Number(req.params.id), req.body));
});
app.delete("/api/admin/standards/:id", requireAuth, async (req, res) => {
  await storage.deleteStandard(Number(req.params.id));
  res.json({ ok: true });
});

// Public media (photos & videos)
app.get("/api/media", async (_req, res) => res.json(await storage.listMedia()));

// Admin: media CRUD
app.post("/api/admin/media", requireAuth, async (req, res) => {
  const parsed = insertMediaSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  res.json(await storage.createMedia(parsed.data));
});
app.patch("/api/admin/media/:id", requireAuth, async (req, res) => {
  res.json(await storage.updateMedia(Number(req.params.id), req.body));
});
app.delete("/api/admin/media/:id", requireAuth, async (req, res) => {
  await storage.deleteMedia(Number(req.params.id));
  res.json({ ok: true });
});

// Branded company catalog PDF — serves uploaded PDF if admin has set one,
// otherwise generates a default branded PDF on the fly.
app.get("/api/catalog.pdf", async (req, res) => {
  try {
    const map = await storage.getSiteContentMap();
    const customUrl = (map["catalog.pdfUrl"] || "").trim();
    if (customUrl && customUrl.startsWith("/uploads/")) {
      const fp = path.resolve(UPLOAD_DIR, path.basename(customUrl));
      if (fs.existsSync(fp)) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="MI-Engineering-Works-Catalog.pdf"`);
        res.setHeader("Cache-Control", "public, max-age=300");
        return fs.createReadStream(fp).pipe(res);
      }
    }
  } catch (e) { console.error("[catalog] custom pdf check failed:", e); }
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="MI-Engineering-Works-Catalog.pdf"');
  res.setHeader("Cache-Control", "public, max-age=300");
  generateCatalogPdf(res);
});

// Admin: PDF catalog upload (.pdf only)
const pdfUpload = multer({
  storage: storageMulter,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});
app.post("/api/admin/catalog-pdf", requireAuth, (req, res) => {
  pdfUpload.single("file")(req, res, async (err: any) => {
    if (err) return res.status(400).json({ error: err.message || "Upload failed" });
    if (!req.file) return res.status(400).json({ error: "No file" });
    const url = `/uploads/${req.file.filename}`;
    await storage.upsertSiteContent({ key: "catalog.pdfUrl", value: url });
    res.json({ url });
  });
});
app.delete("/api/admin/catalog-pdf", requireAuth, async (_req, res) => {
  try {
    const map = await storage.getSiteContentMap();
    const customUrl = (map["catalog.pdfUrl"] || "").trim();
    if (customUrl && customUrl.startsWith("/uploads/")) {
      const fp = path.resolve(UPLOAD_DIR, path.basename(customUrl));
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
  } catch (e) { console.error("[catalog] delete failed:", e); }
  await storage.upsertSiteContent({ key: "catalog.pdfUrl", value: "" });
  res.json({ ok: true });
});

// Customers (Ledger / Khata)
app.get("/api/admin/customers", requireAuth, async (_req, res) => res.json(await storage.listCustomers()));
app.get("/api/admin/customers/:id", requireAuth, async (req, res) => {
  const c = await storage.getCustomer(Number(req.params.id));
  if (!c) return res.status(404).json({ error: "Not found" });
  res.json(c);
});
app.post("/api/admin/customers", requireAuth, async (req, res) => {
  try {
    const parsed = (await import("../shared/schema")).insertCustomerSchema.parse(req.body || {});
    res.json(await storage.createCustomer(parsed));
  } catch (e: any) { res.status(400).json({ error: e.message || "Invalid data" }); }
});
app.patch("/api/admin/customers/:id", requireAuth, async (req, res) => {
  res.json(await storage.updateCustomer(Number(req.params.id), req.body || {}));
});
app.delete("/api/admin/customers/:id", requireAuth, async (req, res) => {
  await storage.deleteCustomer(Number(req.params.id));
  res.json({ ok: true });
});

// Ledger / Khata entries (always linked to a customer)
app.get("/api/admin/ledger", requireAuth, async (req, res) => {
  const customerId = req.query.customerId ? Number(req.query.customerId) : null;
  if (customerId) return res.json(await storage.listLedgerByCustomer(customerId));
  res.json(await storage.listLedger());
});
app.post("/api/admin/ledger", requireAuth, async (req, res) => {
  try {
    const parsed = (await import("../shared/schema")).insertLedgerSchema.parse(req.body || {});
    // Auto-fill customerName from the customer record if available
    const cust = await storage.getCustomer(parsed.customerId);
    if (!cust) return res.status(400).json({ error: "Customer not found" });
    res.json(await storage.createLedger({ ...parsed, customerName: cust.name }));
  } catch (e: any) { res.status(400).json({ error: e.message || "Invalid data" }); }
});
app.patch("/api/admin/ledger/:id", requireAuth, async (req, res) => {
  res.json(await storage.updateLedger(Number(req.params.id), req.body || {}));
});
app.delete("/api/admin/ledger/:id", requireAuth, async (req, res) => {
  await storage.deleteLedger(Number(req.params.id));
  res.json({ ok: true });
});

// Admin: contact submissions
app.get("/api/admin/contacts", requireAuth, async (_req, res) => res.json(await storage.listContacts()));
app.delete("/api/admin/contacts/:id", requireAuth, async (req, res) => {
  await storage.deleteContact(Number(req.params.id));
  res.json({ ok: true });
});

// Site content (public read, admin write)
app.get("/api/site-content", async (_req, res) => res.json(await storage.getSiteContentMap()));
app.post("/api/admin/site-content", requireAuth, async (req, res) => {
  // Accept either a raw array of entries OR { entries: [...] }
  const payload = Array.isArray(req.body) ? req.body : (req.body && (req.body as any).entries) || [];
  const arr = z.array(insertSiteContentSchema).safeParse(payload);
  if (!arr.success) return res.status(400).json({ error: arr.error.flatten() });
  res.json(await storage.bulkUpsertSiteContent(arr.data));
});

// Page sections (public read by page, admin CRUD)
app.get("/api/page-sections", async (req, res) => {
  const page = String(req.query.page || "home");
  res.json(await storage.listPageSections(page));
});
app.post("/api/admin/page-sections", requireAuth, async (req, res) => {
  const parsed = insertPageSectionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  res.json(await storage.createPageSection(parsed.data));
});
app.patch("/api/admin/page-sections/:id", requireAuth, async (req, res) => {
  res.json(await storage.updatePageSection(Number(req.params.id), req.body));
});
app.delete("/api/admin/page-sections/:id", requireAuth, async (req, res) => {
  await storage.deletePageSection(Number(req.params.id));
  res.json({ ok: true });
});

// Bootstrap default admin (email + password)
async function ensureDefaultAdmin() {
  const password = process.env.ADMIN_PASSWORD || "6392061892";
  const allowedEmails = (process.env.ADMIN_USERNAME || "miengineering@gmail.com,miengineering17@gmail.com")
    .split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  const hash = await hashPassword(password);
  for (const email of allowedEmails) {
    const existing = await storage.getAdminByUsername(email);
    if (!existing) {
      await storage.createAdmin(email, hash);
      console.log(`[admin] Created admin user "${email}"`);
    } else {
      // Reset password to env default each boot so credentials stay in sync
      await storage.updateAdminPassword(existing.id, hash);
    }
  }
}

// ───────────── MI Chat (admin self-service: backup, restore, health check) ─────────────

app.post("/api/admin/mi/chat", requireAuth, async (req, res) => {
  try {
    const { message, restoreFile, restoreMode } = req.body || {};
    const r = await handleChat(String(message || ""), { restoreFile, restoreMode });
    res.json(r);
  } catch (e: any) {
    console.error("[mi/chat]", e);
    res.status(500).json({ kind: "error", reply: `❌ ${e.message || "Internal error"}` });
  }
});

app.post("/api/admin/mi/backup", requireAuth, async (req, res) => {
  try {
    const r = await createBackup(String(req.body?.label || "manual"));
    res.json(r);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

app.get("/api/admin/mi/backups", requireAuth, (_req, res) => {
  res.json(listBackups());
});

app.post("/api/admin/mi/restore", requireAuth, async (req, res) => {
  try {
    const { file, mode } = req.body || {};
    if (!file) return res.status(400).json({ error: "file is required" });
    const r = await restoreBackup(String(file), mode === "merge" ? "merge" : "replace");
    res.json(r);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

app.get("/api/admin/mi/health", requireAuth, async (_req, res) => {
  try { res.json(await healthCheck()); } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Download a backup file so admin can save a copy locally too
app.get("/api/admin/mi/backups/:file/download", requireAuth, (req, res) => {
  const safe = path.basename(String(req.params.file || ""));
  const full = path.resolve("data/backups", safe);
  if (!fs.existsSync(full)) return res.status(404).json({ error: "Not found" });
  res.download(full, safe);
});

const PORT = Number(process.env.SERVER_PORT || 3001);
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`[server] listening on :${PORT}`);
  try { await ensureDefaultAdmin(); } catch (e) { console.error("admin bootstrap failed", e); }
  try { await ensureFirstRunBackup(); } catch (e) { console.error("first-run backup failed", e); }
});
