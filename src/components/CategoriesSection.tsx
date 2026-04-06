import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wrench,
  CircleDot,
  Hammer,
  Shield,
  Cog,
  Factory,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Stud Bolts & Studs",
    description: "ASTM A193 B7, B16, L7 stud bolts & double end studs for flange connections",
    icon: Wrench,
    slugs: ["stud-bolts", "double-end-studs"],
  },
  {
    title: "Hex & Heavy Hex Bolts",
    description: "High-strength hex bolts & heavy hex bolts for structural & petrochemical use",
    icon: Hammer,
    slugs: ["hex-bolts", "heavy-hex-bolts"],
  },
  {
    title: "Socket Head Fasteners",
    description: "Socket head cap screws, countersunk screws & socket set screws",
    icon: Cog,
    slugs: ["socket-head-cap-screws", "countersunk-screws", "socket-set-screws"],
  },
  {
    title: "Specialty Bolts",
    description: "Eye bolts, U-bolts & anchor bolts for heavy-duty industrial applications",
    icon: CircleDot,
    slugs: ["eye-bolts", "u-bolts", "anchor-bolts"],
  },
  {
    title: "Threaded Products",
    description: "Precision threaded rods & round bars in all grades and finishes",
    icon: Factory,
    slugs: ["threaded-rods", "round-bar"],
  },
  {
    title: "All Grades Available",
    description: "B7, B8, B8M, B16, L7, 660, Inconel, Monel, Hastelloy, Duplex & more",
    icon: Shield,
    slugs: [],
  },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Fastener <span className="text-gradient-gold">Categories</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We manufacture & supply a comprehensive range of high-strength fasteners for
            petrochemical, oil & gas, power, and heavy engineering industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group bg-card rounded-xl border border-border hover:border-primary/40 transition-all duration-300 p-6 shadow-elegant hover:shadow-gold"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  {cat.slugs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cat.slugs.map((slug) => (
                        <Link
                          key={slug}
                          to={`/product/${slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                          View <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                  {cat.slugs.length === 0 && (
                    <Link
                      to="/#grade-chart"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      View Grade Chart <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
