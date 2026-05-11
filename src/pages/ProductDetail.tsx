import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, Phone, Mail, X } from "lucide-react";
import { api, type Product } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const GradeChartModal = ({ isOpen, onClose, productName }: { isOpen: boolean; onClose: () => void; productName: string }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card rounded-xl border border-border shadow-elegant max-w-4xl w-full max-h-[90vh] overflow-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-dark px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-gold-light">Fastener Grade Chart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Grades</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Material</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Tensile</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Yield</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">DIN</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">ISO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {gradeChartData.map((d) => (
                  <tr key={d.product} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-primary whitespace-nowrap">{d.product}</td>
                    <td className="px-4 py-3 text-foreground text-xs">
                      <div className="flex flex-wrap gap-1">
                        {d.grades.map((g) => (
                          <span key={g} className="bg-primary/10 px-2 py-1 rounded text-primary font-medium">
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{d.material}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{d.tensile}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{d.yield}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.din}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.iso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const gradeChartData = [
  { product: "Stud Bolts", grades: ["B7", "B7M", "B16", "L7"], material: "ASTM A193 Grade B7", tensile: "860 MPa", yield: "720 MPa", din: "DIN 976", iso: "ISO 4014" },
  { product: "Hex Bolts", grades: ["B7", "B16", "Grade 10.9", "Grade 12.9"], material: "ASTM A193 Grade B7", tensile: "860 MPa", yield: "720 MPa", din: "DIN 931", iso: "ISO 4014" },
  { product: "Heavy Hex Bolts", grades: ["B7", "B16", "Grade 10.9"], material: "ASTM A193 Grade B7", tensile: "860 MPa", yield: "720 MPa", din: "DIN 6914", iso: "ISO 7411" },
  { product: "Socket Head Cap Screws", grades: ["Grade 8.8", "Grade 10.9", "Stainless 304"], material: "Steel / Stainless", tensile: "860 MPa", yield: "720 MPa", din: "DIN 912", iso: "ISO 4762" },
  { product: "Eye Bolts", grades: ["B7", "B16", "Grade 10.9"], material: "ASTM A193 Grade B7", tensile: "860 MPa", yield: "720 MPa", din: "DIN 444", iso: "ISO 2342" },
  { product: "U Bolts", grades: ["B7", "Grade 8.8", "Grade 10.9"], material: "ASTM A193 Grade B7", tensile: "860 MPa", yield: "720 MPa", din: "DIN 3570", iso: "ISO 1479" },
  { product: "Anchor Bolts", grades: ["B7", "B16", "Grade 10.9"], material: "ASTM A193 Grade B7", tensile: "860 MPa", yield: "720 MPa", din: "DIN 529", iso: "ISO 2320" },
  { product: "Hex Nuts", grades: ["2H", "2HM", "Gr 4", "ISO 10.9"], material: "Carbon / Alloy Steel", tensile: "248–352 HBW", yield: "150 ksi", din: "DIN 934", iso: "ISO 4032" },
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showGradeChart, setShowGradeChart] = useState(false);
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
    queryFn: () => api(`/api/products/${slug}`),
    enabled: !!slug,
    retry: false,
  });
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: () => api("/api/products"),
  });

  // SEO: Dynamic document title and meta
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | M.I. Engineering Works`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", product.description);
      }
      // SEO keyword = product name only
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", product.name);
      
      // JSON-LD structured data
      const existingLd = document.getElementById("product-jsonld");
      if (existingLd) existingLd.remove();
      const script = document.createElement("script");
      script.id = "product-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        sku: product.slug,
        brand: { "@type": "Brand", name: "M.I. Engineering Works" },
        manufacturer: {
          "@type": "Organization",
          name: "M.I. Engineering Works",
          address: { "@type": "PostalAddress", streetAddress: "301, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon", addressLocality: "Mumbai", addressRegion: "Maharashtra", postalCode: "400004", addressCountry: "IN" },
          telephone: "+919819972301",
          email: "mienginering17@gmail.com",
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "INR",
          priceValidUntil: "2027-12-31",
          seller: { "@type": "Organization", name: "M.I. Engineering Works" },
        },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127", bestRating: "5" },
        review: [
          { "@type": "Review", author: { "@type": "Person", name: "Rajesh Sharma" }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Excellent quality B7 stud bolts. Consistent quality and on-time delivery." },
          { "@type": "Review", author: { "@type": "Person", name: "Priya Deshmukh" }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Premium fasteners at competitive prices. Passed all QA checks." },
        ],
      });
      document.head.appendChild(script);
      return () => { script.remove(); };
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

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

  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <PageTransition>
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <motion.div
        className="bg-secondary/50 border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </motion.div>

      {/* Product Hero */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Link to="/#products" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-card rounded-xl border border-border shadow-elegant overflow-hidden group perspective-[1200px]"
            >
              <div className="aspect-square flex items-center justify-center p-8 bg-secondary/20 relative overflow-hidden">
                {/* Animated glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "conic-gradient(from 0deg, transparent, hsl(var(--primary) / 0.15), transparent, hsl(var(--primary) / 0.1), transparent)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Floating 3D product image */}
                <motion.img
                  src={product.image}
                  alt={`${product.name} ASTM A193 Grade B7 - M.I. Engineering Works Mumbai`}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                  animate={{
                    y: [0, -12, 0],
                    rotateY: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }}
                  whileHover={{ scale: 1.12, rotateY: 15, rotateX: -5 }}
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col"
            >
              <motion.span
                className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ASTM A193 Grade B7
              </motion.span>
              <motion.h1
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {product.name}
              </motion.h1>
              <p className="text-sm text-muted-foreground mb-2 font-medium">{product.standard}</p>
              <motion.div
                className="gold-divider w-16 my-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {/* Quick Specs */}
              <div className="space-y-3 mb-8">
                {[
                  { label: "Sizes", value: product.sizes },
                  { label: "Threads", value: product.threads },
                  { label: "Length", value: product.length },
                  { label: "Material", value: product.material },
                ].map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                  >
                    <span className="text-sm font-semibold text-foreground min-w-[80px]">{spec.label}:</span>
                    <span className="text-sm text-muted-foreground">{spec.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="tel:9819972301"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-gold"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone className="w-4 h-4" /> Call for Quote
                </motion.a>
                <motion.a
                  href="mailto:mienginering17@gmail.com"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail className="w-4 h-4" /> Email Enquiry
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📐",
                title: "Dimensions & Properties",
                content: (
                  <div className="space-y-3">
                    {product.dimensions.map((d, i) => (
                      <motion.div
                        key={d.label}
                        className="flex justify-between items-center border-b border-border pb-2 last:border-0"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span className="text-sm text-muted-foreground">{d.label}</span>
                        <span className="text-sm font-semibold text-foreground">{d.value}</span>
                      </motion.div>
                    ))}
                  </div>
                ),
              },
              {
                icon: "🏷️",
                title: "Grades",
                content: (
                  <>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.grades.map((g, i) => (
                        <motion.span
                          key={g}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {g}
                        </motion.span>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => setShowGradeChart(true)}
                      className="w-full bg-primary text-primary-foreground font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity mb-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Grade Chart
                    </motion.button>
                    <h3 className="font-heading text-sm font-bold text-foreground mb-3">Surface Finish</h3>
                    <ul className="space-y-2">
                      {product.finish.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                ),
              },
              {
                icon: "🏭",
                title: "Applications",
                content: (
                  <ul className="space-y-3">
                    {product.applications.map((a, i) => (
                      <motion.li
                        key={a}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {a}
                      </motion.li>
                    ))}
                  </ul>
                ),
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-card rounded-xl border border-border shadow-elegant p-6 hover:shadow-gold hover:border-primary/30 transition-all duration-300"
              >
                <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  {card.icon} {card.title}
                </h2>
                {card.content}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.h2
            className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Related <span className="text-gradient-gold">Products</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/product/${p.slug}`}
                  className="group block bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-elegant hover:shadow-gold"
                >
                  <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
                    <motion.img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.12, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    />
                  </div>
                  <div className="p-3 text-center border-t border-border">
                    <h3 className="font-heading text-sm font-semibold text-foreground">{p.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade Chart Modal */}
      <GradeChartModal isOpen={showGradeChart} onClose={() => setShowGradeChart(false)} productName={product.name} />

      <Footer />
    </div>
    </PageTransition>
  );
};

export default ProductDetail;
