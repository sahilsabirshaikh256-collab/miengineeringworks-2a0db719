import { motion } from "framer-motion";
import heroImg from "@/assets/hero-fasteners.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* BG image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Premium fasteners by M.I. Engineering Works" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-dark opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <div className="gold-divider w-20 mb-6" />
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            ASTM A193 Grade B7 <span className="text-gradient-gold">Fasteners</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gold-light/80 max-w-2xl leading-relaxed">
            M.I. Engineering Works is a trusted manufacturer and supplier of high-tensile alloy steel fasteners for high-temperature and high-pressure service applications.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#products" className="inline-flex items-center px-8 py-3.5 bg-gradient-gold text-charcoal font-semibold rounded-sm hover:opacity-90 transition-opacity shadow-gold">
              View Products
            </a>
            <a href="#contact" className="inline-flex items-center px-8 py-3.5 border-2 border-gold/50 text-gold-light font-semibold rounded-sm hover:bg-gold/10 transition-colors">
              Get a Quote
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
