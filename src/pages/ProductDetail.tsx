import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";
import { getProductBySlug, products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-xl border border-border shadow-elegant overflow-hidden"
            >
              <div className="aspect-square flex items-center justify-center p-8 bg-secondary/20">
                <img
                  src={product.img}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-2">
                ASTM A193 Grade B7
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-2 font-medium">{product.standard}</p>
              <div className="gold-divider w-16 my-4" />
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {/* Quick Specs */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Sizes:</span>
                  <span className="text-sm text-muted-foreground">{product.sizes}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Threads:</span>
                  <span className="text-sm text-muted-foreground">{product.threads}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Length:</span>
                  <span className="text-sm text-muted-foreground">{product.length}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-foreground min-w-[80px]">Material:</span>
                  <span className="text-sm text-muted-foreground">{product.material}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:9819972301"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-gold"
                >
                  <Phone className="w-4 h-4" /> Call for Quote
                </a>
                <a
                  href="mailto:mienginering17@gmail.com"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email Enquiry
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dimensions Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border border-border shadow-elegant p-6"
            >
              <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                📐 Dimensions & Properties
              </h2>
              <div className="space-y-3">
                {product.dimensions.map((d) => (
                  <div key={d.label} className="flex justify-between items-center border-b border-border pb-2 last:border-0">
                    <span className="text-sm text-muted-foreground">{d.label}</span>
                    <span className="text-sm font-semibold text-foreground">{d.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Available Grades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border shadow-elegant p-6"
            >
              <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                🏷️ Available Grades
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {product.grades.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <h3 className="font-heading text-sm font-bold text-foreground mb-3">Surface Finish</h3>
              <ul className="space-y-2">
                {product.finish.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border shadow-elegant p-6"
            >
              <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                🏭 Applications
              </h2>
              <ul className="space-y-3">
                {product.applications.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Related <span className="text-gradient-gold">Products</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link
                key={p.slug}
                to={`/product/${p.slug}`}
                className="group bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-elegant hover:shadow-gold"
              >
                <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={256}
                    height={256}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 text-center border-t border-border">
                  <h3 className="font-heading text-sm font-semibold text-foreground">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
