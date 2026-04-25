import "dotenv/config";
import { db } from "./db";
import { products, industries, standards, categories } from "../shared/schema";
import { productsSeed, industriesSeed, standardsSeed, categoriesSeed } from "./seed-data";
import { sql } from "drizzle-orm";

async function main() {
  const force = process.argv.includes("--force");

  const [{ count: cCount }] = (await db.execute(sql`select count(*)::int as count from categories`)).rows as any[];
  if (cCount === 0 || force) {
    if (force) await db.delete(categories);
    for (const c of categoriesSeed) await db.insert(categories).values(c as any);
    console.log(`[seed] categories: ${categoriesSeed.length}`);
  } else console.log(`[seed] categories already populated (${cCount}), skip`);

  const [{ count: pCount }] = (await db.execute(sql`select count(*)::int as count from products`)).rows as any[];
  if (pCount === 0 || force) {
    if (force) await db.delete(products);
    for (const p of productsSeed) await db.insert(products).values(p as any);
    console.log(`[seed] products: ${productsSeed.length}`);
  } else console.log(`[seed] products already populated (${pCount}), skip`);

  const [{ count: iCount }] = (await db.execute(sql`select count(*)::int as count from industries`)).rows as any[];
  if (iCount === 0 || force) {
    if (force) await db.delete(industries);
    for (const i of industriesSeed) await db.insert(industries).values(i as any);
    console.log(`[seed] industries: ${industriesSeed.length}`);
  } else console.log(`[seed] industries already populated (${iCount}), skip`);

  const [{ count: sCount }] = (await db.execute(sql`select count(*)::int as count from standards`)).rows as any[];
  if (sCount === 0 || force) {
    if (force) await db.delete(standards);
    for (const s of standardsSeed) await db.insert(standards).values(s as any);
    console.log(`[seed] standards: ${standardsSeed.length}`);
  } else console.log(`[seed] standards already populated (${sCount}), skip`);

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
