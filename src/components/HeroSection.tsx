import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const { get } = useSiteContent();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, hsl(240,15%,3%) 0%, hsl(240,12%,6%,0.92) 50%, hsl(260,15%,5%,0.88) 100%)'}} />
      </motion.div>

      {/* Neon grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(hsl(265 90% 65% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(265 90% 65% / 0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Neon corner accent lines */}
      <div className="absolute top-0 left-0 w-64 h-px bg-gradient-to-r from-primary/80 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-64 bg-gradient-to-b from-primary/80 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-px bg-gradient-to-l from-accent/60 to-transparent" />
      <div className="absolute bottom-0 right-0 w-px h-64 bg-gradient-to-t from-accent/60 to-transparent" />

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 2) * 30}%`,
              background: i % 2 === 0 ? 'hsl(265 90% 70%)' : 'hsl(180 100% 55%)',
              boxShadow: i % 2 === 0 ? '0 0 8px hsl(265 90% 70%)' : '0 0 8px hsl(180 100% 55%)'
            }}
            animate={{ y: [0, -40, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      <motion.div className="container relative z-10 py-16 md:py-24" style={{ y: textY, opacity }}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — text */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-2xl">
            <motion.div
              className="gold-divider w-20 mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
            {get("hero.eyebrow") && (
              <div className="mb-3 text-xs font-mono font-semibold tracking-[0.4em] uppercase" style={{color: 'hsl(180 100% 60%)'}} data-testid="text-hero-eyebrow">
                &gt;_ {get("hero.eyebrow")}
              </div>
            )}
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight"
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span data-testid="text-hero-title">{get("hero.title")}</span>{get("hero.titleAccent") && " "}
              {get("hero.titleAccent") && (
                <motion.span
                  className="text-gradient-gold inline-block"
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  data-testid="text-hero-title-accent"
                >
                  {get("hero.titleAccent")}
                </motion.span>
              )}
            </motion.h1>
            <motion.p
              className="mt-6 text-base md:text-lg max-w-xl leading-relaxed"
              style={{color: 'hsl(220 20% 70%)'}}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              data-testid="text-hero-subtitle"
            >
              {get("hero.subtitle")}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {get("hero.ctaPrimaryText") && (
                <motion.a
                  href={get("hero.ctaPrimaryUrl") || "#products"}
                  className="inline-flex items-center px-7 py-3 font-semibold rounded-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg, hsl(265,90%,60%), hsl(180,100%,50%))',
                    color: 'hsl(240 15% 4%)',
                    boxShadow: '0 0 20px hsl(265 90% 65% / 0.3), 0 0 40px hsl(265 90% 65% / 0.1)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(265 90% 65% / 0.5), 0 0 60px hsl(180 100% 50% / 0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="link-hero-primary"
                >
                  {get("hero.ctaPrimaryText")}
                </motion.a>
              )}
              {/* About button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center px-7 py-3 font-semibold rounded-sm transition-all"
                  style={{
                    border: '1px solid hsl(45 95% 55% / 0.5)',
                    color: 'hsl(45 95% 65%)',
                    boxShadow: 'inset 0 0 10px hsl(45 95% 55% / 0.05)'
                  }}
                >
                  About Us
                </Link>
              </motion.div>
              {get("hero.ctaSecondaryText") && (
                <motion.a
                  href={get("hero.ctaSecondaryUrl") || "#contact"}
                  className="inline-flex items-center px-7 py-3 font-semibold rounded-sm transition-all"
                  style={{
                    border: '1px solid hsl(265 90% 65% / 0.4)',
                    color: 'hsl(265 90% 75%)',
                    boxShadow: 'inset 0 0 10px hsl(265 90% 65% / 0.05)'
                  }}
                  whileHover={{ scale: 1.05, borderColor: 'hsl(265 90% 65%)', boxShadow: '0 0 20px hsl(265 90% 65% / 0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="link-hero-secondary"
                >
                  {get("hero.ctaSecondaryText")}
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right — promotional video */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                maxWidth: 340,
                border: '1px solid hsl(265 90% 65% / 0.3)',
                boxShadow: '0 0 40px hsl(265 90% 65% / 0.15), 0 0 80px hsl(180 100% 50% / 0.08), 0 20px 60px rgba(0,0,0,0.7)'
              }}
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                background: 'linear-gradient(135deg, hsl(265 90% 65% / 0.08) 0%, transparent 60%)',
                zIndex: 1
              }} />
              <video
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block rounded-2xl"
                style={{ maxHeight: 520, objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile video — below text */}
        <motion.div
          className="mt-8 lg:hidden flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <div
            className="relative rounded-xl overflow-hidden w-full max-w-xs"
            style={{
              border: '1px solid hsl(265 90% 65% / 0.3)',
              boxShadow: '0 0 30px hsl(265 90% 65% / 0.1), 0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            <video
              src="/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block rounded-xl"
              style={{ maxHeight: 320, objectFit: 'cover' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
