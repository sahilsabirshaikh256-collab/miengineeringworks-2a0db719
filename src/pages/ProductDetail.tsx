import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Tag, ChevronDown, X, FileText, BarChart3, BookOpen, Package, Layers, LayoutGrid } from "lucide-react";
import { productsData, gradeChartCategories } from "@/data/staticData";
import type { Product } from "@/lib/api";
import { resolveImage } from "@/utils/resolveImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const GradeChartModal = ({ isOpen, onClose, productCategory }: { isOpen: boolean; onClose: () => void; productCategory: string }) => {
  if (!isOpen) return null;

  const chartCat = gradeChartCategories.find((c) => c.name === productCategory)
    || gradeChartCategories[0];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
    >
      <motion.div
        className="bg-card rounded-xl border border-border shadow-elegant max-w-5xl w-full max-h-[90vh] overflow-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-dark px-6 py-4 border-b border-primary/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-heading text-xl font-bold text-gold-light">Grade Chart — {chartCat?.name}</h2>
              <p className="text-[11px] text-gold-light/50 mt-0.5">{chartCat?.entries.length} product types · Grades, Standards &amp; Tensile Reference</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-lg transition-colors" aria-label="Close">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          {chartCat ? (
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Grades</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Material</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">DIN</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">ASME / ASTM</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">ISO</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Tensile</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Yield</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {chartCat.entries.map((d) => (
                  <tr key={d.product} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-primary whitespace-nowrap text-xs">{d.product}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {d.grades.map((g) => (
                          <span key={g} className="bg-primary/10 px-2 py-0.5 rounded text-primary font-medium text-[10px] whitespace-nowrap">{g}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs max-w-[140px]">{d.material}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.din}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.asme}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.iso}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{d.tensile}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{d.yield_}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs max-w-[180px]">{d.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-muted-foreground py-10">No grade chart data for this category.</p>
          )}
        </div>
        <div className="px-6 py-3 border-t border-border text-center">
          <a href="/grade-chart" target="_blank" rel="noreferrer"
            className="text-xs text-primary hover:underline font-medium">
            View full grade chart for all categories →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const MATERIALS = [
  "Carbon Steel",
  "Alloy Steel",
  "Stainless Steel",
  "Brass",
  "Aluminium",
  "Copper",
  "Nylon (Polymer)",
  "Titanium",
  "High Tensile Steel",
];

const MATERIAL_STANDARDS: Record<string, string[]> = {
  "Carbon Steel": [
    "ASTM Grades",
    "SAE Grades",
    "ISO / DIN Property Classes",
    "Structural Grades",
    "IS (Indian Standard)",
    "JIS (Japanese Standard)",
    "BS / EN (British / European Standard)",
  ],
  "Alloy Steel": [
    "ASTM Grades",
    "ISO Property Classes",
    "SAE Grades",
    "Heat Resistant Alloy Grades",
    "Low Temperature Alloy Grades",
    "High Strength Alloy Grades",
    "DIN (German Standard)",
  ],
  "Stainless Steel": [
    "Austenitic (SS 200–300 Series)",
    "Martensitic SS",
    "Ferritic SS",
    "Duplex Stainless Steel",
    "Super Duplex SS",
    "Precipitation Hardening (PH)",
  ],
  "Brass": [
    "American Brass Grades (UNS)",
    "European Brass Grades (EN)",
    "British Brass Grades (BS)",
  ],
  "Aluminium": [
    "Commercial Pure — 1XXX Series",
    "Al-Cu Alloys — 2XXX Series",
    "Al-Mn Alloys — 3XXX Series",
    "Al-Mg Alloys — 5XXX Series",
    "Al-Mg-Si Alloys — 6XXX Series",
    "Al-Zn Alloys — 7XXX Series",
  ],
  "Copper": [
    "ETP / High Conductivity Copper",
    "Deoxidized Copper",
    "Special Copper Alloys",
    "Copper-Nickel Alloys",
    "European Copper Grades (EN)",
  ],
  "Nylon (Polymer)": [
    "ISO (International Standard)",
    "DIN (German Standard)",
  ],
  "Titanium": [
    "ASME / ASTM (American Standard)",
    "ISO (International Standard)",
  ],
  "High Tensile Steel": [
    "ASME / ASTM (American Standard)",
    "BS / EN (British / European Standard)",
    "ISO (International Standard)",
    "IS (Indian Standard)",
    "DIN (German Standard)",
  ],
};

