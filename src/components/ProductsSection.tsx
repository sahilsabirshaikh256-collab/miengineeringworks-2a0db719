import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { productsData } from "@/data/staticData";
import type { Product } from "@/lib/api";
import { resolveImage } from "@/utils/resolveImage";
import { MessageCircle, X, CheckSquare } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const Product3DCard = ({
  product,
  selected,
  onToggle,
}: {
  product: Product;
  selected: boolean;
  onToggle: (slug: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ perspective: 800, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <button
        onClick={(e) => { e.preventDefault(); onToggle(product.slug); }}
        className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          selected ? "border-primary bg-primary text-white" : "border-border bg-card/80 text-transparent hover:border-primary/60"
        }`}
      >
        {selected && <CheckSquare className="w-3.5 h-3.5" />}
      </button>
      <Link
        to={`/product/${product.slug}`}
        className={`group block bg-card rounded-lg border transition-all duration-300 overflow-hidden shadow-elegant ${
          selected ? "border-primary shadow-gold" : "border-border hover:border-primary/40 hover:shadow-gold"
        }`}
        data-testid={`card-product-${product.slug}`}
      >
        <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden relative">
          <motion.img
            src={resolveImage("product", product.slug, product.image)}
            alt={`${product.name} - M.I. Engineering Works`}
            loading="lazy"
            width={512} height={512}
            className="w-full h-full object-contain"
            whileHover={{ scale: 1.12, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        </div>
        <motion.div
          className="p-4 text-center border-t border-border"
          whileHover={{ backgroundColor: "hsl(var(--primary) / 0.05)" }}
        >
          <h3 className="font-heading text-sm md:text-base font-semibold text-foreground">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{product.standard}</p>
          <motion.span
            className="inline-block mt-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View Details →
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Build ordered category list preserving first-occurrence order
const ALL_CATEGORIES = Array.from(new Set(productsData.map((p) => p.category).filter(Boolean))) as string[];

// Group products by category
const groupedProducts: Record<string, Product[]> = {};
ALL_CATEGORIES.forEach((cat) => {
  groupedProducts[cat] = productsData.filter((p) => p.category === cat);
});
// Products without a category
const uncategorized = productsData.filter((p) => !p.category);

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);

  const toggleProduct = (slug: string) =>
    setSelected((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);

  const selectedProducts = productsData.filter((p) => selected.includes(p.slug));

  const buildWhatsAppMsg = () => {
    const lines = [
      "🔩 *M.I. Engineering Works — Bulk Enquiry*",
      "",
      `📦 *Products Required (${selectedProducts.length}):*`,
      ...selectedProducts.map((p, i) => `${i + 1}. ${p.name}${p.standard ? ` (${p.standard})` : ""}`),
      "",
      "Please share pricing, availability and lead time.",
      "📞 +91 98199 72301",
    ];
    return `https://wa.me/919819972301?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  // Which categories to show
  const visibleCategories = activeCategory === "All" ? ALL_CATEGORIES : [activeCategory];
  const showUncategorized = activeCategory === "All" && uncategorized.length > 0;

  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container">

        {/* Header */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <motion.span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary inline-block"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            Our Products
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            All Types of Industrial <span className="text-gradient-gold">Fasteners</span>
          </h2>
          <motion.div className="gold-divider w-24 mx-auto mt-6"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
          <p className="text-xs text-muted-foreground mt-4">
            ✓ Tick products to send a bulk WhatsApp enquiry
          </p>
        </motion.div>

        {/* Category filter pills */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          {["All", ...ALL_CATEGORIES].map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card"
              }`}>
              {cat}
              {cat !== "All" && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/20" : "bg-border"}`}>
                  {groupedProducts[cat]?.length ?? 0}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Category sections */}
        <div className="space-y-16">
          {visibleCategories.map((cat, catIdx) => {
            const catProducts = groupedProducts[cat] || [];
            if (catProducts.length === 0) return null;
            return (
              <motion.div key={cat} id={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: catIdx * 0.05 }}>

                {/* Category title bar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-accent" />
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{cat}</h2>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {catProducts.length} Products
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>

                {/* Products grid */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                >
                  {catProducts.map((p) => (
                    <Product3DCard key={p.slug} product={p} selected={selected.includes(p.slug)} onToggle={toggleProduct} />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Uncategorized products */}
          {showUncategorized && uncategorized.map((p) => (
            <Product3DCard key={p.slug} product={p} selected={selected.includes(p.slug)} onToggle={toggleProduct} />
          ))}
        </div>
      </div>

      {/* Floating quick enquiry bar */}
      <AnimatePresence>
        {selected.length > 0 && !panelOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border border-primary/40"
            style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)" }}
          >
            <span className="text-sm font-semibold text-foreground">
              <span className="text-primary font-bold">{selected.length}</span> product{selected.length > 1 ? "s" : ""} selected
            </span>
            <button onClick={() => setPanelOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition"
              style={{ background: "#25D366", color: "#fff" }}>
              <MessageCircle className="w-4 h-4" /> Quick Enquiry
            </button>
            <button onClick={() => setSelected([])}
              className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Enquiry Panel */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setPanelOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
              style={{ background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))" }}
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">Quick Enquiry</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} selected</p>
                </div>
                <button onClick={() => setPanelOpen(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Selected Products</p>
                {selectedProducts.map((p) => (
                  <div key={p.slug} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/20">
                    <img src={resolveImage("product", p.slug, p.image)} alt={p.name} className="w-12 h-12 object-contain rounded-md bg-secondary p-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-foreground truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{p.standard}</div>
                      {p.category && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{p.category}</span>}
                    </div>
                    <button onClick={() => toggleProduct(p.slug)}
                      className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition flex-shrink-0">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-border space-y-3">
                <div className="bg-secondary/40 rounded-lg p-3 text-xs text-muted-foreground font-mono leading-relaxed max-h-36 overflow-y-auto">
                  <p className="font-bold text-foreground mb-1">Message preview:</p>
                  🔩 M.I. Engineering Works — Bulk Enquiry{"\n\n"}
                  📦 Products ({selectedProducts.length}):{"\n"}
                  {selectedProducts.map((p, i) => <span key={p.slug}>{i + 1}. {p.name}{"\n"}</span>)}
                  {"\n"}Please share pricing and lead time.
                </div>
                <a href={buildWhatsAppMsg()} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white text-sm transition hover:opacity-90"
                  style={{ background: "#25D366" }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send Enquiry on WhatsApp
                </a>
                <button onClick={() => { setSelected([]); setPanelOpen(false); }}
                  className="w-full py-2.5 rounded-xl border border-border text-muted-foreground text-sm hover:text-foreground hover:border-primary/40 transition">
                  Clear Selection
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsSection;
