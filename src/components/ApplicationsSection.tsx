import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { industries } from "@/data/industries";
import { ArrowRight } from "lucide-react";

const ApplicationsSection = () => {
  return (
    <section id="applications" className="py-20 md:py-28 bg-secondary/20">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="text-sm font-semibold tracking-[0.3em] uppercase text-primary inline-block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Industries Served
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Applications & <span className="text-gradient-gold">Industries</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Our ASTM A193 Grade B7 fasteners serve critical applications across 12+ industries worldwide
          </p>
          <motion.div
            className="gold-divider w-24 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.slug}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
              }}
            >
              <Link
                to={`/industry/${industry.slug}`}
                className="group block relative rounded-lg overflow-hidden shadow-md hover:shadow-gold transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={industry.image}
                  alt={`${industry.name} - ASTM A193 B7 Fasteners Application`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="font-heading text-white text-xs md:text-sm font-semibold leading-tight">
                    {industry.name}
                  </h3>
                  <motion.span
                    className="inline-flex items-center gap-1 text-primary text-[10px] md:text-xs font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Explore <ArrowRight className="w-3 h-3" />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
