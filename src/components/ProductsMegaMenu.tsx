import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MenuProduct {
  name: string;
  slug: string;
}

interface MenuCategory {
  category: string;
  categorySlug: string;
  products: MenuProduct[];
}

const MENU: MenuCategory[] = [
  {
    category: "Bolts",
    categorySlug: "bolts",
    products: [
      { name: "Hex Bolt", slug: "hex-bolts" },
      { name: "Heavy Hex Bolt", slug: "heavy-hex-bolts" },
      { name: "Carriage Bolt", slug: "carriage-bolt" },
      { name: "Eye Bolt", slug: "eye-bolts" },
      { name: "U Bolt", slug: "u-bolts" },
      { name: "J Bolt", slug: "j-bolt" },
      { name: "Foundation Bolt", slug: "foundation-bolt" },
      { name: "Anchor Bolt", slug: "anchor-bolts" },
      { name: "Allen Bolt", slug: "allen-bolt" },
      { name: "Flange Bolt", slug: "flange-bolt" },
      { name: "T Head Bolt", slug: "t-head-bolt" },
      { name: "CSK Bolt", slug: "csk-allen-bolt" },
      { name: "Square Head Bolt", slug: "square-head-bolt" },
      { name: "Step Bolt", slug: "step-bolt" },
      { name: "Hanger Bolt", slug: "hanger-bolt" },
      { name: "Plow Bolt", slug: "plow-bolt" },
      { name: "Wheel Bolt", slug: "wheel-bolt" },
      { name: "Structural Bolt", slug: "structural-bolt" },
      { name: "Machine Bolt", slug: "machine-bolt" },
      { name: "Elevator Bolt", slug: "elevator-bolt" },
    ],
  },
  {
    category: "Screws",
    categorySlug: "screws",
    products: [
      { name: "Self Tapping Screw", slug: "self-tapping-screw" },
      { name: "Self Drilling Screw", slug: "self-drilling-screw" },
      { name: "Wood Screw", slug: "wood-screw" },
      { name: "Machine Screw", slug: "machine-screw" },
      { name: "Drywall Screw", slug: "drywall-screw" },
      { name: "Chipboard Screw", slug: "chipboard-screw" },
      { name: "Socket Head Cap Screw", slug: "allen-bolt" },
      { name: "Grub Screw / Set Screw", slug: "grub-screw" },
      { name: "Hex Head Screw", slug: "hex-head-screw" },
      { name: "Pan Head Screw", slug: "pan-head-screw" },
      { name: "Round Head Screw", slug: "round-head-screw" },
      { name: "Flat Head Screw", slug: "flat-head-screw" },
      { name: "Countersunk Screw", slug: "countersunk-screw" },
      { name: "Phillips Screw", slug: "phillips-screw" },
      { name: "Slotted Screw", slug: "slotted-screw" },
      { name: "Security Screw", slug: "security-screw" },
      { name: "Roofing Screw", slug: "roofing-screw" },
      { name: "Concrete Screw", slug: "concrete-screw" },
      { name: "Lag Screw", slug: "lag-screw" },
    ],
  },
  {
    category: "Stud Bolts",
    categorySlug: "stud-bolts",
    products: [
      { name: "Full Thread Stud Bolt", slug: "stud-bolts" },
      { name: "Double End Stud Bolt", slug: "double-end-stud" },
      { name: "Tap End Stud Bolt", slug: "tap-end-stud" },
      { name: "B7 Stud Bolt", slug: "b7-stud-bolt" },
      { name: "B8 Stud Bolt", slug: "b8-stud-bolt" },
      { name: "Stainless Steel Stud Bolt", slug: "ss-stud-bolt" },
      { name: "Alloy Steel Stud Bolt", slug: "alloy-stud-bolt" },
      { name: "Hot Dip Galvanized Stud Bolt", slug: "hdg-stud-bolt" },
      { name: "PTFE Coated Stud Bolt", slug: "ptfe-stud-bolt" },
      { name: "Heavy Duty Stud Bolt", slug: "heavy-duty-stud" },
    ],
  },
  {
    category: "Threaded Rods",
    categorySlug: "threaded-rods",
    products: [
      { name: "Fully Threaded Rod", slug: "threaded-rods" },
      { name: "Partial Thread Rod", slug: "partial-thread-rod" },
      { name: "Stainless Steel Threaded Rod", slug: "ss-threaded-rod" },
      { name: "Mild Steel Threaded Rod", slug: "ms-threaded-rod" },
      { name: "High Tensile Threaded Rod", slug: "high-tensile-threaded-rod" },
      { name: "Brass Threaded Rod", slug: "brass-threaded-rod" },
      { name: "Copper Threaded Rod", slug: "copper-threaded-rod" },
      { name: "Zinc Plated Threaded Rod", slug: "zinc-plated-threaded-rod" },
      { name: "Galvanized Threaded Rod", slug: "galvanized-threaded-rod" },
      { name: "DIN 975 Threaded Rod", slug: "din-975-threaded-rod" },
      { name: "DIN 976 Threaded Rod", slug: "din-976-threaded-rod" },
    ],
  },
  {
    category: "Nuts",
    categorySlug: "nuts",
    products: [
      { name: "Hex Nut", slug: "hex-nuts" },
      { name: "Heavy Hex Nut", slug: "heavy-hex-nut" },
      { name: "Lock Nut", slug: "lock-nuts" },
      { name: "Nylock Nut", slug: "nylon-lock-nut" },
      { name: "Dome Nut / Cap Nut", slug: "dome-nut" },
      { name: "Wing Nut", slug: "wing-nut" },
      { name: "Coupling Nut", slug: "coupling-nuts" },
      { name: "T Nut", slug: "t-nut" },
      { name: "Square Nut", slug: "square-nut" },
      { name: "Flange Nut", slug: "flange-nut" },
      { name: "Castle / Slotted Nut", slug: "slotted-nut" },
      { name: "Weld Nut", slug: "weld-nut" },
      { name: "Cage Nut", slug: "cage-nut" },
      { name: "Eye Nut", slug: "eye-nut" },
      { name: "Jam Nut", slug: "jam-nut" },
      { name: "Round Nut", slug: "round-nut" },
      { name: "Acorn Nut", slug: "acorn-nut" },
    ],
  },
  {
    category: "Rivets",
    categorySlug: "rivets",
    products: [
      { name: "Blind Rivet / POP Rivet", slug: "blind-rivet" },
      { name: "Solid Rivet", slug: "solid-rivet" },
      { name: "Tubular Rivet", slug: "tubular-rivet" },
      { name: "Split Rivet", slug: "split-rivet" },
      { name: "Drive Rivet", slug: "drive-rivet" },
      { name: "Multi Grip Rivet", slug: "multi-grip-rivet" },
      { name: "Structural Rivet", slug: "structural-rivet" },
      { name: "Semi Tubular Rivet", slug: "semi-tubular-rivet" },
      { name: "Flush Rivet", slug: "flush-rivet" },
    ],
  },
  {
    category: "Anchor Fasteners",
    categorySlug: "anchor-fasteners",
    products: [
      { name: "Wedge Anchor", slug: "wedge-anchor" },
      { name: "Sleeve Anchor", slug: "sleeve-anchor" },
      { name: "Drop In Anchor", slug: "drop-in-anchor" },
      { name: "Chemical Anchor", slug: "chemical-anchor" },
      { name: "Shield Anchor", slug: "shield-anchor" },
      { name: "Through Bolt Anchor", slug: "through-bolt-anchor" },
      { name: "Hammer Drive Anchor", slug: "hammer-drive-anchor" },
      { name: "Frame Fixing Anchor", slug: "frame-fixing-anchor" },
      { name: "Nylon Anchor", slug: "nylon-anchor" },
      { name: "Expansion Anchor", slug: "expansion-anchor" },
    ],
  },
  {
    category: "Washers",
    categorySlug: "washers",
    products: [
      { name: "Plain Washer", slug: "plain-washers" },
      { name: "Spring Washer", slug: "spring-washers" },
      { name: "Lock Washer", slug: "lock-washer" },
      { name: "Flat Washer", slug: "flat-washer" },
      { name: "Fender Washer", slug: "fender-washer" },
      { name: "Belleville Washer", slug: "belleville-washer" },
      { name: "Star Washer", slug: "star-washer" },
      { name: "Tab Washer", slug: "tab-washer" },
      { name: "Square Washer", slug: "square-washer" },
      { name: "Wave Washer", slug: "wave-washer" },
      { name: "Sealing Washer", slug: "sealing-washer" },
      { name: "Shim Washer", slug: "shim-washer" },
      { name: "Copper Washer", slug: "copper-washer" },
    ],
  },
  {
    category: "Pins",
    categorySlug: "pins",
    products: [
      { name: "Dowel Pin", slug: "dowel-pin" },
      { name: "Parallel Pin", slug: "parallel-pin" },
      { name: "Taper Pin", slug: "taper-pin" },
      { name: "Spring Pin", slug: "spring-pin" },
      { name: "Roll Pin", slug: "roll-pin" },
      { name: "Split Pin / Cotter Pin", slug: "split-pin" },
      { name: "Clevis Pin", slug: "clevis-pin" },
      { name: "Grooved Pin", slug: "grooved-pin" },
      { name: "Knurled Pin", slug: "knurled-pin" },
      { name: "Hitch Pin", slug: "hitch-pin" },
      { name: "Lynch Pin", slug: "lynch-pin" },
      { name: "Quick Release Pin", slug: "quick-release-pin" },
      { name: "Ball Lock Pin", slug: "ball-lock-pin" },
      { name: "Ejector Pin", slug: "ejector-pin" },
      { name: "Guide Pin", slug: "guide-pin" },
      { name: "Straight Pin", slug: "straight-pin" },
    ],
  },
  {
    category: "Coated Fasteners",
    categorySlug: "coated-fasteners",
    products: [
      { name: "PTFE Coated Fasteners", slug: "ptfe-coated-fasteners" },
      { name: "Xylan Coated Fasteners", slug: "xylan-coated-fasteners" },
      { name: "Hot Dip Galvanized Fasteners", slug: "hdg-fasteners" },
      { name: "Zinc Plated Fasteners", slug: "zinc-plated-fasteners" },
      { name: "Dacromet Coated Fasteners", slug: "dacromet-fasteners" },
      { name: "Geomet Coated Fasteners", slug: "geomet-fasteners" },
      { name: "Black Oxide Fasteners", slug: "black-oxide-fasteners" },
      { name: "Cadmium Coated Fasteners", slug: "cadmium-fasteners" },
      { name: "Nickel Plated Fasteners", slug: "nickel-plated-fasteners" },
    ],
  },
  {
    category: "Springs",
    categorySlug: "springs",
    products: [
      { name: "Compression Spring", slug: "compression-spring" },
      { name: "Tension Spring", slug: "tension-spring" },
      { name: "Extension Spring", slug: "extension-spring" },
      { name: "Torsion Spring", slug: "torsion-spring" },
      { name: "Flat Spring", slug: "flat-spring" },
      { name: "Conical Spring", slug: "conical-spring" },
      { name: "Die Spring", slug: "die-spring" },
      { name: "Disc Spring", slug: "disc-spring" },
      { name: "Helical Spring", slug: "helical-spring" },
    ],
  },
  {
    category: "Flanges",
    categorySlug: "flanges",
    products: [
      { name: "Weld Neck Flange", slug: "weld-neck-flange" },
      { name: "Slip On Flange", slug: "slip-on-flange" },
      { name: "Blind Flange", slug: "blind-flange" },
      { name: "Socket Weld Flange", slug: "socket-weld-flange" },
      { name: "Threaded Flange", slug: "threaded-flange" },
      { name: "Lap Joint Flange", slug: "lap-joint-flange" },
      { name: "Orifice Flange", slug: "orifice-flange" },
      { name: "Spectacle Blind Flange", slug: "spectacle-blind-flange" },
      { name: "RTJ Flange", slug: "rtj-flange" },
      { name: "Plate Flange", slug: "plate-flange" },
    ],
  },
  {
    category: "Pipe Fittings",
    categorySlug: "pipe-fittings",
    products: [
      { name: "Elbow", slug: "elbow-fitting" },
      { name: "Tee", slug: "tee-fitting" },
      { name: "Reducer", slug: "reducer-fitting" },
      { name: "Coupling", slug: "coupling-fitting" },
      { name: "Union", slug: "union-fitting" },
      { name: "Nipple", slug: "nipple-fitting" },
      { name: "Cross", slug: "cross-fitting" },
      { name: "Cap", slug: "cap-fitting" },
      { name: "Plug", slug: "plug-fitting" },
      { name: "Bushing", slug: "bushing-fitting" },
      { name: "Adapter", slug: "adapter-fitting" },
      { name: "Stub End", slug: "stub-end-fitting" },
      { name: "Bend", slug: "bend-fitting" },
      { name: "Ferrule Fittings", slug: "ferrule-fittings" },
      { name: "Buttweld Fittings", slug: "buttweld-fittings" },
      { name: "Socket Weld Fittings", slug: "socket-weld-fittings" },
    ],
  },
];