const MATERIAL_STANDARD_GRADES: Record<string, Record<string, string[]>> = {
  "Carbon Steel": {
    "ASTM Grades": [
      "ASTM A307 Grade A",
      "ASTM A307 Grade B",
      "ASTM A307 Grade C",
      "ASTM A449",
      "ASTM A325 (Structural)",
      "ASTM A490 (Structural)",
      "ASTM A193 Grade B7",
      "ASTM A193 Grade B7M",
      "ASTM A193 Grade B16",
      "ASTM A320 Grade L7",
      "ASTM A320 Grade L7M",
      "ASTM A354 Grade BC",
      "ASTM A354 Grade BD",
    ],
    "SAE Grades": [
      "SAE Grade 2",
      "SAE Grade 5",
      "SAE Grade 8",
    ],
    "ISO / DIN Property Classes": [
      "Class 4.6 (Low Strength)",
      "Class 4.8 (Low Strength)",
      "Class 5.6 (Low Strength)",
      "Class 5.8 (Low Strength)",
      "Class 6.8 (Medium Strength)",
      "Class 8.8 (Medium Strength) ⭐",
      "Class 9.8 (High Tensile)",
      "Class 10.9 (High Tensile) ⭐",
      "Class 12.9 (High Tensile)",
    ],
    "Structural Grades": [
      "ASTM A325 Type 1",
      "ASTM A325 Type 3",
      "ASTM A490 Type 1",
      "ASTM A490 Type 3",
    ],
    "IS (Indian Standard)": [
      "IS 1367 Class 4.6",
      "IS 1367 Class 5.8",
      "IS 1367 Class 8.8",
      "IS 1367 Class 10.9",
      "IS 1367 Class 12.9",
      "IS 6639 Foundation Bolt",
    ],
    "JIS (Japanese Standard)": [
      "JIS B 1051 4T",
      "JIS B 1051 6T",
      "JIS B 1051 8T",
      "JIS B 1051 10T",
      "JIS B 1051 12T",
      "JIS S45C (Carbon Steel)",
    ],
    "BS / EN (British / European Standard)": [
      "BS EN ISO Class 4.6",
      "BS EN ISO Class 8.8",
      "BS EN ISO Class 10.9",
      "BS EN ISO Class 12.9",
    ],
  },
  "Alloy Steel": {
    "ASTM Grades": [
      "ASTM A193 Grade B5",
      "ASTM A193 Grade B6",
      "ASTM A193 Grade B7 ⭐",
      "ASTM A193 Grade B7M",
      "ASTM A193 Grade B16",
      "ASTM A320 Grade L7",
      "ASTM A320 Grade L7M",
      "ASTM A320 Grade L43",
      "ASTM A354 Grade BC",
      "ASTM A354 Grade BD",
    ],
    "ISO Property Classes": [
      "Class 8.8",
      "Class 10.9 ⭐",
      "Class 12.9 ⭐",
    ],
    "SAE Grades": [
      "SAE Grade 5",
      "SAE Grade 8",
    ],
    "Heat Resistant Alloy Grades": [
      "ASTM A193 B5 (Cr-Mo, up to 593°C)",
      "ASTM A193 B6 (Cr, up to 538°C)",
      "ASTM A193 B16 (Cr-Mo-V, up to 538°C)",
    ],
    "Low Temperature Alloy Grades": [
      "ASTM A320 L7 (down to -101°C)",
      "ASTM A320 L7M (down to -101°C)",
      "ASTM A320 L43 (down to -101°C)",
    ],
    "High Strength Alloy Grades": [
      "ASTM A193 B7 ⭐",
      "ASTM A193 B7M",
      "ASTM A354 BD",
      "Class 10.9",
      "Class 12.9",
      "SAE Grade 8",
    ],
    "DIN (German Standard)": [
      "DIN 42CrMo4 (B7 Equiv.)",
      "DIN Class 8.8",
      "DIN Class 10.9",
      "DIN Class 12.9",
    ],
  },
  "Stainless Steel": {
    "Austenitic (SS 200–300 Series)": [
      "SS 201",
      "SS 202",
      "SS 303",
      "SS 304 (A2) ⭐",
      "SS 304L",
      "SS 316 (A4) ⭐",
      "SS 316L",
      "SS 317",
      "SS 321",
      "SS 347",
    ],
    "Martensitic SS": [
      "SS 410",
      "SS 416",
      "SS 420",
      "SS 431",
      "SS 440A",
      "SS 440B",
      "SS 440C",
    ],
    "Ferritic SS": [
      "SS 409",
      "SS 430",
      "SS 434",
      "SS 439",
      "SS 444",
    ],
    "Duplex Stainless Steel": [
      "Duplex 2205 (UNS S31803 / S32205) ⭐",
      "Duplex 2304 (ASTM A182 F44)",
      "Lean Duplex 2101 (UNS S32101)",
    ],
    "Super Duplex SS": [
      "Super Duplex 2507 (UNS S32750) ⭐",
      "Zeron 100 (UNS S32760)",
    ],
    "Precipitation Hardening (PH)": [
      "17-4 PH (UNS S17400 / ASTM A564 Type 630)",
      "15-5 PH (UNS S15500 / ASTM A564 XM-12)",
      "13-8 Mo (UNS S13800 / ASTM A564)",
    ],
  },
  "Brass": {
    "American Brass Grades (UNS)": [
      "Brass C36000 (CZ121 / CW614N) ⭐",
      "Brass C37700 (High Tensile Brass)",
      "Brass C26000 (Cartridge Brass 70/30)",
      "Brass C26800",
      "Brass C38500 (Architectural Brass)",
      "Brass C46400 (Naval Brass)",
      "Brass C44300 (Admiralty Brass)",
      "Brass C68700 (Aluminum Brass)",
      "Brass C27450 (Lead-Free Brass)",
      "Brass C69300 (ECO Brass — RoHS)",
    ],
    "European Brass Grades (EN)": [
      "CW602N (EN 12164)",
      "CW614N ⭐ (EN 12164 — most common)",
      "CW617N (EN 12165 — Forged)",
    ],
    "British Brass Grades (BS)": [
      "CZ108 (BS 2870 — equiv. C26000)",
      "CZ121 ⭐ (BS 2874 — equiv. CW614N)",
      "CZ122 (BS 2874)",
      "CZ132 (BS 2874 — equiv. CW602N)",
    ],
  },
  "Aluminium": {
    "Commercial Pure — 1XXX Series": [
      "Aluminium 1050 (ASTM B211 / EN AW-1050A)",
      "Aluminium 1060 (ASTM B211)",
      "Aluminium 1100 (ASTM B211 — General Purpose)",
    ],
    "Al-Cu Alloys — 2XXX Series": [
      "Aluminium 2011 (Machined Fasteners)",
      "Aluminium 2014 (Aerospace Fasteners)",
      "Aluminium 2024 ⭐ (Aircraft Bolts / High Strength)",
    ],
    "Al-Mn Alloys — 3XXX Series": [
      "Aluminium 3003 (Corrosion Resistant)",
    ],
    "Al-Mg Alloys — 5XXX Series": [
      "Aluminium 5052 ⭐ (Marine / General Purpose)",
      "Aluminium 5083 (Offshore & Marine)",
      "Aluminium 5086 (Marine Fasteners)",
    ],
    "Al-Mg-Si Alloys — 6XXX Series": [
      "Aluminium 6061 ⭐ (Bolts, Nuts, Washers, Studs)",
      "Aluminium 6063 (Architectural Fasteners)",
      "Aluminium 6082 (High Strength Structural)",
    ],
    "Al-Zn Alloys — 7XXX Series": [
      "Aluminium 7075 ⭐ (Aerospace / High Tensile Bolts)",
      "Aluminium 7050 (Aircraft Components)",
    ],
  },
  "Copper": {
    "ETP / High Conductivity Copper": [
      "Copper C11000 (ETP) ⭐ — UNS C11000",
      "Copper C10100 (OFE) — UNS C10100",
      "Copper C10200 (OF) — UNS C10200",
      "Copper C10300 — UNS C10300",
    ],
    "Deoxidized Copper": [
      "Copper C12200 (DHP) ⭐ — UNS C12200",
      "Copper C12000 — UNS C12000",
    ],
    "Special Copper Alloys": [
      "Copper C14500 (Tellurium — Machined Fasteners)",
      "Copper C18200 (Chromium — High Strength Electrical)",
      "Copper C17200 (Beryllium — Aerospace / Non-Sparking)",
      "Copper C17500 (Beryllium Copper — Heavy Duty)",
    ],
    "Copper-Nickel Alloys": [
      "Copper Nickel 90/10 (C70600) ⭐ — Marine / Offshore",
      "Copper Nickel 70/30 (C71500) — Seawater Applications",
    ],
    "European Copper Grades (EN)": [
      "Cu-ETP (CW004A) — equiv. C11000",
      "Cu-DHP (CW024A) — equiv. C12200",
      "Cu-OF (CW008A) — equiv. C10200",
    ],
  },
  "Nylon (Polymer)": {
    "ISO (International Standard)": ["Nylon 6 (PA6)", "Nylon 66 (PA66)", "Nylon 12 (PA12)"],
    "DIN (German Standard)": ["DIN PA6 Hex Bolt", "DIN PA66 Nut"],
  },
  "Titanium": {
    "ASME / ASTM (American Standard)": [
      "ASTM Grade 1 (Pure Ti — Cp1)",
      "ASTM Grade 2 (Pure Ti — Cp2) ⭐",
      "ASTM Grade 4 (Pure Ti — Cp4)",
      "ASTM Grade 5 (Ti-6Al-4V) ⭐",
      "ASTM Grade 7 (Ti-0.15Pd)",
      "ASTM Grade 9 (Ti-3Al-2.5V)",
      "ASTM Grade 12 (Ti-0.3Mo-0.8Ni)",
    ],
    "ISO (International Standard)": [
      "ISO Grade 1 (Cp Ti)",
      "ISO Grade 2 (Cp Ti)",
      "ISO Grade 5 (Ti-6Al-4V)",
    ],
  },
  "High Tensile Steel": {
    "ASME / ASTM (American Standard)": [
      "ASTM A325 Type 1",
      "ASTM A325 Type 3",
      "ASTM A490 Type 1",
      "ASTM A490 Type 3",
      "ASTM F1554 Gr.105",
    ],
    "BS / EN (British / European Standard)": [
      "BS EN 14399 HSFG",
      "BS EN ISO 10.9",
      "BS EN ISO 12.9",
      "BS 4882 (B7 Stud Bolt)",
    ],
    "ISO (International Standard)": [
      "ISO Class 8.8",
      "ISO Class 10.9 ⭐",
      "ISO Class 12.9 ⭐",
    ],
    "IS (Indian Standard)": [
      "IS 3757 HSFG Grade",
      "IS 1367 Class 8.8",
      "IS 1367 Class 10.9",
      "IS 1367 Class 12.9",
    ],
    "DIN (German Standard)": [
      "DIN Class 8.8",
      "DIN Class 10.9",
      "DIN Class 12.9",
    ],
  },
};

