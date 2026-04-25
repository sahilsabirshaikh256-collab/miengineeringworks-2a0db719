// Seed data extracted/structured from Real-Bolt source HTMLs and existing site data.

export const standardsSeed = [
  {
    slug: "astm",
    code: "ASTM",
    name: "ASTM International (American Society for Testing and Materials)",
    region: "United States / International",
    description:
      "ASTM standards (such as A193, A194, A320, A325, A490, F1554) are the global benchmark for high-strength bolting in petrochemical, oil & gas, power generation, and structural steel applications. They define chemistry, mechanical properties, heat treatment, testing, and marking requirements.",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&q=80",
    scope:
      "Mechanical and chemical specifications for fasteners, alloy steel bolting materials, stainless steel bolting, structural bolts, and anchor bolts.",
    applications: ["Oil & Gas", "Petrochemical", "Power Generation", "Refineries", "Pressure Vessels", "Structural Steel"],
    materials: ["A193 B7 / B7M / B16", "A194 2H / 4 / 7 / 8", "A320 L7 / L7M", "A325 / A490", "F1554"],
    examples: [
      "ASTM A193 B7 — Cr-Mo alloy stud bolts",
      "ASTM A194 2H — Heavy hex nuts for high-temperature service",
      "ASTM A320 L7 — Low-temperature alloy bolting",
      "ASTM F1554 — Anchor bolts (Grade 36/55/105)",
    ],
  },
  {
    slug: "ansi-asme",
    code: "ANSI / ASME",
    name: "American National Standards Institute / American Society of Mechanical Engineers",
    region: "United States",
    description:
      "ANSI/ASME standards govern the dimensional, threading, and head-form requirements of fasteners. ASME B18 covers bolts, screws, and nuts, while ASME B1 governs unified inch (UNC/UNF) and metric (M) thread profiles. Compliance ensures interchangeability of fasteners worldwide.",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
    scope:
      "Dimensional and thread standards for inch and metric series fasteners — hex bolts, heavy hex, socket products, studs, washers, and nuts.",
    applications: ["Flanged Joints (ASME B16.5)", "Pressure Piping", "Mechanical Assemblies", "Industrial Equipment"],
    materials: ["Carbon Steel", "Alloy Steel", "Stainless Steel"],
    examples: [
      "ASME B18.2.1 — Square and Hex Bolts and Screws (Inch)",
      "ASME B18.2.2 — Nuts for General Applications",
      "ASME B1.1 — Unified Inch Screw Threads (UN/UNR)",
      "ASME B18.3 — Socket Cap Screws",
    ],
  },
  {
    slug: "din",
    code: "DIN",
    name: "Deutsches Institut für Normung (German Institute for Standardization)",
    region: "Germany / Europe",
    description:
      "DIN standards are the cornerstone of European fastener manufacturing. DIN 931, 933, 934, 976, and 6914 define metric hex bolts, full thread bolts, hex nuts, threaded rods, and high-strength structural bolts. Most DIN standards are gradually being superseded by ISO equivalents while remaining widely specified in industry.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80",
    scope:
      "Metric fastener dimensions, threads (DIN 13), property classes (DIN EN ISO 898), surface treatments, and tolerances.",
    applications: ["Automotive", "Heavy Engineering", "Industrial Machinery", "Construction"],
    materials: ["Property Class 8.8 / 10.9 / 12.9", "Stainless A2 / A4", "Quenched & Tempered Alloy"],
    examples: [
      "DIN 931 — Hex bolts with shank (partial thread)",
      "DIN 933 — Hex bolts fully threaded",
      "DIN 934 — Hexagon nuts",
      "DIN 976 — Threaded rods (studs)",
      "DIN 6914 — High-strength structural hex bolts (HV)",
    ],
  },
  {
    slug: "iso",
    code: "ISO",
    name: "International Organization for Standardization",
    region: "International",
    description:
      "ISO standards harmonize fastener specifications globally, succeeding many DIN standards. ISO 4014, 4017, 4032, 4033, 898-1, and 3506 are the most commonly cited for metric bolts, nuts, mechanical properties, and stainless steel fasteners.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
    scope:
      "Globally accepted dimensions, mechanical properties, and quality assurance requirements for metric fasteners.",
    applications: ["Global OEM Supply", "Aerospace", "Marine", "Renewable Energy", "Heavy Equipment"],
    materials: ["8.8 / 10.9 / 12.9 Property Classes", "A2-70 / A4-80 Stainless", "Hot-Dip Galvanized"],
    examples: [
      "ISO 4014 — Hex bolts, partial thread (formerly DIN 931)",
      "ISO 4017 — Hex bolts, full thread (formerly DIN 933)",
      "ISO 4032 — Hex nuts (formerly DIN 934)",
      "ISO 898-1 — Mechanical properties of fasteners",
      "ISO 3506 — Stainless steel fasteners",
    ],
  },
  {
    slug: "bs",
    code: "BS",
    name: "British Standards (BSI)",
    region: "United Kingdom",
    description:
      "British Standards (BS) for fasteners include BS 3692, BS 4190, BS 4395, and BS EN 14399 governing high-strength friction grip (HSFG) bolts widely used in UK structural steel, infrastructure, and bridge construction. BS Whitworth (BSW) and BS Fine (BSF) thread forms remain in use for legacy and heritage equipment.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    scope: "Imperial and Whitworth thread series, HSFG structural bolts, and general-purpose UK fasteners.",
    applications: ["UK Structural Steel", "Bridges", "Heritage Restoration", "Railway"],
    materials: ["Grade 8.8 / 10.9 HSFG", "Carbon Steel BSW/BSF"],
    examples: [
      "BS 3692 — ISO Metric Precision Bolts, Screws, and Nuts",
      "BS 4190 — ISO Metric Black Hex Bolts and Nuts",
      "BS 4395 — High-Strength Friction Grip Bolts (HSFG)",
      "BS EN 14399 — High-strength structural bolting assemblies",
    ],
  },
  {
    slug: "is",
    code: "IS",
    name: "Indian Standards (BIS)",
    region: "India",
    description:
      "Indian Standards (IS) issued by the Bureau of Indian Standards govern fasteners used across Indian infrastructure, railways, power, and manufacturing sectors. IS 1364, 1367, 3757, and 6639 align closely with ISO standards while addressing local material specifications.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    scope: "Hex bolts/nuts, technical supply conditions, HSFG bolts, and threaded rods for Indian industry.",
    applications: ["Indian Railways", "Power Plants", "Construction", "Defence"],
    materials: ["Property Class 4.6 / 8.8 / 10.9 / 12.9", "Stainless A2 / A4"],
    examples: [
      "IS 1364 — Hexagon Head Bolts, Screws, and Nuts (Product Grade A & B)",
      "IS 1367 — Technical Supply Conditions for Threaded Steel Fasteners",
      "IS 3757 — High Strength Structural Bolts (HSFG)",
      "IS 6639 — Hexagon Bolts for Steel Structures",
    ],
  },
  {
    slug: "sae",
    code: "SAE",
    name: "Society of Automotive Engineers",
    region: "United States",
    description:
      "SAE standards (J429, J995, J1199) define grade-rated bolts and nuts for automotive, aerospace, and heavy-duty mobile equipment. SAE Grade 5 and Grade 8 fasteners are heat-treated medium-carbon and alloy steel bolts used in critical mechanical assemblies.",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80",
    scope: "Mechanical and material requirements for inch-series bolts, screws, and studs in automotive applications.",
    applications: ["Automotive", "Aerospace", "Heavy Equipment", "Off-Highway Vehicles"],
    materials: ["Grade 2 / 5 / 8 Carbon & Alloy Steel"],
    examples: [
      "SAE J429 — Mechanical and Material Requirements for Externally Threaded Fasteners",
      "SAE J995 — Mechanical and Material Requirements for Steel Nuts",
      "SAE J1199 — Mechanical and Material Requirements for Metric Externally Threaded Steel Fasteners",
    ],
  },
  {
    slug: "eu",
    code: "EN",
    name: "European Norms (EN / EN ISO)",
    region: "Europe",
    description:
      "EN and EN ISO standards harmonize fastener requirements across the European Union. EN 14399 covers high-strength structural bolting assemblies for preloading, and EN ISO 4014/4017/898-1 govern dimensions and mechanical properties for metric fasteners CE-marked under the Construction Products Regulation.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    scope: "CE-compliant high-strength bolting and harmonized European fastener standards.",
    applications: ["EU Structural Steel", "Bridges", "Wind Turbines", "Industrial Plants"],
    materials: ["8.8 / 10.9 HV / HR Systems", "Hot-Dip Galvanized"],
    examples: [
      "EN 14399-1..10 — High-strength structural bolting assemblies for preloading",
      "EN ISO 4014 — Hex bolts (partial thread)",
      "EN ISO 898-1 — Mechanical properties of carbon steel fasteners",
    ],
  },
  {
    slug: "uni",
    code: "UNI",
    name: "Ente Nazionale Italiano di Unificazione (Italian Standards)",
    region: "Italy",
    description:
      "UNI standards are the Italian national specifications for fasteners, often referenced in Italian and Mediterranean industrial projects. Many UNI standards have been harmonized with ISO/EN equivalents but remain specified in legacy and Italian-engineered equipment.",
    image: "https://images.unsplash.com/photo-1492130410875-aa61d2a6b6e8?w=1200&q=80",
    scope: "Italian dimensional and material standards for hex bolts, nuts, washers, and threaded fasteners.",
    applications: ["Italian Industrial Equipment", "Marine", "Construction"],
    materials: ["Class 8.8 / 10.9", "Stainless"],
    examples: [
      "UNI 5737 — Hex bolts (equivalent to DIN 931 / ISO 4014)",
      "UNI 5739 — Hex bolts fully threaded (equivalent to DIN 933)",
      "UNI 5588 — Hex nuts",
    ],
  },
];

