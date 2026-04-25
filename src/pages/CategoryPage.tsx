import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { CATEGORY_BY_SLUG, productsInCategory, groupByCategory } from "@/data/categories";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const cat = category ? CATEGORY_BY_SLUG[category] : undefined;

  if (!cat) return <Navigate to="/products" replace />;

  const items = productsInCategory(cat.slug);
  const otherCats = groupByCategory().filter((g) => g.slug !== cat.slug);

  return (
    <PageTransition>
      <SEO
        title={`${cat.name} — Industrial Fasteners | M.I. Engineering Works`}
        description={`${cat.description} Manufactured by M.I. Engineering Works, Mumbai.`}
        keywords={[cat.name.toLowerCase(), `${cat.name.toLowerCase()} manufacturer`, "industrial fasteners", "M.I. Engineering Works"]}
        path={`/products/category/${cat.slug}`}
      />
      <Header />
      <main className="bg-background">
        {/* Hero header — matches existing dark/gold theme */}
        <section className="bg-gradient-dark border-b border-primary/10 py-16 md:py-20">
          <div className="container">
            <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
              <span>/</span>
              <span className="text-primary">{cat.name}</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              <span className="text-gradient-gold">{cat.name}</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base md:text-lg">{cat.description}</p>
            <div className="gold-divider w-24 mt-6" />
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-6">
              {items.length} product{items.length === 1 ? "" : "s"} in this category
            </p>
          </div>
        </section>

        {/* Product grid — same card style as ProductsSection */}
        <section className="py-14 md:py-20">
          <div className="container">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products in this category yet.</p>
                <Link to="/products" className="inline-block mt-6 text-sm font-semibold text-primary hover:underline" data-testid="link-back-to-products">
                  ← Browse all products
                </Link>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {items.map((p) => (
                  <motion.div key={p.slug} variants={itemVariants}>
                    <Link
                      to={`/product/${p.slug}`}
                      data-testid={`card-product-${p.slug}`}
                      className="group block bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-elegant hover:shadow-gold"
                    >
                      <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
                        <img
                          src={p.img}
                          alt={`${p.name} — ${cat.name}`}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 text-center border-t border-border">
                        <h3 className="font-heading text-sm md:text-base font-semibold text-foreground">{p.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{p.standard}</p>
                        <span className="inline-block mt-2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Other categories — quick navigation */}
        {otherCats.length > 0 && (
          <section className="border-t border-border py-12 bg-secondary/10">
            <div className="container">
              <h2 className="font-heading text-lg font-bold text-center mb-6">
                Browse <span className="text-gradient-gold">other categories</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {otherCats.map((g) => (
                  <Link
                    key={g.slug}
                    to={`/products/category/${g.slug}`}
                    data-testid={`link-other-category-${g.slug}`}
                    className="px-5 py-2 rounded-full border border-border hover:border-primary hover:text-primary text-sm transition-colors"
                  >
                    {g.name} <span className="text-[10px] opacity-60">({g.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </PageTransition>
  );
}
