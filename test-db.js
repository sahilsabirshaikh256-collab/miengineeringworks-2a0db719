const { Pool } = require('pg');
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
console.log("URL:", url ? url.substring(0, 50) + "..." : "NOT SET");

const pool = new Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT 1', (err, res) => {
  if (err) {
    console.error("Connection Error:", err.message);
    process.exit(1);
  }
  console.log("✓ Database connected!");
  pool.end();
});