// Industries — 60 categories from Real-Bolt Applications page.
// Each industry has a concise but information-dense description and a representative image.
const img = (q: string) => `https://source.unsplash.com/1200x800/?${encodeURIComponent(q)}`;

const baseGrades = [
  { grade: "ASTM A193 B7", specification: "Cr-Mo alloy steel, quenched & tempered", usage: "General high-strength bolting" },
  { grade: "ASTM A194 2H", specification: "Heavy hex nuts for B7 studs", usage: "Mating nuts for flange joints" },
  { grade: "Class 8.8 / 10.9 / 12.9", specification: "Metric high-strength bolts", usage: "Structural and mechanical assemblies" },
  { grade: "SS 304 / 316", specification: "Austenitic stainless steel", usage: "Corrosion-resistant fastening" },
];

const baseRequirements = [
  "Material certificates EN 10204 3.1/3.2",
  "Full traceability and batch identification",
  "Third-party inspection on request",
  "Custom coatings and platings available",
];

const industryNames: { slug: string; name: string; tag: string; img: string }[] = [
  { slug: "aerospace", name: "Aerospace", tag: "high-strength flight-critical fasteners", img: "aerospace,aircraft" },
  { slug: "aviation", name: "Aviation", tag: "ground-support and airframe fasteners", img: "aviation,jet" },
  { slug: "agriculture", name: "Agriculture", tag: "tractor, plough and irrigation fasteners", img: "agriculture,tractor" },
  { slug: "appliances", name: "Appliances", tag: "household and white-goods assembly", img: "appliances,factory" },
  { slug: "automotive", name: "Automotive", tag: "engine, chassis and body fasteners", img: "automotive,car-engine" },
  { slug: "boilers-and-heat-exchangers", name: "Boilers & Heat Exchangers", tag: "high-temperature pressure-rated bolting", img: "boiler,heat-exchanger" },
  { slug: "cement-plants", name: "Cement Plants", tag: "kilns, mills and conveyor fasteners", img: "cement,plant" },
  { slug: "construction", name: "Construction", tag: "structural steel and concrete anchors", img: "construction,site" },
  { slug: "infrastructure", name: "Infrastructure", tag: "bridges, highways and public works", img: "infrastructure,bridge" },
  { slug: "conveyors-and-belt-systems", name: "Conveyors & Belt Systems", tag: "conveyor frame and roller fasteners", img: "conveyor,industry" },
  { slug: "cranes", name: "Cranes", tag: "lifting and load-bearing connections", img: "crane,industrial" },
  { slug: "dairy-plants", name: "Dairy Plants", tag: "hygienic stainless fasteners for dairy lines", img: "dairy,factory" },
  { slug: "data-centers", name: "Data Centers", tag: "rack, raised-floor and HVAC mounting", img: "data-center,server" },
  { slug: "defense-and-military", name: "Defense & Military", tag: "MIL-spec and armor-grade fasteners", img: "military,defense" },
  { slug: "electrical-and-electronics", name: "Electrical & Electronics", tag: "switchgear, busbar and panel hardware", img: "electrical,switchgear" },
  { slug: "elevators", name: "Elevators", tag: "cabin, guide-rail and machine-room bolting", img: "elevator,lift" },
  { slug: "escalators", name: "Escalators", tag: "truss, step and balustrade fasteners", img: "escalator,metro" },
  { slug: "fire-fighting-systems", name: "Fire Fighting Systems", tag: "sprinkler, hydrant and pump fasteners", img: "firefighting,pump" },
  { slug: "food-industry", name: "Food Industry", tag: "food-grade stainless fasteners", img: "food,factory" },
  { slug: "furniture", name: "Furniture", tag: "decorative and assembly fasteners", img: "furniture,workshop" },
  { slug: "hardware-fittings", name: "Hardware Fittings", tag: "general-purpose hardware and brackets", img: "hardware,tools" },
  { slug: "hvac", name: "HVAC", tag: "ductwork, chiller and AHU fasteners", img: "hvac,ducting" },
  { slug: "ducting-systems", name: "Ducting Systems", tag: "flange, hanger and clamp hardware", img: "ducting,industrial" },
  { slug: "heavy-engineering", name: "Heavy Engineering", tag: "large-diameter and oversized bolting", img: "heavy-engineering,steel" },
  { slug: "machinery", name: "Machinery", tag: "machine assembly and maintenance fasteners", img: "machinery,industry" },
  { slug: "laboratories", name: "Laboratories", tag: "lab equipment and bench fasteners", img: "laboratory,science" },
  { slug: "instrumentation", name: "Instrumentation", tag: "tubing, manifold and panel fasteners", img: "instrumentation,gauge" },
  { slug: "manufacturing", name: "Manufacturing", tag: "production line and tooling fasteners", img: "manufacturing,factory" },
  { slug: "marine", name: "Marine", tag: "316 SS and HDG fasteners for sea service", img: "marine,ship" },
  { slug: "shipbuilding", name: "Shipbuilding", tag: "hull, deck and engine-room bolting", img: "shipbuilding,shipyard" },
  { slug: "material-handling-equipment", name: "Material Handling Equipment", tag: "forklift, hoist and conveyor fasteners", img: "forklift,warehouse" },
  { slug: "medical-equipment-and-hospital-installations", name: "Medical Equipment & Hospital Installations", tag: "medical-grade stainless fasteners", img: "hospital,medical-equipment" },
  { slug: "mining-and-earthmoving-equipment", name: "Mining & Earthmoving Equipment", tag: "high-tensile bolting for heavy machinery", img: "mining,excavator" },
  { slug: "oil-and-gas-industry", name: "Oil & Gas Industry", tag: "B7/B16 flange bolting for upstream & downstream", img: "oil-gas,refinery" },
  { slug: "packaging-machinery", name: "Packaging Machinery", tag: "filling, sealing and palletising fasteners", img: "packaging,machinery" },
  { slug: "paper-and-pulp-industry", name: "Paper & Pulp Industry", tag: "corrosion-resistant bolting for digesters", img: "paper-mill,factory" },
  { slug: "petrochemical-and-chemical-plants", name: "Petrochemical & Chemical Plants", tag: "B7/B8M bolting for reactors and columns", img: "petrochemical,plant" },
  { slug: "pharmaceutical-industry", name: "Pharmaceutical Industry", tag: "GMP-compliant 316L fasteners", img: "pharmaceutical,laboratory" },
  { slug: "power-plants-and-energy", name: "Power Plants & Energy", tag: "boiler, turbine and condenser bolting", img: "power-plant,turbine" },
  { slug: "pre-engineered-buildings", name: "Pre-Engineered Buildings (PEB)", tag: "HSFG and HDG structural bolting", img: "warehouse,pre-engineered-building" },
  { slug: "pressure-vessels", name: "Pressure Vessels", tag: "ASME Section VIII compliant bolting", img: "pressure-vessel,industrial" },
  { slug: "printing-machinery", name: "Printing Machinery", tag: "press, roller and frame fasteners", img: "printing-press,machinery" },
  { slug: "pumps-valves-and-compressors", name: "Pumps, Valves & Compressors", tag: "casing, cover and gland bolting", img: "pumps,valves" },
  { slug: "railways-and-metro", name: "Railways & Metro", tag: "track, rolling-stock and signalling fasteners", img: "railway,metro" },
  { slug: "refrigeration-and-cold-storage", name: "Refrigeration & Cold Storage", tag: "low-temperature L7 bolting", img: "cold-storage,refrigeration" },
  { slug: "signage-and-advertising-structures", name: "Signage & Advertising Structures", tag: "weather-resistant outdoor fasteners", img: "signage,billboard" },
  { slug: "solar-energy-and-renewable-projects", name: "Solar Energy & Renewable Projects", tag: "HDG and SS fasteners for module mounting", img: "solar-panel,renewable-energy" },
  { slug: "sports-infrastructure-and-stadiums", name: "Sports Infrastructure & Stadiums", tag: "stadium, seating and roof fasteners", img: "stadium,sports" },
  { slug: "steel-fabrication-and-structural-works", name: "Steel Fabrication & Structural Works", tag: "HSFG, HV/HR structural bolting", img: "steel-fabrication,structure" },
  { slug: "storage-systems-and-warehousing", name: "Storage Systems & Warehousing", tag: "rack, mezzanine and pallet fasteners", img: "warehouse,racking" },
  { slug: "sugar-mills", name: "Sugar Mills", tag: "mill, evaporator and pan fasteners", img: "sugar-mill,industry" },
  { slug: "telecommunication-towers", name: "Telecommunication Towers", tag: "tower, antenna and HDG bolting", img: "telecom-tower,antenna" },
  { slug: "textile-machinery", name: "Textile Machinery", tag: "loom, spindle and frame fasteners", img: "textile,machinery" },
  { slug: "water-treatment-and-desalination-plants", name: "Water Treatment & Desalination Plants", tag: "duplex SS bolting for water service", img: "water-treatment,plant" },
  { slug: "wind-energy-installations", name: "Wind Energy Installations", tag: "tower-flange and blade-root bolting", img: "wind-turbine,renewable" },
];

