import { productsData } from "@/data/staticData";
import type { Product } from "@/lib/api";

export interface CategoryDef {
  slug: string;
  name: string;
  description: string;
}

export const CATEGORY_DEFS: CategoryDef[] = [
  { slug: "bolts",   name: "Bolts",   description: "Hex, heavy-hex, eye, U, J, anchor, flange, allen and stud bolts." },
  { slug: "nuts",    name: "Nuts",    description: "Hex, lock, wing, cap, flange, square, coupling and weld nuts." },
  { slug: "screws",  name: "Screws",  description: "Self-tapping, self-drilling, machine, wood, drywall and socket screws." },
  { slug: "washers", name: "Washers", description: "Plain, spring, lock, fender, tooth-lock and flat washers." },
  { slug: "pins",    name: "Pins",    description: "Dowel, taper, clevis, spring, roll, grooved, ball lock, quick release and hitch pins." },
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

const CATEGORY_IMAGES: Record<string, string> = {
  bolts: "/products/hex-bolt.webp",
  nuts: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80",
  screws: "/products/socket-cap-screw.jpg",
  washers: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80",
  pins: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
  rivets: "https://images.unsplash.com/photo-1620230874645-0c0a3e2c6a2f?w=600&q=80",
  anchors: "/products/anchor-bolt.webp",
  studs: "/products/stud-bolt.webp",
  bars: "/products/round-bar.jpg",
};

export function useCategoryGroups(): { groups: CategoryGroup[]; isLoading: boolean } {
  const allProducts = productsData;

  const groups: CategoryGroup[] = CATEGORY_DEFS
    .map((d) => {
      const inCat = allProducts.filter((p) => slugifyCategory(p.category) === d.slug);
      return { ...d, image: CATEGORY_IMAGES[d.slug] || "", products: inCat, count: inCat.length };
    })
    .filter((g) => g.count > 0);

  return { groups, isLoading: false };
}

export function useCategoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  const fallback = CATEGORY_DEFS.find((c) => c.slug === slug);
  return fallback ? { ...fallback, image: CATEGORY_IMAGES[slug] || "" } : undefined;
}

export function useProductsInCategory(slug: string | undefined): { products: Product[]; isLoading: boolean } {
  const products = productsData.filter((p) => {
    const ps = slugifyCategory(p.category);
    return ps === slug || ps.startsWith((slug || "") + "-");
  });
  return { products, isLoading: false };
}
