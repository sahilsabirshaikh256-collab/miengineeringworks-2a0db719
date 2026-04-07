import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-sm font-semibold tracking-[0.3em] uppercase text-primary inline-block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Products
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            ASTM A193 Grade B7 <span className="text-gradient-gold">Fasteners</span>
          </h2>
          <motion.div
            className="gold-divider w-24 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products.map((p) => (
            <motion.div key={p.slug} variants={itemVariants}>
              <Link
                to={`/product/${p.slug}`}
                className="group block bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-elegant hover:shadow-gold"
              >
                <motion.div
                  className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden"
                  whileHover={{ backgroundColor: "hsl(40 30% 94%)" }}
                >
                  <motion.img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.12, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                </motion.div>
                <div className="p-4 text-center border-t border-border">
                  <h3 className="font-heading text-sm md:text-base font-semibold text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.standard}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
