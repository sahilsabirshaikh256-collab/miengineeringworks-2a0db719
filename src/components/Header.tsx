import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/#products" },
  { label: "Specifications", href: "/#specifications" },
  { label: "Grade Chart", href: "/#grade-chart" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-dark text-primary-foreground py-2 text-sm hidden md:block">
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
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-gold/20 shadow-elegant">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="flex flex-col leading-tight">
            <span className="font-heading text-xl md:text-2xl font-bold text-gradient-gold">M.I. Engineering Works</span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">Premium Fastener Solutions</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all">
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden bg-card border-t border-border pb-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors">
                {l.label}
              </a>
            ))}
            <div className="px-6 pt-3 space-y-2 text-sm">
              <a href="mailto:mienginering17@gmail.com" className="flex items-center gap-2 text-primary"><Mail className="w-4 h-4" /> mienginering17@gmail.com</a>
              <a href="tel:9819972301" className="flex items-center gap-2 text-primary"><Phone className="w-4 h-4" /> +91 98199 72301</a>
              <a href="tel:9137658733" className="flex items-center gap-2 text-primary"><Phone className="w-4 h-4" /> +91 91376 58733</a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