export const industriesSeed = industryNames.map((i) => ({
  slug: i.slug,
  name: i.name,
  description: `Engineered fastening solutions for the ${i.name} sector — ${i.tag}.`,
  heroDescription: `Realbolt-grade precision fasteners are engineered for the demanding ${i.name.toLowerCase()} sector. We supply ${i.tag} manufactured to international standards (ASTM, DIN, ISO, EN) with full traceability, mill test certificates, and corrosion protection options including HDG, PTFE/Xylan and stainless steel grades for service in the harshest environments.`,
  image: img(i.img),
  grades: baseGrades,
  applications: [
    { name: `${i.name} - Primary Assembly`, description: `Critical fasteners for ${i.name.toLowerCase()} primary structural and mechanical joints.`, image: img(i.img + ",assembly") },
    { name: `${i.name} - Maintenance & MRO`, description: `Replacement fasteners and consumables for ${i.name.toLowerCase()} maintenance.`, image: img(i.img + ",maintenance") },
    { name: `${i.name} - Custom Engineering`, description: `Bespoke fastener engineering for specialised ${i.name.toLowerCase()} applications.`, image: img(i.img + ",engineering") },
  ],
  keyRequirements: baseRequirements,
}));

// Image helpers — local product photos live in /public/products, generic ones use Unsplash
const local = (file: string) => `/products/${file}`;
const stock = (q: string) => `https://images.unsplash.com/${q}?w=900&q=80&auto=format&fit=crop`;

