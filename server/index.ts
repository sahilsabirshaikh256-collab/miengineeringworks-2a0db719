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
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: "Email is required" });
  const ADMIN_EMAIL = (process.env.ADMIN_USERNAME || "miengineering17@gmail.com").trim().toLowerCase();
  const submitted = String(username || "").trim().toLowerCase();
  if (submitted !== ADMIN_EMAIL) {
    return res.status(401).json({ error: "Only the admin email is allowed to sign in." });
  }
  const u = await storage.getAdminByUsername(submitted);
  if (!u) return res.status(401).json({ error: "Admin not initialised" });
  res.json({ token: signToken({ id: u.id, username: u.username }) });
});

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

// Branded company catalog PDF
app.get("/api/catalog.pdf", (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="MI-Engineering-Works-Catalog.pdf"');
  res.setHeader("Cache-Control", "public, max-age=300");
  generateCatalogPdf(res);
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
  const arr = z.array(insertSiteContentSchema).safeParse(req.body);
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

// Bootstrap default admin (email-based)
async function ensureDefaultAdmin() {
  const username = process.env.ADMIN_USERNAME || "miengineering17@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "6392";
  const existing = await storage.getAdminByUsername(username);
  if (!existing) {
    // Remove any legacy admin and create new one with desired credentials
    await storage.deleteAllAdmins();
    await storage.createAdmin(username, await hashPassword(password));
    console.log(`[admin] Created admin user "${username}"`);
  }
}

const PORT = Number(process.env.SERVER_PORT || 3001);
app.listen(PORT, "0.0.0.0", async () => {
  console.log(`[server] listening on :${PORT}`);
  try { await ensureDefaultAdmin(); } catch (e) { console.error("admin bootstrap failed", e); }
});
