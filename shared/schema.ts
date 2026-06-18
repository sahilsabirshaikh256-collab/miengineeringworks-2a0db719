import { z } from "zod";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  standard: string;
  description: string;
  sizes: string;
  threads: string;
  length: string;
  material: string;
  finish: string[];
  grades: string[];
  applications: string[];
  dimensions: any[];
};

export type Industry = {
  id: string;
  slug: string;
  name: string;
  description: string;
  heroDescription: string;
  image: string;
  grades: any[];
  applications: any[];
  keyRequirements: string[];
};

export type Standard = {
  id: string;
  slug: string;
  code: string;
  name: string;
  region: string;
  description: string;
  image: string;
  scope: string;
  applications: string[];
  materials: string[];
  examples: string[];
};

export type Media = {
  id: string;
  type: string;
  url: string;
  title: string;
  caption: string;
  thumbnail: string;
};

export type ContactSubmission = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  productName: string;
  productGrade: string;
  productStandard: string;
  createdAt: string;
};

export type SiteContent = {
  id: string;
  key: string;
  value: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
};

export type LedgerEntry = {
  id: string;
  customerId: string;
  customerName: string;
  invoiceDate: string;
  invoiceNo: string;
  amountDue: string;
  paymentDate: string;
  amountReceived: string;
  receiptNo: string;
  notes: string;
  tallyReceiptDone: boolean;
  bookEntryDone: boolean;
  createdAt: string;
};

export type PageSection = {
  id: string;
  page: string;
  position: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  linkText: string;
  linkUrl: string;
  enabled: boolean;
  sortOrder: number;
};

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

export const insertContactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone is required"),
  companyName: z.string().optional().default(""),
  message: z.string().min(5, "Message is required"),
});

export const insertSiteContentSchema = z.object({
  key: z.string().min(1),
  value: z.string().default(""),
});

export const insertCustomerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  phone: z.string().optional().default(""),
  address: z.string().optional().default(""),
});

export const insertLedgerSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  customerName: z.string().min(1, "Customer name is required"),
  invoiceDate: z.string().optional().default(""),
  invoiceNo: z.string().optional().default(""),
  amountDue: z.string().optional().default("0"),
  paymentDate: z.string().optional().default(""),
  amountReceived: z.string().optional().default("0"),
  receiptNo: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  tallyReceiptDone: z.boolean().optional().default(false),
  bookEntryDone: z.boolean().optional().default(false),
});

export const insertPageSectionSchema = z.object({
  page: z.string().default("home"),
  position: z.string().default("after-stats"),
  title: z.string().default(""),
  subtitle: z.string().default(""),
  body: z.string().default(""),
  image: z.string().default(""),
  linkText: z.string().default(""),
  linkUrl: z.string().default(""),
  enabled: z.boolean().default(true),
});

export type InsertCategory = Omit<Category, "id">;
export type InsertProduct = Omit<Product, "id">;
export type InsertIndustry = Omit<Industry, "id">;
export type InsertStandard = Omit<Standard, "id">;
export type InsertMedia = Omit<Media, "id">;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type InsertLedger = z.infer<typeof insertLedgerSchema>;
export type InsertPageSection = z.infer<typeof insertPageSectionSchema>;