export const categoriesSeed = [
  { slug: "bolts",   name: "Bolts",   description: "Hex, heavy-hex, eye, U, J, anchor, flange, allen and stud bolts for structural and industrial fastening.", image: local("hex-bolt.webp"),       sortOrder: 10 },
  { slug: "nuts",    name: "Nuts",    description: "Hex, lock, wing, cap, flange, square, coupling and weld nuts in carbon steel, alloy steel and stainless steel.", image: stock("photo-1581094288338-2314dddb7ece"), sortOrder: 20 },
  { slug: "screws",  name: "Screws",  description: "Self-tapping, self-drilling, machine, wood, drywall, set and socket head screws for every fastening need.", image: local("socket-cap-screw.jpg"), sortOrder: 30 },
  { slug: "washers", name: "Washers", description: "Plain, spring, lock, fender, tooth-lock and flat washers in MS, SS, brass and high-tensile alloy steel.", image: stock("photo-1565008447742-97f6f38c985c"), sortOrder: 40 },
  { slug: "rivets",  name: "Rivets",  description: "Blind, solid, semi-tubular and drive rivets for permanent fastening in metal, plastic and composite assemblies.", image: stock("photo-1620230874645-0c0a3e2c6a2f"), sortOrder: 50 },
  { slug: "anchors", name: "Anchors", description: "Wedge, sleeve, chemical and drop-in anchors for concrete, brick and masonry installations.", image: local("anchor-bolt.webp"),    sortOrder: 60 },
  { slug: "studs",   name: "Studs",   description: "Full-thread studs, double-end studs and threaded rods to ASTM A193 B7 / DIN 976 specifications.", image: local("stud-bolt.webp"),       sortOrder: 70 },
  { slug: "bars",    name: "Bars",    description: "Bright and black alloy steel round bars for fastener fabrication and machined components.", image: local("round-bar.jpg"),        sortOrder: 80 },
];

const baseFinish = ["Plain", "Zinc Plated", "Hot Dip Galvanized", "Black Oxide"];
const baseMaterial = "Mild Steel (MS) / Stainless Steel (SS) / Brass";