// ─── Coatings & Categories ─────────────────────────────────────────────────────

const COATING_CATEGORIES = [
  "Metallic",
  "Zinc Flake / Anti-Corrosion",
  "Fluoropolymer / PTFE",
  "Conversion",
  "Organic / Polymer",
  "Lubricant / Anti-Seize",
  "Thread Locking & Sealing",
  "High Performance / Specialty",
  "Oil & Gas / Offshore",
];

const COATING_TYPES: Record<string, string[]> = {
  "Metallic": ["Zinc Plating", "Clear Zinc", "Blue Zinc", "Yellow Zinc", "Black Zinc", "Zinc Nickel (Zn-Ni)", "Zinc Iron (Zn-Fe)", "Cadmium Plating", "Nickel Plating", "Electroless Nickel (ENP)", "Chrome Plating", "Hard Chrome", "Tin Plating", "Silver Plating", "Copper Plating", "Brass Plating", "Gold Plating", "Aluminum Coating", "Hot Dip Galvanized (HDG)", "Mechanical Galvanized", "Sherardized Coating"],
  "Zinc Flake / Anti-Corrosion": ["Dacromet", "Geomet", "Magni Coating", "Delta Tone", "Delta Seal", "Ruspert", "Zinc Flake Coating"],
  "Fluoropolymer / PTFE": ["PTFE Coating", "Xylan 1010", "Xylan 1070", "Xylan 1424", "Teflon Coating", "Fluoropolymer Coating"],
  "Conversion": ["Black Oxide", "Passivation", "Chromate Conversion", "Iridite / Alodine", "Zinc Phosphate", "Manganese Phosphate", "Iron Phosphate", "Aluminium Treatment", "Anodizing"],
  "Organic / Polymer": ["Epoxy Coating", "Polyester Coating", "Powder Coating", "Polyurethane Coating", "Acrylic Coating", "Ceramic Coating", "E-Coating (Electrophoretic)", "Bituminous Coating"],
  "Lubricant / Anti-Seize": ["Dry Film Lubricant", "Molybdenum Disulfide (MoS₂)", "Graphite Coating", "Wax Coating", "Anti-Seize Coating"],
  "Thread Locking & Sealing": ["Nylon Patch", "Nylon Locking Coating", "Pre-Applied Thread Locker", "Sealant Coating"],
  "High Performance / Specialty": ["PVD Coating", "CVD Coating", "Thermal Spray Coating", "Plasma Coating", "Ceramic Metallic Coating", "Rubber Coating"],
  "Oil & Gas / Offshore": ["PTFE Blue Coating", "Zinc Nickel + PTFE (Xylan)", "Fluoropolymer Top Coat", "FBE (Fusion Bonded Epoxy)", "Halar / ECTFE Coating", "Marine Offshore Coating"],
};


