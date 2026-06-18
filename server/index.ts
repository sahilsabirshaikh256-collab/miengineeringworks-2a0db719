import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import https from "https";
import FormData from "form-data";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import { db } from "./firebase.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { initDb } from "./db.js";
import nodemailer from "nodemailer";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

const DEFAULT_JWT = "mi_engineering_jwt_secret_2024_x7k9p";
const JWT_SECRET   = process.env.JWT_SECRET || DEFAULT_JWT;
const CLOUD_NAME   = process.env.CLOUDINARY_CLOUD_NAME  || "dsarrlz50";
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "dhutd5ga";

if (!process.env.JWT_SECRET) {
  console.warn("[SECURITY] JWT_SECRET env var not set — using insecure default. Set it in production!");
}

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Set CORS_ORIGIN to comma-separated list of allowed origins for cPanel / production.
// e.g. CORS_ORIGIN=https://miengineering.com,https://www.miengineering.com
// Leave unset to allow all origins (development / same-server).
const _corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean)
  : [];

app.use(cors({
  origin: _corsOrigins.length > 0 ? _corsOrigins : true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "10mb" }));

// ─── Rate limiter (in-memory, per-IP) ────────────────────────────────────────
const _loginAttempts = new Map<string, { fails: number; lockedUntil: number }>();
const RATE_MAX_FAILS   = 5;
const RATE_LOCK_MS     = 15 * 60 * 1000; // 15 minutes

function _clientIp(req: Request): string {
  const fwd = req.headers["x-forwarded-for"];
  const ip  = Array.isArray(fwd) ? fwd[0] : (fwd?.split(",")[0] || req.socket?.remoteAddress || "unknown");
  return ip.trim();
}

function _isLocked(ip: string): boolean {
  const e = _loginAttempts.get(ip);
  if (!e) return false;
  if (e.lockedUntil > Date.now()) return true;
  _loginAttempts.delete(ip);
  return false;
}

function _recordFail(ip: string): void {
  const e = _loginAttempts.get(ip) || { fails: 0, lockedUntil: 0 };
  e.fails += 1;
  if (e.fails >= RATE_MAX_FAILS) {
    e.lockedUntil = Date.now() + RATE_LOCK_MS;
    e.fails = 0;
    console.warn(`[login] Rate-limited IP: ${ip}`);
  }
  _loginAttempts.set(ip, e);
}

function _recordSuccess(ip: string): void {
  _loginAttempts.delete(ip);
}

// Pre-hash the env fallback password at startup so we never do plaintext comparison.
let _envPassHash = "";
(async () => {
  const raw = process.env.ADMIN_PASSWORD || "admin@MI2024";
  _envPassHash = await bcrypt.hash(raw, 10);
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────
function tsToStr(val: any): string {
  if (!val) return new Date().toISOString();
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (val instanceof Date) return val.toISOString();
  return String(val);
}

// ─── Auth middleware ──────────────────────────────────────────────────────────
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) { res.status(401).json({ error: "Unauthorized" }); return; }
  try {
    const decoded = jwt.verify(auth.slice(7), JWT_SECRET) as { id: string; username: string };
    (req as any).admin = decoded;
    next();
  } catch { res.status(401).json({ error: "Invalid token" }); }
}

