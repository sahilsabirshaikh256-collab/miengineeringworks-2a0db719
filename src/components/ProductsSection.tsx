import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Our Products</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            ASTM A193 Grade B7 <span className="text-gradient-gold">Fasteners</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                to={`/product/${p.slug}`}
                className="group block bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-elegant hover:shadow-gold"
              >
                <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" width={512} height={512} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4 text-center border-t border-border">
                  <h3 className="font-heading text-sm md:text-base font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.standard}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