interface ProductsMegaMenuProps {
  active: boolean;
  onItemClick?: () => void;
}

const ProductsMegaMenu = ({ active, onItemClick }: ProductsMegaMenuProps) => {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(MENU[0].category);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const currentProducts = MENU.find((c) => c.category === activeCat)?.products ?? [];

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
        Products <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          data-testid="dropdown-products"
        >
          <div className="flex bg-card border border-primary/15 rounded-xl shadow-elegant overflow-hidden"
            style={{ width: "700px", maxWidth: "94vw" }}>

            {/* ── Left: Category list ─────────────────────────── */}
            <div className="w-48 flex-shrink-0 bg-secondary/30 border-r border-border/60 py-2">
              {MENU.map((cat) => {
                const isCurrent = cat.category === activeCat;
                return (
                  <button
                    key={cat.category}
                    onMouseEnter={() => setActiveCat(cat.category)}
                    onClick={() => { setOpen(false); onItemClick?.(); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm font-semibold transition-colors ${isCurrent ? "bg-primary/10 text-primary border-r-2 border-primary" : "text-foreground/70 hover:text-primary hover:bg-secondary/50"}`}
                  >
                    <span>{cat.category}</span>
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isCurrent ? "text-primary" : "text-muted-foreground/50"}`} />
                  </button>
                );
              })}
              <div className="border-t border-border/60 mt-2 pt-2 px-4">
                <Link
                  to="/products"
                  onClick={() => { setOpen(false); onItemClick?.(); }}
                  className="text-[11px] font-semibold text-primary hover:underline"
                  data-testid="link-all-products"
                >
                  All Products →
                </Link>
              </div>
            </div>

            {/* ── Right: Products grid ────────────────────────── */}
            <div className="flex-1 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3 border-b border-border/40 pb-2">
                {activeCat}
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {currentProducts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/product/${p.slug}`}
                      onClick={() => { setOpen(false); onItemClick?.(); }}
                      data-testid={`link-product-${p.slug}`}
                      className="flex items-center gap-2 py-1.5 px-2 rounded-md text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary flex-shrink-0 transition-colors" />
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-border/40">
                <Link
                  to={`/products/category/${MENU.find((c) => c.category === activeCat)?.categorySlug ?? "bolts"}`}
                  onClick={() => { setOpen(false); onItemClick?.(); }}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Browse all {activeCat} products →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { MENU };
export default ProductsMegaMenu;
