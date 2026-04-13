import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { getIndustryBySlug, industries } from "@/data/industries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Helmet } from "react-helmet-async";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug || "");

  if (!industry) {
    return (
      <PageTransition>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Industry Not Found</h1>
            <Link to="/applications" className="text-primary mt-4 inline-block">← Back to Industries</Link>
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  const otherIndustries = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  return (
    <PageTransition>
      <Helmet>
        <title>{`${industry.name} Fasteners — ASTM A193 B7 | M.I. Engineering Works Mumbai`}</title>
        <meta name="description" content={`ASTM A193 Grade B7 fasteners for ${industry.name}. ${industry.description} Manufacturer & supplier in Mumbai, India. M.I. Engineering Works.`} />
        <meta name="keywords" content={`ASTM A193 B7 ${industry.name} fasteners, ${industry.name} bolts, ${industry.name} stud bolts, industrial fasteners Mumbai, M.I. Engineering Works`} />
        <link rel="canonical" href={`https://miengineeringworks.lovable.app/industry/${industry.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `${industry.name} Fasteners — ASTM A193 B7`,
          "description": industry.heroDescription,
          "publisher": { "@type": "Organization", "name": "M.I. Engineering Works" },
        })}</script>
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          src={industry.image}
          alt={`${industry.name} — ASTM A193 B7 Fasteners`}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12 md:pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/applications" className="inline-flex items-center gap-2 text-primary text-sm mb-4 hover:underline">
                <ArrowLeft className="w-4 h-4" /> All Industries
              </Link>
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white">{industry.name}</h1>
              <p className="text-white/80 mt-3 max-w-2xl text-sm md:text-base">{industry.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview with glassmorphism */}
      <section className="py-16 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
              Fastener Solutions for <span className="text-gradient-gold">{industry.name}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">{industry.heroDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Grades Table with glassmorphism */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container">
          <motion.h2
            className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Recommended <span className="text-gradient-gold">Grades & Materials</span>
          </motion.h2>
          <motion.div
            className="backdrop-blur-md bg-card/80 rounded-xl border border-border shadow-elegant overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="text-left p-3 md:p-4 font-heading text-sm font-semibold text-foreground border-b border-border">Grade</th>
                    <th className="text-left p-3 md:p-4 font-heading text-sm font-semibold text-foreground border-b border-border">Specification</th>
                    <th className="text-left p-3 md:p-4 font-heading text-sm font-semibold text-foreground border-b border-border">Typical Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {industry.grades.map((g, i) => (
                    <motion.tr
                      key={g.grade}
                      className="border-b border-border hover:bg-primary/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <td className="p-3 md:p-4 font-semibold text-primary text-sm">{g.grade}</td>
                      <td className="p-3 md:p-4 text-muted-foreground text-sm">{g.specification}</td>
                      <td className="p-3 md:p-4 text-foreground text-sm">{g.usage}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <motion.h2
            className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Key <span className="text-gradient-gold">Applications</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industry.applications.map((app, i) => (
              <motion.div
                key={app.name}
                className="group relative rounded-xl overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={app.image}
                    alt={`${app.name} — ${industry.name} ASTM A193 B7`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 backdrop-blur-sm bg-card/90 border-t border-border">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{app.name}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{app.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Requirements */}
      <section className="py-16 md:py-20 bg-secondary/20">
        <div className="container">
          <motion.h2
            className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Industry <span className="text-gradient-gold">Requirements</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {industry.keyRequirements.map((req, i) => (
              <motion.div
                key={req}
                className="flex items-start gap-3 p-4 backdrop-blur-sm bg-card/80 rounded-xl border border-border hover:border-primary/30 hover:shadow-gold transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground text-sm">{req}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            Explore Other <span className="text-gradient-gold">Industries</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherIndustries.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industry/${ind.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-elegant hover:shadow-gold transition-all duration-500"
              >
                <img src={ind.image} alt={ind.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-3">
                  <h3 className="text-white text-xs md:text-sm font-semibold">{ind.name}</h3>
                  <span className="inline-flex items-center gap-1 text-primary text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default IndustryDetail;
