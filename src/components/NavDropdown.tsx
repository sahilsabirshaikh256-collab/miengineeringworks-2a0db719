import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export interface NavDropdownItem {
  slug: string;
  name: string;
  caption?: string;
}

interface Props {
  label: string;
  rootPath: string;       // e.g. "/standards"
  itemPathPrefix: string; // e.g. "/standards/" — final path = `${itemPathPrefix}${slug}`
  items: NavDropdownItem[];
  active: boolean;
  testId?: string;
  onItemClick?: () => void;
  /** When true, shows items in a 2-col grid; otherwise single column. */
  multiColumn?: boolean;
  /** Cap how many items are rendered before "View all". */
  maxItems?: number;
}

/**
 * Hover-activated mega-menu dropdown used by Header for
 * "Standards" and "Applications" navigation entries.
 */
const NavDropdown = ({
  label,
  rootPath,
  itemPathPrefix,
  items,
  active,
  testId,
  onItemClick,
  multiColumn = false,
  maxItems = 16,
}: Props) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const visible = items.slice(0, maxItems);
  const hasMore = items.length > maxItems;

  return (
    <div
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <Link
        to={rootPath}
        onClick={() => { setOpen(false); onItemClick?.(); }}
        data-testid={testId ?? `nav-${label.toLowerCase()}`}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
      >
        {label} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && visible.length > 0 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-40"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          data-testid={`dropdown-${label.toLowerCase()}`}
        >
          <div className={`bg-card border border-primary/15 rounded-lg shadow-elegant overflow-hidden ${multiColumn ? "w-[640px]" : "w-[320px]"} max-w-[92vw]`}>
            <ul className={`p-2 ${multiColumn ? "grid grid-cols-2 gap-x-2" : ""}`}>
              {visible.map((it) => (
                <li key={it.slug}>
                  <Link
                    to={`${itemPathPrefix}${it.slug}`}
                    onClick={() => { setOpen(false); onItemClick?.(); }}
                    data-testid={`link-${label.toLowerCase()}-${it.slug}`}
                    className="block px-3 py-2 rounded-md hover:bg-secondary/60 transition-colors group"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary">{it.name}</div>
                    {it.caption && (
                      <div className="text-[11px] text-muted-foreground line-clamp-1">{it.caption}</div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-border/60 bg-secondary/20 px-4 py-2.5 text-right">
              <Link
                to={rootPath}
                onClick={() => { setOpen(false); onItemClick?.(); }}
                className="text-xs font-semibold text-primary hover:underline"
                data-testid={`link-all-${label.toLowerCase()}`}
              >
                {hasMore ? `View all ${items.length} ${label.toLowerCase()} →` : `Browse ${label.toLowerCase()} →`}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
