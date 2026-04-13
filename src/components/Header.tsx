import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "Applications", href: "/applications" },
  { label: "Specifications", href: "/specifications" },
  { label: "Grade Chart", href: "/grade-chart" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // For standalone pages, use normal navigation
    if (!href.startsWith("/#")) return;
    
    e.preventDefault();
    const [, hash] = href.split("#");
    if (location.pathname !== "/") {
      navigate("/" + (hash ? `#${hash}` : ""));
    } else if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === `#${href.split("#")[1]}`;
    return location.pathname === href;
  };

  return (
    <>
      {/* Top bar */}
      <motion.div
        className="bg-gradient-dark text-primary-foreground py-2 text-sm hidden md:block"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:mienginering17@gmail.com" className="flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors">
              <Mail className="w-3.5 h-3.5" /> mienginering17@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:9819972301" className="flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5" /> +91 98199 72301
            </a>
            <span className="text-muted-foreground">|</span>
            <a href="tel:9137658733" className="flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5" /> +91 91376 58733
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main nav */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-primary/10 shadow-elegant"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex flex-col leading-tight group">
            <motion.span
              className="font-heading text-xl md:text-2xl font-bold text-gradient-gold"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              M.I. Engineering Works
            </motion.span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">Premium Fastener Solutions</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                {l.href.startsWith("/#") ? (
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all ${isActive(l.href) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all ${isActive(l.href) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                  >
                    {l.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="md:hidden backdrop-blur-xl bg-card/95 border-t border-border pb-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {navLinks.map((l, i) => (
                l.href.startsWith("/#") ? (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => { handleNavClick(e, l.href); setMobileOpen(false); }}
                    className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {l.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              ))}
              <motion.div
                className="px-6 pt-3 space-y-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <a href="mailto:mienginering17@gmail.com" className="flex items-center gap-2 text-primary"><Mail className="w-4 h-4" /> mienginering17@gmail.com</a>
                <a href="tel:9819972301" className="flex items-center gap-2 text-primary"><Phone className="w-4 h-4" /> +91 98199 72301</a>
                <a href="tel:9137658733" className="flex items-center gap-2 text-primary"><Phone className="w-4 h-4" /> +91 91376 58733</a>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
