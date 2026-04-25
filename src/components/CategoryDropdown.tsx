import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { groupByCategory } from "@/data/categories";

interface CategoryDropdownProps {
  active: boolean;
  onItemClick?: () => void;
}

const CategoryDropdown = ({ active, onItemClick }: CategoryDropdownProps) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const groups = groupByCategory();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <Link
        to="/products"
        onClick={() => { setOpen(false); onItemClick?.(); }}
        data-testid="nav-products"
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
      >
        Products <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && groups.length > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-40"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          data-testid="dropdown-categories"
        >
          <div className="bg-card border border-primary/15 rounded-lg shadow-elegant overflow-hidden w-[640px] max-w-[92vw]">
            <div className="grid grid-cols-2 gap-0 divide-x divide-border/60">
              {groups.map((g) => (
                <div key={g.slug} className="p-4">
                  <Link
                    to={`/products/category/${g.slug}`}
                    onClick={() => { setOpen(false); onItemClick?.(); }}
                    data-testid={`link-category-${g.slug}`}
                    className="flex items-center justify-between mb-3 group"
                  >
                    <span className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gradient-gold">
                      {g.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                      View all ({g.count}) →
                    </span>
                  </Link>
                  <ul className="space-y-1.5">
                    {g.products.slice(0, 4).map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/product/${p.slug}`}
                          onClick={() => { setOpen(false); onItemClick?.(); }}
                          data-testid={`link-product-${p.slug}`}
                          className="flex items-center gap-2.5 text-xs text-foreground/75 hover:text-primary transition-colors py-1"
                        >
                          <span className="w-7 h-7 flex-shrink-0 rounded bg-secondary/40 border border-border/60 overflow-hidden flex items-center justify-center">
                            <img
                              src={p.img}
                              alt=""
                              loading="lazy"
                              className="w-full h-full object-contain"
                            />
                          </span>
                          <span className="truncate">{p.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-border/60 bg-secondary/20 px-4 py-2.5 text-right">
              <Link
                to="/products"
                onClick={() => { setOpen(false); onItemClick?.(); }}
                className="text-xs font-semibold text-primary hover:underline"
                data-testid="link-all-products"
              >
                Browse all products →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
