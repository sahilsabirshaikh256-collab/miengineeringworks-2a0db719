import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet-async";

const ApplicationsPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Industrial Fastener Applications & Industries | M.I. Engineering Works Mumbai</title>
        <meta name="description" content="ASTM A193 Grade B7 fastener applications across 12+ industries — Oil & Gas, Petrochemical, Power Generation, Construction, Marine, Aerospace & more. M.I. Engineering Works Mumbai." />
        <meta name="keywords" content="ASTM A193 B7 applications, industrial fasteners, oil gas fasteners, petrochemical bolts, power generation fasteners, construction bolts, marine fasteners, aerospace bolts, M.I. Engineering Works" />
        <link rel="canonical" href="https://miengineeringworks.lovable.app/applications" />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="container relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Industries We Serve</span>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mt-3 text-primary-foreground">
              Applications & <span className="text-gradient-gold">Industries</span>
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-2xl mx-auto">
              Our ASTM A193 Grade B7 fasteners serve critical applications across 12+ industries worldwide — from oil rigs to aerospace launch pads.
            </p>
            <motion.div className="gold-divider w-24 mx-auto mt-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={`/industry/${industry.slug}`}
                  className="group block relative rounded-xl overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-500 aspect-[4/3]"
                >
                  <img
                    src={industry.image}
                    alt={`${industry.name} - ASTM A193 B7 Fasteners`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  {/* Glassmorphism overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="backdrop-blur-sm bg-black/20 rounded-lg p-4 border border-white/10">
                      <h3 className="font-heading text-white text-lg font-bold">{industry.name}</h3>
                      <p className="text-white/60 text-xs mt-1 line-clamp-2">{industry.description}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default ApplicationsPage;