export const productsSeed = [
  // ───────── BOLTS ─────────
  { slug: "hex-bolts",       name: "Hex Bolt",       category: "Bolts", image: local("hex-bolt.webp"),       standard: "ASME B18.2.1 / DIN 931", description: "Hexagonal head bolt manufactured from high-strength alloy steel per ASTM A193 Grade B7. The most common general-purpose structural bolt with a six-sided head for wrench tightening.", sizes: "M6 to M64 | 1/4\" to 2-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF / BSW", length: "20mm to 500mm", material: "Alloy / Carbon / Stainless Steel", finish: ["Plain", "HDG", "Zinc Plated", "PTFE"], grades: ["8.8", "10.9", "12.9", "B7", "A2-70"], applications: ["Structural Steel", "Machinery", "Flange Joints", "Equipment"], dimensions: [{ label: "Diameter", value: "M6 – M64" }, { label: "Tensile Strength", value: "860 MPa (min)" }] },
  { slug: "heavy-hex-bolts", name: "Heavy Hex Bolt", category: "Bolts", image: local("heavy-hex-bolt.webp"), standard: "ASME B18.2.1 / DIN 6914", description: "Heavy hex bolt with larger head dimensions for greater bearing surface in heavy-duty structural and pressure applications. Manufactured from ASTM A193 Grade B7 alloy steel.", sizes: "M12 to M100 | 1/2\" to 4\"", threads: "Metric Coarse | UNC", length: "25mm to 600mm", material: "ASTM A193 B7 alloy steel", finish: ["Plain", "HDG", "PTFE / Xylan"], grades: ["B7", "B7M", "B16", "L7"], applications: ["Flange Joints", "Pressure Vessels", "Heat Exchangers", "Heavy Steel"], dimensions: [{ label: "Diameter", value: "1/2\" – 4\"" }, { label: "Hardness", value: "235–302 HB" }] },
  { slug: "carriage-bolts",  name: "Carriage Bolt",  category: "Bolts", image: stock("photo-1611078489935-0cb964de46d6"), standard: "ASME B18.5 / DIN 603", description: "Round-head bolt with a square shoulder beneath the head that prevents the bolt from rotating once installed. Widely used in wood-to-metal and timber connections.", sizes: "M6 to M20 | 1/4\" to 3/4\"", threads: "Metric Coarse | UNC", length: "20mm to 300mm", material: baseMaterial, finish: baseFinish, grades: ["4.6", "8.8", "Grade 5"], applications: ["Timber Construction", "Furniture", "Decking", "Playground Equipment"], dimensions: [{ label: "Diameter", value: "M6 – M20" }] },
  { slug: "eye-bolts",       name: "Eye Bolt",       category: "Bolts", image: local("eye-bolt.webp"),       standard: "DIN 580 / ASME B18.15", description: "Forged eye bolt with a circular loop head for lifting, rigging and anchoring. Available in shouldered and non-shouldered types in carbon steel and stainless steel.", sizes: "M8 to M48 | 5/16\" to 2\"", threads: "Metric Coarse | UNC", length: "30mm to 200mm", material: "Forged Carbon Steel / SS 304 / SS 316", finish: ["HDG", "Plain", "Electro-galvanized"], grades: ["C15E", "Grade 8", "A2-70"], applications: ["Lifting", "Rigging", "Crane Hooks", "Anchoring"], dimensions: [{ label: "Diameter", value: "M8 – M48" }, { label: "Eye ID", value: "As per standard" }] },
  { slug: "u-bolts",         name: "U Bolt",         category: "Bolts", image: local("u-bolt.webp"),         standard: "ASME B18.31.5 / DIN 3570", description: "U-shaped bolt used for clamping pipes, tubes and round sections to structural supports. Available in round bend, square bend and semi-round configurations.", sizes: "M6 to M36 | Pipe OD 1/2\" to 24\"", threads: "Metric Coarse | UNC", length: "Custom — based on pipe OD", material: "Carbon / Alloy / Stainless Steel", finish: ["HDG", "Plain", "Zinc"], grades: ["4.6", "8.8", "SS 304", "SS 316"], applications: ["Pipe Supports", "Auto Springs", "Cable Trays", "Fencing"], dimensions: [{ label: "Diameter", value: "M6 – M36" }] },
  { slug: "j-bolts",         name: "J Bolt",         category: "Bolts", image: stock("photo-1559166631-ef208440efd1"), standard: "ASTM F1554 / Custom", description: "J-shaped foundation bolt with a hooked end embedded in concrete and a threaded end protruding above the slab. Used for column anchoring and equipment mounting.", sizes: "M10 to M64 | 3/8\" to 2-1/2\"", threads: "Metric Coarse | UNC", length: "150mm to 2000mm", material: "Carbon Steel / Mild Steel", finish: ["HDG", "Plain"], grades: ["F1554 Gr 36 / 55 / 105"], applications: ["Foundation", "Equipment Anchoring", "Pre-Engineered Buildings"], dimensions: [{ label: "Hook Length", value: "Custom" }] },
  { slug: "anchor-bolts",    name: "Anchor Bolt",    category: "Bolts", image: local("anchor-bolt.webp"),    standard: "ASTM F1554 / IS 5624", description: "L-shaped, J-shaped or straight foundation bolt for embedding in concrete to secure structural columns, heavy machinery and equipment bases.", sizes: "M10 to M100 | 3/8\" to 4\"", threads: "Metric Coarse | UNC", length: "150mm to 2000mm", material: "Carbon Steel / Alloy Steel", finish: ["HDG", "Plain"], grades: ["F1554 Gr 36 / 55 / 105", "Grade 8.8"], applications: ["Foundation", "Equipment Mounting", "Structural Columns"], dimensions: [{ label: "Diameter", value: "M10 – M100" }, { label: "Embed Depth", value: "Per design" }] },
  { slug: "flange-bolts",    name: "Flange Bolt",    category: "Bolts", image: stock("photo-1530124566582-a618bc2615dc"), standard: "DIN 6921 / ASME B18.2.3.4M", description: "Hex head bolt with an integrated flange beneath the head that distributes load and eliminates the need for a separate washer. Often serrated to prevent loosening.", sizes: "M5 to M20 | 1/4\" to 3/4\"", threads: "Metric Coarse & Fine | UNC", length: "10mm to 100mm", material: "Alloy / Stainless Steel", finish: ["Zinc Plated", "Black Oxide", "Plain"], grades: ["8.8", "10.9", "A2-70"], applications: ["Automotive", "Machinery", "Truck Frames", "Heavy Equipment"], dimensions: [{ label: "Diameter", value: "M5 – M20" }] },
  { slug: "allen-bolts",     name: "Allen Bolt",     category: "Bolts", image: local("socket-cap-screw.jpg"), standard: "DIN 912 / ASME B18.3", description: "High-strength socket head cap bolt with cylindrical head and internal hexagonal (Allen) drive. Ideal where flush mounting and high preload are required.", sizes: "M3 to M48 | #4 to 1-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "5mm to 200mm", material: "Alloy Steel / SS 304 / SS 316", finish: ["Black Oxide", "Plain", "Zinc"], grades: ["12.9", "10.9", "A2-70", "A4-80"], applications: ["Tooling", "Dies & Moulds", "Machinery", "Precision Assembly"], dimensions: [{ label: "Diameter", value: "M3 – M48" }] },
  { slug: "stud-bolts",      name: "Stud Bolt",      category: "Bolts", image: local("stud-bolt.webp"),      standard: "ASME B16.5 / DIN 976", description: "Fully threaded or partially threaded stud bolt manufactured from ASTM A193 Grade B7 chromium-molybdenum steel. Designed for high-temperature, high-pressure flange connections.", sizes: "M6 to M100 | 1/4\" to 4\"", threads: "Metric (Coarse & Fine) | UNC / UNF | BSW", length: "30mm to 3000mm", material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", finish: ["Plain / Black Oxide", "HDG", "Zinc Plated", "PTFE / Xylan", "Cadmium Plated"], grades: ["B7", "B7M", "B16", "L7", "L7M", "B8", "B8M", "10.9", "12.9"], applications: ["Flange Connections", "Pressure Vessels", "Heat Exchangers", "Pipelines", "Refineries", "Power Plants"], dimensions: [{ label: "Diameter", value: "M6 – M100" }, { label: "Length", value: "30mm – 3000mm" }, { label: "Tensile Strength", value: "860 MPa (min)" }] },

  // ───────── NUTS ─────────
  { slug: "hex-nuts",        name: "Hex Nut",        category: "Nuts",  image: stock("photo-1572883454114-1cf0031ede2a"), standard: "DIN 934 / ASME B18.2.2", description: "Six-sided hexagonal nut — the most common nut style for use with hex bolts and threaded fasteners across all industries.", sizes: "M3 to M64 | #4 to 2-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "—", material: baseMaterial + " / Alloy Steel", finish: baseFinish, grades: ["4", "5", "8", "10", "A2-70"], applications: ["General Fastening", "Structural", "Machinery"], dimensions: [{ label: "Across Flats", value: "As per standard" }] },
  { slug: "lock-nuts",       name: "Lock Nut",       category: "Nuts",  image: stock("photo-1581093588401-fbb62a02f120"), standard: "DIN 985 / DIN 982", description: "Self-locking nut with a nylon insert (Nyloc) or all-metal prevailing-torque feature that resists vibration loosening.", sizes: "M3 to M48", threads: "Metric Coarse & Fine | UNC", length: "—", material: "Carbon / Alloy / Stainless Steel", finish: ["Zinc Plated", "Plain", "Black Oxide"], grades: ["6", "8", "10", "A2-70"], applications: ["Vibration-prone Assemblies", "Automotive", "Machinery"], dimensions: [{ label: "Across Flats", value: "As per standard" }] },
  { slug: "wing-nuts",       name: "Wing Nut",       category: "Nuts",  image: stock("photo-1599837487535-eea2a7e83fe1"), standard: "DIN 315 / ASME B18.6.9", description: "Nut with two large 'wings' for hand-tightening and frequent removal — no tools required.", sizes: "M3 to M16", threads: "Metric Coarse | UNC", length: "—", material: "Steel / Brass / Stainless Steel", finish: ["Zinc Plated", "Plain", "Brass natural"], grades: ["5", "A2-70"], applications: ["Quick-release Assemblies", "Furniture", "Equipment Covers"], dimensions: [{ label: "Across Wings", value: "As per standard" }] },
  { slug: "cap-nuts",        name: "Cap Nut",        category: "Nuts",  image: stock("photo-1565008447742-97f6f38c985c"), standard: "DIN 1587 / DIN 917", description: "Domed acorn-style nut with a closed end that covers the bolt thread for safety, weather protection and finished appearance.", sizes: "M3 to M24", threads: "Metric Coarse", length: "—", material: "Steel / Brass / SS 304", finish: ["Zinc Plated", "Chrome Plated", "Brass"], grades: ["6", "A2-70"], applications: ["Decorative Fastening", "Furniture", "Outdoor Equipment"], dimensions: [{ label: "Height", value: "1.5 × dia (approx)" }] },
  { slug: "flange-nuts",     name: "Flange Nut",     category: "Nuts",  image: stock("photo-1530124566582-a618bc2615dc"), standard: "DIN 6923 / ASME B18.2.4.4M", description: "Hex nut with an integrated flange beneath that acts as a built-in washer, distributing load and resisting loosening (often serrated).", sizes: "M5 to M20", threads: "Metric Coarse | UNC", length: "—", material: "Carbon / Alloy / SS", finish: ["Zinc Plated", "Black Oxide"], grades: ["8", "10", "A2-70"], applications: ["Automotive", "Truck Frames", "Heavy Machinery"], dimensions: [{ label: "Flange Diameter", value: "As per standard" }] },
  { slug: "square-nuts",     name: "Square Nut",     category: "Nuts",  image: stock("photo-1611078489935-0cb964de46d6"), standard: "DIN 557 / ASME B18.2.2", description: "Four-sided nut providing a larger bearing surface than hex nuts. Often used in channel sections and slotted track applications.", sizes: "M3 to M30", threads: "Metric Coarse", length: "—", material: "Carbon Steel / SS", finish: ["Zinc Plated", "Plain", "HDG"], grades: ["5", "A2-70"], applications: ["Strut Channel", "Furniture", "Window Frames"], dimensions: [{ label: "Across Flats", value: "As per standard" }] },
  { slug: "coupling-nuts",   name: "Coupling Nut",   category: "Nuts",  image: stock("photo-1581093588401-fbb62a02f120"), standard: "DIN 6334 / ASME B18.2.2", description: "Long hex nut used to join two threaded rods or extend the length of a threaded fastener. Available in various lengths.", sizes: "M5 to M30", threads: "Metric Coarse | UNC", length: "30mm to 100mm", material: "Carbon / Alloy / SS", finish: ["Zinc Plated", "Plain", "HDG"], grades: ["6", "8", "A2-70"], applications: ["Threaded-rod Extension", "Anchor Systems", "MEP Hangers"], dimensions: [{ label: "Length", value: "≥ 3 × dia" }] },
  { slug: "weld-nuts",       name: "Weld Nut",       category: "Nuts",  image: stock("photo-1572883454114-1cf0031ede2a"), standard: "DIN 929 / ASME B18.2.2", description: "Nut designed to be welded onto a metal surface — available in hex, square, T-projection and round-base configurations.", sizes: "M3 to M16", threads: "Metric Coarse", length: "—", material: "Mild / Carbon / Stainless Steel", finish: ["Plain", "Zinc Plated"], grades: ["5", "A2-70"], applications: ["Sheet-metal Fabrication", "Auto Body", "Appliances"], dimensions: [{ label: "Projection", value: "Per drawing" }] },

  // ───────── SCREWS ─────────
  { slug: "self-tapping-screws",  name: "Self Tapping Screw",  category: "Screws", image: stock("photo-1530124566582-a618bc2615dc"), standard: "DIN 7976 / ISO 1479", description: "Hardened screw with a sharp point that cuts its own thread into pre-drilled holes in metal, plastic or wood.", sizes: "#4 to #14 | M3 to M8", threads: "Self-tapping (Type AB / B)", length: "10mm to 100mm", material: "Hardened Carbon Steel / SS 304", finish: ["Zinc Plated", "Black Phosphate"], grades: ["Case Hardened", "A2-70"], applications: ["Sheet Metal", "HVAC", "Plastics", "Light Fabrication"], dimensions: [{ label: "Point", value: "Sharp / Tapping" }] },
  { slug: "self-drilling-screws", name: "Self Drilling Screw", category: "Screws", image: stock("photo-1611078489935-0cb964de46d6"), standard: "DIN 7504 / ISO 15480", description: "Combines a drill-point tip with a tapping screw — drills its own hole and forms threads in a single operation, no pilot hole required.", sizes: "#6 to #14 | M3.5 to M6.3", threads: "Self-tapping with drill point", length: "13mm to 75mm", material: "Hardened Carbon Steel / SS Bi-metal", finish: ["Zinc Plated", "Ruspert", "Black Phosphate"], grades: ["Case Hardened", "Bi-metal A2"], applications: ["Roofing & Cladding", "Steel Framing", "HVAC Ducting"], dimensions: [{ label: "Drill Capacity", value: "1.5–6mm" }] },
  { slug: "machine-screws",       name: "Machine Screw",       category: "Screws", image: stock("photo-1565008447742-97f6f38c985c"), standard: "DIN 84 / DIN 85 / ASME B18.6.3", description: "Uniform-thread fastener for use with a tapped hole or a nut — available in pan, flat, round, fillister and oval head styles.", sizes: "M2 to M12 | #2 to 1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "5mm to 100mm", material: "Steel / Brass / SS", finish: ["Zinc Plated", "Plain", "Brass"], grades: ["4.8", "8.8", "A2-70"], applications: ["Electronics", "Appliances", "Light Machinery"], dimensions: [{ label: "Head Styles", value: "Pan/Flat/Round" }] },
  { slug: "wood-screws",          name: "Wood Screw",          category: "Screws", image: stock("photo-1599837487535-eea2a7e83fe1"), standard: "DIN 96 / DIN 97 / ASME B18.6.1", description: "Tapered screw with a coarse, deep thread for fastening into wood. Available in flat, round, oval and bugle head styles.", sizes: "#4 to #14 | 3mm to 8mm", threads: "Coarse wood thread", length: "10mm to 150mm", material: "Carbon Steel / Brass / SS", finish: ["Yellow Zinc", "Brass", "Black"], grades: ["Standard", "A2-70"], applications: ["Carpentry", "Furniture", "Timber Construction"], dimensions: [{ label: "Point", value: "Sharp gimlet" }] },
  { slug: "drywall-screws",       name: "Drywall Screw",       category: "Screws", image: stock("photo-1581094288338-2314dddb7ece"), standard: "DIN 18182 / ASTM C1002", description: "Bugle-head screw with a fine or coarse thread for fixing gypsum board to wood or metal studs. Phosphate-coated for grip and rust resistance.", sizes: "#6 to #8 | 3.5mm to 4.2mm", threads: "Fine (metal stud) / Coarse (wood stud)", length: "25mm to 90mm", material: "Hardened Carbon Steel", finish: ["Black Phosphate"], grades: ["Case Hardened"], applications: ["Drywall / Gypsum Board", "Interior Partitions", "Ceilings"], dimensions: [{ label: "Head", value: "Bugle" }] },
  { slug: "set-screws",           name: "Set Screw",           category: "Screws", image: local("set-screw.webp"),       standard: "DIN 913 / 914 / 915 / 916", description: "Headless screw with internal hex (Allen) drive used to secure a pulley, gear or collar to a shaft. Available in cup, cone, flat, dog and oval point styles.", sizes: "M3 to M24 | #4 to 1\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "3mm to 60mm", material: "Hardened Alloy Steel / SS", finish: ["Black Oxide", "Plain"], grades: ["45H", "12.9", "A2-70"], applications: ["Pulleys", "Couplings", "Collars", "Shaft Hardware"], dimensions: [{ label: "Hardness", value: "43–53 HRC" }] },
  { slug: "socket-head-screws",   name: "Socket Head Screw",   category: "Screws", image: local("socket-cap-screw.jpg"), standard: "DIN 912 / ASME B18.3", description: "High-strength cap screw with a cylindrical head and internal hex drive. Provides a clean look and high torque capacity.", sizes: "M3 to M48 | #4 to 1-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "5mm to 200mm", material: "Alloy Steel / SS 304 / SS 316", finish: ["Black Oxide", "Plain", "Zinc"], grades: ["12.9", "10.9", "A2-70", "A4-80"], applications: ["Tooling", "Dies & Moulds", "Machinery", "Precision Assembly"], dimensions: [{ label: "Diameter", value: "M3 – M48" }, { label: "Hardness", value: "280–365 HB" }] },
  { slug: "countersunk-screws",   name: "Countersunk Screw",   category: "Screws", image: local("countersunk-screw.jpg"), standard: "DIN 7991 / ISO 10642", description: "Flat-head countersunk socket screw with 90° head angle for flush mounting in machinery, panels and architectural metalwork.", sizes: "M3 to M24 | #4 to 1\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "6mm to 100mm", material: "Alloy Steel / Stainless Steel", finish: ["Black", "Plain", "Zinc"], grades: ["10.9", "A2-70"], applications: ["Furniture", "Machinery", "Architectural Metalwork"], dimensions: [{ label: "Head Angle", value: "90°" }] },

  // ───────── WASHERS ─────────
  { slug: "plain-washers",      name: "Plain Washer",      category: "Washers", image: stock("photo-1565008447742-97f6f38c985c"), standard: "DIN 125 / ISO 7089", description: "Flat round washer used to distribute the load of a threaded fastener across a wider surface area.", sizes: "M2 to M64 | #4 to 2\"", threads: "—", length: "—", material: baseMaterial + " / Alloy Steel", finish: ["Plain", "Zinc Plated", "HDG"], grades: ["140 HV", "200 HV", "A2-70"], applications: ["General Fastening", "Load Distribution"], dimensions: [{ label: "Hardness", value: "140–300 HV" }] },
  { slug: "spring-washers",     name: "Spring Washer",     category: "Washers", image: stock("photo-1599837487535-eea2a7e83fe1"), standard: "DIN 127 / IS 3063", description: "Split helical washer that creates spring tension under load to resist loosening from vibration. Most common locking washer style.", sizes: "M2 to M48", threads: "—", length: "—", material: "Spring Steel / Stainless Steel", finish: ["Plain", "Zinc Plated", "Phosphate"], grades: ["Spring Steel 65Mn", "A2-70"], applications: ["Vibration Resistance", "Machinery", "Automotive"], dimensions: [{ label: "Type", value: "Single Coil" }] },
  { slug: "lock-washers",       name: "Lock Washer",       category: "Washers", image: stock("photo-1620230874645-0c0a3e2c6a2f"), standard: "DIN 6798 / ASME B18.21.1", description: "Hardened washer with serrated edges (internal or external tooth) that bite into the joint to prevent loosening.", sizes: "M2 to M30", threads: "—", length: "—", material: "Spring Steel / Stainless Steel", finish: ["Zinc Plated", "Phosphate"], grades: ["Spring Steel", "A2-70"], applications: ["Electrical Connections", "Vibration-prone Assemblies"], dimensions: [{ label: "Tooth Style", value: "Internal/External" }] },
  { slug: "fender-washers",     name: "Fender Washer",     category: "Washers", image: stock("photo-1581094288338-2314dddb7ece"), standard: "Custom / ANSI B18.21.1", description: "Oversized flat washer with a small hole and a large outside diameter — distributes load across thin or soft materials such as sheet metal.", sizes: "M5 to M16 (large OD)", threads: "—", length: "—", material: baseMaterial, finish: ["Zinc Plated", "Plain", "HDG"], grades: ["Standard"], applications: ["Sheet Metal", "Auto Body Repair", "HVAC"], dimensions: [{ label: "OD : ID Ratio", value: "≥ 3 : 1" }] },
  { slug: "tooth-lock-washers", name: "Tooth Lock Washer", category: "Washers", image: stock("photo-1572883454114-1cf0031ede2a"), standard: "DIN 6797 / DIN 6798", description: "Washer with sharp teeth around the inner or outer edge that grip both the bolt head and the joint to prevent rotation.", sizes: "M3 to M24", threads: "—", length: "—", material: "Hardened Spring Steel / SS", finish: ["Zinc Plated", "Phosphate"], grades: ["Spring Steel", "A2-70"], applications: ["Electrical Earthing", "Anti-rotation Joints"], dimensions: [{ label: "Tooth Type", value: "Int / Ext" }] },
  { slug: "flat-washers",       name: "Flat Washer",       category: "Washers", image: stock("photo-1530124566582-a618bc2615dc"), standard: "DIN 125 / ASME B18.22.1", description: "Standard flat washer for general-purpose load spreading and bolt-bearing surface protection.", sizes: "M2 to M64", threads: "—", length: "—", material: baseMaterial + " / Brass / Nylon", finish: ["Plain", "Zinc Plated", "HDG"], grades: ["140 HV", "A2-70"], applications: ["General Fastening", "Spacing", "Insulation (nylon)"], dimensions: [{ label: "Thickness", value: "0.5 – 5mm" }] },

  // ───────── RIVETS ─────────
  { slug: "blind-rivets",        name: "Blind Rivet",        category: "Rivets", image: stock("photo-1559166631-ef208440efd1"), standard: "DIN 7337 / ISO 15983", description: "Tubular rivet (also called pop rivet) installed from one side of a joint using a blind-rivet tool. Ideal where the rear of the joint is inaccessible.", sizes: "Ø2.4 to Ø6.4mm", threads: "—", length: "4mm to 30mm grip", material: "Aluminium / Steel / SS / Copper", finish: ["Plain", "Painted", "Anodized"], grades: ["AlMg5", "A2", "A4"], applications: ["Sheet Metal", "Aerospace", "Cladding", "Signage"], dimensions: [{ label: "Body", value: "Tubular" }] },
  { slug: "solid-rivets",        name: "Solid Rivet",        category: "Rivets", image: stock("photo-1581093588401-fbb62a02f120"), standard: "DIN 660 / IS 1929", description: "One-piece solid rivet that is hot- or cold-formed during installation. Provides the strongest, most permanent rivet joint.", sizes: "Ø3 to Ø36mm", threads: "—", length: "5mm to 200mm", material: "Steel / Aluminium / Copper / Brass", finish: ["Plain", "HDG"], grades: ["Mild Steel", "Al99", "Cu-DHP"], applications: ["Structural Steel", "Bridges", "Boiler Manufacturing"], dimensions: [{ label: "Head Style", value: "Snap / Flat / Pan" }] },
  { slug: "semi-tubular-rivets", name: "Semi Tubular Rivet", category: "Rivets", image: stock("photo-1611078489935-0cb964de46d6"), standard: "DIN 7340 / ISO 1051", description: "Rivet with a partial bore (drilled hole) at the tail that allows easier setting with less force than solid rivets.", sizes: "Ø2 to Ø8mm", threads: "—", length: "3mm to 50mm", material: "Steel / Brass / Aluminium", finish: ["Plain", "Brass", "Zinc"], grades: ["Mild Steel", "Brass"], applications: ["Brake Linings", "Lighting", "Leather Goods"], dimensions: [{ label: "Bore Depth", value: "≤ 1.12 × dia" }] },
  { slug: "drive-rivets",        name: "Drive Rivet",        category: "Rivets", image: stock("photo-1565008447742-97f6f38c985c"), standard: "Custom", description: "Hammer-driven rivet with a pre-set pin in the body — installation is by simply hammering the pin flush with the head.", sizes: "Ø3 to Ø8mm", threads: "—", length: "6mm to 25mm", material: "Aluminium / Steel", finish: ["Plain", "Painted"], grades: ["Aluminium", "Steel"], applications: ["Plastic-to-metal Joining", "Signage", "Light Assembly"], dimensions: [{ label: "Setting", value: "Hammer" }] },

  // ───────── ANCHORS ─────────
  { slug: "wedge-anchors",     name: "Wedge Anchor",     category: "Anchors", image: stock("photo-1581094271901-8022df4466f9"), standard: "ETA approval / ICC-ES", description: "Heavy-duty mechanical anchor with an expanding wedge clip that grips concrete as the nut is tightened. Highest holding power for solid concrete.", sizes: "M6 to M24 | 3/8\" to 1\"", threads: "Metric Coarse | UNC", length: "50mm to 250mm", material: "Carbon Steel / SS 304 / SS 316", finish: ["Zinc Plated", "HDG", "Mechanical Galvanized"], grades: ["Carbon Steel", "A2-70", "A4-80"], applications: ["Concrete Anchoring", "Steel Columns", "Heavy Equipment"], dimensions: [{ label: "Embed Depth", value: "≥ 4 × dia" }] },
  { slug: "sleeve-anchors",    name: "Sleeve Anchor",    category: "Anchors", image: stock("photo-1581092334651-ddf26d9a09d0"), standard: "Custom / ICC-ES", description: "Pre-assembled anchor consisting of a threaded stud, expansion sleeve, nut and washer. Suitable for solid concrete, brick and block.", sizes: "M6 to M16 | 1/4\" to 3/4\"", threads: "Metric Coarse | UNC", length: "50mm to 200mm", material: "Carbon Steel / SS 304", finish: ["Zinc Plated", "HDG"], grades: ["Carbon Steel", "A2-70"], applications: ["Brick & Block Walls", "Light Concrete Fixings"], dimensions: [{ label: "Anchor Body", value: "Sleeve + stud" }] },
  { slug: "chemical-anchors",  name: "Chemical Anchor",  category: "Anchors", image: stock("photo-1581094288338-2314dddb7ece"), standard: "ETA / EAD 330499-00-0601", description: "Threaded stud bonded into a drilled hole using a two-part epoxy or polyester resin. Highest load capacity, ideal for cracked concrete.", sizes: "M8 to M30 | 3/8\" to 1-1/4\"", threads: "Metric Coarse | UNC", length: "80mm to 350mm", material: "High-tensile Steel / SS 316", finish: ["Zinc Plated", "HDG", "SS"], grades: ["8.8", "5.8", "A4-80"], applications: ["Cracked Concrete", "Seismic Anchoring", "Rebar Doweling"], dimensions: [{ label: "Cure Time", value: "Per resin spec" }] },
  { slug: "drop-in-anchors",   name: "Drop-in Anchor",   category: "Anchors", image: stock("photo-1565008447742-97f6f38c985c"), standard: "Custom / ICC-ES", description: "Internally-threaded female expansion anchor flush-set into concrete. Allows removable threaded fasteners — ideal for ceilings and overhead.", sizes: "M6 to M20 | 1/4\" to 3/4\"", threads: "Internal Metric / UNC", length: "25mm to 65mm", material: "Carbon Steel / SS 304", finish: ["Zinc Plated"], grades: ["Carbon Steel", "A2-70"], applications: ["Ceiling Hangers", "Cable Trays", "MEP Supports"], dimensions: [{ label: "Setting", value: "Setting tool required" }] },

  // ───────── STUDS ─────────
  { slug: "full-thread-studs", name: "Full Thread Stud", category: "Studs", image: local("stud-bolt.webp"),    standard: "DIN 976-1 / ASME B18.31.2", description: "Continuously threaded stud (no plain shank) for use with two nuts in flange and structural connections. Cut to length on demand.", sizes: "M6 to M100", threads: "Metric Coarse & Fine | UNC", length: "30mm to 3000mm", material: "Carbon / Alloy / Stainless Steel", finish: ["Plain", "HDG", "Zinc", "PTFE / Xylan"], grades: ["4.6", "8.8", "10.9", "B7", "B8M"], applications: ["Flange Joints", "Cut-to-length", "Anchoring"], dimensions: [{ label: "Diameter", value: "M6 – M100" }] },
  { slug: "double-end-studs",  name: "Double End Stud",  category: "Studs", image: local("double-end-stud.webp"), standard: "ASME B18.2.1 / DIN 2510", description: "Double-end stud with equal or unequal thread lengths on both ends and an unthreaded center shank. Used where bolts cannot fit due to space constraints.", sizes: "M8 to M80 | 5/16\" to 3\"", threads: "Metric (Coarse & Fine) | UNC / UNF", length: "40mm to 2000mm", material: "ASTM A193 B7 / B16 / L7", finish: ["Plain", "HDG", "PTFE Coated"], grades: ["B7", "B7M", "B16", "L7", "B8", "B8M"], applications: ["Turbine Casings", "Valve Bodies", "Pump Assemblies", "Compressor Cylinders"], dimensions: [{ label: "Diameter", value: "M8 – M80" }, { label: "Length", value: "40 – 2000mm" }] },
  { slug: "threaded-rods",     name: "Threaded Rod",     category: "Studs", image: local("threaded-rod.jpg"),  standard: "DIN 975 / DIN 976 / ASTM A193", description: "Continuously-threaded all-thread rod sold in standard 1m / 3m lengths and cut to length on site for stud bolts, hangers and through-bolting.", sizes: "M3 to M100 | 1/4\" to 4\"", threads: "Metric Coarse & Fine | UNC / UNF | ACME", length: "1m / 3m standard | Custom", material: "Carbon / Alloy / Stainless Steel", finish: ["Plain", "HDG", "Zinc Plated", "PTFE"], grades: ["4.6", "8.8", "10.9", "B7", "B8M", "A2-70"], applications: ["Cut-to-length Studs", "Hangers", "MRO Maintenance"], dimensions: [{ label: "Diameter", value: "M3 – M100" }] },

  // ───────── BARS ─────────
  { slug: "round-bars",        name: "Round Bar",        category: "Bars",  image: local("round-bar.jpg"),    standard: "ASTM A276 / EN 10088 / IS 1570", description: "Bright or black alloy / stainless steel round bar for fastener fabrication, machined components and shafts.", sizes: "Ø6mm to Ø500mm", threads: "—", length: "Custom (typ. 3m or 6m)", material: "AISI 4140 / 4142 / EN8 / EN24 / SS 304 / SS 316", finish: ["Black", "Bright", "Polished", "Peeled & Ground"], grades: ["EN8", "EN24", "AISI 4140", "SS 304", "SS 316"], applications: ["Fastener Manufacturing", "Machined Parts", "Shafts"], dimensions: [{ label: "Diameter", value: "Ø6 – Ø500mm" }] },
];
