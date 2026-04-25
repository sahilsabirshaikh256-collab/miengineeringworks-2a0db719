/**
 * Dedicated Vercel serverless function for admin login.
 * Vercel routes /api/admin/login directly to this file —
 * no Express wrapper, no cold-start complexity, easy to debug.
 *
 * Every failure path returns descriptive JSON. Never 500 silently.
 */
import type { IncomingMessage, ServerResponse } from "http";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../../server/db";
import { adminUsers } from "../../shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

/** Stream-read and JSON-parse the POST body safely */
function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk: Buffer) => { raw += chunk.toString(); });
    req.on("end", () => {
      try { resolve(JSON.parse(raw || "{}")); }
      catch { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

/** Write a JSON response with CORS headers */
function json(res: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(payload);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // CORS preflight
  if (req.method === "OPTIONS") return json(res, 200, {});

  // Only POST allowed
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed. Use POST." });
  }

  try {
    // ── 1. Parse & validate body ───────────────────────────────────────────────
    const body = await readBody(req);
    const username = (typeof body.username === "string" ? body.username : "").trim().toLowerCase();
    const password  = typeof body.password  === "string" ? body.password  : "";

    if (!username || !password) {
      return json(res, 400, { error: "Email and password are required." });
    }

    // ── 2. Email whitelist ─────────────────────────────────────────────────────
    const allowedEmails = (
      process.env.ADMIN_USERNAME ||
      "miengineering@gmail.com,miengineering17@gmail.com"
    )
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (!allowedEmails.includes(username)) {
      return json(res, 401, { error: "Only the admin email is allowed to sign in." });
    }

    // ── 3. DATABASE_URL guard ──────────────────────────────────────────────────
    if (!process.env.DATABASE_URL) {
      console.error("[login] DATABASE_URL not set in Vercel environment");
      return json(res, 500, {
        error:
          "Server misconfiguration: DATABASE_URL is not set. " +
          "Add it in Vercel → Project Settings → Environment Variables. " +
          "It must point to a publicly accessible PostgreSQL server.",
      });
    }

    // ── 4. DB lookup ───────────────────────────────────────────────────────────
    const rows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));

    const user = rows[0];
    if (!user) {
      return json(res, 401, {
        error:
          "Admin account not found in the database. " +
          "Run `npm run db:push && npm run db:seed` against the production database.",
      });
    }

    // ── 5. Password check ──────────────────────────────────────────────────────
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return json(res, 401, { error: "Invalid password." });
    }

    // ── 6. Issue JWT ───────────────────────────────────────────────────────────
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    console.log(`[login] Admin "${username}" signed in successfully.`);
    return json(res, 200, { token });

  } catch (err: any) {
    console.error("[login] Unhandled error:", err?.message ?? String(err));
    console.error("[login] Stack:", err?.stack ?? "(no stack)");

    let message = "Internal server error. Check your Vercel function logs for details.";

    if (err?.message?.includes("DATABASE_URL") || err?.message?.includes("missing")) {
      message = "DATABASE_URL is missing or invalid. Set it in Vercel environment variables.";
    } else if (
      err?.message?.includes("ECONNREFUSED") ||
      err?.message?.includes("connect") ||
      err?.message?.includes("timeout")
    ) {
      message =
        "Cannot reach the database. " +
        "Ensure DATABASE_URL points to a publicly accessible PostgreSQL server " +
        "(not a localhost or Replit-internal URL).";
    } else if (err?.message?.includes("password authentication failed")) {
      message = "Database authentication failed. Check the credentials in DATABASE_URL.";
    } else if (err?.message?.includes("does not exist")) {
      message =
        "Database table missing. Run `npm run db:push` against your production database, " +
        "then `npm run db:seed` to create the admin user.";
    }

    return json(res, 500, { error: message });
  }
}
