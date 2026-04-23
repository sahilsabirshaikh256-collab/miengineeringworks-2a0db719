import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Search, Download } from "lucide-react";
import SearchDialog from "@/components/SearchDialog";

const navLinks = [
  { label: "Home", section: "home", href: "/" },
  { label: "Products", section: "products", href: "/" },
  { label: "Applications", href: "/applications" },
  { label: "Standards", href: "/standards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Specifications", href: "/specifications" },
  { label: "Grade Chart", href: "/grade-chart" },
  { label: "Contact", section: "contact", href: "/" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth scroll without modifying URL hash
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[number]) => {
    setMobileOpen(false);
    if (!link.section) return;
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(link.section!), 80);
    } else {
      scrollToSection(link.section);
    }
  };

  const isActive = (link: typeof navLinks[number]) => {
    if (link.section) return false;
    return location.pathname === link.href;
  };

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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-primary/10 shadow-elegant">
        <div className="container flex items-center justify-between gap-4 h-16 md:h-20">
          <Link to="/" className="flex flex-col leading-tight group flex-shrink-0">
            <span className="font-heading text-xl md:text-2xl font-bold text-gradient-gold">M.I. Engineering Works</span>
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">Premium Fastener Solutions</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((l) => (
              <div key={l.label}>
                {l.section ? (
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l)}
                    data-testid={`nav-${l.label.toLowerCase()}`}
                    className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary cursor-pointer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.href}
                    onClick={() => setMobileOpen(false)}
                    data-testid={`nav-${l.label.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors ${isActive(l) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                  >
                    {l.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              data-testid="button-search"
              aria-label="Search"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition"
            >
              <Search className="w-4 h-4" /> <span className="hidden xl:inline">Search</span>
            </button>
            <a
              href="/api/catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-download-catalog"
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-gold text-charcoal text-sm font-semibold hover:opacity-90 transition"
            >
              <Download className="w-4 h-4" /> <span className="hidden xl:inline">Catalog</span>
            </a>

            {/* Mobile actions */}
            <button onClick={() => setSearchOpen(true)} data-testid="button-search-mobile" aria-label="Search" className="md:hidden p-2 text-foreground"><Search className="w-5 h-5" /></button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground p-2" data-testid="button-menu-mobile" aria-label="Menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden backdrop-blur-xl bg-card/95 border-t border-border pb-4">
            {navLinks.map((l) => (
              l.section ? (
                <a key={l.label} href={l.href} onClick={(e) => handleNavClick(e, l)} className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors">{l.label}</a>
              ) : (
                <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors">{l.label}</Link>
              )
            ))}
            <div className="px-6 pt-3 space-y-2 text-sm">
              <a href="/api/catalog.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-gold text-charcoal font-semibold">
                <Download className="w-4 h-4" /> Download Catalog
              </a>
              <a href="mailto:mienginering17@gmail.com" className="flex items-center gap-2 text-primary"><Mail className="w-4 h-4" /> mienginering17@gmail.com</a>
              <a href="tel:9819972301" className="flex items-center gap-2 text-primary"><Phone className="w-4 h-4" /> +91 98199 72301</a>
            </div>
          </nav>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
