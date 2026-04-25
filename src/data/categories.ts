import { useQuery } from "@tanstack/react-query";
import { api, type Category, type Product } from "@/lib/api";

export interface CategoryDef {
  slug: string;
  name: string;
  description: string;
}

// Static fallback used while the API is loading or if the DB is empty.
export const CATEGORY_DEFS: CategoryDef[] = [
  { slug: "bolts",   name: "Bolts",   description: "Hex, heavy-hex, eye, U, J, anchor, flange, allen and stud bolts." },
  { slug: "nuts",    name: "Nuts",    description: "Hex, lock, wing, cap, flange, square, coupling and weld nuts." },
  { slug: "screws",  name: "Screws",  description: "Self-tapping, self-drilling, machine, wood, drywall and socket screws." },
  { slug: "washers", name: "Washers", description: "Plain, spring, lock, fender, tooth-lock and flat washers." },
  { slug: "rivets",  name: "Rivets",  description: "Blind, solid, semi-tubular and drive rivets." },
  { slug: "anchors", name: "Anchors", description: "Wedge, sleeve, chemical and drop-in anchors." },
  { slug: "studs",   name: "Studs",   description: "Full-thread studs, double-end studs and threaded rods." },
  { slug: "bars",    name: "Bars",    description: "Alloy steel round bars and raw stock for fastener machining." },
];

export const slugifyCategory = (name: string): string =>
  (name || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export interface CategoryGroup extends CategoryDef {
  image: string;
  products: Product[];
  count: number;
}

/** Returns categories paired with their products. Source of truth = DB API. */
export function useCategoryGroups(): { groups: CategoryGroup[]; isLoading: boolean } {
  const cats = useQuery<Category[]>({ queryKey: ["/api/categories"], queryFn: () => api("/api/categories") });
  const prods = useQuery<Product[]>({ queryKey: ["/api/products"],   queryFn: () => api("/api/products") });

  const isLoading = cats.isLoading || prods.isLoading;
  const allProducts = prods.data ?? [];

  // If we have categories from DB, use them; otherwise fall back to static defs.
  const defs: { slug: string; name: string; description: string; image: string }[] =
    (cats.data && cats.data.length > 0)
      ? cats.data.map((c) => ({ slug: c.slug, name: c.name, description: c.description, image: c.image }))
      : CATEGORY_DEFS.map((c) => ({ ...c, image: "" }));

  const groups: CategoryGroup[] = defs
    .map((d) => {
      const inCat = allProducts.filter((p) => slugifyCategory(p.category) === d.slug);
      return { ...d, products: inCat, count: inCat.length };
    })
    .filter((g) => g.count > 0);

  return { groups, isLoading };
}

export function useCategoryBySlug(slug: string | undefined) {
  const cats = useQuery<Category[]>({ queryKey: ["/api/categories"], queryFn: () => api("/api/categories") });
  if (!slug) return undefined;
  const fromDb = cats.data?.find((c) => c.slug === slug);
  if (fromDb) return { slug: fromDb.slug, name: fromDb.name, description: fromDb.description, image: fromDb.image };
  const fallback = CATEGORY_DEFS.find((c) => c.slug === slug);
  return fallback ? { ...fallback, image: "" } : undefined;
}

export function useProductsInCategory(slug: string | undefined): { products: Product[]; isLoading: boolean } {
  const prods = useQuery<Product[]>({ queryKey: ["/api/products"], queryFn: () => api("/api/products") });
  const products = (prods.data ?? []).filter((p) => slugifyCategory(p.category) === slug);
  return { products, isLoading: prods.isLoading };
}
