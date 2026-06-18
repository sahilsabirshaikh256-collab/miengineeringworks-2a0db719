import { Pool } from 'pg';
import { standardsSeed, industriesSeed, categoriesSeed, productsSeed } from './server/seed-data';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedDatabase() {
  try {
    console.log("[v0] Starting database seeding...");
    
    // Seed Standards
    console.log("[v0] 📋 Seeding Standards...");
    for (const standard of standardsSeed) {
      await pool.query(
        `INSERT INTO standards (slug, code, name, region, description, image, scope, applications, materials, examples)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (slug) DO UPDATE SET
         name = $3, description = $5, image = $6, scope = $7, applications = $8, materials = $9, examples = $10`,
        [
          standard.slug,
          standard.code,
          standard.name,
          standard.region,
          standard.description,
          standard.image,
          standard.scope,
          standard.applications,
          standard.materials,
          standard.examples
        ]
      );
    }
    console.log(`[v0] ✓ Seeded ${standardsSeed.length} standards`);
    
    // Seed Industries/Applications
    console.log("[v0] 🏭 Seeding Industries...");
    for (const industry of industriesSeed) {
      await pool.query(
        `INSERT INTO industries (slug, name, description, hero_description, image, grades, applications, key_requirements)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE SET
         name = $2, description = $3, hero_description = $4, image = $5, grades = $6, applications = $7, key_requirements = $8`,
        [
          industry.slug,
          industry.name,
          industry.description,
          industry.heroDescription,
          industry.image,
          JSON.stringify(industry.grades),
          JSON.stringify(industry.applications),
          industry.keyRequirements
        ]
      );
    }
    console.log(`[v0] ✓ Seeded ${industriesSeed.length} industries`);
    
    // Seed Categories
    console.log("[v0] 📦 Seeding Categories...");
    for (const category of categoriesSeed) {
      await pool.query(
        `INSERT INTO categories (slug, name, description, image, sort_order)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE SET
         name = $2, description = $3, image = $4, sort_order = $5`,
        [
          category.slug,
          category.name,
          category.description,
          category.image,
          category.sortOrder
        ]
      );
    }
    console.log(`[v0] ✓ Seeded ${categoriesSeed.length} categories`);
    
    // Seed Products
    console.log("[v0] 🔧 Seeding Products...");
    let productsSeeded = 0;
    for (const product of productsSeed) {
      await pool.query(
        `INSERT INTO products (
          slug, name, category, image, standard, description, sizes, threads, length, 
          material, finish, grades, applications, dimensions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (slug) DO UPDATE SET
         name = $2, category = $3, description = $6, image = $4, standard = $5, sizes = $7, 
         threads = $8, length = $9, material = $10, finish = $11, grades = $12, 
         applications = $13, dimensions = $14`,
        [
          product.slug,
          product.name,
          product.category,
          product.image,
          product.standard,
          product.description,
          product.sizes,
          product.threads,
          product.length,
          product.material,
          product.finish,
          product.grades,
          product.applications,
          JSON.stringify(product.dimensions)
        ]
      );
      productsSeeded++;
    }
    console.log(`[v0] ✓ Seeded ${productsSeeded} products`);
    
    console.log("\n[v0] ✅ Database seeding completed successfully!");
    await pool.end();
  } catch (error) {
    console.error("[v0] ❌ Seeding error:", error);
    await pool.end();
    process.exit(1);
  }
}

seedDatabase();