// ─── Admin Verify ─────────────────────────────────────────────────────────────
app.get("/api/admin/verify", requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// ─── Admin Login ──────────────────────────────────────────────────────────────
app.post("/api/admin/login", async (req, res) => {
  const ip = _clientIp(req);

  if (_isLocked(ip)) {
    res.status(429).json({ error: "Too many failed attempts. Please try again in 15 minutes." });
    return;
  }

  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const uname = username.toLowerCase().trim();

    // Primary auth: Firebase Firestore (bcrypt-hashed passwords)
    try {
      const q = query(collection(db, "adminUsers"), where("username", "==", uname), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const adminDoc = snap.docs[0];
        const data = adminDoc.data();
        const valid = await bcrypt.compare(password, data.passwordHash);
        if (!valid) {
          _recordFail(ip);
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }
        _recordSuccess(ip);
        const token = jwt.sign({ id: adminDoc.id, username: data.username }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
        return;
      }
    } catch (fbErr) {
      console.warn("[login] Firebase unavailable, using env fallback");
    }

    // Fallback auth: env password — uses bcrypt compare (pre-hashed at startup)
    if (!_envPassHash) {
      res.status(503).json({ error: "Auth service not ready. Retry in a moment." });
      return;
    }
    const valid = await bcrypt.compare(password, _envPassHash);
    if (!valid) {
      _recordFail(ip);
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    _recordSuccess(ip);
    const token = jwt.sign({ id: "env-admin", username: uname }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error("[login]", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── Email helper ─────────────────────────────────────────────────────────────
async function sendContactEmail(data: {
  fullName: string; email: string; phone: string; companyName: string;
  message: string; productName: string; productGrade: string; productStandard: string;
}) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    console.log("[email] SMTP_USER / SMTP_PASS not set — email skipped");
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: smtpUser, pass: smtpPass },
    });
    const subject = data.productName
      ? `Quote Request: ${data.productName} — from ${data.fullName}${data.companyName ? ` (${data.companyName})` : ""}`
      : `Enquiry from ${data.fullName}${data.companyName ? ` (${data.companyName})` : ""}`;

    const html = `
<h2 style="color:#c9a84c">New Contact Form Submission — M.I. Engineering Works</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px">
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px">${data.fullName}</td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Phone</td><td style="padding:8px"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Company</td><td style="padding:8px">${data.companyName || "—"}</td></tr>
  ${data.productName ? `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Product</td><td style="padding:8px">${data.productName}</td></tr>` : ""}
  ${data.productGrade ? `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Grade</td><td style="padding:8px">${data.productGrade}</td></tr>` : ""}
  ${data.productStandard ? `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5">Standard</td><td style="padding:8px">${data.productStandard}</td></tr>` : ""}
  <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${data.message}</td></tr>
</table>`;

    await transporter.sendMail({
      from: `"MI Engineering Website" <${smtpUser}>`,
      to: smtpUser,
      replyTo: data.email,
      subject,
      html,
    });
    console.log("[email] Contact notification sent to", smtpUser);
  } catch (err) {
    console.error("[email] Failed to send:", err);
  }
}

// ─── Contacts ─────────────────────────────────────────────────────────────────
app.post("/api/contacts", async (req, res) => {
  try {
    const { fullName, email, phone, companyName = "", message, productName = "", productGrade = "", productStandard = "" } = req.body;
    if (!fullName || !email || !phone || !message) { res.status(400).json({ error: "Missing required fields" }); return; }

    const data = {
      fullName, email, phone, companyName, message,
      productName, productGrade, productStandard,
      createdAt: new Date().toISOString(),
    };
    const ref = await addDoc(collection(db, "contactSubmissions"), data);

    sendContactEmail({ fullName, email, phone, companyName, message, productName, productGrade, productStandard });

    res.status(201).json({ id: ref.id, ...data });
  } catch (err) { console.error("[contacts]", err); res.status(500).json({ error: "Server error" }); }
});

app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc")));
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) { console.error("[contacts get]", err); res.status(500).json({ error: "Server error" }); }
});

app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "contactSubmissions", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── File Upload (Cloudinary unsigned) ───────────────────────────────────────
app.post("/api/admin/upload", requireAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) { res.status(400).json({ error: "No file provided" }); return; }
  try {
    const form = new FormData();
    form.append("file", req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });
    form.append("upload_preset", UPLOAD_PRESET);

    const options: https.RequestOptions = {
      hostname: "api.cloudinary.com",
      path: `/v1_1/${CLOUD_NAME}/auto/upload`,
      method: "POST",
      headers: form.getHeaders(),
    };

    await new Promise<void>((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => { data += chunk; });
        response.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.secure_url) { res.json({ url: parsed.secure_url }); resolve(); }
            else { reject(new Error(parsed.error?.message || "Upload failed")); }
          } catch { reject(new Error("Invalid response")); }
        });
      });
      request.on("error", reject);
      form.pipe(request);
    });
  } catch (err: any) {
    console.error("[upload]", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

// ─── Products ─────────────────────────────────────────────────────────────────
app.get("/api/products", async (_req, res) => {
  try {
    const snap = await getDocs(collection(db, "products"));
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    docs.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name?.localeCompare(b.name));
    res.json(docs);
  } catch (err: any) {
    if (err?.code === "permission-denied") { res.json([]); return; }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/admin/products", requireAdmin, async (req, res) => {
  try {
    const p = req.body;
    const data = {
      slug: p.slug, name: p.name, category: p.category || "",
      image: p.image || "", standard: p.standard || "", description: p.description || "",
      sizes: p.sizes || "", threads: p.threads || "", length: p.length || "",
      material: p.material || "", finish: p.finish || [], grades: p.grades || [],
      applications: p.applications || [], dimensions: p.dimensions || [],
      sortOrder: Date.now(),
    };
    const ref = await addDoc(collection(db, "products"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    const p = req.body;
    const data = {
      slug: p.slug, name: p.name, category: p.category || "",
      image: p.image || "", standard: p.standard || "", description: p.description || "",
      sizes: p.sizes || "", threads: p.threads || "", length: p.length || "",
      material: p.material || "", finish: p.finish || [], grades: p.grades || [],
      applications: p.applications || [], dimensions: p.dimensions || [],
    };
    await updateDoc(doc(db, "products", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "products", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Categories ───────────────────────────────────────────────────────────────
app.get("/api/categories", async (_req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "categories"), orderBy("sortOrder", "asc")));
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err: any) {
    if (err?.code === "permission-denied") { res.json([]); return; }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/admin/categories", requireAdmin, async (req, res) => {
  try {
    const { slug, name, description = "", image = "", sortOrder = 0 } = req.body;
    const data = { slug, name, description, image, sortOrder };
    const ref = await addDoc(collection(db, "categories"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    const { slug, name, description = "", image = "", sortOrder = 0 } = req.body;
    const data = { slug, name, description, image, sortOrder };
    await updateDoc(doc(db, "categories", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "categories", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Industries ───────────────────────────────────────────────────────────────
app.get("/api/industries", async (_req, res) => {
  try {
    const snap = await getDocs(collection(db, "industries"));
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    docs.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name?.localeCompare(b.name));
    res.json(docs);
  } catch (err: any) {
    if (err?.code === "permission-denied") { res.json([]); return; }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/admin/industries", requireAdmin, async (req, res) => {
  try {
    const i = req.body;
    const data = {
      slug: i.slug, name: i.name, description: i.description || "",
      heroDescription: i.heroDescription || "", image: i.image || "",
      grades: i.grades || [], applications: i.applications || [],
      keyRequirements: i.keyRequirements || [], sortOrder: Date.now(),
    };
    const ref = await addDoc(collection(db, "industries"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/industries/:id", requireAdmin, async (req, res) => {
  try {
    const i = req.body;
    const data = {
      slug: i.slug, name: i.name, description: i.description || "",
      heroDescription: i.heroDescription || "", image: i.image || "",
      grades: i.grades || [], applications: i.applications || [],
      keyRequirements: i.keyRequirements || [],
    };
    await updateDoc(doc(db, "industries", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/industries/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "industries", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Standards ────────────────────────────────────────────────────────────────
app.get("/api/standards", async (_req, res) => {
  try {
    const snap = await getDocs(collection(db, "standards"));
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    docs.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name?.localeCompare(b.name));
    res.json(docs);
  } catch (err: any) {
    if (err?.code === "permission-denied") { res.json([]); return; }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/admin/standards", requireAdmin, async (req, res) => {
  try {
    const s = req.body;
    const data = {
      slug: s.slug, code: s.code, name: s.name, region: s.region || "",
      description: s.description || "", image: s.image || "", scope: s.scope || "",
      applications: s.applications || [], materials: s.materials || [],
      examples: s.examples || [], sortOrder: Date.now(),
    };
    const ref = await addDoc(collection(db, "standards"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/standards/:id", requireAdmin, async (req, res) => {
  try {
    const s = req.body;
    const data = {
      slug: s.slug, code: s.code, name: s.name, region: s.region || "",
      description: s.description || "", image: s.image || "", scope: s.scope || "",
      applications: s.applications || [], materials: s.materials || [], examples: s.examples || [],
    };
    await updateDoc(doc(db, "standards", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/standards/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "standards", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Media ────────────────────────────────────────────────────────────────────
app.get("/api/media", async (_req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "media"), orderBy("sortOrder", "asc")));
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err: any) {
    if (err?.code === "permission-denied") { res.json([]); return; }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/admin/media", requireAdmin, async (req, res) => {
  try {
    const { type, url, title = "", caption = "", thumbnail = "" } = req.body;
    const data = { type, url, title, caption, thumbnail, sortOrder: Date.now() };
    const ref = await addDoc(collection(db, "media"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/media/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "media", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Site Content ─────────────────────────────────────────────────────────────
app.get("/api/site-content", async (_req, res) => {
  try {
    const docSnap = await getDoc(doc(db, "siteContent", "main"));
    res.json(docSnap.exists() ? docSnap.data() : {});
  } catch (err: any) {
    if (err?.code === "permission-denied") { res.json({}); return; }
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/admin/site-content", requireAdmin, async (req, res) => {
  try {
    await setDoc(doc(db, "siteContent", "main"), req.body as Record<string, string>, { merge: true });
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Customers ────────────────────────────────────────────────────────────────
app.get("/api/admin/customers", requireAdmin, async (_req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "customers"), orderBy("name", "asc")));
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch { res.status(500).json({ error: "Server error" }); }
});

app.post("/api/admin/customers", requireAdmin, async (req, res) => {
  try {
    const { name, phone = "", address = "" } = req.body;
    const data = { name, phone, address, createdAt: new Date().toISOString() };
    const ref = await addDoc(collection(db, "customers"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/customers/:id", requireAdmin, async (req, res) => {
  try {
    const { name, phone = "", address = "" } = req.body;
    const data = { name, phone, address };
    await updateDoc(doc(db, "customers", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/customers/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "customers", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Ledger ───────────────────────────────────────────────────────────────────
app.get("/api/admin/ledger", requireAdmin, async (req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "ledgerEntries"), orderBy("createdAt", "desc")));
    let rows = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
    const { customerId } = req.query;
    if (customerId) rows = rows.filter(r => r.customerId === customerId);
    res.json(rows);
  } catch { res.status(500).json({ error: "Server error" }); }
});

app.post("/api/admin/ledger", requireAdmin, async (req, res) => {
  try {
    const l = req.body;
    const data = {
      customerId: l.customerId, customerName: l.customerName,
      invoiceDate: l.invoiceDate || "", invoiceNo: l.invoiceNo || "",
      amountDue: l.amountDue || "0", paymentDate: l.paymentDate || "",
      amountReceived: l.amountReceived || "0", receiptNo: l.receiptNo || "",
      notes: l.notes || "", tallyReceiptDone: l.tallyReceiptDone || false,
      bookEntryDone: l.bookEntryDone || false, createdAt: new Date().toISOString(),
    };
    const ref = await addDoc(collection(db, "ledgerEntries"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/ledger/:id", requireAdmin, async (req, res) => {
  try {
    const l = req.body;
    const data = {
      customerId: l.customerId, customerName: l.customerName,
      invoiceDate: l.invoiceDate || "", invoiceNo: l.invoiceNo || "",
      amountDue: l.amountDue || "0", paymentDate: l.paymentDate || "",
      amountReceived: l.amountReceived || "0", receiptNo: l.receiptNo || "",
      notes: l.notes || "", tallyReceiptDone: l.tallyReceiptDone || false,
      bookEntryDone: l.bookEntryDone || false,
    };
    await updateDoc(doc(db, "ledgerEntries", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/ledger/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "ledgerEntries", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Page Sections ─────────────────────────────────────────────────────────────
app.get("/api/page-sections", async (_req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "pageSections"), orderBy("sortOrder", "asc")));
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })).filter((s: any) => s.enabled !== false));
  } catch { res.status(500).json({ error: "Server error" }); }
});

app.get("/api/admin/page-sections", requireAdmin, async (_req, res) => {
  try {
    const snap = await getDocs(query(collection(db, "pageSections"), orderBy("sortOrder", "asc")));
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch { res.status(500).json({ error: "Server error" }); }
});

app.post("/api/admin/page-sections", requireAdmin, async (req, res) => {
  try {
    const s = req.body;
    const data = {
      page: s.page || "home", position: s.position || "after-stats",
      title: s.title || "", subtitle: s.subtitle || "", body: s.body || "",
      image: s.image || "", linkText: s.linkText || "", linkUrl: s.linkUrl || "",
      enabled: s.enabled !== false, sortOrder: Date.now(),
    };
    const ref = await addDoc(collection(db, "pageSections"), data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch("/api/admin/page-sections/:id", requireAdmin, async (req, res) => {
  try {
    const s = req.body;
    const data = {
      page: s.page || "home", position: s.position || "after-stats",
      title: s.title || "", subtitle: s.subtitle || "", body: s.body || "",
      image: s.image || "", linkText: s.linkText || "", linkUrl: s.linkUrl || "",
      enabled: s.enabled !== false,
    };
    await updateDoc(doc(db, "pageSections", req.params.id), data);
    res.json({ id: req.params.id, ...data });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete("/api/admin/page-sections/:id", requireAdmin, async (req, res) => {
  try {
    await deleteDoc(doc(db, "pageSections", req.params.id));
    res.json({ ok: true });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Single Customer ─────────────────────────────────────────────────────────
app.get("/api/admin/customers/:id", requireAdmin, async (req, res) => {
  try {
    const snap = await getDoc(doc(db, "customers", req.params.id));
    if (!snap.exists()) { res.status(404).json({ error: "Customer not found" }); return; }
    res.json({ id: snap.id, ...snap.data() });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Admin Stats ──────────────────────────────────────────────────────────────
app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
  try {
    const [products, categories, industries, contacts, media] = await Promise.all([
      getDocs(collection(db, "products")),
      getDocs(collection(db, "categories")),
      getDocs(collection(db, "industries")),
      getDocs(collection(db, "contactSubmissions")),
      getDocs(collection(db, "media")),
    ]);
    res.json({
      products: products.size,
      categories: categories.size,
      industries: industries.size,
      contacts: contacts.size,
      media: media.size,
    });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── Admin Re-Seed ───────────────────────────────────────────────────────────
app.post("/api/admin/reseed", requireAdmin, async (_req, res) => {
  try {
    const { execFile } = await import("child_process");
    const { promisify } = await import("util");
    const execFileAsync = promisify(execFile);
    const scriptPath = new URL("../seed-firebase.mjs", import.meta.url).pathname;
    const { stdout, stderr } = await execFileAsync("node", [scriptPath], { timeout: 120000 });
    res.json({ ok: true, message: "Re-seed completed successfully.", stdout: stdout.slice(-2000), stderr: stderr.slice(-1000) });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message || "Re-seed failed", stdout: err?.stdout?.slice(-2000), stderr: err?.stderr?.slice(-1000) });
  }
});

// ─── SEO: robots.txt ─────────────────────────────────────────────────────────
app.get("/robots.txt", (_req, res) => {
  const SITE = "https://miengineeringworks.com";
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(`User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*

Sitemap: ${SITE}/sitemap.xml
`);
});

// ─── SEO: sitemap.xml (dynamic) ───────────────────────────────────────────────
app.get("/sitemap.xml", async (_req, res) => {
  const SITE = "https://miengineeringworks.com";
  const now = new Date().toISOString().split("T")[0];

  const staticProductSlugs = [
    "stud-bolts","hex-bolts","heavy-hex-bolts","eye-bolts","u-bolts",
    "anchor-bolts","threaded-rods","hex-nuts","lock-nuts","coupling-nuts",
    "plain-washers","spring-washers",
  ];
  const staticIndustrySlugs = [
    "aerospace","agriculture","appliances","automotive","chemical-industry",
    "general-heat-exchangers","oil-and-gas","construction-and-infrastructure",
    "defense-and-military","electrical-equipment","fire-fighting-systems",
    "food-and-hotel-industry","furniture-industry","hardware-fittings",
    "hvac-systems","roofing-systems","food-and-agro-processing","heavy-engineering",
    "laundries-and-kitchens","locks-and-hardware","material-handling-equipment",
    "medical-equipment-and-industry","mining-and-minerals","offshore-structures",
    "packaging-machines","paper-and-pulp-industry","petrochemical-and-chemical-plants",
    "pharmaceutical-industry","power-and-thermal-energy","prefabricated-buildings-epc",
    "railways-and-transportation","refineries","refrigeration-and-ventilation",
    "rolling-mill-and-fabrication","rubber-and-polymer-industries","shipping-and-marine",
    "sign-and-display-boards","solar-energy-and-renewable","sugar-processing",
    "textile-machinery","office-and-consumer-products","water-treatment-and-desalination",
    "wind-energy-installations","nuclear-energy","automotive-oem","telecommunications",
    "steel-fabrication-and-structural-works","pressure-vessels","cement-and-concrete",
    "infrastructure-and-bridges",
  ];
  const staticStandardSlugs = ["astm","ansi-asme","din","iso","bs","is"];
  const staticCategorySlugs = ["bolts","nuts","screws","washers","rivets","anchors","studs","bars"];

  let productSlugs = staticProductSlugs;
  let industrySlugs = staticIndustrySlugs;
  let standardSlugs = staticStandardSlugs;
  let categorySlugs = staticCategorySlugs;

  try {
    const [prodSnap, indSnap, stdSnap, catSnap] = await Promise.all([
      getDocs(collection(db, "products")),
      getDocs(collection(db, "industries")),
      getDocs(collection(db, "standards")),
      getDocs(query(collection(db, "categories"), orderBy("sortOrder", "asc"))),
    ]);
    const dbProd = prodSnap.docs.map(d => (d.data() as any).slug).filter(Boolean);
    const dbInd  = indSnap.docs.map(d  => (d.data() as any).slug).filter(Boolean);
    const dbStd  = stdSnap.docs.map(d  => (d.data() as any).slug).filter(Boolean);
    const dbCat  = catSnap.docs.map(d  => (d.data() as any).slug).filter(Boolean);
    if (dbProd.length) productSlugs  = [...new Set([...staticProductSlugs, ...dbProd])];
    if (dbInd.length)  industrySlugs = [...new Set([...staticIndustrySlugs, ...dbInd])];
    if (dbStd.length)  standardSlugs = [...new Set([...staticStandardSlugs, ...dbStd])];
    if (dbCat.length)  categorySlugs = [...new Set([...staticCategorySlugs, ...dbCat])];
  } catch { /* use static fallback */ }

  const url = (loc: string, priority: string, freq: string) =>
    `  <url><loc>${SITE}${loc}</loc><lastmod>${now}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;

  const lines: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    url("/",               "1.0", "weekly"),
    url("/products",       "0.9", "weekly"),
    url("/about",          "0.8", "monthly"),
    url("/contact",        "0.8", "monthly"),
    url("/applications",   "0.9", "weekly"),
    url("/standards",      "0.8", "monthly"),
    url("/specifications", "0.7", "monthly"),
    url("/grade-chart",    "0.7", "monthly"),
    url("/gallery",        "0.6", "monthly"),
    ...categorySlugs.map(s => url(`/products/category/${s}`, "0.8", "weekly")),
    ...productSlugs.map(s  => url(`/product/${s}`,           "0.9", "weekly")),
    ...industrySlugs.map(s => url(`/industry/${s}`,          "0.8", "monthly")),
    ...standardSlugs.map(s => url(`/standards/${s}`,         "0.8", "monthly")),
    `</urlset>`,
  ];

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.send(lines.join("\n"));
});

// ─── Static file serving (production) ─────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const distDir    = path.resolve(__dirname, "../dist");

if (existsSync(distDir)) {
  app.use(express.static(distDir, { index: false }));
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
  console.log("[server] Serving frontend from", distDir);
}

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || "3001", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[server] API running on port ${PORT}`);
  initDb().catch((err) => {
    console.warn("[server] Admin seed skipped:", err?.code || err?.message);
  });
});

export default app;
