import pg from 'pg';
const { Pool } = pg;
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
console.log("URL:", url ? url.substring(0, 50) + "..." : "NOT SET");

const pool = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false }
});

try {
  const res = await pool.query('SELECT 1');
  console.log("✓ Database connected!");
  await pool.end();
} catch (err) {
  console.error("Connection Error:", err.message);
  process.exit(1);
}