// ─── Component ────────────────────────────────────────────────────────────────

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showGradeChart, setShowGradeChart] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedStandard, setSelectedStandard] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedCoatingCategory, setSelectedCoatingCategory] = useState<string>("");
  const [selectedCoatingType, setSelectedCoatingType] = useState<string>("");

  const product = productsData.find((p) => p.slug === slug) || null;
  const allProducts = productsData;

  useEffect(() => {
    setSelectedMaterial("");
    setSelectedStandard("");
    setSelectedGrade("");
    setSelectedCoatingCategory("");
    setSelectedCoatingType("");
  }, [product]);

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    setSelectedStandard("");
    setSelectedGrade("");
  };

  const handleStandardChange = (standard: string) => {
    setSelectedStandard(standard);
    setSelectedGrade("");
  };

  const handleQuoteRequest = () => {
    if (!product) return;
    const params = new URLSearchParams({ product: product.name });
    if (selectedMaterial) params.set("material", selectedMaterial);
    if (selectedStandard) params.set("standard", selectedStandard);
    if (selectedGrade) params.set("grade", selectedGrade);
    if (selectedCoatingCategory) params.set("coating_cat", selectedCoatingCategory);
    if (selectedCoatingType) params.set("coating_type", selectedCoatingType);
    navigate(`/contact?${params.toString()}`);
  };

  const availableStandards = selectedMaterial ? (MATERIAL_STANDARDS[selectedMaterial] || []) : [];
  const availableGrades = (selectedMaterial && selectedStandard)
    ? (MATERIAL_STANDARD_GRADES[selectedMaterial]?.[selectedStandard] || [])
    : [];

  if (!product) {
    return (
      <PageTransition>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center text-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">This product doesn't exist or has been removed.</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-gold text-charcoal font-semibold hover:opacity-90 transition">
              <ArrowLeft className="w-4 h-4" /> Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </PageTransition>
    );
  }

  const related = allProducts.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  return (
    <PageTransition>
      <SEO
        title={`${product.name} Manufacturer & Supplier Mumbai | M.I. Engineering Works`}
        description={`Buy ${product.name} from M.I. Engineering Works — leading ${product.name} manufacturer and supplier in Mumbai, India. ${product.description.slice(0, 120)}. Get best price and quick delivery across India.`}
        keywords={[
          `${product.name} manufacturer`,
          `${product.name} supplier`,
          `${product.name} manufacturer Mumbai`,
          `${product.name} supplier India`,
          `${product.name} manufacturer India`,
          `${product.name} price India`,
          `buy ${product.name}`,
          `${product.name} wholesale`,
          `${product.name} exporter India`,
          `${product.name} factory Mumbai`,
          `industrial ${product.name}`,
          `${product.name} dealer Mumbai`,
          `${product.name} stockist India`,
          ...(product.category ? [
            `${product.category} manufacturer Mumbai`,
            `${product.category} supplier India`,
          ] : []),
        ]}
        path={`/product/${product.slug}`}
        productName={product.name}
        productDescription={product.description}
        breadcrumbs={[
          { name: "Products", path: "/products" },
          ...(product.category ? [{ name: product.category, path: `/products/category/${product.category.toLowerCase()}` }] : []),
          { name: product.name, path: `/product/${product.slug}` },
        ]}
      />
      <Header />

      <div className="bg-background min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card/50">
          <div className="container py-3">
            <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
              <span>/</span>
              <span className="text-primary">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Image */}
              <motion.div
                className="relative bg-card rounded-xl border border-border overflow-hidden shadow-elegant"
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              >
                <div className="aspect-square flex items-center justify-center p-8 bg-secondary/20">
                  <img
                    src={resolveImage("product", product.slug, product.image)}
                    alt={`${product.name} — ${product.standard} — M.I. Engineering Works`}
                    className="max-w-full max-h-full object-contain"
                    data-testid="img-product-detail"
                  />
                </div>
                {product.applications?.length > 0 && (
                  <div className="p-4 border-t border-border bg-secondary/10">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Applications</div>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((a) => (
                        <div key={a} className="flex items-center gap-1.5 bg-card rounded-md border border-border px-2.5 py-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-xs text-foreground">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link to="/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4" data-testid="link-back-products">
                  <ArrowLeft className="w-4 h-4" /> All Products
                </Link>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2" data-testid="text-product-name">{product.name}</h1>
                <div className="text-sm text-primary font-semibold tracking-wider mb-4" data-testid="text-product-standard">{product.standard}</div>


                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-product-description">{product.description}</p>

                {/* Specs */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "Sizes", value: product.sizes },
                    { label: "Threads", value: product.threads },
                    { label: "Length", value: product.length },
                  ].map(({ label, value }) => value ? (
                    <div key={label} className="bg-secondary/30 rounded-md p-3">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                      <div className="text-sm font-semibold text-foreground">{value}</div>
                    </div>
                  ) : null)}
                </div>

                {/* ── Cascading Selectors ── */}
                <div className="mb-6 space-y-3">

                  {/* Step 1 — Select Material */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" /> Select Material
                    </div>
                    <div className="relative">
                      <select
                        value={selectedMaterial}
                        onChange={(e) => handleMaterialChange(e.target.value)}
                        data-testid="select-material"
                        className="w-full appearance-none bg-card border-2 border-primary/40 rounded-lg px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                      >
                        <option value="">— All Materials</option>
                        {MATERIALS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Available standards &amp; grades change based on material
                    </p>
                  </div>

                  {/* Step 2 — Select Standard */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Select Standard
                      {selectedMaterial && (
                        <span className="ml-auto text-[10px] text-primary/70 font-normal normal-case tracking-normal">
                          {availableStandards.length} standards for {selectedMaterial}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <select
                        value={selectedStandard}
                        onChange={(e) => handleStandardChange(e.target.value)}
                        data-testid="select-standard"
                        disabled={!selectedMaterial}
                        className="w-full appearance-none bg-card border-2 border-primary/40 rounded-lg px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">— All Standards</option>
                        {availableStandards.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 3 — Select Grade */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Select Grade
                      {availableGrades.length > 0 && (
                        <span className="ml-auto text-[10px] text-primary/70 font-normal normal-case tracking-normal">
                          {availableGrades.length} grades available
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        data-testid="select-grade"
                        disabled={!selectedStandard}
                        className="w-full appearance-none bg-card border-2 border-primary/40 rounded-lg px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">— All Grades</option>
                        {availableGrades.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Grade changes based on selected material &amp; standard
                    </p>
                  </div>

                  {/* Step 4 — Select Coating Category */}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Select Coating Category
                    </div>
                    <div className="relative">
                      <select
                        value={selectedCoatingCategory}
                        onChange={(e) => { setSelectedCoatingCategory(e.target.value); setSelectedCoatingType(""); }}
                        data-testid="select-coating-category"
                        className="w-full appearance-none bg-card border-2 border-primary/40 rounded-lg px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                      >
                        <option value="">— All Coating Categories</option>
                        {COATING_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Optional — choose a coating category
                    </p>
                  </div>

                  {/* Step 5 — Select Coating Type */}
                  {selectedCoatingCategory && COATING_TYPES[selectedCoatingCategory] && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> Select Coating Type
                      </div>
                      <div className="relative">
                        <select
                          value={selectedCoatingType}
                          onChange={(e) => setSelectedCoatingType(e.target.value)}
                          data-testid="select-coating-type"
                          className="w-full appearance-none bg-card border-2 border-primary/40 rounded-lg px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                        >
                          <option value="">— Select Coating Type</option>
                          {COATING_TYPES[selectedCoatingCategory].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        Specific coating type within {selectedCoatingCategory}
                      </p>
                    </div>
                  )}
                </div>

                {/* Finish */}
                {product.finish?.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Surface Finish Options</div>
                    <div className="flex flex-wrap gap-2">
                      {product.finish.map((f) => (
                        <span key={f} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-foreground border border-border">{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleQuoteRequest}
                    data-testid="button-enquire"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-gold text-charcoal font-semibold hover:opacity-90 transition"
                  >
                    <FileText className="w-4 h-4" />
                    {selectedGrade ? `Request Quote — ${selectedGrade}` : "Request Quote"}
                  </button>
                  <button
                    onClick={() => setShowGradeChart(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition text-sm"
                  >
                    Grade Chart
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Related Products */}
        {related.length > 0 && (
          <section className="py-12 bg-background">
            <div className="container">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {related.map((p) => (
                  <Link key={p.slug} to={`/product/${p.slug}`}
                    className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary/40 hover:shadow-gold transition">
                    <div className="aspect-square bg-secondary/30 p-4 flex items-center justify-center">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-3 border-t border-border text-center">
                      <div className="font-heading text-sm font-semibold text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.standard}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />

      <GradeChartModal isOpen={showGradeChart} onClose={() => setShowGradeChart(false)} productCategory={product.category} />
    </PageTransition>
  );
};

export default ProductDetail;
