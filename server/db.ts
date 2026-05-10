import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pkg;

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  // Log a clear warning instead of throwing — prevents the Vercel function from
  // crashing at import time. Errors surface when the first DB query is attempted.
  console.error(
    "[db] WARNING: DATABASE_URL or POSTGRES_URL is not set.\n" +
    "     Admin login will use the ADMIN_PASSWORD env var as fallback.\n" +
    "     To enable full database features on Vercel, set DATABASE_URL to a\n" +
    "     public PostgreSQL URL (e.g. Neon: https://neon.tech, Supabase: https://supabase.com)"
  );
}

export const pool = new Pool({
  connectionString: databaseUrl || "postgresql://none:none@127.0.0.1:5432/none",
  // Keep timeouts short on serverless — Vercel functions timeout at 10s by default.
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 8000,
  max: 3,
});

pool.on("error", (err) => {
  console.error("[db] Pool error:", err.message);
});

export const db = drizzle(pool, { schema });
