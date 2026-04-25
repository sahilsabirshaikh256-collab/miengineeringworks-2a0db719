import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Menu, X, Phone, Mail, Search, Download } from "lucide-react";
import SearchDialog from "@/components/SearchDialog";
import CategoryDropdown from "@/components/CategoryDropdown";
import NavDropdown, { type NavDropdownItem } from "@/components/NavDropdown";
import { useCategoryGroups } from "@/data/categories";
import { useSiteContent } from "@/hooks/useSiteContent";
import { api, type Industry, type Standard } from "@/lib/api";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Standards", href: "/standards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Specifications", href: "/specifications" },
  { label: "Grade Chart", href: "/grade-chart" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();
  const brandName = (content["brand.name"] || "M.I. Engineering Works").trim();
  const brandTagline = (content["brand.tagline"] || "Premium Fastener Solutions").trim();
  const brandLogo = (content["brand.logo"] || "").trim();

  const { groups: categoryGroups } = useCategoryGroups();

  // Live data for the Standards & Applications dropdowns
  const { data: industries = [] } = useQuery<Industry[]>({ queryKey: ["/api/industries"], queryFn: () => api("/api/industries") });
  const { data: standards = [] } = useQuery<Standard[]>({ queryKey: ["/api/standards"], queryFn: () => api("/api/standards") });

  const standardItems: NavDropdownItem[] = standards.map((s) => ({
    slug: s.slug,
    name: `${s.code} — ${s.name}`,
    caption: s.region,
  }));
  const industryItems: NavDropdownItem[] = industries.map((i) => ({
    slug: i.slug,
    name: i.name,
    caption: i.description?.slice(0, 70),
  }));

  // Hard reload to home so the entire app re-mounts (re-fetches site content, animations, etc.)
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.assign("/");
    }
  };

  const isActive = (link: typeof navLinks[number]) =>
    link.href === "/" ? location.pathname === "/" : location.pathname.startsWith(link.href);

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
          <a
            href="/"
            onClick={handleLogoClick}
            data-testid="link-logo-home"
            className="flex items-center gap-3 leading-tight group flex-shrink-0 cursor-pointer"
          >
            {brandLogo ? (
              <img
                src={brandLogo}
                alt={brandName}
                className="h-10 md:h-12 w-auto object-contain"
                data-testid="img-brand-logo"
              />
            ) : null}
            <span className="flex flex-col">
              <span className="font-heading text-xl md:text-2xl font-bold text-gradient-gold">{brandName}</span>
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">{brandTagline}</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map((l) => {
              if (l.label === "Products") {
                return <CategoryDropdown key={l.label} active={isActive(l)} onItemClick={() => setMobileOpen(false)} />;
              }
              if (l.label === "Standards") {
                return (
                  <NavDropdown
                    key={l.label}
                    label="Standards"
                    rootPath="/standards"
                    itemPathPrefix="/standards/"
                    items={standardItems}
                    active={isActive(l)}
                    onItemClick={() => setMobileOpen(false)}
                  />
                );
              }
              if (l.label === "Applications") {
                return (
                  <NavDropdown
                    key={l.label}
                    label="Applications"
                    rootPath="/applications"
                    itemPathPrefix="/industry/"
                    items={industryItems}
                    active={isActive(l)}
                    multiColumn
                    maxItems={20}
                    onItemClick={() => setMobileOpen(false)}
                  />
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`nav-${l.label.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${isActive(l) ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                >
                  {l.label}
                </Link>
              );
            })}
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
          <nav className="lg:hidden backdrop-blur-xl bg-card/95 border-t border-border pb-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map((l) => (
              <div key={l.label}>
                <Link
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
                >
                  {l.label}
                </Link>
                {l.label === "Products" && categoryGroups.length > 0 && (
                  <div className="pl-10 pb-2 space-y-1">
                    {categoryGroups.map((g) => (
                      <Link
                        key={g.slug}
                        to={`/products/category/${g.slug}`}
                        onClick={() => setMobileOpen(false)}
                        data-testid={`mobile-link-category-${g.slug}`}
                        className="block py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors"
                      >
                        {g.name} <span className="text-[10px] opacity-60">({g.count})</span>
                      </Link>
                    ))}
                  </div>
                )}
                {l.label === "Standards" && standardItems.length > 0 && (
                  <div className="pl-10 pb-2 space-y-1">
                    {standardItems.slice(0, 8).map((s) => (
                      <Link
                        key={s.slug}
                        to={`/standards/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        data-testid={`mobile-link-standard-${s.slug}`}
                        className="block py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
                {l.label === "Applications" && industryItems.length > 0 && (
                  <div className="pl-10 pb-2 space-y-1">
                    {industryItems.slice(0, 10).map((i) => (
                      <Link
                        key={i.slug}
                        to={`/industry/${i.slug}`}
                        onClick={() => setMobileOpen(false)}
                        data-testid={`mobile-link-industry-${i.slug}`}
                        className="block py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors"
                      >
                        {i.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
