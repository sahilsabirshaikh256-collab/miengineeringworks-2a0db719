import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  // Log a clear warning instead of throwing — prevents the entire Vercel
  // function from crashing at import time. The error will surface properly
  // when the first DB query is attempted (with a descriptive pg error).
  console.error(
    "[db] FATAL: DATABASE_URL environment variable is not set.\n" +
    "     Add it in your Vercel project → Settings → Environment Variables.\n" +
    "     Must point to a publicly accessible PostgreSQL server (not Replit-internal)."
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://missing:missing@localhost/missing",
  connectionTimeoutMillis: 8000,
  idleTimeoutMillis: 10000,
  max: 3, // keep pool small for serverless
});

// Log connection errors without crashing
pool.on("error", (err) => {
  console.error("[db] Pool error:", err.message);
});

export const db = drizzle(pool, { schema });
