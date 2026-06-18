import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Globe2, Layers, Award } from "lucide-react";
import { industriesData } from "@/data/staticData";
import { resolveImage } from "@/utils/resolveImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const ApplicationsPage = () => {
  const industries = industriesData;

  return (
    <PageTransition>
      <SEO
        title="Applications & Industries — Global Engineering Solutions"
        description="Precision-engineered fastening solutions for the world's most demanding environments. M.I. Engineering Works supplies ASTM A193 Grade B7 fasteners to 50+ industries."
        keywords={["fasteners for oil and gas", "fasteners for aerospace", "fasteners for power plants", "fasteners for construction", "industrial fasteners applications"]}
        path="/applications"
      />

      <Header />

      <section className="relative bg-gradient-dark py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(138,43,226,0.18), transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(180,100,255,0.1), transparent 60%)" }} />
        <div className="container relative z-10 text-center text-primary-foreground">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary inline-block">Global Engineering Solutions</span>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mt-3">Applications</h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-primary-foreground/80 mt-5">
            Precision-engineered fastening solutions designed for the world's most demanding environments. From deep-sea extraction to power generation, we secure the future of global industry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a href="#industries" className="px-6 py-3 rounded-md bg-gradient-gold text-charcoal font-semibold hover:opacity-90 transition">Explore Industries</a>
            <Link to="/standards" className="px-6 py-3 rounded-md border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-charcoal transition">Explore Standards</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 max-w-5xl mx-auto">
            {[
              { icon: Globe2, num: "50+", title: "Global Industries", sub: "Wide Coverage" },
              { icon: ShieldCheck, num: "ISO Certified", title: "Quality", sub: "Compliance ASTM & DIN" },
              { icon: Layers, num: "20+", title: "Core Sectors", sub: "Specialized Alloys" },
              { icon: Award, num: "Doorstep", title: "Global Supply", sub: "Reliable Delivery" },
            ].map(({ icon: Icon, num, title, sub }) => (
              <div key={title} className="glass rounded-xl p-5 text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-heading text-2xl font-bold text-primary">{num}</div>
                <div className="text-sm text-primary-foreground/90 font-semibold">{title}</div>
                <div className="text-xs text-primary-foreground/60">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Industries We Serve</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Our <span className="text-gradient-gold">Applications</span>
            </h2>
            <div className="gold-divider w-24 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industry/${industry.slug}`}
                data-testid={`link-industry-${industry.slug}`}
                className="group block relative rounded-xl overflow-hidden aspect-[4/3] ring-1 ring-white/5 transition-all duration-500 hover:ring-primary/50 hover:shadow-[0_0_30px_rgba(138,43,226,0.25)] hover:-translate-y-1"
                style={{ background: "rgba(8,0,18,0.8)" }}
              >
                <img
                  src={resolveImage("industry", industry.slug, industry.image)}
                  alt={`${industry.name} - Industrial Fasteners`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-95"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                {/* Purple glass shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(138,43,226,0.12) 0%, transparent 60%)" }} />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="font-heading text-white text-xs md:text-sm font-bold leading-tight drop-shadow-md">{industry.name}</h3>
                  <span className="inline-flex items-center gap-1 text-primary text-[10px] md:text-xs font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                {/* Top specular highlight (glass edge) */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default ApplicationsPage;
