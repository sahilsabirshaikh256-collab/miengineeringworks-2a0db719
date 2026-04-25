import { products as staticProducts, type Product } from "./products";

export interface CategoryDef {
  slug: string;
  name: string;
  description: string;
}

export const CATEGORY_DEFS: CategoryDef[] = [
  { slug: "bolts",   name: "Bolts",   description: "Hex, heavy-hex, eye, U, anchor, foundation and other industrial bolts." },
  { slug: "studs",   name: "Studs",   description: "Stud bolts, double-end studs, threaded rods and tap-end studs." },
  { slug: "screws",  name: "Screws",  description: "Socket head, countersunk, set screws and machine screws." },
  { slug: "nuts",    name: "Nuts",    description: "Hex, lock, flange, wing, cap, square and coupling nuts." },
  { slug: "washers", name: "Washers", description: "Plain, spring, lock, fender and Belleville washers." },
  { slug: "rivets",  name: "Rivets",  description: "Blind, solid, semi-tubular, drive and structural rivets." },
  { slug: "anchors", name: "Anchors", description: "Wedge, sleeve, chemical, drop-in and expansion anchors." },
  { slug: "bars",    name: "Bars",    description: "Alloy steel round bars and raw stock for fastener machining." },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(
  CATEGORY_DEFS.map((c) => [c.slug, c]),
) as Record<string, CategoryDef>;

export const slugifyCategory = (name: string): string =>
  (name || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export interface CategorisedProduct extends Product {
  category: string;
  categorySlug: string;
}

export const withCategory = (p: Product): CategorisedProduct => {
  const cat = (p.category && p.category.trim()) || "Other";
  return { ...p, category: cat, categorySlug: slugifyCategory(cat) };
};

export const allCategorisedProducts = (extra: Product[] = []): CategorisedProduct[] => {
  const seen = new Set<string>();
  const out: CategorisedProduct[] = [];
  for (const p of [...staticProducts, ...extra]) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(withCategory(p));
  }
  return out;
};

export interface CategoryGroup extends CategoryDef {
  products: CategorisedProduct[];
  count: number;
}

export const groupByCategory = (extra: Product[] = []): CategoryGroup[] => {
  const all = allCategorisedProducts(extra);
  return CATEGORY_DEFS.map((def) => {
    const inCat = all.filter((p) => p.categorySlug === def.slug);
    return { ...def, products: inCat, count: inCat.length };
  }).filter((g) => g.count > 0);
};

export const productsInCategory = (slug: string, extra: Product[] = []): CategorisedProduct[] => {
  const all = allCategorisedProducts(extra);
  return all.filter((p) => p.categorySlug === slug);
};
