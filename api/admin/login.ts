import type { IncomingMessage, ServerResponse } from "http";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, query, where, limit, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFLp3dCFDEil3kp-VEzPsHMNS7DuQWCr4",
  authDomain: "mibo-c358b.firebaseapp.com",
  projectId: "mibo-c358b",
  storageBucket: "mibo-c358b.firebasestorage.app",
  messagingSenderId: "47473105953",
  appId: "1:47473105953:web:05bf66bc4f90983505d760",
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(firebaseApp);

const JWT_SECRET = process.env.JWT_SECRET || "mi_engineering_jwt_secret_2024_x7k9p";

if (!process.env.JWT_SECRET) {
  console.warn("[SECURITY] JWT_SECRET not set — using insecure default!");
}

// ─── Rate limiter (in-memory; resets on cold start — acceptable for serverless) ──
const _attempts = new Map<string, { fails: number; lockedUntil: number }>();
const RATE_MAX   = 5;
const RATE_MS    = 15 * 60 * 1000;

function _getIp(req: IncomingMessage): string {
  const fwd = req.headers["x-forwarded-for"];
  return (Array.isArray(fwd) ? fwd[0] : fwd?.split(",")[0] || "unknown").trim();
}
function _isLocked(ip: string): boolean {
  const e = _attempts.get(ip);
  if (!e) return false;
  if (e.lockedUntil > Date.now()) return true;
  _attempts.delete(ip); return false;
}
function _fail(ip: string) {
  const e = _attempts.get(ip) || { fails: 0, lockedUntil: 0 };
  e.fails += 1;
  if (e.fails >= RATE_MAX) { e.lockedUntil = Date.now() + RATE_MS; e.fails = 0; }
  _attempts.set(ip, e);
}
function _ok(ip: string) { _attempts.delete(ip); }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk: Buffer) => { raw += chunk.toString(); });
    req.on("end", () => { try { resolve(JSON.parse(raw || "{}")); } catch { resolve({}); } });
    req.on("error", () => resolve({}));
  });
}

function json(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  const origin  = "*";
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(payload);
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") return json(res, 200, {});
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });

  const ip = _getIp(req);
  if (_isLocked(ip)) {
    return json(res, 429, { error: "Too many failed attempts. Try again in 15 minutes." });
  }

  try {
    const body     = await readBody(req);
    const username = (typeof body.username === "string" ? body.username : "").trim().toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";

    if (!username || !password) {
      return json(res, 400, { error: "Email and password are required." });
    }

    // Primary: Firebase (bcrypt-hashed passwords)
    try {
      const q    = query(collection(db, "adminUsers"), where("username", "==", username), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const data = snap.docs[0].data();
        const ok   = await bcrypt.compare(password, data.passwordHash);
        if (!ok) { _fail(ip); return json(res, 401, { error: "Invalid credentials." }); }
        _ok(ip);
        const token = jwt.sign({ id: snap.docs[0].id, username: data.username }, JWT_SECRET, { expiresIn: "7d" });
        return json(res, 200, { token });
      }
    } catch (fbErr: any) {
      console.warn("[login] Firebase failed, using env fallback:", fbErr?.message);
    }

    // Fallback: env password — compared with bcrypt (never plaintext)
    const envRaw  = process.env.ADMIN_PASSWORD || "admin@MI2024";
    const envHash = await bcrypt.hash(envRaw, 10);
    const ok      = await bcrypt.compare(password, envHash);
    if (!ok) { _fail(ip); return json(res, 401, { error: "Invalid credentials." }); }
    _ok(ip);
    const token = jwt.sign({ id: "env-admin", username }, JWT_SECRET, { expiresIn: "7d" });
    return json(res, 200, { token });

  } catch (err: any) {
    console.error("[login]", err?.message);
    return json(res, 500, { error: "Internal server error." });
  }
}
