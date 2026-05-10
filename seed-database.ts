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
          JSON.stringify(standard.applications),
          JSON.stringify(standard.materials),
          JSON.stringify(standard.examples)
        ]
      );
    }
    console.log(`[v0] ✓ Seeded ${standardsSeed.length} standards`);
    
    // Seed Industries/Applications
    console.log("[v0] 🏭 Seeding Industries...");
    for (const industry of industriesSeed) {
      await pool.query(
        `INSERT INTO industries (slug, name, description, "heroDescription", image, grades, "keyRequirements")
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (slug) DO UPDATE SET
         name = $2, description = $3, "heroDescription" = $4, image = $5, grades = $6, "keyRequirements" = $7`,
        [
          industry.slug,
          industry.name,
          industry.description,
          industry.heroDescription,
          industry.image,
          JSON.stringify(industry.grades),
          JSON.stringify(industry.keyRequirements)
        ]
      );
    }
    console.log(`[v0] ✓ Seeded ${industriesSeed.length} industries`);
    
    // Seed Categories
    console.log("[v0] 📦 Seeding Categories...");
    for (const category of categoriesSeed) {
      await pool.query(
        `INSERT INTO categories (slug, name, description, image, "sortOrder")
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE SET
         name = $2, description = $3, image = $4, "sortOrder" = $5`,
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
      const categoryId = await pool.query(
        `SELECT id FROM categories WHERE slug = $1`,
        [product.category.toLowerCase()]
      );
      
      if (categoryId.rows.length === 0) {
        console.warn(`[v0] ⚠ Category not found for product: ${product.name}`);
        continue;
      }
      
      await pool.query(
        `INSERT INTO products (
          slug, name, "categoryId", image, standard, description, sizes, threads, length, 
          material, finish, grades, applications, dimensions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (slug) DO UPDATE SET
         name = $2, description = $6, image = $4, standard = $5, sizes = $7, 
         threads = $8, length = $9, material = $10, finish = $11, grades = $12, 
         applications = $13, dimensions = $14`,
        [
          product.slug,
          product.name,
          categoryId.rows[0].id,
          product.image,
          product.standard,
          product.description,
          product.sizes,
          product.threads,
          product.length,
          product.material,
          JSON.stringify(product.finish),
          JSON.stringify(product.grades),
          JSON.stringify(product.applications),
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
