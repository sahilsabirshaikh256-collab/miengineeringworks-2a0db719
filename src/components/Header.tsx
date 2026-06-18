import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, Phone, Mail, Search, ChevronDown, ChevronRight } from "lucide-react";
import SearchDialog from "@/components/SearchDialog";
import ProductsMegaMenu, { MENU } from "@/components/ProductsMegaMenu";
import NavDropdown, { type NavDropdownItem } from "@/components/NavDropdown";
import { useSiteContent } from "@/hooks/useSiteContent";
import { standardsData, industriesData } from "@/data/staticData";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Standards", href: "/standards" },
  { label: "Specifications", href: "/specifications" },
  { label: "Grade Chart", href: "/grade-chart" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMobileCat, setOpenMobileCat] = useState<string | null>(null);
  const location = useLocation();
  const { content } = useSiteContent();
  const brandName = (content["brand.name"] || "M.I. Engineering Works").trim();
  const brandTagline = (content["brand.tagline"] || "Premium Fastener Solutions").trim();
  const brandLogo = (content["brand.logo"] || "/mi-logo.png").trim();
  const contactEmail = (content["contact.email"] || "miengineering17@gmail.com").trim();
  const contactPhone1 = (content["contact.phone1"] || "+91 98199 72301").trim();
  const contactPhone2 = (content["contact.phone2"] || "").trim();

  const standardItems: NavDropdownItem[] = standardsData.map((s) => ({
    slug: s.slug,
    name: `${s.code} — ${s.name}`,
    caption: s.region,
  }));
  const industryItems: NavDropdownItem[] = industriesData.map((i) => ({
    slug: i.slug,
    name: i.name,
    caption: i.description?.slice(0, 70),
  }));

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

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileCat(null);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-dark text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${contactEmail}`} className="flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors">
              <Mail className="w-3.5 h-3.5" /> {contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${contactPhone1.replace(/\s|\+/g, "")}`} className="flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5" /> {contactPhone1}
            </a>
            {contactPhone2 && (<>
              <span className="text-muted-foreground">|</span>
              <a href={`tel:${contactPhone2.replace(/\s|\+/g, "")}`} className="flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors">
                <Phone className="w-3.5 h-3.5" /> {contactPhone2}
              </a>
            </>)}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 glass-nav"
        style={{ background: "rgba(6,2,14,0.97)", borderBottom: "1px solid rgba(138,43,226,0.2)", boxShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>
        <div className="container flex items-center justify-between gap-4 h-16 md:h-20">
          <a
            href="/"
            onClick={handleLogoClick}
            data-testid="link-logo-home"
            className="flex items-center gap-3 leading-tight group flex-shrink-0 cursor-pointer"
          >
            <span className="flex flex-col">
              <span className="font-heading text-sm md:text-base font-bold text-gradient-gold">{brandName}</span>
              <span className="text-[8px] md:text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{brandTagline}</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {navLinks.map((l) => {
              if (l.label === "Products") {
                return (
                  <ProductsMegaMenu
                    key={l.label}
                    active={isActive(l)}
                    onItemClick={closeMobile}
                  />
                );
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
                    onItemClick={closeMobile}
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
                    onItemClick={closeMobile}
                  />
                );
              }
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={closeMobile}
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
            <button onClick={() => setSearchOpen(true)} data-testid="button-search-mobile" aria-label="Search" className="md:hidden p-2 text-foreground"><Search className="w-5 h-5" /></button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground p-2" data-testid="button-menu-mobile" aria-label="Menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ─────────────────────────────────────────────── */}
        {mobileOpen && (
          <nav className="lg:hidden bg-card border-t border-primary/20 pb-4 max-h-[85vh] overflow-y-auto">
            {navLinks.map((l) => {
              if (l.label === "Products") {
                return (
                  <div key="products">
                    <div className="flex items-center justify-between px-6 py-3 border-b border-border/30">
                      <Link
                        to="/products"
                        onClick={closeMobile}
                        className="text-foreground/80 hover:text-primary transition-colors font-medium"
                      >
                        Products
                      </Link>
                      <button
                        onClick={() => setOpenMobileCat(openMobileCat === "__categories" ? null : "__categories")}
                        aria-label="Expand products"
                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openMobileCat === "__categories" ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {openMobileCat === "__categories" && (
                      <div className="bg-secondary/10">
                        {MENU.map((cat) => (
                          <div key={cat.category}>
                            <button
                              onClick={() => setOpenMobileCat(openMobileCat === cat.category ? "__categories" : cat.category)}
                              className={`w-full flex items-center justify-between px-8 py-2.5 text-sm font-semibold transition-colors ${openMobileCat === cat.category ? "text-primary bg-primary/5" : "text-foreground/70 hover:text-primary"}`}
                            >
                              <span>{cat.category}</span>
                              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${openMobileCat === cat.category ? "rotate-90 text-primary" : "text-muted-foreground/50"}`} />
                            </button>

                            {openMobileCat === cat.category && (
                              <div className="bg-secondary/20 pl-10 pr-6 py-2 space-y-1">
                                {cat.products.map((p) => (
                                  <Link
                                    key={p.slug}
                                    to={`/product/${p.slug}`}
                                    onClick={closeMobile}
                                    className="flex items-center gap-2 py-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                                    {p.name}
                                  </Link>
                                ))}
                                <Link
                                  to={`/products/category/${cat.categorySlug}`}
                                  onClick={closeMobile}
                                  className="block pt-1 pb-0.5 text-xs font-semibold text-primary hover:underline"
                                >
                                  All {cat.category} products →
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={closeMobile}
                  className="block px-6 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors border-b border-border/20"
                >
                  {l.label}
                </Link>
              );
            })}

            {/* Bottom contact info */}
            <div className="px-6 pt-4 space-y-2 text-sm border-t border-border/30 mt-2">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-primary">
                <Mail className="w-4 h-4" /> {contactEmail}
              </a>
              <a href={`tel:${contactPhone1.replace(/\s|\+/g, "")}`} className="flex items-center gap-2 text-primary">
                <Phone className="w-4 h-4" /> {contactPhone1}
              </a>
            </div>
          </nav>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
