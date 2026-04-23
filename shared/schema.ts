import { pgTable, serial, varchar, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 64 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  standard: text("standard").notNull(),
  description: text("description").notNull(),
  sizes: text("sizes").notNull().default(""),
  threads: text("threads").notNull().default(""),
  length: text("length").notNull().default(""),
  material: text("material").notNull().default(""),
  finish: text("finish").array().notNull().default([]),
  grades: text("grades").array().notNull().default([]),
  applications: text("applications").array().notNull().default([]),
  dimensions: jsonb("dimensions").notNull().default([]),
  sortOrder: serial("sort_order"),
});

export const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  heroDescription: text("hero_description").notNull().default(""),
  image: text("image").notNull(),
  grades: jsonb("grades").notNull().default([]),
  applications: jsonb("applications").notNull().default([]),
  keyRequirements: text("key_requirements").array().notNull().default([]),
  sortOrder: serial("sort_order"),
});

export const standards = pgTable("standards", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  region: text("region").notNull().default(""),
  description: text("description").notNull(),
  image: text("image").notNull().default(""),
  scope: text("scope").notNull().default(""),
  applications: text("applications").array().notNull().default([]),
  materials: text("materials").array().notNull().default([]),
  examples: text("examples").array().notNull().default([]),
  sortOrder: serial("sort_order"),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  companyName: text("company_name").notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true, sortOrder: true });
export const insertIndustrySchema = createInsertSchema(industries).omit({ id: true, sortOrder: true });
export const insertStandardSchema = createInsertSchema(standards).omit({ id: true, sortOrder: true });
export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true }).extend({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone is required"),
  message: z.string().min(5, "Message is required"),
  companyName: z.string().optional().default(""),
});

export type Product = typeof products.$inferSelect;
export type Industry = typeof industries.$inferSelect;
export type Standard = typeof standards.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertIndustry = z.infer<typeof insertIndustrySchema>;
export type InsertStandard = z.infer<typeof insertStandardSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
