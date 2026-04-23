import { db } from "./db";
import { adminUsers, products, industries, standards, contactSubmissions } from "../shared/schema";
import { eq, asc, desc } from "drizzle-orm";
import type { InsertProduct, InsertIndustry, InsertStandard, InsertContact } from "../shared/schema";

export const storage = {
  // Admin
  getAdminByUsername: (username: string) =>
    db.select().from(adminUsers).where(eq(adminUsers.username, username)).then((r) => r[0]),
  createAdmin: (username: string, passwordHash: string) =>
    db.insert(adminUsers).values({ username, passwordHash }).returning().then((r) => r[0]),

  // Products
  listProducts: () => db.select().from(products).orderBy(asc(products.sortOrder)),
  getProduct: (slug: string) => db.select().from(products).where(eq(products.slug, slug)).then((r) => r[0]),
  upsertProduct: async (data: InsertProduct) => {
    const existing = await db.select().from(products).where(eq(products.slug, data.slug)).then((r) => r[0]);
    if (existing) return db.update(products).set(data).where(eq(products.id, existing.id)).returning().then((r) => r[0]);
    return db.insert(products).values(data).returning().then((r) => r[0]);
  },
  updateProduct: (id: number, data: Partial<InsertProduct>) =>
    db.update(products).set(data).where(eq(products.id, id)).returning().then((r) => r[0]),
  deleteProduct: (id: number) => db.delete(products).where(eq(products.id, id)),

  // Industries
  listIndustries: () => db.select().from(industries).orderBy(asc(industries.sortOrder)),
  getIndustry: (slug: string) => db.select().from(industries).where(eq(industries.slug, slug)).then((r) => r[0]),
  upsertIndustry: async (data: InsertIndustry) => {
    const existing = await db.select().from(industries).where(eq(industries.slug, data.slug)).then((r) => r[0]);
    if (existing) return db.update(industries).set(data).where(eq(industries.id, existing.id)).returning().then((r) => r[0]);
    return db.insert(industries).values(data).returning().then((r) => r[0]);
  },
  updateIndustry: (id: number, data: Partial<InsertIndustry>) =>
    db.update(industries).set(data).where(eq(industries.id, id)).returning().then((r) => r[0]),
  deleteIndustry: (id: number) => db.delete(industries).where(eq(industries.id, id)),

  // Standards
  listStandards: () => db.select().from(standards).orderBy(asc(standards.sortOrder)),
  getStandard: (slug: string) => db.select().from(standards).where(eq(standards.slug, slug)).then((r) => r[0]),
  upsertStandard: async (data: InsertStandard) => {
    const existing = await db.select().from(standards).where(eq(standards.slug, data.slug)).then((r) => r[0]);
    if (existing) return db.update(standards).set(data).where(eq(standards.id, existing.id)).returning().then((r) => r[0]);
    return db.insert(standards).values(data).returning().then((r) => r[0]);
  },
  updateStandard: (id: number, data: Partial<InsertStandard>) =>
    db.update(standards).set(data).where(eq(standards.id, id)).returning().then((r) => r[0]),
  deleteStandard: (id: number) => db.delete(standards).where(eq(standards.id, id)),

  // Contact
  createContact: (data: InsertContact) =>
    db.insert(contactSubmissions).values(data).returning().then((r) => r[0]),
  listContacts: () => db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt)),
  deleteContact: (id: number) => db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)),
};
