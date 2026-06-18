import type { Product, Industry, Standard } from "@/lib/api";

// ─── Category image constants ──────────────────────────────────────────────
const bImg = "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=600&q=80";
const nImg = "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80";
const wImg = "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80";
const sImg = "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80";
const aImg = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80";
const pImg = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80";
const rImg = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80";
const iImg = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80";
const cImg = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80";
const spImg = "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80";
const fImg = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80";
const pfImg = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80";

const local = (file: string) => `/products/${file}`;

const stdFinish = ["Plain / Black", "HDG", "Zinc Plated", "PTFE / Xylan"];
const stdDim = (d: string) => [{ label: "Diameter", value: d }];

// ─── Standards ───────────────────────────────────────────────────────────────
export const standardsData: Standard[] = [
  { id: 1, slug: "astm", code: "ASTM", name: "ASTM International", region: "United States / International", description: "ASTM standards (A193, A194, A320, A325, A490, F1554) are the global benchmark for high-strength bolting in petrochemical, oil & gas, power generation, and structural steel applications.", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&q=80", scope: "Mechanical and chemical specifications for fasteners, alloy steel bolting, stainless bolting, structural bolts, and anchor bolts.", applications: ["Oil & Gas", "Petrochemical", "Power Generation", "Refineries", "Pressure Vessels", "Structural Steel"], materials: ["A193 B7 / B7M / B16", "A194 2H / 4 / 7 / 8", "A320 L7 / L7M", "A325 / A490", "F1554"], examples: ["ASTM A193 B7 — Cr-Mo alloy stud bolts", "ASTM A194 2H — Heavy hex nuts", "ASTM A320 L7 — Low-temperature bolting", "ASTM F1554 — Anchor bolts"] },
  { id: 2, slug: "ansi-asme", code: "ANSI / ASME", name: "American National Standards Institute / ASME", region: "United States", description: "ANSI/ASME standards govern dimensional, threading, and head-form requirements of fasteners. ASME B18 covers bolts, screws, and nuts, while ASME B1 governs thread profiles.", image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80", scope: "Dimensional and thread standards for inch and metric series fasteners — hex bolts, heavy hex, socket products, studs, washers, and nuts.", applications: ["Flanged Joints (ASME B16.5)", "Pressure Piping", "Mechanical Assemblies", "Industrial Equipment"], materials: ["Carbon Steel", "Alloy Steel", "Stainless Steel"], examples: ["ASME B18.2.1 — Square and Hex Bolts", "ASME B18.2.2 — Nuts", "ASME B1.1 — Unified Inch Screw Threads", "ASME B18.3 — Socket Cap Screws"] },
  { id: 3, slug: "din", code: "DIN", name: "Deutsches Institut für Normung (German Standards)", region: "Germany / Europe", description: "DIN standards are the cornerstone of European fastener manufacturing. DIN 931, 933, 934, 976, and 6914 define metric hex bolts, full thread bolts, hex nuts, threaded rods, and high-strength structural bolts.", image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80", scope: "Metric fastener dimensions, threads (DIN 13), property classes (DIN EN ISO 898), surface treatments, and tolerances.", applications: ["Automotive", "Heavy Engineering", "Industrial Machinery", "Construction"], materials: ["Property Class 8.8 / 10.9 / 12.9", "Stainless A2 / A4", "Quenched & Tempered Alloy"], examples: ["DIN 931 — Hex bolts with shank", "DIN 933 — Hex bolts fully threaded", "DIN 934 — Hexagon nuts", "DIN 976 — Threaded rods", "DIN 6914 — High-strength structural hex bolts"] },
  { id: 4, slug: "iso", code: "ISO", name: "International Organization for Standardization", region: "International", description: "ISO standards harmonize fastener specifications globally. ISO 4014, 4017, 4032, 4033, 898-1, and 3506 are the most commonly cited for metric bolts, nuts, mechanical properties, and stainless steel fasteners.", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80", scope: "Globally accepted dimensions, mechanical properties, and quality assurance requirements for metric fasteners.", applications: ["Global OEM Supply", "Aerospace", "Marine", "Renewable Energy", "Heavy Equipment"], materials: ["8.8 / 10.9 / 12.9 Property Classes", "A2-70 / A4-80 Stainless", "Hot-Dip Galvanized"], examples: ["ISO 4014 — Hex bolts, partial thread", "ISO 4017 — Hex bolts, full thread", "ISO 4032 — Hex nuts", "ISO 898-1 — Mechanical properties of fasteners"] },
  { id: 5, slug: "bs", code: "BS", name: "British Standards (BSI)", region: "United Kingdom", description: "British Standards (BS) for fasteners include BS 3692, BS 4190, BS 4395, and BS EN 14399 governing HSFG bolts for UK structural steel and bridge construction.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80", scope: "Imperial and Whitworth thread series, HSFG structural bolts, and general-purpose UK fasteners.", applications: ["UK Structural Steel", "Bridges", "Heritage Restoration", "Railway"], materials: ["Grade 8.8 / 10.9 HSFG", "Carbon Steel BSW/BSF"], examples: ["BS 3692 — ISO Metric Precision Bolts", "BS 4190 — ISO Metric Black Hex Bolts", "BS 4395 — High-Strength Friction Grip Bolts", "BS EN 14399 — High-strength structural bolting"] },
  { id: 6, slug: "is", code: "IS", name: "Indian Standards (BIS)", region: "India", description: "Indian Standards (IS) issued by the Bureau of Indian Standards govern fasteners used across Indian infrastructure, railways, power, and manufacturing sectors.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80", scope: "Hex bolts/nuts, technical supply conditions, HSFG bolts, and threaded rods for Indian industry.", applications: ["Indian Railways", "Power Plants", "Construction", "Defence"], materials: ["Property Class 4.6 / 8.8 / 10.9 / 12.9", "Stainless A2 / A4"], examples: ["IS 1364 — Hexagon Head Bolts, Screws, and Nuts", "IS 1367 — Technical Supply Conditions", "IS 3757 — High Strength Structural Bolts", "IS 6639 — Hexagon Bolts for Steel Structures"] },
];

// ─── Industries ───────────────────────────────────────────────────────────────
const baseGrades = [
  { grade: "ASTM A193 B7", specification: "Cr-Mo alloy steel, quenched & tempered", usage: "General high-strength bolting" },
  { grade: "ASTM A194 2H", specification: "Heavy hex nuts for B7 studs", usage: "Mating nuts for flange joints" },
  { grade: "Class 8.8 / 10.9 / 12.9", specification: "Metric high-strength bolts", usage: "Structural and mechanical assemblies" },
  { grade: "SS 304 / 316", specification: "Austenitic stainless steel", usage: "Corrosion-resistant fastening" },
];
const baseReqs = ["Material certificates EN 10204 3.1/3.2", "Full traceability and batch identification", "Third-party inspection on request", "Custom coatings and platings available"];

const mi = (
  id: number, slug: string, name: string, description: string, heroDescription: string,
  image: string, appName: string, appDesc: string, appImg: string,
  keyReqs: string[], recommendedProductSlugs: string[]
): Industry => ({
  id, slug, name, description, heroDescription, image,
  grades: baseGrades,
  applications: [{ name: appName, description: appDesc, image: appImg }],
  keyRequirements: keyReqs,
  recommendedProductSlugs,
});

export const industriesData: Industry[] = [
  mi(1, "aerospace", "Aerospace",
    "Precision-engineered fasteners for aircraft, satellites, and defense aerospace systems.",
    "Aerospace applications demand zero-defect fasteners with exceptional strength-to-weight ratios and fatigue resistance. Titanium, Inconel, and high-tensile alloy steel fasteners are used for airframe assemblies, engine mounting, landing gear systems, and spacecraft structures.",
    "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80",
    "Aircraft Assembly", "Titanium and alloy fasteners for airframe and engine mounting structures.", "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80",
    ["AS9100D quality management system", "100% dimensional and hardness inspection", "Certified to NAS / MIL-SPEC standards", "Full lot traceability with serialization"],
    ["stud-bolts", "allen-bolt", "hex-bolts", "shoulder-bolt"]),

  mi(2, "agriculture", "Agriculture",
    "Heavy-duty fasteners for farm machinery, irrigation systems, and agricultural equipment.",
    "Agricultural machinery operates in harsh outdoor conditions with exposure to dust, moisture, and chemicals. Carbon steel and HDG fasteners are essential for tractors, harvesters, irrigation rigs, grain storage structures, and farm equipment maintenance.",
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80",
    "Farm Machinery", "Durable fasteners for tractors, harvesters, and agricultural implements.", "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    ["HDG coating for outdoor corrosion resistance", "Vibration-resistant locking nuts", "IS 1367 / DIN 933 standards", "Custom lengths for special farm equipment"],
    ["hex-bolts", "u-bolts", "carriage-bolt", "hex-nuts", "anchor-bolts"]),

  mi(3, "appliances", "Appliances",
    "Reliable fasteners for home appliances, white goods, and consumer electronics assembly.",
    "Home appliance manufacturing requires precision fasteners with tight dimensional tolerances, consistent torque performance, and aesthetic surface finishes. Socket screws, machine bolts, and flange bolts are used in washing machines, refrigerators, ovens, and air conditioners.",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    "Appliance Assembly", "Precision fasteners for white goods and consumer electronics manufacturing.", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ["Tight dimensional tolerances (±0.05mm)", "Zinc or nickel plating for appearance", "Vibration-resistant nylon-insert nuts", "RoHS-compliant surface coatings"],
    ["machine-bolt", "allen-bolt", "flange-bolt", "nylon-lock-nut"]),

  mi(4, "automotive", "Automotive",
    "High-tensile fasteners for vehicle assembly, engine systems, and chassis components.",
    "Automotive manufacturing demands fasteners with exceptional fatigue resistance, consistent clamping force, and precise mechanical properties. Grade 10.9 and 12.9 alloy steel bolts, flange bolts, and socket screws are critical for engine, suspension, and body panel assemblies.",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    "Engine & Chassis Assembly", "Grade 10.9/12.9 bolts for engine heads, suspension, and body panels.", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    ["PPAP documentation for OEM supply", "Cpk > 1.67 for critical dimensions", "Surface finish Ra 0.8 or better", "Batch traceability with bar coding"],
    ["flange-bolt", "allen-bolt", "stud-bolts", "hex-bolts", "lock-nuts"]),

  mi(5, "chemical-industry", "Chemical Industry",
    "Corrosion-resistant fasteners for chemical processing, storage, and transfer systems.",
    "Chemical processing environments expose fasteners to aggressive acids, alkalis, solvents, and chlorides. Stainless steel 316, duplex, and exotic alloy fasteners are specified for reactor vessels, acid storage tanks, piping systems, and scrubber units.",
    "https://images.unsplash.com/photo-1532187863486-abf4dbce1b86?w=1200&q=80",
    "Reactor & Vessel Bolting", "SS 316 and exotic alloy fasteners for chemical reactor flanges and vessels.", "https://images.unsplash.com/photo-1532187863486-abf4dbce1b86?w=600&q=80",
    ["Positive Material Identification (PMI)", "NACE MR0175 for sour service", "ASME PCC-1 bolt tightening compliance", "EN 10204 3.1/3.2 material certificates"],
    ["stud-bolts", "heavy-hex-bolts", "hex-nuts", "hex-bolts", "threaded-rods"]),

  mi(6, "general-heat-exchangers", "General Heat Exchangers",
    "High-temperature rated fasteners for shell-and-tube and plate heat exchangers.",
    "Heat exchangers operate under combined thermal stress, pressure cycling, and corrosive media. ASTM A193 B7 stud bolts with A194 2H heavy hex nuts are the standard for TEMA heat exchanger head-to-shell and channel cover flange connections.",
    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1200&q=80",
    "Shell & Tube Exchangers", "B7 stud bolts for heat exchanger shell-and-tube flange connections.", "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80",
    ["ASME Section VIII / TEMA compliance", "Full material traceability with MTCs", "PTFE/Xylan coating for anti-galling", "Controlled tightening with torque wrenches"],
    ["stud-bolts", "heavy-hex-bolts", "heavy-hex-nut", "hex-nuts"]),

  mi(7, "oil-and-gas", "Oil & Gas",
    "API and ASTM certified stud bolts for upstream, midstream, and downstream oil & gas operations.",
    "The oil & gas industry demands fasteners that withstand extreme pressures up to 20,000 PSI, temperatures from -60°C to 540°C, and highly corrosive H₂S and CO₂ environments. ASTM A193 B7 stud bolts are the backbone of flange connections, wellhead assemblies, and pipeline systems worldwide.",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
    "Pipeline Flange Connections", "B7 stud bolts for ASME B16.5 flanges from 1/2\" to 24\" NB.", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    ["NACE MR0175/ISO 15156 compliance", "API 6A / API 20E certification", "Full material traceability with MTCs", "Hydrostatic and pneumatic test compatibility"],
    ["stud-bolts", "heavy-hex-bolts", "heavy-hex-nut", "anchor-bolts", "hex-bolts"]),

  mi(8, "construction-and-infrastructure", "Construction & Infrastructure",
    "Structural bolts, anchor bolts, and foundation fasteners for buildings and civil infrastructure.",
    "Modern construction demands fasteners that provide reliable structural integrity for decades. From high-rise steel frames to bridge connections and foundation anchoring, HSFG bolts and anchor systems ensure safety and longevity in critical load-bearing applications.",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    "Steel Structure Erection", "High-strength structural bolts for beam-to-column connections and bracing.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    ["IS 4000 / AISC 360 structural bolt standards", "Hot-dip galvanized per IS 1367 / ASTM A153", "Proof load and wedge tensile testing", "Slip-critical connection capability"],
    ["structural-bolt", "anchor-bolts", "foundation-bolt", "j-bolt", "hex-bolts"]),

  mi(9, "defense-and-military", "Defense & Military",
    "MIL-SPEC and high-strength fasteners for armored vehicles, artillery, and defense equipment.",
    "Defense applications require fasteners that perform reliably under extreme shock, vibration, and environmental conditions. MIL-SPEC B7 bolts, Grade 12.9 socket head cap screws, and titanium fasteners are used in armored vehicles, naval systems, artillery mounts, and military aircraft.",
    "https://images.unsplash.com/photo-1562408590-e32931084e23?w=1200&q=80",
    "Armored Vehicle Assembly", "MIL-SPEC high-tensile bolts for armored vehicle chassis and hull assembly.", "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&q=80",
    ["DFARS compliant domestic material sourcing", "100% MPI and UT inspection", "Lot traceability with serialization", "AS9100D / NADCAP quality system"],
    ["stud-bolts", "allen-bolt", "hex-bolts", "heavy-hex-bolts"]),

  mi(10, "electrical-equipment", "Electrical Equipment",
    "Insulated and standard fasteners for switchgear, transformers, and electrical panels.",
    "Electrical equipment assembly requires fasteners that combine mechanical strength with electrical safety properties. Stainless steel, brass, and nylon fasteners are used in switchgear panels, transformer assemblies, distribution boards, cable management systems, and motor enclosures.",
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80",
    "Switchgear & Panel Assembly", "Stainless and brass fasteners for switchgear panels and transformer mounting.", "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    ["Non-magnetic grades for sensitive equipment", "Brass fasteners for electrical conductivity", "IP-rated corrosion protection coatings", "UL / CE compliance for electrical assemblies"],
    ["machine-bolt", "hex-bolts", "allen-bolt", "flange-nut", "hex-nuts"]),

  mi(11, "fire-fighting-systems", "Fire Fighting Systems",
    "Corrosion-resistant fasteners for sprinkler systems, hydrant lines, and fire suppression equipment.",
    "Fire fighting systems demand fasteners that maintain leak-free performance under pressure and resist corrosion in wet-pipe systems. Galvanized and stainless steel hex bolts, U-bolts, and pipe support fasteners are essential for sprinkler networks, fire hydrant lines, and pump room assemblies.",
    "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=1200&q=80",
    "Sprinkler System Supports", "HDG U-bolts and pipe clamps for fire sprinkler pipe support systems.", "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80",
    ["FM / UL approval for fire system components", "HDG or SS 316 for corrosion resistance", "Pressure-rated connections (ASME B1.20.1)", "Full dimensional inspection per IS 1239"],
    ["u-bolts", "hex-bolts", "flange-bolt", "threaded-rods", "hex-nuts"]),

  mi(12, "food-and-hotel-industry", "Food & Hotel Industry",
    "Hygienic-grade stainless steel fasteners for food processing, catering, and hospitality equipment.",
    "Food and hotel industries require fasteners meeting strict hygiene standards with smooth crevice-free surfaces and FDA-compliant materials resistant to frequent caustic and acidic CIP wash cycles. SS 316 fasteners are specified for food processing lines, commercial kitchens, and catering equipment.",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    "Food Processing Equipment", "SS 316 hex bolts for dairy, beverage, and commercial kitchen equipment.", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    ["Surface finish Ra ≤ 0.8 µm (electropolished)", "FDA 21 CFR / EU 1935/2004 compliance", "3-A Sanitary Standards certification", "No cadmium, lead, or toxic coatings"],
    ["hex-bolts", "allen-bolt", "flange-bolt", "hex-nuts", "lock-nuts"]),

  mi(13, "furniture-industry", "Furniture Industry",
    "Decorative and structural fasteners for furniture assembly, joinery, and interior fittings.",
    "Furniture manufacturing uses a wide variety of fasteners — carriage bolts, barrel nuts, cam lock bolts, and decorative hex bolts — for assembling wooden frames, metal structures, and upholstered furniture. Zinc-plated and chrome-finished fasteners provide both function and aesthetics.",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    "Furniture Frame Assembly", "Carriage bolts and barrel nuts for wooden and metal furniture frames.", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    ["Decorative chrome or zinc finishes", "Low-profile heads for aesthetic assembly", "Easy hand-tool installation requirements", "DIN 603 carriage bolt standards"],
    ["carriage-bolt", "machine-bolt", "hex-bolts", "dome-nut", "wing-nut"]),

  mi(14, "hardware-fittings", "Hardware Fittings",
    "General-purpose fasteners for hardware stores, builders, and maintenance applications.",
    "Hardware fittings require a comprehensive range of bolts, nuts, screws, and washers for general construction, plumbing, HVAC, and maintenance applications. Standard carbon steel and stainless steel fasteners in all sizes and finishes are supplied for hardware distribution and retail.",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "General Hardware Supply", "Complete range of hex bolts, nuts, and fasteners for builders and maintenance.", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ["IS 1364 / DIN 931 / DIN 934 standards", "Zinc plated and HDG for outdoor use", "Full range M3 to M64 in stock", "Custom packaging for retail distribution"],
    ["hex-bolts", "carriage-bolt", "hex-nuts", "lock-nuts", "threaded-rods"]),

  mi(15, "hvac-systems", "HVAC Systems",
    "Fasteners for heating, ventilation, and air conditioning equipment and ductwork supports.",
    "HVAC systems require a broad range of fasteners for duct hangers, chiller frames, air handling units, cooling towers, and piping supports. Threaded rods, U-bolts, flange bolts, and hex bolts in zinc-plated and SS 304 finishes are used extensively in HVAC installations.",
    "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80",
    "Duct & Equipment Supports", "Threaded rods and U-bolts for HVAC duct hangers and equipment frames.", "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600&q=80",
    ["Zinc plated for indoor installation", "SS 304 for outdoor and humid environments", "SMACNA duct support standards", "Pre-galvanized rods for ductwork hangers"],
    ["threaded-rods", "u-bolts", "flange-bolt", "hex-bolts", "coupling-nuts"]),

  mi(16, "roofing-systems", "Roofing Systems",
    "Self-drilling and structural fasteners for metal roofing, cladding, and rooftop equipment.",
    "Roofing systems demand fasteners that resist pull-out forces, weather exposure, and thermal movement. HDG anchor bolts, J-bolts, and structural hex bolts are used for purlins, metal sheet cladding, rooftop HVAC mounting, and skylight framing systems.",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    "Metal Roof & Purlin Fixing", "J-bolts and anchor bolts for purlin and metal roofing support structures.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    ["Hot-dip galvanized for weather resistance", "Pull-out strength tested per IS 13488", "ASTM A307 / IS 1367 standards", "Neoprene washers for weatherproofing"],
    ["j-bolt", "anchor-bolts", "hex-bolts", "u-bolts", "hex-nuts"]),

  mi(17, "food-and-agro-processing", "Food & Agro Processing",
    "Food-safe and stainless steel fasteners for grain, dairy, beverage, and food packaging plants.",
    "Food and agro processing plants handle grains, dairy products, vegetable oils, and beverages requiring fasteners that resist product contamination and are easy to clean. SS 304 and 316 fasteners with smooth surfaces are essential for mixers, silos, conveyors, and filling machines.",
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80",
    "Processing Line Assembly", "SS 304/316 fasteners for food conveyors, silos, and processing equipment.", "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
    ["FDA-compliant material grades", "Electropolished surface Ra ≤ 0.8 µm", "FSSAI and HACCP quality requirements", "No crevices or thread-locking adhesives in food zones"],
    ["hex-bolts", "allen-bolt", "flange-bolt", "hex-nuts", "elevator-bolt"]),

  mi(18, "heavy-engineering", "Heavy Engineering",
    "Heavy-duty bolting for large industrial machinery, presses, cranes, and earthmoving equipment.",
    "Heavy engineering operations involve massive machines operating under extreme loads, vibration, and shock. ASTM A193 B7 and Grade 10.9/12.9 high-strength hex bolts, eye bolts, and heavy hex nuts are critical for press assemblies, crane structures, gearboxes, and earthmoving equipment.",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80",
    "Heavy Machinery Assembly", "Grade 10.9/12.9 heavy hex bolts for presses, cranes, and industrial machinery.", "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
    ["Grade 10.9/12.9 high-strength compliance", "Nord-Lock or hardened washers", "Vibration-resistant locking systems", "Full mechanical testing with certificates"],
    ["heavy-hex-bolts", "stud-bolts", "eye-bolts", "hex-nuts", "heavy-hex-nut"]),

  mi(19, "laundries-and-kitchens", "Laundries & Kitchens",
    "Corrosion-resistant fasteners for commercial laundry equipment and industrial kitchen installations.",
    "Commercial laundries and industrial kitchens require fasteners that withstand continuous exposure to water, steam, detergents, and food-grade chemicals. SS 304 and 316 hex bolts, machine bolts, and flange nuts are used in washing machines, dryers, dishwashers, and kitchen equipment frames.",
    "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=1200&q=80",
    "Equipment Frame Assembly", "SS 304/316 machine bolts for commercial laundry and kitchen equipment frames.", "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=600&q=80",
    ["SS 304/316 for moisture and detergent resistance", "Smooth head forms for easy cleaning", "Low-profile fasteners for hygienic design", "NSF/ANSI 2 food equipment standards"],
    ["machine-bolt", "hex-bolts", "allen-bolt", "flange-nut", "lock-nuts"]),

  mi(20, "locks-and-hardware", "Locks & Hardware",
    "Precision fasteners for door hardware, lock mechanisms, and architectural ironmongery.",
    "Lock and hardware manufacturing requires precision-machined small fasteners with excellent dimensional accuracy and surface finish. Allen bolts, machine bolts, and set screws in zinc-plated and stainless steel grades are used for door locks, window hardware, hinges, and cabinet fittings.",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    "Lock Mechanism Assembly", "Precision allen bolts and machine screws for door lock and hinge assemblies.", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    ["Tight dimensional tolerances (±0.02mm)", "Chrome, nickel, or satin finish options", "DIN 912 / ISO 4762 socket screw standards", "RoHS-compliant plating for architectural use"],
    ["allen-bolt", "machine-bolt", "csk-allen-bolt", "shoulder-bolt", "hex-nuts"]),

  mi(21, "material-handling-equipment", "Material Handling Equipment",
    "Heavy-duty fasteners for forklifts, conveyors, hoists, and material handling machinery.",
    "Material handling equipment operates under continuous dynamic loads and vibration. Eye bolts, U-bolts, hex bolts, and anchor systems are critical for forklift mast assemblies, conveyor belt supports, crane hooks, hoists, and industrial storage racking systems.",
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&q=80",
    "Conveyor & Forklift Assembly", "Eye bolts and U-bolts for conveyor systems, hoists, and forklift mast assemblies.", "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80",
    ["WLL-rated eye bolts per DIN 580", "Vibration-resistant locking mechanisms", "HDG coating for warehouse environments", "Grade 8 / 10.9 for high-load applications"],
    ["eye-bolts", "u-bolts", "hex-bolts", "heavy-hex-bolts", "anchor-bolts"]),

  mi(22, "medical-equipment-and-industry", "Medical Equipment & Industry",
    "High-precision stainless steel fasteners for medical devices, hospital equipment, and surgical systems.",
    "Medical equipment manufacturing demands fasteners with exceptional corrosion resistance, biocompatibility, and ultra-clean surface finishes. SS 316L and titanium socket head cap screws, CSK screws, and machine bolts are specified for MRI machines, surgical tables, hospital beds, and diagnostic equipment.",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    "Medical Device Assembly", "SS 316L and titanium allen bolts for medical imaging, surgical, and hospital equipment.", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    ["SS 316L / Titanium Grade 2 biocompatibility", "Electropolished to Ra ≤ 0.4 µm", "ISO 13485 medical device QMS", "Clean-room packaging available"],
    ["allen-bolt", "csk-allen-bolt", "hex-bolts", "machine-bolt", "shoulder-bolt"]),

  mi(23, "mining-and-minerals", "Mining & Minerals",
    "High-tensile fasteners for crushers, conveyors, and mining equipment in mineral extraction.",
    "Mining operations subject fasteners to extreme vibration, shock loads, abrasion, and harsh outdoor conditions. Grade 10.9 and 12.9 high-strength fasteners and ASTM A193 B7 bolts are essential for crushers, conveyors, excavators, ball mills, and mineral processing equipment.",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    "Crusher & Conveyor Assembly", "Grade 12.9 socket screws and heavy hex bolts for crushers and conveyor structures.", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    ["Vibration-resistant locking mechanisms", "High-strength with controlled hardness", "Hot-dip galvanized for outdoor exposure", "Nord-Lock or tension-indicating washers"],
    ["heavy-hex-bolts", "stud-bolts", "allen-bolt", "eye-bolts", "anchor-bolts"]),

  mi(24, "offshore-structures", "Offshore Structures",
    "Duplex and super-duplex fasteners for offshore oil platforms, subsea systems, and marine structures.",
    "Offshore structures face the harshest combination of saltwater corrosion, high pressure, dynamic wave loads, and temperature extremes. Super duplex, Inconel, and PTFE-coated A193 B7 fasteners are critical for platform topsides, subsea manifolds, mooring systems, and jacket structures.",
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80",
    "Platform Topside Connections", "Super duplex and PTFE-coated B7 fasteners for offshore platform flange connections.", "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80",
    ["DNV / Lloyd's / ABS classification approval", "Salt spray testing (ASTM B117) 1000+ hours", "PTFE or ceramic coating for anti-galling", "Full traceability to heat number and batch"],
    ["stud-bolts", "heavy-hex-bolts", "anchor-bolts", "hex-bolts", "heavy-hex-nut"]),

  mi(25, "packaging-machines", "Packaging Machines",
    "Precision fasteners for packaging lines, filling machines, form-fill-seal, and labelling equipment.",
    "Packaging machinery requires precision fasteners with tight tolerances and smooth finishes to ensure hygienic, reliable operation. Allen bolts, shoulder bolts, and flange bolts in SS 304 and alloy steel are used in filling machines, wrapping equipment, palletizers, and label applicators.",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&q=80",
    "Filling & Wrapping Equipment", "Precision allen bolts and shoulder bolts for packaging lines and filling machines.", "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
    ["High-precision dimensional tolerances", "SS 304 for food-contact packaging lines", "Shoulder bolts for pivot and guide applications", "Easy-clean surface finishes"],
    ["allen-bolt", "flange-bolt", "shoulder-bolt", "hex-bolts", "lock-nuts"]),

  mi(26, "paper-and-pulp-industry", "Paper & Pulp Industry",
    "Corrosion-resistant fasteners for paper mills, pulp digesters, and chemical recovery boilers.",
    "Paper and pulp plants operate with steam, chemicals, and abrasive fibres that challenge standard fasteners. ASTM A193 B8M stainless and B7 alloy bolts are specified for digesters, press rolls, dryers, and chemical recovery systems in pulp and paper manufacturing.",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",
    "Digester & Press Roll Bolting", "B7 and B8M stud bolts for paper mill digesters and press roll assemblies.", "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    ["Chloride resistance for bleaching environments", "High-temperature service to 300°C", "PTFE coating for anti-seize on steam flanges", "Full traceability with mill test certificates"],
    ["stud-bolts", "hex-bolts", "u-bolts", "heavy-hex-bolts", "threaded-rods"]),

  mi(27, "petrochemical-and-chemical-plants", "Petrochemical & Chemical Plants",
    "B7/B8M bolting for reactors, columns, heat exchangers, and process vessels.",
    "Petrochemical plants process volatile chemicals at elevated temperatures and pressures. ASTM A193 B7 fasteners are specified for reactor vessels, heat exchangers, distillation columns, and piping systems handling hydrocarbons, acids, and caustic solutions.",
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80",
    "Distillation Column Bolting", "B7 stud bolts for petrochemical distillation columns and reactor flanges.", "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80",
    ["ASME PCC-1 bolt tightening compliance", "PTFE/Xylan coating for corrosion protection", "Third-party inspection (TPI) certificates", "EN 10204 3.1/3.2 material certificates"],
    ["stud-bolts", "heavy-hex-bolts", "heavy-hex-nut", "hex-nuts", "threaded-rods"]),

  mi(28, "pharmaceutical-industry", "Pharmaceutical Industry",
    "Ultra-clean SS 316L fasteners for pharmaceutical reactors, WFI systems, and clean rooms.",
    "Pharmaceutical manufacturing demands the highest levels of cleanliness and material purity. Electropolished SS 316L fasteners meet GMP requirements for bioreactors, WFI water systems, lyophilizers, and cleanroom equipment where product contamination must be zero.",
    "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80",
    "Bioreactor & WFI System Bolting", "Electropolished SS 316L fasteners for pharmaceutical bioreactors and WFI systems.", "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80",
    ["GMP-grade electropolished surface finish", "SS 316L with low carbon content", "ISO 13485 / 21 CFR Part 820 compliance", "Clean-room packed and certified"],
    ["allen-bolt", "hex-bolts", "flange-bolt", "hex-nuts", "lock-nuts"]),

  mi(29, "power-and-thermal-energy", "Power & Thermal Energy",
    "High-temperature stud bolts for steam turbines, boilers, and thermal power plant systems.",
    "Power generation facilities require fasteners with exceptional high-temperature strength, creep resistance, and fatigue life. ASTM A193 B7 and B16 grades ensure leak-free joints under continuous thermal cycling in coal, gas, and combined-cycle power plants.",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    "Steam Turbine & Boiler Bolting", "B16 stud bolts for turbine casings and boiler headers operating at 540°C.", "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    ["ASME Section III for nuclear applications", "Creep and stress-rupture testing", "100% ultrasonic testing for critical bolts", "Controlled tightening with hydraulic tensioners"],
    ["stud-bolts", "heavy-hex-bolts", "anchor-bolts", "heavy-hex-nut", "hex-bolts"]),

  mi(30, "prefabricated-buildings-epc", "Prefabricated Buildings / EPC",
    "Structural and anchor fasteners for pre-engineered buildings, PEB systems, and EPC projects.",
    "Pre-engineered and prefabricated building projects require large quantities of structural bolts, anchor bolts, and threaded rods with fast supply turnaround. HSFG bolts, foundation anchors, and purlin bolts in HDG finish are essential for industrial sheds, warehouses, and commercial PEB structures.",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    "PEB Structural Assembly", "HSFG bolts and foundation anchors for pre-engineered building structures.", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    ["IS 12843 / BS EN 14399 HSFG bolt standards", "Hot-dip galvanized for outdoor durability", "Proof load testing per IS 3757", "Fast supply for large-quantity EPC orders"],
    ["structural-bolt", "anchor-bolts", "foundation-bolt", "j-bolt", "threaded-rods"]),

  mi(31, "railways-and-transportation", "Railways & Transportation",
    "Rail track bolts, fishplate bolts, and rolling stock fasteners for railway infrastructure.",
    "Railway systems demand fasteners that resist constant vibration, dynamic loads, and thermal expansion. Track bolts, fishplate bolts, and coach screws with locking features ensure safe and reliable rail operations across tracks, bridges, and rolling stock assemblies.",
    "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
    "Rail Track Fastening", "Track bolts and fishplate bolts for mainline and metro railway track joints.", "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
    ["RDSO / IS 1084 track bolt specifications", "Vibration-resistant locking nuts", "HDG and black phosphated finishes", "Impact tested for low-temperature service"],
    ["track-bolt", "structural-bolt", "hex-bolts", "lock-nuts", "foundation-bolt"]),

  mi(32, "refineries", "Refineries",
    "High-temperature and sour-service fasteners for crude oil refinery process units.",
    "Oil refineries operate some of the most demanding fastener environments — high temperatures up to 540°C, high pressures, and hydrogen sulphide in sour gas environments. ASTM A193 B7, B16, and sour-service B7M fasteners are the standard for FCC units, hydrocrackers, and distillation columns.",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=80",
    "FCC Unit & Hydrocracker Bolting", "B7 and B16 stud bolts for refinery process units and high-temperature flanges.", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    ["NACE MR0175 sour service compliance", "API 20E bolting specification", "PTFE/Xylan coating for anti-galling", "Full material traceability with heat number"],
    ["stud-bolts", "heavy-hex-bolts", "heavy-hex-nut", "tap-end-stud", "hex-nuts"]),

  mi(33, "refrigeration-and-ventilation", "Refrigeration & Ventilation",
    "Stainless and zinc-plated fasteners for refrigeration units, cold storage, and ventilation systems.",
    "Refrigeration and ventilation systems require fasteners that resist condensation corrosion, thermal cycling, and vibration. SS 304 and zinc-plated hex bolts, U-bolts, and allen screws are used in cold room panels, compressor mounts, condensers, and ductwork supports.",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80",
    "Compressor & Cold Room Assembly", "Zinc-plated and SS 304 fasteners for refrigeration compressor mounts and cold rooms.", "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
    ["SS 304 for high-humidity environments", "Anti-vibration locking nuts for compressors", "Zinc phosphate coating for corrosion protection", "ASHRAE / IS 1239 compliance for refrigerant piping"],
    ["hex-bolts", "allen-bolt", "u-bolts", "threaded-rods", "lock-nuts"]),

  mi(34, "rolling-mill-and-fabrication", "Rolling Mill & Fabrication",
    "Heavy hex and structural fasteners for rolling mills, steel plants, and metal fabrication shops.",
    "Rolling mills and metal fabrication operate under extremely high loads, heat, and vibration. Heavy hex bolts, stud bolts, and structural fasteners in Grade 10.9 and ASTM A193 B7 are essential for rolling mill stands, slab casters, run-out tables, and fabrication jigs.",
    "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80",
    "Rolling Mill Stand Assembly", "Heavy hex bolts and stud bolts for rolling mill housings, stands, and slab casters.", "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80",
    ["Grade 10.9/12.9 for extreme loading", "Nord-Lock washers for vibration resistance", "High-temperature coatings for hot mill areas", "Full hardness and tensile testing"],
    ["heavy-hex-bolts", "stud-bolts", "structural-bolt", "hex-bolts", "heavy-hex-nut"]),

  mi(35, "rubber-and-polymer-industries", "Rubber & Polymer Industries",
    "Corrosion-resistant fasteners for rubber moulding, tyre manufacturing, and polymer processing.",
    "Rubber and polymer industries use fasteners in moulding presses, extruders, vulcanising equipment, and mixing mills. High-tensile alloy steel and SS 304 allen bolts, flange bolts, and hex bolts are specified for die clamping, press platens, and polymer processing machinery.",
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80",
    "Moulding Press & Extruder Assembly", "High-tensile allen bolts and flange bolts for rubber moulding presses and extruders.", "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80",
    ["High-temperature resistance for vulcanising", "Anti-seize coatings for polymer adhesion resistance", "Grade 12.9 for press clamping applications", "Easy-release surface coatings"],
    ["allen-bolt", "flange-bolt", "hex-bolts", "stud-bolts", "hex-nuts"]),

  mi(36, "shipping-and-marine", "Shipping & Marine",
    "Marine-grade fasteners for ships, ports, and offshore marine infrastructure.",
    "Marine environments demand exceptional corrosion resistance from saltwater, humid air, and cathodic reactions. ASTM A193 B8/B8M stainless steel fasteners and PTFE-coated B7 bolts are essential for ship hull structures, engine rooms, deck equipment, and port infrastructure.",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
    "Ship Hull & Engine Room", "SS 316 and PTFE-coated B7 fasteners for ship hull assemblies and engine room flanges.", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    ["DNV / Lloyd's / ABS classification approval", "Salt spray 1000+ hours ASTM B117", "PTFE ceramic coating for anti-galling", "Monel and duplex for subsea service"],
    ["stud-bolts", "hex-bolts", "u-bolts", "anchor-bolts", "heavy-hex-bolts"]),

  mi(37, "sign-and-display-boards", "Sign & Display Boards",
    "Decorative and structural fasteners for signage, advertising boards, and display systems.",
    "Sign and display systems require fasteners that combine structural reliability with attractive appearance. Stainless steel hex bolts, carriage bolts, and J-bolts with chrome or polished finishes are used for billboard structures, LED display frames, shop signage, and wayfinding systems.",
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=1200&q=80",
    "Billboard & Signage Structures", "SS hex bolts and J-bolts for billboard mounting frames and display structures.", "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=600&q=80",
    ["SS 304/316 for outdoor weather resistance", "Polished or satin finish for aesthetics", "Structural load rated per IS 875", "HDG for large outdoor billboard frames"],
    ["hex-bolts", "carriage-bolt", "j-bolt", "anchor-bolts", "hex-nuts"]),

  mi(38, "solar-energy-and-renewable", "Solar Energy & Renewable",
    "HDG and stainless fasteners for solar module mounting, tracker systems, and renewable energy plants.",
    "Solar energy installations require large quantities of fasteners for module mounting frames, tracker structures, and ground-mount racking. Hot-dip galvanized carbon steel and SS 304 carriage bolts, hex bolts, and J-bolts ensure 25-year service life for solar farms.",
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
    "Solar Panel Mounting Systems", "HDG carriage bolts and J-bolts for solar panel mounting frames and ground-mount systems.", "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    ["25-year corrosion resistance requirement", "HDG per ASTM A153 for steel structures", "SS 304 for aluminium framing systems", "IEC 62262 and EN 61000 compliance"],
    ["carriage-bolt", "j-bolt", "hex-bolts", "anchor-bolts", "threaded-rods"]),

  mi(39, "sugar-processing", "Sugar Processing",
    "Stainless and food-safe fasteners for sugar mills, evaporators, and crystallisation equipment.",
    "Sugar processing plants handle corrosive sugar liquor, steam, and cleaning chemicals requiring fasteners that resist corrosion and food contamination. SS 304 and 316 hex bolts, stud bolts, and U-bolts are used in roller mills, evaporators, centrifuges, and crystallisation pans.",
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1200&q=80",
    "Mill Roller & Evaporator Bolting", "SS 304 stud bolts and hex bolts for sugar mill rollers and evaporator vessels.", "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80",
    ["SS 304/316 for sugar liquor corrosion resistance", "FDA-compliant food-grade materials", "High-temperature steam service ratings", "Smooth surfaces to prevent sugar buildup"],
    ["stud-bolts", "hex-bolts", "u-bolts", "heavy-hex-bolts", "hex-nuts"]),

  mi(40, "textile-machinery", "Textile Machinery",
    "Precision fasteners for looms, spinning machines, dyeing equipment, and textile finishing lines.",
    "Textile machinery demands precision-engineered fasteners with excellent dimensional accuracy and vibration resistance for high-speed spinning, weaving, and finishing operations. Allen bolts, shoulder bolts, and flange bolts in alloy steel and SS 304 are specified for looms, rapier machines, and dyeing frames.",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80",
    "Loom & Spinning Machine Assembly", "Precision allen bolts and shoulder bolts for textile looms and high-speed spinning machines.", "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    ["High-speed vibration-resistant fasteners", "Precision ground shoulder bolts for guides", "SS 304 for dyeing and wet-processing sections", "Tight tolerances for high-speed rotating parts"],
    ["allen-bolt", "shoulder-bolt", "flange-bolt", "hex-bolts", "lock-nuts"]),

  mi(41, "office-and-consumer-products", "Office & Consumer Products",
    "Light-duty and decorative fasteners for office furniture, electronics, and consumer goods.",
    "Office furniture and consumer product manufacturing uses a wide variety of small fasteners for assembling desks, chairs, shelves, electronic enclosures, and consumer appliances. Machine bolts, allen screws, and decorative hex bolts in zinc-plated and chrome finishes are standard.",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    "Office Furniture Assembly", "Zinc-plated machine bolts and allen screws for office furniture and consumer electronics.", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    ["Decorative zinc or chrome plating", "Small sizes M3 to M12 standard range", "RoHS-compliant coatings", "Low-cost high-volume supply capability"],
    ["machine-bolt", "allen-bolt", "hex-bolts", "dome-nut", "wing-nut"]),

  mi(42, "water-treatment-and-desalination", "Water Treatment & Desalination",
    "Duplex SS and chloride-resistant fasteners for water treatment and desalination plants.",
    "Water treatment plants handle corrosive chemicals like chlorine, ozone, and caustic soda. ASTM A193 B8M stainless steel fasteners resist pitting and crevice corrosion, while PTFE-coated B7 bolts provide cost-effective solutions for less aggressive service conditions.",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    "Filtration & RO System Bolting", "B8M stainless fasteners for water filtration vessels and RO membrane housings.", "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    ["NSF/ANSI 61 potable water compliance", "PREN > 25 for chloride pitting resistance", "PTFE coating for anti-seize properties", "Compliant with IS 2062 / IS 1367"],
    ["stud-bolts", "hex-bolts", "u-bolts", "anchor-bolts", "threaded-rods"]),

  mi(43, "wind-energy-installations", "Wind Energy Installations",
    "Tower flange bolts, blade root bolts, and foundation anchor cages for wind turbine installations.",
    "Flanged tower bolts, blade root bolts, and foundation anchor cages for onshore and offshore wind turbine installations meeting IEC and GL standards. Large diameter high-tensile bolts with precise torque control ensure safe and reliable wind turbine operation.",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&q=80",
    "Wind Turbine Tower Flange Bolting", "High-tensile tower flange bolts and foundation anchor cages for wind turbines.", "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    ["IEC 61400 wind turbine standards", "GL certification for tower bolting", "Hydraulic tensioner compatible bolt design", "100% UT inspection for tower flange bolts"],
    ["structural-bolt", "foundation-bolt", "anchor-bolts", "hex-bolts", "heavy-hex-bolts"]),

  mi(44, "nuclear-energy", "Nuclear Energy",
    "ASME Section III nuclear-grade fasteners for reactor vessels, pressure boundaries, and safety systems.",
    "Nuclear power plants require fasteners with the highest quality assurance under ASME Section III NB/NC/ND. Controlled-chemistry alloy steel and stainless steel stud bolts with 100% NDE inspection are specified for reactor pressure vessels, steam generators, and primary loop piping.",
    "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&q=80",
    "Reactor Pressure Vessel Bolting", "ASME Section III nuclear-grade stud bolts for reactor vessel and steam generator flanges.", "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
    ["ASME Section III NB/NC/ND compliance", "100% UT, MT, and PT inspection", "N-stamp certified manufacturer requirements", "Full traceability to cast and heat number"],
    ["stud-bolts", "heavy-hex-bolts", "heavy-hex-nut", "hex-bolts"]),

  mi(45, "automotive-oem", "Automotive OEM",
    "OEM-grade precision fasteners for passenger car, commercial vehicle, and two-wheeler manufacturers.",
    "Automotive OEM supply demands the highest levels of dimensional precision, mechanical consistency, and traceability. Grade 10.9 and 12.9 flange bolts, hex bolts, and socket screws are manufactured to PPAP Level 3 and supplied with full batch documentation for engine, chassis, and body assembly lines.",
    "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80",
    "OEM Engine & Chassis Lines", "PPAP-documented Grade 10.9/12.9 bolts for OEM vehicle engine and chassis assembly.", "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80",
    ["PPAP Level 3 documentation", "SPC / Cpk > 1.67 for critical dims", "IATF 16949 quality management", "Bar-coded batch traceability"],
    ["flange-bolt", "allen-bolt", "hex-bolts", "stud-bolts", "lock-nuts"]),

  mi(46, "telecommunications", "Telecommunications",
    "Fasteners for telecom towers, antenna masts, data centre infrastructure, and cable management.",
    "Telecom infrastructure requires fasteners that withstand outdoor weather, wind loads, and seismic forces for 20+ years. Hot-dip galvanized anchor bolts, U-bolts, and structural hex bolts are used for mobile towers, antenna mounting frames, and base station equipment.",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    "Telecom Tower & Antenna Mounting", "HDG foundation bolts and U-bolts for telecom towers and antenna mast assemblies.", "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    ["IS 802 tower bolt specifications", "Hot-dip galvanized per ASTM A153", "Wind-load rated structural connections", "Anti-vibration locking nuts for antenna mounts"],
    ["foundation-bolt", "anchor-bolts", "u-bolts", "hex-bolts", "structural-bolt"]),

  mi(47, "steel-fabrication-and-structural-works", "Steel Fabrication & Structural Works",
    "HSFG and structural bolts for steel fabrication workshops and structural erection projects.",
    "Steel fabrication and structural erection require high-strength friction grip (HSFG) bolts, structural hex bolts, and anchor systems that meet IS 3757 and AISC specifications for load-bearing connections in industrial buildings, bridges, and heavy structures.",
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1200&q=80",
    "Structural Steel Connections", "HSFG bolts for moment connections, splice plates, and beam-to-column joints.", "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
    ["IS 3757 HSFG bolt standards", "Hot-dip galvanized for outdoor structures", "Proof load tested per IS 1367", "Slip-critical and bearing connection types"],
    ["structural-bolt", "heavy-hex-bolts", "anchor-bolts", "hex-bolts", "threaded-rods"]),

  mi(48, "pressure-vessels", "Pressure Vessels",
    "ASME Section VIII compliant stud bolts and heavy hex nuts for pressure vessel construction.",
    "Pressure vessels operating under ASME Section VIII Division 1 and 2 require stud bolts and heavy hex nuts manufactured to ASTM A193 B7 and A194 2H specifications. Full material traceability, hydrostatic test compatibility, and controlled tightening are mandatory requirements.",
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
    "Vessel Head & Nozzle Bolting", "B7 stud bolts and 2H heavy hex nuts for pressure vessel head-to-shell connections.", "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&q=80",
    ["ASME Section VIII Division 1 & 2 compliance", "Full hydrostatic and pneumatic test compatibility", "MTCs to EN 10204 3.1/3.2 standard", "Controlled tightening to ASME PCC-1"],
    ["stud-bolts", "heavy-hex-bolts", "heavy-hex-nut", "hex-nuts", "threaded-rods"]),

  mi(49, "cement-and-concrete", "Cement & Concrete",
    "Foundation anchors and structural fasteners for cement plants, concrete structures, and quarries.",
    "Cement plants and concrete manufacturing operate with abrasive dust, high temperatures, and heavy machinery requiring robust fasteners. Anchor bolts, foundation bolts, and heavy hex bolts in HDG carbon steel are critical for kiln drives, crusher mounts, clinker coolers, and silo structures.",
    "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&q=80",
    "Kiln Drive & Silo Mounting", "Foundation bolts and heavy hex bolts for cement kiln drives and silo base plates.", "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&q=80",
    ["HDG for cement dust environment", "ASTM F1554 foundation bolt standard", "High-strength Grade 8.8/10.9 for heavy machinery", "Abrasion-resistant coatings for plant environments"],
    ["anchor-bolts", "foundation-bolt", "j-bolt", "heavy-hex-bolts", "hex-nuts"]),

  mi(50, "infrastructure-and-bridges", "Infrastructure & Bridges",
    "High-strength structural bolts and anchor systems for bridges, highways, and civil infrastructure.",
    "Bridge and highway construction requires fasteners with exceptional tensile strength, fatigue resistance, and long-term corrosion protection. HSFG bolts, anchor bolts, and Grade 10.9 structural hex bolts are critical for bridge girder splices, bearing assemblies, parapet walls, and highway signage structures.",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    "Bridge Girder & Bearing Assembly", "Grade 10.9 structural bolts for bridge girder splices and bearing assembly connections.", "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    ["IS 4000 structural bolt standards", "Hot-dip galvanized per ASTM A123/A153", "Proof load and wedge tensile certification", "MCI (Migrating Corrosion Inhibitor) coating available"],
    ["structural-bolt", "anchor-bolts", "foundation-bolt", "heavy-hex-bolts", "hex-bolts"]),
];

// ─── Products ─────────────────────────────────────────────────────────────────

// Helper to make product entries concise
const mp = (
  id: number, slug: string, name: string, category: string, image: string,
  standard: string, description: string,
  sizes: string, threads: string, length: string, material: string,
  finish: string[], grades: string[], applications: string[]
): Product => ({
  id, slug, name, category, image, standard, description,
  sizes, threads, length, material, finish, grades, applications,
  dimensions: [{ label: "Size Range", value: sizes }],
});

export const productsData: Product[] = [
  // ── BOLTS ──────────────────────────────────────────────────────────────────
  { id: 1, slug: "stud-bolts", name: "Stud Bolt", category: "Bolts", image: local("stud-bolt.webp"), standard: "ASME B16.5 / DIN 976", description: "Fully threaded or partially threaded stud bolt manufactured from ASTM A193 Grade B7 chromium-molybdenum steel. Designed for high-temperature, high-pressure flange connections.", sizes: "M6 to M100 | 1/4\" to 4\"", threads: "Metric (Coarse & Fine) | UNC / UNF | BSW", length: "30mm to 3000mm", material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", finish: stdFinish, grades: ["B7", "B7M", "B16", "L7", "L7M", "B8", "B8M"], applications: ["Flange Connections", "Pressure Vessels", "Heat Exchangers", "Pipelines", "Refineries", "Power Plants"], dimensions: stdDim("M6 – M100") },
  { id: 2, slug: "hex-bolts", name: "Hex Bolt", category: "Bolts", image: local("hex-bolt.webp"), standard: "ASME B18.2.1 / DIN 931", description: "Hexagonal head bolt with six-sided head for wrench tightening. Most common general-purpose structural bolt.", sizes: "M6 to M64 | 1/4\" to 2-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF / BSW", length: "20mm to 500mm", material: "Alloy / Carbon / Stainless Steel", finish: stdFinish, grades: ["8.8", "10.9", "12.9", "B7", "A2-70"], applications: ["Structural Steel", "Machinery", "Flange Joints", "Equipment"], dimensions: stdDim("M6 – M64") },
  { id: 3, slug: "heavy-hex-bolts", name: "Heavy Hex Bolt", category: "Bolts", image: local("heavy-hex-bolt.webp"), standard: "ASME B18.2.1 / DIN 6914", description: "Heavy hex bolt with larger head dimensions for greater bearing surface in heavy-duty structural and pressure applications.", sizes: "M12 to M100 | 1/2\" to 4\"", threads: "Metric Coarse | UNC", length: "25mm to 600mm", material: "ASTM A193 B7 alloy steel", finish: stdFinish, grades: ["B7", "B7M", "B16", "L7"], applications: ["Flange Joints", "Pressure Vessels", "Heat Exchangers", "Heavy Steel"], dimensions: stdDim("1/2\" – 4\"") },
  mp(13, "flange-bolt", "Flange Bolt", "Bolts", bImg, "DIN 6921 / ISO 1665", "Bolt with integrated flange washer under the head for increased bearing area and anti-loosening. Available serrated or plain flange.", "M5 to M20", "Metric Coarse", "20mm to 120mm", "Carbon Steel / Stainless", stdFinish, ["8.8", "10.9", "A2-70"], ["Automotive", "Machinery", "HVAC"]),
  mp(14, "carriage-bolt", "Carriage Bolt", "Bolts", bImg, "DIN 603 / ASME B18.5", "Round-head square-neck bolt that self-locks in timber or square holes. Smooth domed head for aesthetic and safety.", "M6 to M20 | 1/4\" to 3/4\"", "Metric Coarse | UNC", "20mm to 300mm", "Carbon Steel / SS 304", ["Plain", "HDG", "Zinc"], ["4.6", "8.8", "A2-70"], ["Timber Structures", "Furniture", "Fencing", "Playground Equipment"]),
  { id: 6, slug: "eye-bolts", name: "Eye Bolt", category: "Bolts", image: local("eye-bolt.webp"), standard: "DIN 580 / ASME B18.15", description: "Forged eye bolt with a circular loop head for lifting, rigging and anchoring.", sizes: "M8 to M48 | 5/16\" to 2\"", threads: "Metric Coarse | UNC", length: "30mm to 200mm", material: "Forged Carbon Steel / SS 304 / SS 316", finish: ["HDG", "Plain", "Electro-galvanized"], grades: ["C15E", "Grade 8", "A2-70"], applications: ["Lifting", "Rigging", "Crane Hooks", "Anchoring"], dimensions: stdDim("M8 – M48") },
  { id: 5, slug: "u-bolts", name: "U Bolt", category: "Bolts", image: local("u-bolt.webp"), standard: "ASME B18.31.5 / DIN 3570", description: "U-shaped bolt for clamping pipes, tubes and round sections to structural supports.", sizes: "M6 to M36 | Pipe OD 1/2\" to 24\"", threads: "Metric Coarse | UNC", length: "Custom – based on pipe OD", material: "Carbon / Alloy / Stainless Steel", finish: ["HDG", "Plain", "Zinc"], grades: ["4.6", "8.8", "SS 304", "SS 316"], applications: ["Pipe Supports", "Auto Springs", "Cable Trays"], dimensions: stdDim("M6 – M36") },
  mp(15, "j-bolt", "J Bolt", "Bolts", bImg, "ASTM F1554 / IS 5624", "J-shaped anchor bolt embedded in concrete for anchor bolting of columns, equipment bases and structural frames.", "M10 to M48 | 3/8\" to 2\"", "Metric Coarse | UNC", "150mm to 1500mm", "Carbon Steel / Alloy Steel", ["Plain", "HDG"], ["F1554 Gr 36/55/105", "4.6", "8.8"], ["Foundation Anchoring", "Column Base Plates", "Machinery Bases"]),
  mp(16, "foundation-bolt", "Foundation Bolt", "Bolts", bImg, "ASTM F1554 / IS 5624", "Heavy-duty foundation bolt for securing structural steel columns and heavy equipment bases in concrete foundations.", "M12 to M80 | 1/2\" to 3\"", "Metric Coarse | UNC", "200mm to 2000mm", "Carbon Steel / Alloy Steel", ["Plain", "HDG"], ["F1554 Gr 36/55/105", "8.8", "10.9"], ["Structural Columns", "Equipment Foundations", "Bridge Piers"]),
  { id: 4, slug: "anchor-bolts", name: "Anchor Bolt", category: "Bolts", image: local("anchor-bolt.webp"), standard: "ASTM F1554 / IS 5624", description: "L-shaped, J-shaped or straight foundation bolt for embedding in concrete to secure structural columns and equipment.", sizes: "M10 to M100 | 3/8\" to 4\"", threads: "Metric Coarse | UNC", length: "150mm to 2000mm", material: "Carbon Steel / Alloy Steel", finish: ["HDG", "Plain"], grades: ["F1554 Gr 36 / 55 / 105", "Grade 8.8"], applications: ["Foundation", "Equipment Mounting", "Structural Columns"], dimensions: stdDim("M10 – M100") },
  mp(17, "elevator-bolt", "Elevator Bolt", "Bolts", bImg, "ASME B18.5", "Flat head bolt with large round head and square neck used in conveyor belts and elevator buckets to prevent rotation.", "M6 to M16 | 1/4\" to 5/8\"", "Metric Coarse | UNC", "20mm to 120mm", "Carbon Steel", ["Plain", "Zinc"], ["4.6", "8.8"], ["Conveyor Belts", "Elevator Buckets", "Agricultural Equipment"]),
  mp(18, "allen-bolt", "Allen Bolt / Socket Head Cap Screw", "Bolts", sImg, "DIN 912 / ASME B18.3 / ISO 4762", "Cylindrical head screw with internal hex drive (Allen key). High clamping force in confined spaces. Available in metric and UNC.", "M3 to M36 | #4 to 1-1/2\"", "Metric Coarse & Fine | UNC", "8mm to 200mm", "Alloy Steel / Stainless Steel / Titanium", ["Plain", "Black Oxide", "Zinc"], ["10.9", "12.9", "A2-70", "A4-80"], ["Machinery", "Tools", "Automotive", "Precision Equipment"]),
  mp(19, "csk-allen-bolt", "CSK Allen Bolt", "Bolts", sImg, "DIN 7991 / ISO 10642", "Countersunk head hex socket screw that sits flush with the surface. Ideal for flush-mounting applications.", "M3 to M20 | #4 to 3/4\"", "Metric Coarse", "8mm to 100mm", "Alloy Steel / SS 304", ["Plain", "Black Oxide"], ["10.9", "12.9", "A2-70"], ["Flush Mounting", "Automotive Panels", "Electronics"]),
  mp(20, "shoulder-bolt", "Shoulder Bolt", "Bolts", sImg, "DIN 7379 / ASME B18.3", "Bolt with a precision-ground unthreaded shoulder used as a pivot, shaft or spacer in mechanical assemblies.", "M4 to M20 | 3/16\" to 3/4\"", "Metric Fine", "10mm to 100mm shoulder", "Alloy Steel / SS 303", ["Plain", "Black Oxide"], ["12.9", "A2-70"], ["Hinges", "Linkages", "Pivot Points", "Jigs & Fixtures"]),
  mp(21, "t-head-bolt", "T Head Bolt", "Bolts", bImg, "DIN 186/261", "T-shaped head bolt used in machine tool T-slots for clamping workpieces. Head slides into slot and locks on tightening.", "M8 to M24 | 5/16\" to 1\"", "Metric Coarse", "50mm to 300mm", "Carbon Steel / Alloy Steel", ["Plain", "Black Oxide"], ["8.8", "10.9"], ["Machine Tools", "CNC Fixtures", "Clamping Systems"]),
  mp(22, "track-bolt", "Track Bolt", "Bolts", bImg, "IS 1084 / RDSO Standards", "Oval-neck track bolt with nut for rail joint fishplate connections. Manufactured to Indian Railways specifications.", "M22 to M24 | 7/8\" to 1\"", "Metric Coarse", "50mm to 100mm", "Carbon Steel IS 1086", ["Plain", "HDG"], ["Grade 4.6", "Grade 8.8"], ["Railway Track Joints", "Fishplates", "Rail Connectors"]),
  mp(23, "structural-bolt", "Structural Bolt", "Bolts", bImg, "ASTM A325 / A490 / BS EN 14399", "High-strength structural bolt for friction-type and bearing-type steel-to-steel connections in structural steelwork.", "M12 to M36 | 1/2\" to 1-1/2\"", "Metric Coarse | UNC", "25mm to 300mm", "Medium Carbon Alloy Steel", ["Plain", "HDG"], ["A325 Gr", "A490 Gr", "10.9", "S10T"], ["Steel Structures", "Bridges", "Industrial Buildings"]),
  mp(24, "tap-end-stud", "Tap End Stud", "Bolts", bImg, "DIN 938/939 / ASME B18.31.2", "Stud with short thread (tight-fit) on one end for screwing into a tapped hole and long thread on the other for nut engagement.", "M6 to M48 | 1/4\" to 2\"", "Metric Coarse & Fine | UNC", "30mm to 500mm", "ASTM A193 B7 / Alloy Steel", stdFinish, ["B7", "B7M", "B16", "8.8", "10.9"], ["Pump Casings", "Valve Bodies", "Engine Components"]),
  mp(25, "double-end-stud", "Double End Stud", "Bolts", bImg, "DIN 938/939 / ASME B18.31.2", "Threaded rod with equal-length threads on both ends, used with nuts on both sides for through-bolting applications.", "M6 to M48 | 1/4\" to 2\"", "Metric Coarse & Fine | UNC", "50mm to 500mm", "ASTM A193 B7 / Alloy Steel", stdFinish, ["B7", "B7M", "B16", "L7", "8.8"], ["Turbine Casings", "Compressors", "Flanged Joints"]),
  { id: 12, slug: "threaded-rods", name: "Threaded Rod / Stud Rod", category: "Bolts", image: local("stud-bolt.webp"), standard: "DIN 976 / ASME B18.31.3", description: "Fully threaded rod in various lengths for use as continuous anchor, hanger rod, or structural tension member.", sizes: "M6 to M64 | 1/4\" to 2-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "1000mm / 3000mm or custom", material: "Carbon Steel / Alloy / SS 304 / SS 316", finish: stdFinish, grades: ["4.6", "8.8", "B7", "A2-70"], applications: ["MEP Hangers", "Concrete Anchors", "Structural Ties", "Pipe Supports"], dimensions: stdDim("M6 – M64") },
  mp(26, "machine-bolt", "Machine Bolt", "Bolts", bImg, "ASME B18.2.1 / DIN 558", "Square or hex head bolt used in machinery and general-purpose industrial assemblies.", "M6 to M30 | 1/4\" to 1-1/4\"", "Metric Coarse | UNC", "20mm to 300mm", "Carbon Steel", ["Plain", "Zinc", "HDG"], ["4.6", "8.8"], ["General Machinery", "Industrial Equipment", "Agricultural Implements"]),

  // ── NUTS ────────────────────────────────────────────────────────────────────
  { id: 7, slug: "hex-nuts", name: "Hex Nut", category: "Nuts", image: nImg, standard: "DIN 934 / ASME B18.2.2 / ISO 4032", description: "Six-sided hexagonal nut — the most common nut style for use with hex bolts and threaded fasteners across all industries.", sizes: "M3 to M64 | #4 to 2-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "—", material: "Alloy Steel / Stainless Steel", finish: ["Plain", "Zinc Plated", "HDG", "Black Oxide"], grades: ["4", "5", "8", "10", "A2-70"], applications: ["General Fastening", "Structural", "Machinery"], dimensions: [{ label: "Across Flats", value: "As per standard" }] },
  mp(27, "heavy-hex-nut", "Heavy Hex Nut", "Nuts", nImg, "ASME B18.2.2 / ASTM A194", "Heavy hex nut with wider across-flats than standard hex nut. Used with ASTM A193 Grade B7 stud bolts on pressure flanges.", "M16 to M100 | 5/8\" to 4\"", "Metric Coarse | UNC", "—", "Carbon / Alloy Steel", ["Plain", "HDG", "PTFE"], ["A194 2H", "A194 2HM", "A194 7", "A194 8"], ["Pressure Vessels", "Flanges", "High-Pressure Joints"]),
  { id: 8, slug: "lock-nuts", name: "Lock Nut / Jam Nut", category: "Nuts", image: nImg, standard: "DIN 985 / DIN 982 / ISO 7042", description: "Self-locking nut with nylon insert (Nyloc) or all-metal prevailing-torque feature resisting vibration loosening.", sizes: "M3 to M48", threads: "Metric Coarse & Fine | UNC", length: "—", material: "Carbon / Alloy / Stainless Steel", finish: ["Zinc Plated", "Plain", "Black Oxide"], grades: ["6", "8", "10", "A2-70"], applications: ["Vibration-prone Assemblies", "Automotive", "Machinery"], dimensions: [{ label: "Across Flats", value: "As per standard" }] },
  mp(28, "nylon-lock-nut", "Nylon Lock Nut (Nyloc)", "Nuts", nImg, "DIN 985 / ISO 7042", "Hexagon nut with nylon insert that grips threads to resist vibration loosening without damaging the thread.", "M3 to M24 | #6 to 1\"", "Metric Coarse | UNC", "—", "Carbon Steel / SS 304", ["Zinc Plated", "Plain"], ["6", "8", "A2-70"], ["Electronics", "Automotive", "Light Machinery"]),
  mp(29, "dome-nut", "Dome Nut / Cap Nut", "Nuts", nImg, "DIN 1587 / ASME B18.6.3", "Closed-end nut with domed top that covers and protects the exposed thread end. Also decorative.", "M3 to M16 | #6 to 5/8\"", "Metric Coarse | UNC", "—", "Carbon Steel / SS 304 / Brass", ["Chrome", "Zinc", "Plain"], ["6", "8", "A2-70"], ["Automotive Trim", "Furniture", "Guard Rails"]),
  mp(30, "wing-nut", "Wing Nut", "Nuts", nImg, "DIN 315 / ASME B18.17", "Nut with two large wings for hand-tightening without tools. For quick-release and low-torque applications.", "M3 to M12 | #8 to 1/2\"", "Metric Coarse | UNC", "—", "Carbon Steel / Brass / SS", ["Plain", "Zinc"], ["4", "6"], ["Quick-release Assemblies", "Signage", "Temporary Fixtures"]),
  { id: 9, slug: "coupling-nuts", name: "Coupling Nut", category: "Nuts", image: nImg, standard: "DIN 6334 / ASME B18.2.2", description: "Long hex nut used to join two threaded rods or extend the length of a threaded fastener.", sizes: "M5 to M30", threads: "Metric Coarse | UNC", length: "30mm to 100mm", material: "Carbon / Alloy / SS", finish: ["Zinc Plated", "Plain", "HDG"], grades: ["6", "8", "A2-70"], applications: ["Threaded-rod Extension", "Anchor Systems", "MEP Hangers"], dimensions: [{ label: "Length", value: "≥ 3 × dia" }] },
  mp(31, "square-nut", "Square Nut", "Nuts", nImg, "DIN 562 / ASME B18.2.2", "Four-sided nut with greater bearing surface than hex nut. Used in channels, tracks and T-slots to prevent rotation.", "M3 to M24 | #10 to 1\"", "Metric Coarse | UNC", "—", "Carbon Steel", ["Plain", "Zinc", "HDG"], ["4", "6", "8"], ["T-slot Channels", "Timber Construction", "Machine Tools"]),
  mp(32, "flange-nut", "Flange Nut", "Nuts", nImg, "DIN 6923 / ISO 4161", "Hex nut with integrated wide circular flange acting as a built-in washer for increased bearing area.", "M5 to M24 | #10 to 1\"", "Metric Coarse", "—", "Carbon Steel / SS 304", ["Plain", "Zinc", "HDG"], ["6", "8", "10", "A2-70"], ["Automotive", "Sheet Metal", "Electrical Panels"]),
  mp(33, "slotted-nut", "Slotted Nut / Castle Nut", "Nuts", nImg, "DIN 935 / ASME B18.2.2", "Hex nut with slots machined into top face for use with cotter pin to lock against rotation in safety-critical applications.", "M6 to M52 | 1/4\" to 2\"", "Metric Coarse | UNC", "—", "Carbon / Alloy Steel", ["Plain", "Zinc"], ["6", "8", "B7"], ["Axle Nuts", "Steering Joints", "Critical Safety Connections"]),
  mp(34, "t-nut", "T Nut", "Nuts", nImg, "DIN 508 / ASME B18.29", "T-shaped nut inserted into T-slot channels in machine tables and extrusions for tool clamping.", "M5 to M20 | #10 to 3/4\"", "Metric Coarse | UNC", "—", "Carbon Steel / Stainless", ["Plain", "Black Oxide"], ["8", "10", "A2-70"], ["Machine Tables", "CNC Fixtures", "Aluminium Profiles"]),
  mp(35, "weld-nut", "Weld Nut", "Nuts", nImg, "DIN 929 / ISO 21670", "Nut with projections or flat base designed to be welded to sheet metal for permanent fastening.", "M4 to M16 | #8 to 5/8\"", "Metric Coarse", "—", "Carbon Steel / SS 304", ["Plain", "Zinc"], ["6", "8"], ["Sheet Metal", "Automotive Body", "Electrical Cabinets"]),
  mp(36, "cage-nut", "Cage Nut", "Nuts", nImg, "EIA 310 / IEC 60297", "Hex nut inside a spring steel cage pressed into square holes in server racks and equipment frames.", "M5 to M12 | #10 to 1/2\"", "Metric Coarse | UNC", "—", "Carbon Steel (Zinc plated)", ["Zinc Plated"], ["6", "8"], ["Server Racks", "Telecom Cabinets", "Electronic Enclosures"]),
  mp(37, "serrated-flange-nut", "Serrated Flange Nut", "Nuts", nImg, "DIN 6923 serrated / ISO 4161", "Flange nut with serrations under the flange that bite into surface to prevent loosening without additional locking hardware.", "M5 to M20 | #10 to 3/4\"", "Metric Coarse", "—", "Carbon Steel / SS", ["Plain", "Zinc", "HDG"], ["6", "8", "10"], ["Automotive", "Sheet Metal", "Electronic Assemblies"]),

  // ── WASHERS ─────────────────────────────────────────────────────────────────
  { id: 10, slug: "plain-washers", name: "Plain Washer", category: "Washers", image: wImg, standard: "DIN 125 / ASME B18.22.1", description: "Flat circular washer for distributing fastener load over a larger surface area and protecting workpiece surface.", sizes: "M3 to M100 | 1/8\" to 4\"", threads: "—", length: "—", material: "Carbon Steel / SS 304 / SS 316 / Brass", finish: ["Plain", "Zinc Plated", "HDG"], grades: ["200 HV", "A2-70", "A4-80"], applications: ["General", "Structural", "Pipe Flanges", "Heavy Machinery"], dimensions: [{ label: "OD", value: "As per standard" }] },
  { id: 11, slug: "spring-washers", name: "Spring Washer", category: "Washers", image: wImg, standard: "DIN 127 / ASME B18.21.1", description: "Split helical spring washer providing locking action by biting into nut and work surface under vibration and shock loads.", sizes: "M3 to M48 | 1/8\" to 2\"", threads: "—", length: "—", material: "Carbon Steel / Stainless / Phosphor Bronze", finish: ["Self-colour", "Zinc Plated"], grades: ["C75 Spring Steel", "A2-70"], applications: ["Vibration Service", "Automotive", "Railways"], dimensions: [{ label: "ID", value: "As per standard" }] },
  mp(38, "lock-washer", "Lock Washer", "Washers", wImg, "DIN 127 / ASME B18.21.1", "Hardened washer with prongs or serrations that lock into both the fastener and surface to prevent loosening.", "M3 to M36 | 1/8\" to 1-1/2\"", "—", "—", "Carbon Steel / SS", ["Plain", "Zinc", "Black Phosphate"], ["C75", "A2-70"], ["General Machinery", "Automotive", "Vibration Applications"]),
  mp(39, "flat-washer", "Flat Washer", "Washers", wImg, "DIN 125A / ISO 7089", "Standard flat disc washer for load distribution and surface protection in all general-purpose applications.", "M2 to M64 | #4 to 2-1/2\"", "—", "—", "Carbon Steel / SS / Nylon", ["Plain", "Zinc", "HDG"], ["ASTM F844", "ISO 7089"], ["General Use", "Structural", "Electrical"]),
  mp(40, "fender-washer", "Fender Washer", "Washers", wImg, "ASME B18.22.1", "Extra-large OD flat washer that distributes load over a very wide area. Used with soft materials and oversized holes.", "M5 to M16 | 3/16\" to 5/8\"", "—", "—", "Carbon Steel / SS", ["Zinc", "Plain"], ["ASTM F844"], ["Sheet Metal", "Automotive Body", "Electrical Panels"]),
  mp(41, "square-washer", "Square Washer", "Washers", wImg, "DIN 436", "Square-shaped washer for use in timber and wooden construction where round washers would rotate.", "M10 to M24 | 3/8\" to 1\"", "—", "—", "Carbon Steel", ["HDG", "Plain"], ["4.6", "8.8"], ["Timber Connections", "Roof Purlins", "Agricultural"]),
  mp(42, "star-washer", "Star Washer", "Washers", wImg, "DIN 6797 / ASME B18.21.1", "Internal or external tooth star washer providing electrical grounding and vibration resistance through sharp teeth.", "M3 to M20 | #6 to 3/4\"", "—", "—", "Carbon Steel / SS", ["Plain", "Zinc"], ["C60 Steel", "A2-70"], ["Electrical Grounding", "Electronics", "Automotive"]),
  mp(43, "belleville-washer", "Belleville Washer", "Washers", wImg, "DIN 2093", "Conical disc spring washer that maintains load under vibration and thermal expansion. Stackable for varying spring rate.", "M5 to M80 | 3/16\" to 3\"", "—", "—", "51CrV4 Spring Steel", ["Plain", "Phosphate"], ["As per DIN 2093"], ["Pressure Relief Valves", "High-temp Joints", "Expansion Compensation"]),
  mp(44, "tooth-lock-washer", "Tooth Lock Washer", "Washers", wImg, "DIN 6798", "Multi-tooth hardened washer that bites into fastener and mating surface to resist rotation and ensure electrical contact.", "M3 to M24 | #6 to 1\"", "—", "—", "Hardened Carbon Steel / SS", ["Plain", "Zinc"], ["HRC 44–50"], ["Electronic Assemblies", "Electrical Grounds", "Vibration Service"]),
  mp(45, "sealing-washer", "Sealing Washer", "Washers", wImg, "DIN 7980 / ISO 7092", "Metal washer with bonded rubber or neoprene face for fluid-tight sealing under bolt or screw heads.", "M4 to M20 | #8 to 3/4\"", "—", "—", "Zinc-plated Steel with EPDM/Neoprene", ["Zinc + Rubber"], ["As per application"], ["Roofing", "Plumbing", "HVAC Panels"]),

  // ── SCREWS ──────────────────────────────────────────────────────────────────
  mp(46, "self-tapping-screw", "Self Tapping Screw", "Screws", sImg, "DIN 7971/7972 / ISO 1479", "Screw with hardened thread that cuts its own mating thread in sheet metal, plastic or thin materials.", "ST2.9 to ST6.3 | #4 to #14", "Self-tapping (ST)", "9.5mm to 50mm", "Case-hardened Carbon Steel / SS 304", ["Zinc", "Black Oxide"], ["ST Type A / AB / B"], ["Sheet Metal", "Plastics", "Light Gauge Metal"]),
  mp(47, "self-drilling-screw", "Self Drilling Screw", "Screws", sImg, "DIN 7504 / AS 3566", "Screw with a drill-point tip that drills its own pilot hole and cuts threads in one operation. Tek screw.", "M4.2 to M6.3 | #8 to #14", "Self-drilling", "16mm to 100mm", "Case-hardened Carbon Steel", ["Zinc", "Galvanized"], ["Class 2 / 3 / 4", "Aerofast Type"], ["Steel Structures", "Roofing", "Cladding"]),
  mp(48, "machine-screw", "Machine Screw", "Screws", sImg, "DIN 84/963/965 / ASME B18.6.3", "Fully threaded screw for use in tapped holes or with nuts. Available in pan, flat, round, oval, and fillister heads.", "M1.6 to M10 | #0 to #3/8\"", "Metric Coarse & Fine | UNC / UNF", "3mm to 60mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Black Oxide"], ["8.8", "A2-70"], ["Electronics", "Instruments", "Light Machinery"]),
  mp(49, "wood-screw", "Wood Screw", "Screws", sImg, "DIN 97 / ASME B18.6.1", "Tapered shank screw with coarse thread designed to grip wood fibers. Available in flat, round, and oval heads.", "M3 to M10 | #4 to #14", "Wood screw thread", "12mm to 100mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Black Phosphate"], ["Softwood Grade", "Hardwood Grade"], ["Woodworking", "Furniture", "Joinery"]),
  mp(50, "drywall-screw", "Drywall Screw", "Screws", sImg, "ASTM C1002", "Bugle-head screw with sharp tip and fine/coarse thread for fastening drywall/plasterboard to wood or metal studs.", "M3.5 to M4.8 | #6 to #10", "Coarse or Fine (for metal)", "25mm to 100mm", "Case-hardened Carbon Steel", ["Black Phosphate", "Zinc"], ["ASTM C1002 Type S/W"], ["Drywall", "Plasterboard", "Partitioning"]),
  mp(51, "chipboard-screw", "Chipboard Screw", "Screws", sImg, "DIN 7505", "Coarse-thread screw for chipboard, MDF, and particleboard. Double-thread for fast drive and excellent pull-out.", "M3 to M6 | #6 to #12", "Coarse chipboard thread", "16mm to 120mm", "Carbon Steel", ["Zinc", "Yellow Zinc"], ["Grade 8.8"], ["Furniture", "Cabinets", "Flooring"]),
  mp(52, "socket-set-screw", "Socket Set Screw", "Screws", sImg, "DIN 913-916 / ISO 4026-4029", "Headless screw with internal hex socket used to lock a collar, gear or pulley onto a shaft.", "M3 to M24 | 1/8\" to 1\"", "Metric Coarse & Fine | UNC", "3mm to 60mm", "Alloy Steel / SS 316", ["Plain", "Black Oxide"], ["12.9", "A4-80"], ["Shaft Locking", "Couplings", "Pulleys", "Set Positions"]),
  mp(53, "grub-screw", "Grub Screw", "Screws", sImg, "DIN 913/914 / ISO 4026", "Headless socket screw (set screw) used in tight spaces where a protruding head is not acceptable.", "M2 to M16 | #4 to 5/8\"", "Metric Coarse", "3mm to 50mm", "Alloy Steel", ["Plain", "Black Oxide"], ["12.9"], ["Shaft Collars", "Set Positions", "Compact Assemblies"]),
  mp(54, "hex-head-screw", "Hex Head Screw", "Screws", sImg, "DIN 933 / ISO 4017", "Fully threaded hex head screw for threading directly into tapped holes without a nut.", "M3 to M20 | #10 to 3/4\"", "Metric Coarse & Fine | UNC", "6mm to 120mm", "Carbon Steel / SS", ["Zinc", "Plain", "HDG"], ["8.8", "10.9", "A2-70"], ["Machinery", "General Engineering", "Structural"]),
  mp(55, "pan-head-screw", "Pan Head Screw", "Screws", sImg, "DIN 7985 / ISO 7045", "Screw with low, wide pan-shaped head providing a large surface bearing area. Phillips or slotted drive.", "M2 to M10 | #2 to #3/8\"", "Metric Coarse | UNC", "4mm to 60mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Black"], ["8.8", "A2-70"], ["Electronics", "Sheet Metal", "Appliances"]),
  mp(56, "countersunk-screw", "Countersunk Screw", "Screws", sImg, "DIN 965 / ISO 7046", "Flat-head screw with 90° countersunk angle for flush surface mounting in countersunk holes.", "M2 to M12 | #2 to 1/2\"", "Metric Coarse | UNC", "6mm to 80mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Black"], ["8.8", "A2-70"], ["Flush Mounting", "Hinges", "Electronics"]),
  mp(57, "button-head-screw", "Button Head Screw", "Screws", sImg, "DIN 9427 / ISO 7380", "Low-profile dome head socket screw for applications where a low snag-free profile is required.", "M3 to M16 | #8 to 5/8\"", "Metric Coarse", "6mm to 60mm", "Alloy Steel / SS 316", ["Plain", "Black Oxide"], ["10.9", "A2-70"], ["Electronics", "Automotive Panels", "Covers"]),
  mp(58, "phillips-screw", "Phillips Screw", "Screws", sImg, "ASME B18.6.3 / DIN 7985", "Pan or flat head screw with Phillips (+) cross-shaped recess for power-tool driving. Most common screw type globally.", "M2 to M12 | #2 to 1/2\"", "Coarse | Fine | UNC", "6mm to 100mm", "Carbon Steel / SS / Brass", ["Zinc", "Plain", "Black Phosphate"], ["4.8", "A2-70"], ["General", "Electronics", "Furniture", "Appliances"]),

  // ── ANCHORS & FIXINGS ───────────────────────────────────────────────────────
  mp(59, "wedge-anchor", "Wedge Anchor", "Anchors & Fixings", aImg, "ASTM F1554 / ETA approved", "Expansion anchor for concrete with wedge clip mechanism that expands under load providing high pull-out resistance.", "M8 to M24 | 3/8\" to 1\"", "UNC / Metric", "60mm to 300mm", "Carbon Steel / SS 316", ["HDG", "Zinc", "Plain"], ["F1554 Gr 36/55", "5.6", "8.8"], ["Structural Columns", "Racking", "Handrails", "Heavy Equipment"]),
  mp(60, "sleeve-anchor", "Sleeve Anchor", "Anchors & Fixings", aImg, "ETA-approved / ASTM", "Stud-type expansion anchor with sleeve that expands against hole walls. For use in concrete and solid masonry.", "M6 to M16 | 1/4\" to 5/8\"", "Metric | UNC", "40mm to 200mm", "Carbon Steel / SS 316", ["Zinc", "HDG"], ["Grade 8"], ["Masonry", "Concrete", "Natural Stone"]),
  mp(61, "drop-in-anchor", "Drop-In Anchor", "Anchors & Fixings", aImg, "ICC-ES / ETA", "Internal expansion anchor flush-mounted in drilled holes. Set with setting tool. Accepts standard bolts/threaded rod.", "M6 to M20 | 1/4\" to 3/4\"", "Metric | UNC", "As per diameter", "Carbon Steel / SS 304", ["Zinc", "HDG"], ["Grade 8"], ["Ceilings", "HVAC Hangers", "Pipe Supports"]),
  mp(62, "chemical-anchor", "Chemical Anchor", "Anchors & Fixings", aImg, "ETA / ETAG 001", "Resin/epoxy-based anchor system for extremely high load capacity in concrete, brick and hollow sections.", "M8 to M30 | 3/8\" to 1-1/4\"", "Metric | UNC", "100mm to 500mm", "Alloy Steel / SS 316 threaded rod", ["HDG", "Plain"], ["F1554 Gr 105", "8.8", "12.9"], ["High-Load Structural", "Seismic Zones", "Cracked Concrete"]),
  mp(63, "shield-anchor", "Shield Anchor", "Anchors & Fixings", aImg, "DIN 571 / ISO 2339", "Machine-bolt type anchor with expanding shield for use in masonry, brick and concrete walls.", "M6 to M16 | 1/4\" to 5/8\"", "Metric | UNC", "40mm to 130mm", "Carbon Steel (Zinc)", ["Zinc Plated"], ["Grade 6"], ["Brick Walls", "Block Work", "Hollow Core Slabs"]),
  mp(64, "through-bolt-anchor", "Through Bolt Anchor", "Anchors & Fixings", aImg, "ETA / ASTM F1554", "Expansion through-bolt anchor for anchoring into concrete, where the bolt passes through the base fixture into concrete.", "M10 to M24 | 3/8\" to 1\"", "Metric | UNC", "100mm to 400mm", "Zinc-plated Carbon Steel", ["Zinc", "HDG"], ["5.6", "8.8"], ["Steel Structures", "Facades", "Post Bases"]),
  mp(65, "concrete-screw-anchor", "Concrete Screw Anchor", "Anchors & Fixings", aImg, "ICC-ES AC193 / ETA", "Self-tapping screw anchor for concrete and masonry — no plug required. Removable and reusable.", "M6 to M12 | 3/16\" to 1/2\"", "Self-tapping", "50mm to 150mm", "Case-hardened Carbon Steel / SS", ["Blue Zinc", "Stainless"], ["ASTM F1554"], ["Concrete", "Block", "Brick"]),

  // ── PINS ────────────────────────────────────────────────────────────────────
  mp(66, "dowel-pin", "Dowel Pin", "Pins", pImg, "DIN 7 / ISO 8734 / ASME B18.8.2", "Hardened precision pin for accurate location and alignment of mating machine parts. Press-fit or slip-fit.", "Ø 1mm to Ø 50mm | Ø 1/16\" to 2\"", "—", "6mm to 200mm", "Case-hardened Steel / SS 303 / Tungsten Carbide", ["Ground / Polished"], ["m6 / h8 tolerance"], ["Machine Alignment", "Jigs", "Die Sets", "Hinge Pivots"]),
  mp(67, "split-pin", "Split Pin / Cotter Pin", "Pins", pImg, "DIN 94 / ISO 1234 / ASME B18.8.1", "Soft metal bent-pin through-drilled holes in bolts and slots in castle nuts to prevent nut from turning.", "Ø 1mm to Ø 10mm | Ø 1/16\" to 3/8\"", "—", "12mm to 100mm", "Low Carbon Steel / SS 304 / Brass / Copper", ["Plain", "Zinc"], ["As per DIN 94"], ["Castle Nuts", "Clevis Pins", "Safety Locking"]),
  mp(68, "spring-pin", "Spring Pin", "Pins", pImg, "DIN 1481 / ISO 8752", "Slotted or coiled spring-steel pin that compresses on insertion and springs back to grip the hole. Easy removal.", "Ø 2mm to Ø 25mm | Ø 1/16\" to 1\"", "—", "6mm to 100mm", "Spring Steel / SS 420", ["Black Phosphate", "Zinc"], ["As per DIN 1481"], ["Couplings", "Hinges", "Cam Assemblies"]),
  mp(69, "clevis-pin", "Clevis Pin", "Pins", pImg, "DIN 1444 / ASME B18.8.1", "Headed pin retained by cotter pin or snap ring used in clevis linkages, hinges and fork ends.", "Ø 5mm to Ø 50mm | Ø 3/16\" to 2\"", "—", "20mm to 200mm", "Carbon Steel / Alloy Steel / SS 316", ["Plain", "Zinc", "Chrome"], ["8.8", "A2-70"], ["Lifting Gear", "Hydraulic Cylinders", "Clevis Connections"]),
  mp(70, "taper-pin", "Taper Pin", "Pins", pImg, "DIN 1 / ISO 2339", "Precision tapered pin used to lock collars, hubs and gears onto shafts. Self-locking taper prevents loosening.", "Ø 2mm to Ø 20mm | #0 to #10", "—", "14mm to 150mm", "Carbon Steel / SS 303", ["Plain"], ["As per DIN 1"], ["Shaft Collars", "Gears", "Pulleys"]),
  mp(71, "grooved-pin", "Grooved Pin", "Pins", pImg, "DIN 1471-1474 / ISO 8740-8745", "Parallel pin with longitudinal grooves that are rolled to expand slightly on insertion providing a secure press-fit.", "Ø 2mm to Ø 20mm | Ø 1/16\" to 3/4\"", "—", "8mm to 80mm", "Carbon Steel", ["Plain", "Zinc"], ["As per DIN 1471-1474"], ["Hinge Joints", "Pivot Pins", "Gearbox Components"]),
  mp(176, "parallel-pin", "Parallel Pin", "Pins", pImg, "DIN 7 / ISO 8734", "Unhardened or hardened straight parallel pin with uniform diameter throughout. Used for location, alignment and pivot joints.", "Ø 1mm to Ø 50mm | Ø 1/16\" to 2\"", "—", "6mm to 200mm", "Low Carbon Steel / SS 303 / SS 316", ["Ground Bright", "Zinc"], ["h8 / m6 tolerance"], ["Location Pins", "Alignment Fixtures", "Hinge Pivots", "Assembly Jigs"]),
  mp(177, "roll-pin", "Roll Pin (Coiled Spring Pin)", "Pins", pImg, "DIN 7343 / ISO 8748", "Coiled roll pin made from strip steel wound into a cylindrical form. Higher load capacity than slotted spring pins.", "Ø 2mm to Ø 25mm | Ø 1/16\" to 1\"", "—", "6mm to 100mm", "Spring Steel / SS 420", ["Black Phosphate", "Zinc", "Plain"], ["As per DIN 7343"], ["Gearboxes", "Linkages", "Coupling Hubs", "Cam Followers"]),
  mp(178, "knurled-pin", "Knurled Pin", "Pins", pImg, "DIN 1469 / ISO 8745", "Pin with diamond or straight knurl pattern on shank for permanent press-fit into un-threaded holes. Self-locking on insertion.", "Ø 2mm to Ø 16mm | Ø 1/16\" to 5/8\"", "—", "6mm to 80mm", "Carbon Steel / SS 304", ["Plain", "Zinc"], ["As per DIN 1469"], ["Permanent Locating", "Name Plates", "Pivot Bushings", "Handle Grips"]),
  mp(179, "hitch-pin", "Hitch Pin", "Pins", pImg, "DIN 11023 / ASME B18.8", "L-shaped or hair-pin style pin used to secure drawbars, clevis connections and agricultural hitching points. Fast manual attachment.", "Ø 6mm to Ø 25mm | 1/4\" to 1\"", "—", "50mm to 250mm", "Carbon Steel / SS 304", ["Plain", "Zinc", "HDG"], ["As per DIN 11023"], ["Trailer Hitches", "Agricultural Linkages", "Drawbars", "Quick Coupling"]),
  mp(180, "lynch-pin", "Lynch Pin", "Pins", pImg, "DIN 11023 / ASME B18.8", "Spring-loaded or plain retention pin passed through a clevis or hitch to prevent accidental withdrawal. Features retaining clip.", "Ø 5mm to Ø 16mm | 3/16\" to 5/8\"", "—", "50mm to 150mm", "Carbon Steel / SS 304 / Spring Steel", ["Plain", "Zinc", "Chrome"], ["As per standard"], ["Trailer Pins", "Agricultural Pins", "Safety Retention", "Quick Release Arms"]),
  mp(181, "solid-pin", "Solid Pin", "Pins", pImg, "DIN 7 / ISO 2338", "Full-diameter solid cylindrical pin with no hollowing, knurls or grooves. Provides maximum shear strength in dowel applications.", "Ø 1mm to Ø 50mm | Ø 1/16\" to 2\"", "—", "6mm to 300mm", "Carbon Steel / Alloy Steel / SS 303 / Brass", ["Ground", "Plain", "Chrome"], ["m6 / h8 tolerance"], ["Heavy Shear", "Die Alignment", "Press Fits", "Precision Machinery"]),
  mp(182, "taper-cotter-pin", "Taper Cotter Pin", "Pins", pImg, "DIN 1 / IS 549", "Tapered flat wedge pin used to lock components axially on shafts, especially pump and motor shaft–hub assemblies. Driven in pairs.", "Width 10mm to 50mm | Thickness 2mm to 10mm", "—", "80mm to 250mm", "Carbon Steel / Alloy Steel", ["Plain", "Zinc"], ["IS 549 / DIN 1477"], ["Pump Shafts", "Motor Couplings", "Wheel Hubs", "Gear Keyways"]),
  mp(183, "quick-release-pin", "Quick Release Pin", "Pins", pImg, "DIN 11023 / MIL-P-20022", "Push-button or pull-ring quick release pin for instant tool-free insertion and removal in maintenance and machinery applications.", "Ø 6mm to Ø 25mm | 1/4\" to 1\"", "—", "40mm to 200mm", "Alloy Steel / SS 316 / Hardened Carbon Steel", ["Plain", "Zinc", "SS Passivated"], ["Grade 8 / A2-70"], ["Maintenance Access", "Aircraft Ground Support", "Jig Fixtures", "Military Equipment"]),
  mp(184, "ball-lock-pin", "Ball Lock Pin", "Pins", pImg, "MIL-P-20022 / DIN EN ISO 13918", "Pin with spring-loaded locking balls that expand into a groove when inserted to prevent vibration-induced withdrawal. One-hand release.", "Ø 6mm to Ø 20mm | 1/4\" to 3/4\"", "—", "30mm to 150mm", "Hardened Alloy Steel / SS 316", ["Satin Chrome", "Plain", "Passivated"], ["Grade 8 / SS A4"], ["Tooling Fixtures", "Defence Equipment", "Jig Plates", "Aerospace Ground Equipment"]),
  mp(185, "safety-pin-industrial", "Safety Pin (Industrial)", "Pins", pImg, "DIN 11023 / ASME B18.8.1", "Large industrial safety pin (not a sewing pin) used to secure cotter pins, clevis joints and split pins against vibration loosening.", "Ø 2mm to Ø 10mm | #0 to 3/8\"", "—", "20mm to 120mm", "Carbon Steel / SS 304 / Spring Steel", ["Plain", "Zinc"], ["As per DIN 11023"], ["Lock-wiring", "Cotter Retention", "Clevis Guards", "Safety-critical Fastening"]),
  mp(186, "ejector-pin", "Ejector Pin (Die & Mould)", "Pins", pImg, "DIN 16756 / DIN 16757 / JIS B5116", "Precision hardened and ground pin used in injection mould bases to push the moulded part off the core side of the mould.", "Ø 1mm to Ø 32mm | Ø 1/16\" to 1-1/4\"", "—", "100mm to 400mm", "DIN 1.2344 (H13) / DIN 1.2379 / SS 303 / Nitrided Steel", ["Ground / Mirror Polished", "Nitrided"], ["HRC 50–54 (H13)", "HRC 60–62 (D2)"], ["Injection Moulding", "Die Casting", "Compression Moulding", "Transfer Mould Bases"]),
  mp(187, "guide-pin", "Guide Pin (Mould Base)", "Pins", pImg, "DIN 9841 / DIN 16752 / JIS B5101", "Precision guide pin (leader pin) with polished shank that ensures accurate alignment of mould halves and die sets.", "Ø 16mm to Ø 60mm | 5/8\" to 2-1/2\"", "—", "100mm to 400mm", "DIN 1.2083 (420 SS) / DIN 1.2316 / DIN 1.2344 (H13)", ["Mirror Polished", "Hard Chrome", "Nitrided"], ["HRC 52–56"], ["Mould Alignment", "Progressive Die Sets", "Stamping Tools", "Precision Jig Boring"]),
  mp(188, "straight-pin", "Straight Pin", "Pins", pImg, "DIN 7 / ISO 2338 / ASME B18.8.2", "Plain cylindrical straight pin without taper or groove. Used for general-purpose location, pivot and linchpin applications.", "Ø 0.6mm to Ø 50mm | Ø 0.025\" to 2\"", "—", "3mm to 300mm", "Carbon Steel / SS 304 / Brass / Aluminium", ["Plain", "Zinc", "Bright"], ["m6 / h8 / f7 tolerance"], ["General Location", "Pivot Points", "Cotter Holes", "Cross-pins"]),

  // ── RIVETS ──────────────────────────────────────────────────────────────────
  mp(72, "blind-rivet", "Blind Rivet / Pop Rivet", "Rivets", rImg, "DIN 7337 / ISO 15978 / ASME B18.29.5", "Tubular rivet set from one side using pull mandrel. Ideal for thin sheets and where access to back face is restricted.", "Ø 3.2mm to Ø 6.4mm | 1/8\" to 1/4\"", "—", "6mm to 25mm", "Aluminium / Steel / Stainless / Monel", ["Anodised", "Plain", "Zinc"], ["ASTM B117", "ISO 15978"], ["Sheet Metal", "Automotive Bodies", "HVAC Ducts"]),
  mp(73, "solid-rivet", "Solid Rivet", "Rivets", rImg, "DIN 124 / ASME B18.1.1 / ISO 1051", "Classic solid shank rivet that is upset/bucked on the driven end. Highest joint strength.", "Ø 3mm to Ø 20mm | 1/8\" to 3/4\"", "—", "6mm to 100mm", "Carbon Steel / Copper / Aluminium / Monel", ["Plain", "Tinned"], ["ASTM A502 Gr1/2"], ["Bridges", "Boilers", "Ships", "Railway Wagons"]),
  mp(74, "semi-tubular-rivet", "Semi Tubular Rivet", "Rivets", rImg, "DIN 7337 part / ISO 8750", "Rivet with partial hollow shank that requires less setting force than solid rivet. Used in leather, plastics and sheet metal.", "Ø 2mm to Ø 8mm | 1/16\" to 5/16\"", "—", "4mm to 30mm", "Carbon Steel / Brass / Aluminium", ["Plain", "Zinc"], ["As per ISO 8750"], ["Brake Linings", "Leather Goods", "Hinges"]),
  mp(75, "structural-rivet", "Structural Rivet", "Rivets", rImg, "ASTM A502 / ISO 15978", "High-strength blind or solid rivet for structural steel connections. Provides consistent clamping force.", "Ø 5mm to Ø 20mm | 3/16\" to 3/4\"", "—", "10mm to 50mm", "Carbon Steel / Alloy Steel / Monel", ["Plain", "Zinc"], ["ASTM A502 Gr1/2/3"], ["Steel Bridges", "Building Structures", "Overhead Cranes"]),

  // ── INDUSTRIAL / SPECIAL ────────────────────────────────────────────────────
  mp(76, "threaded-bar", "Threaded Bar", "Industrial / Special", iImg, "DIN 976 / ASME B18.31.3", "Fully threaded round bar in standard 1m/3m lengths cut to size. Same as all-thread rod but supplied as bar stock.", "M6 to M100 | 1/4\" to 4\"", "Metric / UNC / UNF / BSW / BSF", "1000mm / 3000mm", "MS / Carbon Steel / Alloy / SS 304 / SS 316", stdFinish, ["4.6", "8.8", "B7", "A2-70"], ["Hanger Rods", "Tie Rods", "General Construction"]),
  mp(77, "studs", "Studs", "Industrial / Special", iImg, "ASME B18.31.2 / DIN 835", "General term for headless threaded fasteners including tap-end, equal-end, and double-end studs in all grades.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric / UNC / UNF", "25mm to 1000mm", "ASTM A193 B7 / Alloy / SS 316", stdFinish, ["B7", "B7M", "B16", "L7", "8.8"], ["Flanges", "Valves", "Cylinders", "Compressors"]),
  mp(78, "pipe-clamp-bolt", "Pipe Clamp Bolt", "Industrial / Special", iImg, "DIN 3570 / ASME B18.31.5", "Threaded bolt used in pipe clamps and saddle clamps for securing pipes to structural supports and frames.", "M8 to M30 | 5/16\" to 1-1/4\"", "Metric Coarse", "Custom", "Carbon Steel / SS 316", ["HDG", "Plain", "Zinc"], ["4.6", "8.8", "SS 316"], ["Pipe Supports", "Hangers", "Pipe Racks"]),
  mp(79, "turnbuckle", "Turnbuckle", "Industrial / Special", iImg, "DIN 1478/1479 / ASME B18.14", "Adjustable coupling device with right-hand and left-hand threads for tensioning ropes, cables, and tie rods.", "M8 to M36 | 5/16\" to 1-1/2\"", "R/H and L/H", "100mm to 600mm overall", "Carbon Steel / SS 316", ["Plain", "HDG", "Chrome"], ["4.6", "A2-70"], ["Rigging", "Bracing", "Guy Wires", "Stage Sets"]),
  mp(80, "eye-nut", "Eye Nut", "Industrial / Special", iImg, "DIN 582 / ASME B18.15", "Nut with a circular eye-shaped top for attaching lifting hooks, shackles and cables.", "M8 to M48 | 5/16\" to 2\"", "Metric Coarse | UNC", "—", "Forged Carbon Steel / SS 316", ["Plain", "HDG", "Zinc"], ["C15E", "A2-70", "SS 316"], ["Lifting", "Rigging", "Crane Attachment"]),
  mp(81, "t-bolt", "T Bolt", "Industrial / Special", iImg, "DIN 787 / ISO 299", "T-shaped head bolt used in T-slot machine tables, clamping channels and aluminium extrusion profiles.", "M6 to M24 | 1/4\" to 1\"", "Metric Coarse", "50mm to 200mm", "Carbon Steel / SS 304", ["Plain", "Black Oxide", "Zinc"], ["8.8", "10.9", "A2-70"], ["Machine Tool T-slots", "Extrusion Profiles", "Clamping"]),
  mp(82, "shear-connector", "Shear Connector", "Industrial / Special", iImg, "ASTM A108 / AWS D1.1", "Headed stud welded to steel beam flanges to provide mechanical interlock with concrete in composite construction.", "Ø 16mm to Ø 25mm | 5/8\" to 1\"", "—", "75mm to 200mm", "Low Carbon Steel (ASTM A108)", ["As welded"], ["ASTM A108 Grade 1015"], ["Composite Beams", "Bridges", "Floor Systems"]),
  mp(83, "circlips", "Circlips", "Industrial / Special", iImg, "DIN 471/472 / ISO 1234", "Internal or external snap retaining ring pressed into a groove to retain a shaft or bore component axially.", "Shaft Ø 2mm to Ø 250mm", "—", "—", "Spring Steel / SS 420", ["Phosphate", "Zinc", "Black"], ["DIN 471 / 472"], ["Gear Shafts", "Bearings", "Hydraulic Cylinders"]),
  mp(84, "retaining-rings", "Retaining Rings", "Industrial / Special", iImg, "DIN 5417 / ASME B27.7", "External or internal retaining ring (E-ring, C-ring) for shaft and bore retention applications.", "Shaft Ø 2mm to Ø 100mm", "—", "—", "Spring Steel / Beryllium Copper / SS", ["Phosphate", "Zinc"], ["DIN 5417 / ASME B27.7"], ["Gearboxes", "Pumps", "Actuators"]),

  // ── NEW BOLTS ───────────────────────────────────────────────────────────────
  mp(85, "square-head-bolt", "Square Head Bolt", "Bolts", bImg, "DIN 601 / ASME B18.2.1", "Bolt with square head providing greater wrench contact area, used in timber and rough-service applications where hex wrenches are not suitable.", "M6 to M30 | 1/4\" to 1-1/4\"", "Metric Coarse | UNC", "20mm to 300mm", "Carbon Steel / Alloy Steel", ["Plain", "HDG", "Zinc"], ["4.6", "8.8"], ["Timber Construction", "Railway", "Agricultural Equipment"]),
  mp(86, "step-bolt", "Step Bolt", "Bolts", bImg, "ASME B18.2.1", "Bolt with a large round flat head and square neck, designed for use in wood and steel step or stair applications.", "M10 to M24 | 3/8\" to 1\"", "Metric Coarse | UNC", "30mm to 200mm", "Carbon Steel", ["HDG", "Plain"], ["4.6", "8.8"], ["Utility Poles", "Steel Steps", "Transmission Towers"]),
  mp(87, "hanger-bolt", "Hanger Bolt", "Bolts", bImg, "DIN 571 / ASME B18.2.1", "Double-ended fastener with wood-screw thread on one end and machine thread on the other for hanging or mounting applications.", "M6 to M16 | 1/4\" to 5/8\"", "Wood + Metric / UNC", "30mm to 150mm", "Carbon Steel / SS 304", ["Plain", "Zinc", "Black Oxide"], ["4.6", "8.8"], ["Cabinet Hanging", "Speaker Mounts", "Furniture"]),
  mp(88, "plow-bolt", "Plow Bolt", "Bolts", bImg, "ASME B18.9", "Countersunk flat head bolt with square neck used in plow blades, cutting edges, and earthmoving equipment.", "M12 to M24 | 1/2\" to 1\"", "Metric Coarse | UNC", "30mm to 200mm", "High-strength Alloy Steel", ["Plain", "HDG"], ["Grade D / Grade E", "8.8", "10.9"], ["Plow Blades", "Earthmoving", "Mining Equipment"]),
  mp(89, "wheel-bolt", "Wheel Bolt", "Bolts", bImg, "ISO 4107 / DIN 74361", "Tapered-seat bolt for securing vehicle wheels to hubs. Manufactured to precise torque and dimensional specifications.", "M12 to M22 | 1/2\" to 7/8\"", "Metric Fine", "25mm to 60mm", "Alloy Steel / Case Hardened", ["Plain", "Zinc", "Black"], ["10.9", "12.9"], ["Automotive Wheels", "Trucks", "Commercial Vehicles"]),

  // ── NEW SCREWS ──────────────────────────────────────────────────────────────
  mp(90, "round-head-screw", "Round Head Screw", "Screws", sImg, "DIN 84 / ISO 1207", "Screw with a semi-circular domed head providing a decorative finish and good surface bearing. Slotted or Phillips drive.", "M1.6 to M10 | #2 to #3/8\"", "Metric Coarse | UNC", "3mm to 60mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Brass"], ["8.8", "A2-70"], ["Electronics", "Furniture", "Decorative Assemblies"]),
  mp(91, "flat-head-screw", "Flat Head Screw", "Screws", sImg, "DIN 963 / ISO 2009", "Countersunk flat head screw that sits flush with the surface. Slotted or Phillips drive for general applications.", "M2 to M12 | #2 to 1/2\"", "Metric Coarse | UNC", "4mm to 80mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Black"], ["8.8", "A2-70"], ["Flush Mounting", "Hinges", "General Assembly"]),
  mp(92, "slotted-screw", "Slotted Screw", "Screws", sImg, "DIN 84 / ISO 1207", "Traditional single-slot drive screw available in pan, round, flat, and oval head styles. Used in electrical and vintage applications.", "M1.6 to M10 | #0 to 3/8\"", "Metric Coarse | UNC", "3mm to 80mm", "Carbon Steel / SS 304 / Brass", ["Zinc", "Plain", "Chrome"], ["8.8", "A2-70"], ["Electrical Equipment", "Vintage Restoration", "Light Assembly"]),
  mp(93, "security-screw", "Security Screw", "Screws", sImg, "Non-standard / Tamper Resistant", "Tamper-resistant screw with specialty drive (Torx Plus, Pin Hex, One-way, Tri-wing) to prevent unauthorized removal.", "M3 to M10 | #6 to 3/8\"", "Metric Coarse | UNC", "6mm to 60mm", "Stainless Steel / Carbon Steel", ["Plain", "Zinc", "SS"], ["A2-70", "8.8"], ["Security Panels", "Public Fixtures", "Anti-theft Applications"]),
  mp(94, "roofing-screw", "Roofing Screw", "Screws", sImg, "AS 3566 / DIN 7504", "Self-drilling screw with EPDM bonded washer for weather-tight fastening of roofing sheets, cladding and purlins.", "M4.8 to M6.3 | #10 to #14", "Self-drilling", "25mm to 150mm", "Carbon Steel / Stainless Steel", ["Galvanized", "Color Coated", "SS"], ["Class 3 / 4 Galvanized", "A2-70"], ["Roofing Sheets", "Cladding", "Purlin Fixing"]),
  mp(95, "concrete-screw", "Concrete Screw", "Screws", sImg, "ICC-ES AC193 / ETA", "High-low thread concrete screw anchor for direct fixing into concrete, brick and block without a separate plug.", "M6 to M12 | 3/16\" to 1/2\"", "Self-tapping concrete thread", "50mm to 200mm", "Hardened Carbon Steel / SS", ["Blue Zinc", "Stainless"], ["ASTM F1554"], ["Concrete", "Masonry", "Block"]),
  mp(96, "lag-screw", "Lag Screw", "Screws", sImg, "ASME B18.2.1 / DIN 571", "Heavy-duty wood screw with hex head and coarse thread for fastening hardware to timber and structural wood connections.", "M6 to M24 | 1/4\" to 1\"", "Coarse lag thread", "25mm to 300mm", "Carbon Steel / Stainless Steel", ["HDG", "Plain", "Zinc"], ["SAE Grade 2/5", "A2-70"], ["Timber Framing", "Joist Hangers", "Heavy Wood Connections"]),

  // ── STUD BOLTS (SPECIFIC TYPES) ─────────────────────────────────────────────
  mp(97, "b7-stud-bolt", "B7 Stud Bolt", "Stud Bolts", bImg, "ASTM A193 B7 / ASME B16.5", "Grade B7 chromium-molybdenum alloy stud bolt for high-temperature high-pressure flange connections. Most widely specified stud bolt grade.", "M6 to M100 | 1/4\" to 4\"", "Metric / UNC / UNF", "30mm to 3000mm", "42CrMo4 / AISI 4140 Alloy Steel", stdFinish, ["B7", "B7M"], ["Pressure Flanges", "Petrochemical", "Oil & Gas"]),
  mp(98, "b8-stud-bolt", "B8 Stud Bolt", "Stud Bolts", bImg, "ASTM A193 B8 / ASME B16.5", "Grade B8 austenitic stainless steel stud bolt for corrosive service. Solution-treated SS 304 for chemical and marine applications.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric / UNC", "30mm to 2000mm", "SS 304 (ASTM A193 B8)", stdFinish, ["B8", "B8A", "B8M", "B8MA"], ["Chemical Plants", "Marine", "Cryogenic Service"]),
  mp(99, "ss-stud-bolt", "Stainless Steel Stud Bolt", "Stud Bolts", bImg, "ASTM A193 B8 / B8M / ISO 3506", "Stainless steel stud bolt available in SS 304 (B8) and SS 316 (B8M) grades for corrosion-resistant flange bolting.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric / UNC / UNF", "30mm to 2000mm", "SS 304 / SS 316 / Duplex SS", ["Plain", "Passivated", "PTFE"], ["B8", "B8M", "A4-80"], ["Chemical", "Marine", "Food Industry"]),
  mp(100, "alloy-stud-bolt", "Alloy Steel Stud Bolt", "Stud Bolts", bImg, "ASTM A193 B7 / B16 / L7 / ASME B16.5", "High-strength alloy steel stud bolt available in multiple grades for varied temperature and pressure service conditions.", "M6 to M100 | 1/4\" to 4\"", "Metric / UNC / UNF / BSW", "30mm to 3000mm", "Cr-Mo / Ni-Cr-Mo Alloy Steel", stdFinish, ["B7", "B16", "L7", "L7M"], ["High-Pressure", "High-Temperature", "Power Plants"]),
  mp(101, "hdg-stud-bolt", "Hot Dip Galvanized Stud Bolt", "Stud Bolts", bImg, "ASTM A153 / ISO 1461 coating", "Stud bolt with hot-dip galvanized coating for outdoor, marine, and corrosive environment applications.", "M12 to M64 | 1/2\" to 2-1/2\"", "Metric / UNC", "50mm to 1500mm", "Carbon / Alloy Steel + HDG Coating", ["HDG"], ["Grade 8.8 HDG", "B7 HDG"], ["Structural", "Marine", "Outdoor Applications"]),
  mp(102, "ptfe-stud-bolt", "PTFE Coated Stud Bolt", "Stud Bolts", bImg, "ASTM A193 B7 + PTFE / Xylan coating", "B7 stud bolt with PTFE or Xylan fluoropolymer coating for easy assembly, corrosion protection and reduced galling.", "M12 to M100 | 1/2\" to 4\"", "Metric / UNC / UNF", "50mm to 3000mm", "ASTM A193 B7 + PTFE Coating", ["PTFE", "Xylan 1424"], ["B7 PTFE", "B7M PTFE"], ["High-temperature Flanges", "Petrochemical", "Refineries"]),
  mp(103, "heavy-duty-stud", "Heavy Duty Stud Bolt", "Stud Bolts", bImg, "ASME B16.5 / ASTM A193", "Extra heavy-duty stud bolt for critical high-pressure, high-temperature applications with large diameter and premium grade materials.", "M36 to M100 | 1-1/4\" to 4\"", "Metric Coarse | UNC", "200mm to 3000mm", "ASTM A193 B7 / B16 / Alloy Steel", stdFinish, ["B7", "B16", "L7"], ["Critical Flanges", "Reactor Vessels", "Compressors"]),

  // ── THREADED RODS (SPECIFIC TYPES) ──────────────────────────────────────────
  mp(104, "partial-thread-rod", "Partial Thread Rod", "Threaded Rods", bImg, "DIN 975 / ASME B18.31.3", "Rod threaded on both ends with a plain (unthreaded) shank in the middle for use as a tension member.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric Coarse / UNC", "200mm to 3000mm", "Carbon / Alloy Steel", stdFinish, ["4.6", "8.8", "10.9"], ["Structural Tension Members", "Pre-stressing", "Tie Rods"]),
  mp(105, "ss-threaded-rod", "Stainless Steel Threaded Rod", "Threaded Rods", bImg, "DIN 975 / ISO 3506", "Fully threaded rod in stainless steel for corrosive environments. Available in SS 304, SS 316, and Duplex grades.", "M6 to M48 | 1/4\" to 2\"", "Metric Coarse / UNC / UNF", "1000mm / 3000mm", "SS 304 / SS 316 / Duplex SS", ["Plain", "Passivated"], ["A2-70 (SS 304)", "A4-80 (SS 316)"], ["Chemical Plants", "Marine", "Food Grade"]),
  mp(106, "ms-threaded-rod", "Mild Steel Threaded Rod", "Threaded Rods", bImg, "DIN 975 / IS 3757", "Standard mild steel fully threaded rod for general construction, MEP hangers and structural applications.", "M6 to M36 | 1/4\" to 1-1/2\"", "Metric Coarse | UNC | BSW", "1000mm / 3000mm", "Mild Steel (IS 2062 / SAE 1020)", ["Plain", "Zinc", "HDG"], ["Grade 4.6"], ["MEP Hangers", "General Construction", "Ceiling Suspensions"]),
  mp(107, "high-tensile-threaded-rod", "High Tensile Threaded Rod", "Threaded Rods", bImg, "DIN 976 / ASME B18.31.3", "High-strength fully threaded rod for structural and tension applications requiring Grade 8.8, 10.9 or 12.9 properties.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric Coarse / Fine", "1000mm / 3000mm", "Alloy Steel (Quenched & Tempered)", stdFinish, ["8.8", "10.9", "12.9", "B7"], ["Structural Pretensioning", "Machinery", "Tie Rods"]),
  mp(108, "brass-threaded-rod", "Brass Threaded Rod", "Threaded Rods", bImg, "DIN 975 / BS EN 12163", "Fully threaded rod in brass for electrical, decorative and corrosion-resistant applications requiring non-magnetic material.", "M3 to M20 | 1/8\" to 3/4\"", "Metric Coarse", "1000mm", "Brass CZ121 / CZ108", ["Plain", "Polished"], ["CW614N Brass"], ["Electrical", "Decorative", "Marine Hardware"]),
  mp(109, "copper-threaded-rod", "Copper Threaded Rod", "Threaded Rods", bImg, "DIN 975 / BS EN 12163", "Fully threaded copper rod for electrical grounding systems, plumbing and high conductivity applications.", "M6 to M24 | 1/4\" to 1\"", "Metric Coarse", "1000mm / 3000mm", "Copper C11000 / C12200", ["Plain", "Tinned"], ["ASTM B49 Copper"], ["Electrical Grounding", "Plumbing", "Lightning Protection"]),
  mp(110, "zinc-plated-threaded-rod", "Zinc Plated Threaded Rod", "Threaded Rods", bImg, "DIN 975 + Zinc Plating", "Mild steel threaded rod with electroplated zinc coating for enhanced corrosion resistance in indoor applications.", "M6 to M36 | 1/4\" to 1-1/2\"", "Metric Coarse | UNC", "1000mm / 3000mm", "Carbon Steel + Zinc Electroplating", ["Zinc Plated (5–8 μm)"], ["Grade 4.6 Zinc"], ["Indoor Construction", "MEP", "Shelving"]),
  mp(111, "galvanized-threaded-rod", "Galvanized Threaded Rod", "Threaded Rods", bImg, "DIN 975 + ASTM A153 HDG", "Threaded rod with hot-dip galvanized coating for long-term outdoor and marine corrosion protection.", "M6 to M48 | 1/4\" to 2\"", "Metric Coarse | UNC", "1000mm / 3000mm", "Carbon Steel + HDG Coating", ["Hot Dip Galvanized"], ["Grade 4.6 HDG", "Grade 8.8 HDG"], ["Outdoor Construction", "Bridges", "Marine Structures"]),
  mp(112, "din-975-threaded-rod", "DIN 975 Threaded Rod", "Threaded Rods", bImg, "DIN 975", "Metric threaded rod to DIN 975 standard in 1 metre lengths. Property Class 4.6, 8.8 and A2-70 stainless.", "M3 to M36", "Metric Coarse (DIN 975)", "1000mm", "Carbon Steel / Stainless Steel", ["Plain", "Zinc", "Passivated"], ["PC 4.6", "PC 8.8", "A2-70"], ["General Engineering", "MEP", "Structural"]),
  mp(113, "din-976-threaded-rod", "DIN 976 Threaded Rod", "Threaded Rods", bImg, "DIN 976", "Metric threaded rod to DIN 976 standard in 3 metre lengths. Produced in property class 4.6, 8.8, 10.9 and B7.", "M6 to M64", "Metric Coarse (DIN 976)", "3000mm", "Carbon Steel / Alloy Steel / SS", stdFinish, ["PC 4.6", "PC 8.8", "PC 10.9", "B7"], ["Construction", "Structural", "Petrochemical"]),

  // ── NEW NUTS ────────────────────────────────────────────────────────────────
  mp(114, "jam-nut", "Jam Nut", "Nuts", nImg, "DIN 439 / ISO 4035", "Thin hexagon nut (half-height) used as a locking nut by jamming it against a standard nut to prevent loosening.", "M3 to M36 | #6 to 1-1/2\"", "Metric Coarse / Fine | UNC", "—", "Carbon Steel / Stainless", ["Plain", "Zinc", "A2-70"], ["Grade 04 / 04M", "A2-70"], ["Lock Fastening", "Machinery", "General Assembly"]),
  mp(115, "round-nut", "Round Nut", "Nuts", nImg, "DIN 546 / ISO 2982", "Cylindrical nut with holes in the periphery for use with a pin spanner. Used in precision bearings and axles.", "M10 to M60 | 3/8\" to 2-1/2\"", "Metric Fine", "—", "Carbon Steel / Alloy Steel / SS", ["Plain", "Black Oxide"], ["Grade 8", "Grade 10"], ["Bearing Lock Nuts", "Machine Spindles", "Axle Shafts"]),
  mp(116, "acorn-nut", "Acorn Nut", "Nuts", nImg, "DIN 1587 / ISO 8483", "Closed-end domed nut that protects bolt threads and provides a smooth decorative finish. Also called a cap nut.", "M3 to M20 | #6 to 3/4\"", "Metric Coarse | UNC", "—", "Carbon Steel / SS 304 / Brass / Chrome", ["Chrome", "Nickel", "Zinc"], ["Grade 6", "A2-70"], ["Automotive Trim", "Motorcycles", "Decorative Applications"]),

  // ── NEW RIVETS ──────────────────────────────────────────────────────────────
  mp(117, "tubular-rivet", "Tubular Rivet", "Rivets", rImg, "DIN 7338 / ISO 8750", "Rivet with a fully hollow shank. Lighter than solid rivets, used in leatherwork, belts and light assemblies.", "Ø 2mm to Ø 10mm | 1/16\" to 3/8\"", "—", "4mm to 30mm", "Carbon Steel / Brass / Aluminium", ["Plain", "Zinc"], ["As per DIN 7338"], ["Leather Goods", "Belts", "Light Sheet Metal"]),
  mp(118, "split-rivet", "Split Rivet", "Rivets", rImg, "DIN 1476 / ISO 8751", "Bifurcated (split) rivet that splays apart on setting to lock through soft materials. Easy to install and remove.", "Ø 2mm to Ø 6mm | 1/16\" to 1/4\"", "—", "4mm to 25mm", "Brass / Aluminium / Carbon Steel", ["Plain", "Tinned"], ["As per DIN 1476"], ["Labels", "Name Plates", "Soft Materials"]),
  mp(119, "drive-rivet", "Drive Rivet", "Rivets", rImg, "DIN 1477 / ISO 8752", "Rivet set by driving a pin into the hollow shank causing it to expand. Single-sided installation without tools.", "Ø 3mm to Ø 8mm | 1/8\" to 5/16\"", "—", "6mm to 30mm", "Aluminium / Carbon Steel", ["Plain", "Anodized"], ["As per DIN 1477"], ["Panels", "Nameplates", "Trim Strips"]),
  mp(120, "multi-grip-rivet", "Multi Grip Rivet", "Rivets", rImg, "ISO 15978 / ASME B18.29.5", "Blind rivet with extended grip range that accommodates multiple material thicknesses in one rivet size. Reduces inventory.", "Ø 3.2mm to Ø 6.4mm | 1/8\" to 1/4\"", "—", "Multi-grip", "Aluminium / Steel / SS / Monel", ["Plain", "Zinc"], ["ISO 15978"], ["Sheet Metal", "HVAC", "Automotive Bodies"]),
  mp(121, "flush-rivet", "Flush Rivet", "Rivets", rImg, "MIL-R-47196 / NAS", "Countersunk head rivet that sits flush with the surface. Critical in aerospace and automotive for smooth aerodynamic finishes.", "Ø 2.4mm to Ø 6.4mm | 3/32\" to 1/4\"", "—", "6mm to 30mm", "Aluminium Alloy / Titanium / SS", ["Anodized", "Plain"], ["NAS / AN / MS Aircraft Spec"], ["Aerospace", "Automotive Panels", "Marine"]),

  // ── NEW ANCHOR FASTENERS ────────────────────────────────────────────────────
  mp(122, "hammer-drive-anchor", "Hammer Drive Anchor", "Anchor Fasteners", aImg, "ETA / DIN 571", "Nail-type anchor for light-duty fixing into concrete, brick and block. Set by hammering the pin to expand the sleeve.", "Ø 6mm to Ø 10mm | 1/4\" to 3/8\"", "—", "25mm to 60mm", "Carbon Steel / SS (Zinc Plated)", ["Zinc Plated"], ["Grade 6"], ["Cable Clips", "Conduit Fixing", "Light Fixtures"]),
  mp(123, "frame-fixing-anchor", "Frame Fixing Anchor", "Anchor Fasteners", aImg, "ETA approved / EN 795", "Long nylon frame plug with hex-head screw for fixing door frames, window frames and cable trays to concrete and masonry.", "Ø 8mm to Ø 14mm | 5/16\" to 9/16\"", "—", "80mm to 200mm", "Nylon PA6 sleeve + Carbon Steel screw", ["Zinc + Nylon"], ["ETA approved"], ["Door Frames", "Window Frames", "Cable Trays"]),
  mp(124, "nylon-anchor", "Nylon Anchor", "Anchor Fasteners", aImg, "ETA / DIN 4179", "Plastic expansion anchor (wall plug) that expands inside a hole when a screw is driven in, for masonry fixing.", "Ø 5mm to Ø 16mm | 3/16\" to 5/8\"", "—", "25mm to 100mm", "Nylon PA6 / PP", ["Plain Nylon"], ["Various load ratings"], ["Light Masonry", "Plaster", "Brick Walls"]),
  mp(125, "expansion-anchor", "Expansion Anchor", "Anchor Fasteners", aImg, "ETA / ASTM F1554", "Mechanical expansion anchor in concrete, stone and solid masonry. Expands against hole walls on torque application.", "M8 to M30 | 3/8\" to 1-1/4\"", "Metric / UNC", "60mm to 250mm", "Carbon Steel / SS 316", ["Zinc", "HDG", "Stainless"], ["5.6", "8.8", "SS 316"], ["Structural Fixings", "Equipment Bases", "Racking"]),

  // ── NEW WASHERS ─────────────────────────────────────────────────────────────
  mp(126, "tab-washer", "Tab Washer", "Washers", wImg, "DIN 432 / ISO 2232", "Flat washer with tabs that fold up against fastener faces to lock nuts and bolts against rotation. No tools needed to lock.", "M6 to M36 | 1/4\" to 1-1/2\"", "—", "—", "Carbon Steel / SS 304", ["Plain", "Zinc"], ["As per DIN 432"], ["Bearings", "Gearboxes", "Wheel Hubs"]),
  mp(127, "wave-washer", "Wave Washer", "Washers", wImg, "DIN 137 / ASME B18.21.1", "Corrugated wave-profile washer providing moderate spring force for light pre-load and compensating for axial play.", "M3 to M36 | 1/8\" to 1-1/2\"", "—", "—", "Spring Steel / SS 301", ["Plain", "Phosphate", "Zinc"], ["As per DIN 137"], ["Electric Motors", "Bearings", "Light Machinery"]),
  mp(128, "shim-washer", "Shim Washer", "Washers", wImg, "DIN 988 / ISO 7092", "Precision-ground flat washer for use as shim or spacer to achieve precise axial clearances in mechanical assemblies.", "Ø 5mm to Ø 200mm", "—", "Thickness: 0.1mm to 3mm", "Carbon Steel / Stainless / Brass / Nylon", ["Ground", "Plain"], ["As per DIN 988"], ["Precision Machinery", "Gearboxes", "Optical Equipment"]),
  mp(129, "copper-washer", "Copper Washer", "Washers", wImg, "DIN 7603 / BS EN 12163", "Annealed copper sealing washer that provides a leak-proof metal-to-metal seal under bolt or union compression.", "M6 to M48 | 1/4\" to 2\"", "—", "Thickness: 1mm to 3mm", "Copper C11000 (Soft Annealed)", ["Annealed", "Bright"], ["ASTM B49 Copper"], ["Hydraulic Fittings", "Engine Drain Plugs", "Plumbing Unions"]),

  // ── COATED FASTENERS ────────────────────────────────────────────────────────
  mp(130, "ptfe-coated-fasteners", "PTFE Coated Fasteners", "Coated Fasteners", cImg, "ASTM A193 + PTFE/Xylan coating", "Fasteners with PTFE fluoropolymer coating for dry-film lubrication, corrosion protection and chemical resistance. Reduces galling.", "M6 to M100 | 1/4\" to 4\"", "Metric / UNC / UNF", "Custom", "B7 / SS 316 + PTFE Coating (50–75 μm)", ["PTFE / Xylan 1424"], ["B7 PTFE", "B8M PTFE", "SS PTFE"], ["Petrochemical Flanges", "Chemical Plants", "Offshore"]),
  mp(131, "xylan-coated-fasteners", "Xylan Coated Fasteners", "Coated Fasteners", cImg, "ASTM A193 + Xylan coating", "Fasteners with Xylan fluoropolymer coating (Xylan 1424 / 1070) providing superior corrosion and chemical resistance.", "M6 to M100 | 1/4\" to 4\"", "Metric / UNC", "Custom", "Alloy / Stainless Steel + Xylan Coating", ["Xylan 1424", "Xylan 1070"], ["B7 Xylan", "B8M Xylan"], ["Offshore Platforms", "Subsea", "Refineries"]),
  mp(132, "hdg-fasteners", "Hot Dip Galvanized Fasteners", "Coated Fasteners", cImg, "ASTM A153 / ISO 1461", "Fasteners with hot-dip galvanized (HDG) zinc coating providing long-term cathodic protection against atmospheric and marine corrosion.", "M6 to M100 | 1/4\" to 4\"", "Metric / UNC / BSW", "Custom", "Carbon / Alloy Steel + HDG Zinc (45–85 μm)", ["HDG (45–85 μm)"], ["Grade 4.6 HDG", "Grade 8.8 HDG", "B7 HDG"], ["Structural Steel", "Bridges", "Marine Structures"]),
  mp(133, "zinc-plated-fasteners", "Zinc Plated Fasteners", "Coated Fasteners", cImg, "ASTM B633 / ISO 4520", "Fasteners with electroplated zinc coating for light-duty corrosion protection in indoor and mild outdoor environments.", "M3 to M64 | #4 to 2-1/2\"", "All thread forms", "Custom", "Carbon / Alloy Steel + Zinc Electroplate (5–12 μm)", ["Zinc (5 μm)", "Zinc (8 μm)", "Zinc (12 μm)"], ["Fe/Zn 5", "Fe/Zn 8", "Fe/Zn 12"], ["General Hardware", "Indoor Applications", "Light Machinery"]),
  mp(134, "dacromet-fasteners", "Dacromet Coated Fasteners", "Coated Fasteners", cImg, "ISO 10683 / GM9984178", "Fasteners with Dacromet zinc-aluminium flake coating for exceptional corrosion resistance without hydrogen embrittlement risk.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric / UNC", "Custom", "Carbon / High-tensile Steel + Dacromet (8–10 μm)", ["Dacromet 320 / 500"], ["10.9 Dacromet", "12.9 Dacromet"], ["Automotive", "Wind Energy", "Construction"]),
  mp(135, "geomet-fasteners", "Geomet Coated Fasteners", "Coated Fasteners", cImg, "ISO 10683 / ASTM F1941", "Fasteners with Geomet water-based zinc-aluminium coating offering superior corrosion protection, suitable for high-strength steels.", "M6 to M64 | 1/4\" to 2-1/2\"", "Metric / UNC", "Custom", "Alloy / High-tensile Steel + Geomet coating", ["Geomet 321 / 500"], ["10.9 Geomet", "12.9 Geomet"], ["Automotive", "Renewable Energy", "Marine"]),
  mp(136, "black-oxide-fasteners", "Black Oxide Fasteners", "Coated Fasteners", cImg, "MIL-DTL-13924 / ASTM F1136", "Fasteners with black oxide chemical conversion coating for mild corrosion resistance and aesthetics. Often used with oil treatment.", "M3 to M36 | #4 to 1-1/2\"", "Metric / UNC", "Custom", "Carbon / Alloy / Stainless Steel + Black Oxide", ["Black Oxide + Oil"], ["Grade 8.8", "12.9", "A2-70"], ["Tools", "Firearms", "Precision Machinery"]),
  mp(137, "cadmium-fasteners", "Cadmium Coated Fasteners", "Coated Fasteners", cImg, "AMS-QQ-P-416 / ASTM B766", "Fasteners with cadmium electroplated coating for excellent corrosion resistance, lubricity and compatibility with aluminium.", "M3 to M36 | #4 to 1-1/2\"", "Metric / UNC / UNF", "Custom", "Alloy Steel + Cadmium (5–25 μm)", ["Cadmium Plate Type I/II"], ["NAS / AN / MS Spec"], ["Aerospace", "Defence", "Naval Applications"]),
  mp(138, "nickel-plated-fasteners", "Nickel Plated Fasteners", "Coated Fasteners", cImg, "ASTM B689 / ISO 1456", "Fasteners with electroless or electrolytic nickel plating for corrosion resistance, hardness and decorative finish.", "M3 to M24 | #4 to 1\"", "Metric / UNC", "Custom", "Carbon / SS Steel + Nickel (10–50 μm)", ["Electrolytic Nickel", "Electroless Nickel"], ["EN-P 25 / 50"], ["Electronics", "Medical", "Decorative Hardware"]),

  // ── SPRINGS ─────────────────────────────────────────────────────────────────
  mp(139, "compression-spring", "Compression Spring", "Springs", spImg, "DIN 2098 / IS 7906", "Helical coil spring that resists compressive force. Most common spring type used in valves, switches and general machinery.", "OD 3mm to 150mm | Wire: 0.3mm to 20mm", "—", "Free length: 5mm to 500mm", "Spring Steel (EN 10270) / SS 302 / 316 / Inconel", ["Shot Peened", "Zinc", "Passivated"], ["DIN 2098 / Class B / C"], ["Valves", "Automotive Suspension", "Industrial Machines"]),
  mp(140, "tension-spring", "Tension Spring", "Springs", spImg, "DIN 2097 / IS 7906", "Helical spring with hooks or loops on both ends designed to resist tensile (pulling) force between two components.", "OD 3mm to 100mm | Wire: 0.3mm to 15mm", "—", "Free length: 10mm to 400mm", "Spring Steel / SS 302 / Music Wire", ["Plain", "Zinc", "Passivated"], ["DIN 2097"], ["Garage Doors", "Weighing Scales", "Agricultural Equipment"]),
  mp(141, "extension-spring", "Extension Spring", "Springs", spImg, "DIN 2097", "Tension spring designed to store energy and extend under tensile load. Fitted with standard, extended, reduced or special hooks.", "OD 3mm to 100mm | Wire: 0.3mm to 12mm", "—", "Free length: 10mm to 400mm", "Carbon Steel / SS 304", ["Plain", "Zinc"], ["DIN 2097"], ["Brakes", "Clutches", "Return Mechanisms"]),
  mp(142, "torsion-spring", "Torsion Spring", "Springs", spImg, "DIN 2088 / IS 7906", "Spring designed to exert a torque or rotational force when twisted. Used in hinges, clothespins and mouse traps.", "OD 5mm to 80mm | Wire: 0.5mm to 10mm", "—", "Body length: 10mm to 200mm", "Spring Steel / SS 302", ["Plain", "Passivated"], ["DIN 2088"], ["Hinges", "Automotive Clips", "Switches"]),
  mp(143, "flat-spring", "Flat Spring", "Springs", spImg, "DIN 2093 / ASME", "Spring made from flat strip stock forming a leaf, cantilever or clock spring for low-profile space-constrained applications.", "Width 3mm to 100mm | Thickness 0.3mm to 8mm", "—", "Custom", "Spring Steel / SS 301 / Beryllium Copper", ["Plain", "Phosphate"], ["65Mn Steel", "C75S"], ["Electrical Contacts", "Battery Clips", "Latches"]),
  mp(144, "conical-spring", "Conical Spring", "Springs", spImg, "Custom / DIN 2099", "Tapered helical compression spring that collapses flat to its own wire diameter — ideal for low-profile designs.", "OD base: 10mm to 150mm | Wire: 1mm to 15mm", "—", "Free length: 10mm to 200mm", "Spring Steel / SS 302", ["Plain", "Zinc"], ["As per design spec"], ["Switches", "Battery Contacts", "Low-profile Mechanisms"]),
  mp(145, "die-spring", "Die Spring", "Springs", spImg, "ISO 10243 / JIS B5012", "Heavy-duty rectangular wire compression spring for punch presses and dies. Colour-coded by load class (light to extra heavy).", "OD 16mm to 100mm | ID 8mm to 60mm", "—", "Free length: 25mm to 400mm", "Chromium Vanadium Steel (51CrV4)", ["Phosphate + Oil", "Shot Peened"], ["ISO 10243 Classes"], ["Press Tools", "Die Sets", "Injection Moulding"]),
  mp(146, "disc-spring", "Disc Spring", "Springs", spImg, "DIN 2093 / ISO 16983", "Conical disc (Belleville) washer spring providing high load in very small space. Stackable for varying characteristics.", "OD 8mm to 250mm | ID 3.2mm to 127mm", "—", "Thickness: 0.4mm to 14mm", "51CrV4 Spring Steel / SS 301 / Inconel", ["Plain", "Phosphate"], ["DIN 2093 Group 1/2/3"], ["Pressure Relief Valves", "Clutches", "Pipe Expansion"]),
  mp(147, "helical-spring", "Helical Spring", "Springs", spImg, "DIN 2098 / IS 7906", "Generic helical coil spring in compression, tension or torsion. Manufactured in round, square or rectangular wire sections.", "Custom OD and wire diameter", "—", "Custom", "Carbon Steel / Alloy / SS / Non-ferrous", ["Plain", "Zinc", "Passivated", "Shot Peened"], ["As per DIN / IS spec"], ["Automotive", "Industrial Machinery", "Consumer Products"]),

  // ── FLANGES ─────────────────────────────────────────────────────────────────
  mp(148, "weld-neck-flange", "Weld Neck Flange", "Flanges", fImg, "ASME B16.5 / ASME B16.47 / DIN 2633", "Flange with a long tapered hub butt-welded to the pipe. Suitable for high-pressure, high-temperature and cyclic service.", "NPS 1/2\" to 60\" | DN 15 to DN 1500", "—", "—", "ASTM A105 / A182 F304 / F316 / F11 / F22 / F51 (Duplex)", ["As per material grade"], ["Class 150 to 2500", "PN 6 to PN 420"], ["Pressure Vessels", "Petrochemical", "Power Plants"]),
  mp(149, "slip-on-flange", "Slip On Flange", "Flanges", fImg, "ASME B16.5 / DIN 2576", "Flange that slips over the pipe OD and is welded inside and outside. Lower cost and easier to align than weld neck.", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "ASTM A105 / SS 304 / SS 316 / Alloy Steel", ["As per material grade"], ["Class 150 to 1500", "PN 6 to PN 100"], ["Low-Pressure Piping", "Chemical Plants", "Water Systems"]),
  mp(150, "blind-flange", "Blind Flange", "Flanges", fImg, "ASME B16.5 / DIN 2527", "Solid disc flange used to close the end of a pipe, valve or pressure vessel. Easy access for inspection and maintenance.", "NPS 1/2\" to 60\" | DN 15 to DN 1500", "—", "—", "ASTM A105 / A182 F304 / F316 / Duplex", ["As per material grade"], ["Class 150 to 2500", "PN 6 to PN 420"], ["Pipe Ends", "Pressure Testing", "Vessel Nozzles"]),
  mp(151, "socket-weld-flange", "Socket Weld Flange", "Flanges", fImg, "ASME B16.5 / DIN 2545", "Flange with a socket bore for fillet welding small-bore high-pressure piping. Cleaner bore than slip-on.", "NPS 1/2\" to 3\" | DN 15 to DN 80", "—", "—", "ASTM A105 / F304 / F316 Alloy Steel", ["As per material grade"], ["Class 150 to 2500", "PN 6 to PN 420"], ["Small-Bore Piping", "High-Pressure Systems", "Hydraulic Lines"]),
  mp(152, "threaded-flange", "Threaded Flange", "Flanges", fImg, "ASME B16.5 / DIN 2566", "Flange with NPT or BSP internal thread for screwing directly onto threaded pipe ends without welding.", "NPS 1/2\" to 4\" | DN 15 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316", ["As per material grade"], ["Class 150 to 600", "PN 10 to PN 100"], ["Temporary Connections", "Low-Pressure Piping", "Maintenance Lines"]),
  mp(153, "lap-joint-flange", "Lap Joint Flange", "Flanges", fImg, "ASME B16.5 / DIN 2642", "Two-piece flange assembly (stub end + backing flange) for easy alignment and rotation, reducing installation cost.", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "Backing Flange: A105 / Stub End: SS 304 / 316 / Duplex", ["As per material grade"], ["Class 150 to 900", "PN 10 to PN 150"], ["Systems with Frequent Dismantling", "Dissimilar Metals", "Lined Piping"]),
  mp(154, "orifice-flange", "Orifice Flange", "Flanges", fImg, "ASME B16.36 / AGA Report No. 3", "Specialized flange pair with tapped holes for pressure measurement across an orifice plate for flow metering.", "NPS 1\" to 16\" | DN 25 to DN 400", "—", "—", "ASTM A105 / A182 F304 / F316 / F11 / F22", ["As per material grade"], ["Class 300 to 1500"], ["Flow Metering", "Oil & Gas Metering Stations", "Process Plants"]),
  mp(155, "spectacle-blind-flange", "Spectacle Blind Flange", "Flanges", fImg, "ASME B16.48 / API 590", "Dual-disc flange device (blind + ring) for isolating sections of piping. Rotated 180° to open or close flow.", "NPS 1/2\" to 36\" | DN 15 to DN 900", "—", "—", "ASTM A516 Gr.70 / A182 F304 / F316 / F11", ["As per material grade"], ["Class 150 to 1500"], ["Piping Isolation", "Maintenance Bypass", "Petrochemical Plants"]),
  mp(156, "rtj-flange", "Ring Type Joint (RTJ) Flange", "Flanges", fImg, "ASME B16.5 / ASME B16.20", "High-pressure flange with grooved face accepting a solid metal ring gasket (oval or octagonal) for positive metal-to-metal seal.", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "ASTM A105 / A182 F304 / F316 / F22 / Duplex", ["As per material grade"], ["Class 600 to 2500"], ["High-Pressure Oil & Gas", "Offshore", "Subsea Applications"]),
  mp(157, "plate-flange", "Plate Flange", "Flanges", fImg, "DIN 2573 / EN 1092-1 Type 01", "Flat plate flange (also called flat face flange) cut from plate material, welded on to pipe ends for low-pressure service.", "DN 25 to DN 600 | NPS 1\" to 24\"", "—", "—", "ASTM A105 / SS 304 / SS 316 / Alloy Steel", ["As per material grade"], ["PN 6 to PN 16", "Class 150"], ["Low-Pressure Water", "Drainage", "Light Industrial Piping"]),

  // ── PIPE FITTINGS ────────────────────────────────────────────────────────────
  mp(158, "elbow-fitting", "Elbow", "Pipe Fittings", pfImg, "ASME B16.9 / DIN 2605", "Pipe fitting that changes the direction of flow at 45° or 90°. Available in short radius (1D) and long radius (1.5D).", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "ASTM A234 WPB / WP304L / WP316L / WP11 / WP22 / WPS31803 Duplex", ["As per material"], ["Class 3000 / 6000 (SW) | Sch 40 / 80 / 160 (BW)"], ["Pipelines", "Petrochemical", "Water Supply"]),
  mp(159, "tee-fitting", "Tee", "Pipe Fittings", pfImg, "ASME B16.9 / DIN 2615", "T-shaped fitting connecting three pipe sections. Available in equal and reducing tee configurations.", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "ASTM A234 WPB / SS 304 / SS 316 / Alloy Steel", ["As per material"], ["Class 3000 / 6000 (SW) | BW Sch 40 / 80"], ["Branch Connections", "Process Piping", "Distribution Systems"]),
  mp(160, "reducer-fitting", "Reducer", "Pipe Fittings", pfImg, "ASME B16.9 / DIN 2616", "Fitting that connects pipes of different sizes. Available in concentric (same centreline) and eccentric (offset) types.", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "ASTM A234 WPB / SS 304 / SS 316 / Chrome-Moly", ["As per material"], ["Butt Weld Sch 40 / 80 / 160"], ["Pipe Size Changes", "Pumps", "Compressor Outlets"]),
  mp(161, "coupling-fitting", "Coupling", "Pipe Fittings", pfImg, "ASME B16.11 / DIN 2986", "Short fitting used to join two pipes of the same or different sizes. Available in full and half coupling versions.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316 / Alloy Steel", ["As per material"], ["Class 2000 / 3000 / 6000 Threaded / SW"], ["Small-bore Piping", "Instrument Tapping", "Vent Connections"]),
  mp(162, "union-fitting", "Union", "Pipe Fittings", pfImg, "ASME B16.11 / BS 3799", "Three-piece fitting (nut + two end pieces) for easy disconnection of pipe runs without rotating either pipe.", "NPS 1/8\" to 2\" | DN 8 to DN 50", "—", "—", "ASTM A105 / SS 304 / SS 316 / Brass", ["As per material"], ["Class 2000 / 3000 Threaded"], ["Maintenance Points", "Pump Connections", "Instrument Lines"]),
  mp(163, "nipple-fitting", "Nipple", "Pipe Fittings", pfImg, "ASME B16.11 / DIN 2982", "Short piece of pipe with external threads on both ends. Hex, close, barrel and swage nipple types available.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "20mm to 300mm", "ASTM A105 / SS 304 / SS 316 / Alloy Steel", ["As per material"], ["Class 3000 / 6000 NPT / BSP"], ["Short Pipe Extensions", "Instrument Connections", "Valve Outlets"]),
  mp(164, "cross-fitting", "Cross", "Pipe Fittings", pfImg, "ASME B16.11 / DIN 2615", "Four-way pipe fitting connecting four pipe sections at 90° angles. Used where two branch connections are required at the same point.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316 / Alloy Steel", ["As per material"], ["Class 3000 / 6000 Threaded / SW"], ["Branch Manifolds", "Sprinkler Systems", "Process Distribution"]),
  mp(165, "cap-fitting", "Cap", "Pipe Fittings", pfImg, "ASME B16.9 / ASME B16.11", "Fitting that closes the end of a pipe. Available in butt weld (hemispherical) and threaded versions.", "NPS 1/8\" to 24\" | DN 8 to DN 600", "—", "—", "ASTM A234 WPB / SS 304 / SS 316 / Alloy Steel", ["As per material"], ["BW Sch 40 / 80 | Class 2000 / 3000 Threaded"], ["Pipe End Closure", "Pressure Testing", "Vent Closures"]),
  mp(166, "plug-fitting", "Plug", "Pipe Fittings", pfImg, "ASME B16.11 / DIN 906", "External-threaded fitting screwed into a female-threaded fitting or valve to close a port or opening.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316 / Brass", ["As per material"], ["Class 2000 / 3000 / 6000 NPT / BSP"], ["Instrument Ports", "Vent Plugs", "Drain Closures"]),
  mp(167, "bushing-fitting", "Bushing", "Pipe Fittings", pfImg, "ASME B16.11 / DIN 2986", "Hex bushing (external × internal thread) for reducing one threaded port size to another. Also called a reducing bush.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316 / Brass", ["As per material"], ["Class 2000 / 3000 / 6000 NPT / BSP"], ["Reducing Connections", "Instrument Tapping", "Valve Ports"]),
  mp(168, "adapter-fitting", "Adapter", "Pipe Fittings", pfImg, "ASME B16.11 / MSS SP-83", "Fitting that connects pipes with different end connections (male to female, NPT to socket, etc.) in the same assembly.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316 / Alloy Steel", ["As per material"], ["Class 2000 / 3000 NPT / SW / BW"], ["Mixed Connection Types", "Instrument Lines", "Conversion Points"]),
  mp(169, "stub-end-fitting", "Stub End", "Pipe Fittings", pfImg, "ASME B16.9 / MSS SP-43", "Short straight pipe section butt-welded to pipe, used with a lap joint backing flange for easy alignment and rotation.", "NPS 1/2\" to 24\" | DN 15 to DN 600", "—", "—", "ASTM A403 WP304L / WP316L / WP317L / Duplex", ["As per material"], ["ASME B16.9 Sch 10S / 40S / 80S"], ["Dissimilar Metal Joints", "Lined Piping", "Frequent Dismantling"]),
  mp(170, "bend-fitting", "Bend", "Pipe Fittings", pfImg, "ASME B16.49 / DIN 2605", "Pipe fitting with gradual change in direction (3D, 5D, 10D radius). Smoother flow than elbows for slurry or pig-able lines.", "NPS 1\" to 24\" | DN 25 to DN 600", "—", "—", "ASTM A234 WPB / WP304L / WP316L / Chrome-Moly", ["As per material"], ["Butt Weld Sch 40 / 80 / 160"], ["Slurry Lines", "Pigging Systems", "Long-Radius Turns"]),
  mp(171, "ferrule-fittings", "Ferrule Fittings", "Pipe Fittings", pfImg, "DIN 2353 / ISO 8434-1", "Compression tube fitting with single or double ferrule that grips the tube OD on tightening for leak-free instrument connections.", "Tube OD 6mm to 38mm | 1/4\" to 1-1/2\"", "—", "—", "SS 316 / SS 304 / Carbon Steel / Brass", ["As per material"], ["DIN 2353 L / S series"], ["Instrument Tubing", "Hydraulic Lines", "Analytical Equipment"]),
  mp(172, "compression-fittings", "Compression Fittings", "Pipe Fittings", pfImg, "BS EN 1254 / ASME B16.18", "Plumbing fitting that creates a leak-free joint by compressing a ring (olive/ferrule) against the pipe OD without soldering.", "15mm to 54mm | 1/2\" to 2\"", "—", "—", "Brass DZR / Carbon Steel / SS 316", ["As per material"], ["BS EN 1254-2"], ["Plumbing", "Gas Supply", "HVAC Piping"]),
  mp(173, "threaded-fittings", "Threaded Fittings", "Pipe Fittings", pfImg, "ASME B16.11 / BS 3799", "Forged high-pressure pipe fittings with NPT or BSP threads — elbows, tees, couplings, unions and plugs.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / SS 304 / SS 316 / Alloy Steel F11 / F22", ["As per material"], ["Class 2000 / 3000 / 6000"], ["High-Pressure Piping", "Oil & Gas", "Hydraulic Systems"]),
  mp(174, "buttweld-fittings", "Buttweld Fittings", "Pipe Fittings", pfImg, "ASME B16.9 / ASME B16.28", "Butt-weld pipe fittings (elbows, tees, reducers, caps, crosses) for full-penetration welded high-pressure pipelines.", "NPS 1/2\" to 48\" | DN 15 to DN 1200", "—", "—", "ASTM A234 WPB / WP304L / WP316L / WP11 / WP22 / WPS31803", ["As per material grade"], ["Sch 10 to Sch XXS"], ["Oil & Gas Pipelines", "Petrochemical", "Power Piping"]),
  mp(175, "socket-weld-fittings", "Socket Weld Fittings", "Pipe Fittings", pfImg, "ASME B16.11 / DIN 3239", "Small-bore socket-welded pipe fittings for high-pressure applications. Pipe inserts into socket bore and is fillet-welded.", "NPS 1/8\" to 4\" | DN 8 to DN 100", "—", "—", "ASTM A105 / A182 F304 / F316 / F11 / F22 / Duplex", ["As per material grade"], ["Class 3000 / 6000 / 9000"], ["High-Pressure Piping", "Hydraulics", "Chemical Plants"]),

  // ── PRIMARY PRODUCT SLUGS (matching DB & routes) ────────────────────────────
  { id: 201, slug: "double-end-studs", name: "Double End Studs", category: "Studs", image: local("double-end-stud.webp"), standard: "ASME B18.2.1 / DIN 2510", description: "Double end studs with equal or unequal thread lengths on both ends. Used in applications where bolts cannot be used due to space constraints. Manufactured to ASTM A193 B7 specifications for critical high-pressure service.", sizes: "M8 to M80 | 5/16\" to 3\"", threads: "Metric (Coarse & Fine) | UNC / UNF", length: "40mm to 2000mm", material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", finish: ["Plain / Black Oxide", "Hot Dip Galvanized", "Zinc Plated", "PTFE Coated"], grades: ["B7", "B7M", "B16", "L7", "B8", "B8M"], applications: ["Turbine Casings", "Valve Bodies", "Pump Assemblies", "Compressor Joints"], dimensions: [{ label: "Diameter Range", value: "M8 – M80" }, { label: "Length Range", value: "40mm – 2000mm" }, { label: "Thread Length", value: "Equal or unequal ends" }, { label: "Tensile Strength", value: "860 MPa (min)" }, { label: "Yield Strength", value: "720 MPa (min)" }, { label: "Hardness", value: "235–302 HB" }] },
  { id: 202, slug: "socket-head-cap-screws", name: "Socket Head Cap Screws", category: "Screws", image: local("socket-cap-screw.jpg"), standard: "ASME B18.3 / DIN 912", description: "High-strength socket head cap screws with cylindrical heads and internal hexagonal (Allen) drive. Ideal for applications requiring a flush or recessed head. Available in ASTM A193 Grade B7 and higher grades.", sizes: "M3 to M48 | #4 to 1-1/2\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "6mm to 300mm", material: "ASTM A193 Grade B7 / Alloy Steel", finish: ["Plain / Black Oxide", "Zinc Plated", "Nickel Plated"], grades: ["B7", "Grade 10.9", "Grade 12.9"], applications: ["Machine Tools", "Die & Mold", "Automotive", "Precision Equipment"], dimensions: [{ label: "Diameter Range", value: "M3 – M48" }, { label: "Head Diameter", value: "5.5mm – 72mm" }, { label: "Head Height", value: "3mm – 48mm" }, { label: "Socket Size", value: "2.5mm – 36mm" }, { label: "Tensile Strength", value: "1040 MPa (min) for 12.9" }, { label: "Hardness", value: "280–365 HB" }] },
  { id: 203, slug: "countersunk-screws", name: "Countersunk Screws", category: "Screws", image: local("countersunk-screw.jpg"), standard: "ASME B18.3 / DIN 7991", description: "Flat-head countersunk socket screws with 90° head angle for flush mounting applications. Manufactured from high-grade alloy steel with precision threading for critical assemblies.", sizes: "M3 to M24 | #4 to 1\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "8mm to 150mm", material: "Alloy Steel / Stainless Steel", finish: ["Plain / Black Oxide", "Zinc Plated", "Nickel Plated"], grades: ["Grade 10.9", "Grade 12.9", "B8", "B8M"], applications: ["Aerospace", "Electronics Enclosures", "Flush-Mount Assemblies", "Precision Machinery"], dimensions: [{ label: "Diameter Range", value: "M3 – M24" }, { label: "Head Diameter", value: "6mm – 44mm" }, { label: "Head Angle", value: "90°" }, { label: "Socket Size", value: "2mm – 14mm" }, { label: "Tensile Strength", value: "1040 MPa (min) for 12.9" }, { label: "Hardness", value: "280–365 HB" }] },
  { id: 204, slug: "socket-set-screws", name: "Socket Set Screws", category: "Screws", image: local("set-screw.webp"), standard: "ASME B18.3 / DIN 913-916", description: "Headless set screws with internal hex drive, available in flat, cup, cone, and dog point styles. Used for securing pulleys, gears, and collars on shafts. Manufactured to high hardness specifications.", sizes: "M3 to M24 | #4 to 1\"", threads: "Metric Coarse & Fine | UNC / UNF", length: "3mm to 80mm", material: "Alloy Steel / Stainless Steel", finish: ["Plain / Black Oxide", "Zinc Plated"], grades: ["Grade 14.9 (45H)", "Grade 12.9", "B8", "B8M"], applications: ["Shaft Locking", "Pulley Mounting", "Gear Assemblies", "Collar Fixing"], dimensions: [{ label: "Diameter Range", value: "M3 – M24" }, { label: "Point Types", value: "Flat / Cup / Cone / Dog" }, { label: "Socket Size", value: "1.5mm – 12mm" }, { label: "Tensile Strength", value: "N/A (Compressive)" }, { label: "Hardness", value: "43–53 HRC" }] },
  { id: 205, slug: "round-bars", name: "Round Bars", category: "Bars", image: local("round-bar.jpg"), standard: "AISI 4140 / 4142", description: "High-quality alloy steel round bars for machining fasteners, shafts, and custom components. Supplied in hot-rolled, cold-drawn, and peeled/ground conditions. Available in AISI 4140, 4142, and equivalent grades.", sizes: "Ø10mm to Ø500mm", threads: "N/A (Raw material)", length: "1 Meter to 6 Meter | Custom Cut", material: "AISI 4140 / 4142 / EN19 / 42CrMo4", finish: ["Hot Rolled", "Cold Drawn (Bright)", "Peeled & Ground"], grades: ["AISI 4140", "AISI 4142", "EN19", "42CrMo4"], applications: ["Fastener Manufacturing", "Shaft & Axle Production", "Die & Tool Making", "General Machining"], dimensions: [{ label: "Diameter Range", value: "Ø10mm – Ø500mm" }, { label: "Standard Lengths", value: "1m – 6m" }, { label: "Condition", value: "HR / CD / Peeled / Ground" }, { label: "Tensile Strength", value: "850–1000 MPa" }, { label: "Yield Strength", value: "680 MPa (min)" }, { label: "Hardness", value: "230–280 HB" }] },
];

// ─── Grade Chart Data ─────────────────────────────────────────────────────────

export type GradeEntry = {
  product: string;
  grades: string[];
  material: string;
  din: string;
  asme: string;
  iso: string;
  bs: string;
  tensile: string;
  yield_: string;
  application: string;
};

export type GradeCategory = {
  name: string;
  entries: GradeEntry[];
};

export const gradeChartCategories: GradeCategory[] = [
  {
    name: "Bolts",
    entries: [
      { product: "Stud Bolt", grades: ["B7", "B7M", "B16", "L7", "L7M", "B8", "B8M"], material: "ASTM A193 Grade B7 (42CrMo4)", din: "DIN 976", asme: "ASME B16.5 / B18.31.2", iso: "ISO 4014", bs: "BS 4882", tensile: "860 MPa", yield_: "720 MPa", application: "Flange Connections, Pressure Vessels, Heat Exchangers" },
      { product: "Tap End Stud", grades: ["B7", "B7M", "B16", "L7", "8.8", "10.9"], material: "ASTM A193 Grade B7 / Alloy", din: "DIN 938/939", asme: "ASME B18.31.2", iso: "ISO 4014", bs: "BS 4882", tensile: "860 MPa", yield_: "720 MPa", application: "Pump Casings, Valve Bodies, Engine Blocks" },
      { product: "Double End Stud", grades: ["B7", "B7M", "B16", "L7", "8.8"], material: "ASTM A193 Grade B7 / Alloy", din: "DIN 938/939", asme: "ASME B18.31.2", iso: "ISO 4014", bs: "BS 4882", tensile: "860 MPa", yield_: "720 MPa", application: "Turbine Casings, Compressors, Flanged Joints" },
      { product: "Hex Bolt", grades: ["4.6", "5.6", "6.8", "8.8", "10.9", "12.9", "B7", "A2-70", "A4-80"], material: "Carbon / Alloy / Stainless Steel", din: "DIN 931/933", asme: "ASME B18.2.1", iso: "ISO 4014/4017", bs: "BS 3692/4190", tensile: "400–1200 MPa", yield_: "240–1080 MPa", application: "Structural Steel, Machinery, General Engineering" },
      { product: "Heavy Hex Bolt", grades: ["8.8", "10.9", "12.9", "B7", "B16"], material: "Alloy Steel / ASTM A193", din: "DIN 6914", asme: "ASME B18.2.1", iso: "ISO 7411", bs: "BS 4395", tensile: "860 MPa", yield_: "720 MPa", application: "Heavy Structural, Flanges, Bridges" },
      { product: "Flange Bolt", grades: ["8.8", "10.9", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 6921", asme: "ASME B18.2.1", iso: "ISO 1665", bs: "—", tensile: "800–1040 MPa", yield_: "640–940 MPa", application: "Automotive, Machinery, HVAC" },
      { product: "Carriage Bolt", grades: ["4.6", "8.8", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 603", asme: "ASME B18.5", iso: "ISO 8677", bs: "BS 4933", tensile: "400–830 MPa", yield_: "240–660 MPa", application: "Timber, Furniture, Playground Equipment" },
      { product: "Eye Bolt", grades: ["C15E", "Grade 8", "A2-70"], material: "Forged Carbon / SS 316", din: "DIN 580", asme: "ASME B18.15", iso: "ISO 2342", bs: "BS 2104", tensile: "400–800 MPa", yield_: "—", application: "Lifting, Rigging, Crane Hooks" },
      { product: "U Bolt", grades: ["4.6", "8.8", "SS 304", "SS 316"], material: "Carbon / Stainless Steel", din: "DIN 3570", asme: "ASME B18.31.5", iso: "ISO 1479", bs: "BS 1575", tensile: "400–830 MPa", yield_: "240–660 MPa", application: "Pipe Clamps, Cable Support, Pipe Racks" },
      { product: "J Bolt", grades: ["F1554 Gr 36/55/105", "4.6", "8.8"], material: "Carbon / Alloy Steel", din: "—", asme: "ASTM F1554", iso: "—", bs: "—", tensile: "400–860 MPa", yield_: "248–724 MPa", application: "Foundation Anchoring, Column Base Plates" },
      { product: "Foundation Bolt", grades: ["F1554 Gr 36/55/105", "8.8", "10.9"], material: "Carbon / Alloy Steel", din: "—", asme: "ASTM F1554", iso: "—", bs: "BS 7419", tensile: "400–1040 MPa", yield_: "248–940 MPa", application: "Structural Columns, Machinery, Bridge Piers" },
      { product: "Anchor Bolt", grades: ["F1554 Gr 36/55/105", "8.8"], material: "Carbon / Alloy Steel", din: "DIN 529", asme: "ASME B18.31", iso: "ISO 2320", bs: "BS 4625", tensile: "400–860 MPa", yield_: "248–720 MPa", application: "Foundation Bolting, Equipment Mounting" },
      { product: "Elevator Bolt", grades: ["4.6", "8.8"], material: "Carbon Steel", din: "—", asme: "ASME B18.5", iso: "—", bs: "—", tensile: "400–830 MPa", yield_: "240–660 MPa", application: "Conveyor Belts, Elevator Buckets" },
      { product: "Allen Bolt / Socket Head Cap Screw", grades: ["10.9", "12.9", "A2-70", "A4-80"], material: "Alloy / Stainless Steel", din: "DIN 912", asme: "ASME B18.3", iso: "ISO 4762", bs: "BS 4168", tensile: "1040–1220 MPa", yield_: "940–1100 MPa", application: "Machinery, Automotive, Precision Equipment" },
      { product: "CSK Allen Bolt", grades: ["10.9", "12.9", "A2-70"], material: "Alloy / Stainless Steel", din: "DIN 7991", asme: "ASME B18.3", iso: "ISO 10642", bs: "BS 4168", tensile: "1040–1220 MPa", yield_: "940–1100 MPa", application: "Flush Mounting, Automotive Panels" },
      { product: "Shoulder Bolt", grades: ["12.9", "A2-70"], material: "Alloy Steel / SS 303", din: "DIN 7379", asme: "ASME B18.3", iso: "—", bs: "—", tensile: "1220 MPa", yield_: "—", application: "Hinges, Linkages, Pivot Points" },
      { product: "T Head Bolt", grades: ["8.8", "10.9"], material: "Carbon / Alloy Steel", din: "DIN 186/261", asme: "—", iso: "—", bs: "—", tensile: "800–1040 MPa", yield_: "640–940 MPa", application: "Machine Tools, CNC Fixtures" },
      { product: "Track Bolt", grades: ["Grade 4.6", "Grade 8.8"], material: "Carbon Steel IS 1086", din: "—", asme: "—", iso: "IS 1084", bs: "—", tensile: "400–830 MPa", yield_: "—", application: "Railway Track Joints, Fishplates" },
      { product: "Structural Bolt", grades: ["A325", "A490", "10.9", "S10T"], material: "Medium Carbon Alloy Steel", din: "DIN 6914", asme: "ASTM A325/A490", iso: "ISO 7411", bs: "BS EN 14399", tensile: "830–1040 MPa", yield_: "660–900 MPa", application: "Steel Structures, Bridges, Industrial Buildings" },
      { product: "Threaded Rod / Stud Rod", grades: ["4.6", "8.8", "B7", "A2-70", "A4-80"], material: "Carbon / Alloy / SS", din: "DIN 976", asme: "ASME B18.31.3", iso: "ISO 7681", bs: "BS 4848", tensile: "400–860 MPa", yield_: "240–720 MPa", application: "MEP Hangers, Concrete Anchors, Structural Ties" },
      { product: "Machine Bolt", grades: ["4.6", "8.8"], material: "Carbon Steel", din: "DIN 558", asme: "ASME B18.2.1", iso: "ISO 4016", bs: "BS 4190", tensile: "400–830 MPa", yield_: "240–660 MPa", application: "General Machinery, Agricultural Equipment" },
    ],
  },
  {
    name: "Nuts",
    entries: [
      { product: "Hex Nut", grades: ["4", "5", "8", "10", "ASTM A194 2H", "A2-70", "A4-80"], material: "Carbon / Alloy / Stainless Steel", din: "DIN 934", asme: "ASME B18.2.2", iso: "ISO 4032", bs: "BS 3692", tensile: "400–830 HBW", yield_: "Proof Load as per grade", application: "General Fastening, Structural, Machinery" },
      { product: "Heavy Hex Nut", grades: ["ASTM A194 2H", "A194 2HM", "A194 4", "A194 7", "A194 8"], material: "Carbon / Alloy Steel", din: "DIN 934 (heavy)", asme: "ASME B18.2.2", iso: "ISO 4034", bs: "BS 4882", tensile: "248–352 HBW", yield_: "150 ksi Proof Load", application: "Pressure Vessels, Flanges, High-Pressure Joints" },
      { product: "Lock Nut / Jam Nut", grades: ["6", "8", "10", "A2-70", "A194 2H"], material: "Carbon / Alloy / Stainless Steel", din: "DIN 934 (thin)", asme: "ASME B18.16.2", iso: "ISO 4035", bs: "BS 1769", tensile: "—", yield_: "Proof Load as per grade", application: "Counter-locking, Jam Locking, Adjustment" },
      { product: "Nylon Lock Nut", grades: ["6", "8", "A2-70"], material: "Carbon Steel / SS 304", din: "DIN 985", asme: "ASME B18.16.2", iso: "ISO 7042", bs: "—", tensile: "—", yield_: "—", application: "Electronics, Automotive, Light Machinery" },
      { product: "Dome Nut / Cap Nut", grades: ["6", "8", "A2-70"], material: "Carbon Steel / SS / Brass", din: "DIN 1587", asme: "ASME B18.6.3", iso: "ISO 1580", bs: "—", tensile: "—", yield_: "—", application: "Decorative, Thread Protection, Automotive" },
      { product: "Wing Nut", grades: ["4", "6"], material: "Carbon / Brass / SS", din: "DIN 315", asme: "ASME B18.17", iso: "ISO 315", bs: "BS 1769", tensile: "—", yield_: "—", application: "Hand-tightening, Quick-release, Signage" },
      { product: "Coupling Nut", grades: ["6", "8", "A2-70"], material: "Carbon / Alloy / SS", din: "DIN 6334", asme: "ASME B18.2.2", iso: "ISO 4033", bs: "—", tensile: "—", yield_: "—", application: "Threaded-rod Extension, Anchor Systems" },
      { product: "Square Nut", grades: ["4", "6", "8"], material: "Carbon Steel", din: "DIN 562/557", asme: "ASME B18.2.2", iso: "ISO 4033", bs: "—", tensile: "—", yield_: "—", application: "T-slot Channels, Timber, Machine Tools" },
      { product: "Flange Nut", grades: ["6", "8", "10", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 6923", asme: "—", iso: "ISO 4161", bs: "—", tensile: "—", yield_: "—", application: "Automotive, Sheet Metal, Electrical Panels" },
      { product: "Slotted / Castle Nut", grades: ["6", "8", "B7"], material: "Carbon / Alloy Steel", din: "DIN 935", asme: "ASME B18.2.2", iso: "ISO 7042", bs: "BS 1769", tensile: "—", yield_: "—", application: "Axle Nuts, Steering Joints, Safety-critical Connections" },
      { product: "T Nut", grades: ["8", "10", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 508", asme: "ASME B18.29", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Machine Tables, CNC Fixtures, Aluminium Profiles" },
      { product: "Weld Nut", grades: ["6", "8"], material: "Carbon Steel / SS 304", din: "DIN 929", asme: "—", iso: "ISO 21670", bs: "—", tensile: "—", yield_: "—", application: "Sheet Metal, Automotive Body, Electrical Cabinets" },
      { product: "Cage Nut", grades: ["6", "8"], material: "Carbon Steel (Zinc)", din: "—", asme: "EIA 310", iso: "IEC 60297", bs: "—", tensile: "—", yield_: "—", application: "Server Racks, Telecom Cabinets, Electronic Enclosures" },
      { product: "Serrated Flange Nut", grades: ["6", "8", "10"], material: "Carbon / Stainless Steel", din: "DIN 6923 (serrated)", asme: "—", iso: "ISO 4161", bs: "—", tensile: "—", yield_: "—", application: "Automotive, Sheet Metal, Anti-vibration Assemblies" },
    ],
  },
  {
    name: "Washers",
    entries: [
      { product: "Plain Washer", grades: ["200 HV", "A2-70", "A4-80", "ASTM F844"], material: "Carbon / SS / Brass", din: "DIN 125", asme: "ASME B18.22.1", iso: "ISO 7089", bs: "BS 4320", tensile: "—", yield_: "—", application: "Load Distribution, Surface Protection, Flanges" },
      { product: "Spring Washer", grades: ["C75 Spring Steel", "A2-70"], material: "Spring Steel / SS / Phosphor Bronze", din: "DIN 127", asme: "ASME B18.21.1", iso: "ISO 7090", bs: "BS 4464", tensile: "—", yield_: "—", application: "Vibration Service, Automotive, Railways" },
      { product: "Lock Washer", grades: ["C75", "A2-70"], material: "Hardened Carbon / SS", din: "DIN 127", asme: "ASME B18.21.1", iso: "ISO 10673", bs: "BS 4464", tensile: "—", yield_: "—", application: "Vibration, Machinery, Automotive" },
      { product: "Flat Washer", grades: ["ASTM F844", "ISO 7089"], material: "Carbon / SS / Nylon", din: "DIN 125A", asme: "ASME B18.22.1", iso: "ISO 7089", bs: "BS 4320", tensile: "—", yield_: "—", application: "General, Structural, Electrical" },
      { product: "Fender Washer", grades: ["ASTM F844"], material: "Carbon / SS", din: "—", asme: "ASME B18.22.1", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Sheet Metal, Automotive Body, Oversized Holes" },
      { product: "Square Washer", grades: ["DIN 436"], material: "Carbon Steel", din: "DIN 436", asme: "—", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Timber Connections, Roof Purlins" },
      { product: "Star Washer", grades: ["C60 Steel", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 6797", asme: "ASME B18.21.1", iso: "ISO 6906", bs: "—", tensile: "—", yield_: "—", application: "Electrical Grounding, Electronics, Automotive" },
      { product: "Belleville Washer", grades: ["DIN 2093 Groups 1-3"], material: "51CrV4 Spring Steel", din: "DIN 2093", asme: "—", iso: "ISO 16983", bs: "—", tensile: "—", yield_: "—", application: "Pressure Relief Valves, High-temp Joints" },
      { product: "Tooth Lock Washer", grades: ["HRC 44–50"], material: "Hardened Carbon / SS", din: "DIN 6798", asme: "ASME B18.21.1", iso: "ISO 6906", bs: "—", tensile: "—", yield_: "—", application: "Electronic Assemblies, Electrical Grounds" },
      { product: "Sealing Washer", grades: ["Zinc + EPDM/Neoprene"], material: "Zinc Steel + Rubber", din: "DIN 7980", asme: "—", iso: "ISO 7092", bs: "—", tensile: "—", yield_: "—", application: "Roofing, Plumbing, HVAC Panels" },
    ],
  },
  {
    name: "Screws",
    entries: [
      { product: "Self Tapping Screw", grades: ["ST Type A/AB/B"], material: "Case-hardened Carbon / SS 304", din: "DIN 7971/7972", asme: "ASME B18.6.3", iso: "ISO 1479", bs: "BS 988", tensile: "380–450 HV", yield_: "—", application: "Sheet Metal, Plastics, Light Gauge Metal" },
      { product: "Self Drilling Screw", grades: ["Class 2/3/4"], material: "Case-hardened Carbon Steel", din: "DIN 7504", asme: "ASTM C1002", iso: "ISO 15480", bs: "AS 3566", tensile: "380–450 HV", yield_: "—", application: "Roofing, Cladding, Steel Structures" },
      { product: "Machine Screw", grades: ["8.8", "A2-70"], material: "Carbon Steel / SS / Brass", din: "DIN 84/963/965", asme: "ASME B18.6.3", iso: "ISO 1207", bs: "BS 450", tensile: "800 MPa", yield_: "640 MPa", application: "Electronics, Instruments, Light Machinery" },
      { product: "Wood Screw", grades: ["Softwood / Hardwood Grade"], material: "Carbon Steel / SS / Brass", din: "DIN 97", asme: "ASME B18.6.1", iso: "ISO 1478", bs: "BS 1210", tensile: "—", yield_: "—", application: "Woodworking, Furniture, Joinery" },
      { product: "Drywall Screw", grades: ["ASTM C1002 Type S/W"], material: "Case-hardened Carbon Steel", din: "—", asme: "ASTM C1002", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Drywall, Plasterboard, Partitioning" },
      { product: "Chipboard Screw", grades: ["Grade 8.8"], material: "Carbon Steel", din: "DIN 7505", asme: "—", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Furniture, Cabinets, Flooring" },
      { product: "Socket Set Screw", grades: ["12.9", "A4-80"], material: "Alloy Steel / SS 316", din: "DIN 913-916", asme: "ASME B18.3", iso: "ISO 4026-4029", bs: "BS 4168", tensile: "1220 MPa", yield_: "1100 MPa", application: "Shaft Locking, Couplings, Pulleys" },
      { product: "Grub Screw", grades: ["12.9"], material: "Alloy Steel", din: "DIN 913/914", asme: "ASME B18.3", iso: "ISO 4026", bs: "BS 4168", tensile: "1220 MPa", yield_: "1100 MPa", application: "Shaft Collars, Set Positions" },
      { product: "Hex Head Screw", grades: ["8.8", "10.9", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 933", asme: "ASME B18.2.1", iso: "ISO 4017", bs: "BS 3692", tensile: "800–1040 MPa", yield_: "640–940 MPa", application: "Machinery, General Engineering" },
      { product: "Pan Head Screw", grades: ["8.8", "A2-70"], material: "Carbon Steel / SS", din: "DIN 7985", asme: "ASME B18.6.3", iso: "ISO 7045", bs: "BS 450", tensile: "800 MPa", yield_: "640 MPa", application: "Electronics, Sheet Metal, Appliances" },
      { product: "Countersunk Screw", grades: ["8.8", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 965", asme: "ASME B18.6.3", iso: "ISO 7046", bs: "BS 450", tensile: "800 MPa", yield_: "640 MPa", application: "Flush Mounting, Hinges, Electronics" },
      { product: "Button Head Screw", grades: ["10.9", "A2-70"], material: "Alloy / Stainless Steel", din: "DIN 9427", asme: "ASME B18.3", iso: "ISO 7380", bs: "—", tensile: "1040 MPa", yield_: "940 MPa", application: "Electronics, Automotive Panels, Covers" },
      { product: "Phillips Screw", grades: ["4.8", "A2-70"], material: "Carbon Steel / SS / Brass", din: "DIN 7985", asme: "ASME B18.6.3", iso: "ISO 7045", bs: "BS 450", tensile: "420 MPa", yield_: "340 MPa", application: "General, Electronics, Furniture, Appliances" },
    ],
  },
  {
    name: "Anchors & Fixings",
    entries: [
      { product: "Wedge Anchor", grades: ["F1554 Gr 36/55", "5.6", "8.8"], material: "Carbon / SS 316", din: "—", asme: "ASTM F1554", iso: "ETA Approved", bs: "—", tensile: "400–830 MPa", yield_: "248–660 MPa", application: "Structural Columns, Racking, Heavy Equipment" },
      { product: "Sleeve Anchor", grades: ["Grade 8"], material: "Carbon / SS 316", din: "—", asme: "—", iso: "ETA Approved", bs: "—", tensile: "800 MPa", yield_: "640 MPa", application: "Masonry, Concrete, Natural Stone" },
      { product: "Drop-In Anchor", grades: ["Grade 8"], material: "Carbon / SS 304", din: "—", asme: "ICC-ES", iso: "ETA Approved", bs: "—", tensile: "800 MPa", yield_: "640 MPa", application: "Ceilings, HVAC Hangers, Pipe Supports" },
      { product: "Chemical Anchor", grades: ["F1554 Gr 105", "8.8", "12.9"], material: "Alloy / SS 316 + Epoxy", din: "—", asme: "—", iso: "ETA / ETAG 001", bs: "—", tensile: "860–1220 MPa", yield_: "720–1100 MPa", application: "High-Load Structural, Seismic Zones, Cracked Concrete" },
      { product: "Shield Anchor", grades: ["Grade 6"], material: "Carbon Steel (Zinc)", din: "DIN 571", asme: "—", iso: "ISO 2339", bs: "—", tensile: "600 MPa", yield_: "480 MPa", application: "Brick Walls, Block Work, Hollow Core Slabs" },
      { product: "Through Bolt Anchor", grades: ["5.6", "8.8"], material: "Zinc Carbon Steel", din: "—", asme: "ASTM F1554", iso: "ETA Approved", bs: "—", tensile: "500–830 MPa", yield_: "300–660 MPa", application: "Steel Structures, Facades, Post Bases" },
      { product: "Concrete Screw Anchor", grades: ["ASTM F1554"], material: "Case-hardened / SS", din: "—", asme: "ICC-ES AC193", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Concrete, Block, Brick — removable/reusable" },
    ],
  },
  {
    name: "Pins",
    entries: [
      { product: "Dowel Pin", grades: ["m6 / h8 tolerance", "Ground ±0.003mm"], material: "Case-hardened Steel / SS 303 / Carbide", din: "DIN 7", asme: "ASME B18.8.2", iso: "ISO 8734", bs: "BS 4235", tensile: "—", yield_: "—", application: "Machine Alignment, Jigs, Die Sets, Hinge Pivots" },
      { product: "Parallel Pin", grades: ["h8 / m6 tolerance"], material: "Low Carbon Steel / SS 303 / SS 316", din: "DIN 7", asme: "ASME B18.8.2", iso: "ISO 2338", bs: "BS 4235", tensile: "—", yield_: "—", application: "Location Pins, Alignment Fixtures, Hinge Pivots" },
      { product: "Taper Pin", grades: ["As per DIN 1 / #0 to #10"], material: "Carbon Steel / SS 303", din: "DIN 1", asme: "ASME B18.8.2", iso: "ISO 2339", bs: "BS 46 Pt2", tensile: "—", yield_: "—", application: "Shaft Collars, Gears, Pulleys" },
      { product: "Spring Pin (Slotted)", grades: ["As per DIN 1481"], material: "Spring Steel / SS 420", din: "DIN 1481", asme: "—", iso: "ISO 8752", bs: "BS 4235 Pt2", tensile: "—", yield_: "—", application: "Couplings, Hinges, Cam Assemblies" },
      { product: "Roll Pin (Coiled Spring Pin)", grades: ["As per DIN 7343"], material: "Spring Steel / SS 420", din: "DIN 7343", asme: "—", iso: "ISO 8748", bs: "—", tensile: "—", yield_: "—", application: "Gearboxes, Linkages, Coupling Hubs" },
      { product: "Split Pin / Cotter Pin", grades: ["As per DIN 94"], material: "Low Carbon Steel / SS / Brass", din: "DIN 94", asme: "ASME B18.8.1", iso: "ISO 1234", bs: "BS 1574", tensile: "—", yield_: "—", application: "Castle Nuts, Clevis Pins, Safety Locking" },
      { product: "Clevis Pin", grades: ["8.8", "A2-70"], material: "Carbon / Alloy / SS 316", din: "DIN 1444", asme: "ASME B18.8.1", iso: "ISO 2340", bs: "BS 4235", tensile: "—", yield_: "—", application: "Lifting Gear, Hydraulic Cylinders, Clevis Connections" },
      { product: "Grooved Pin", grades: ["As per DIN 1471-1474"], material: "Carbon Steel", din: "DIN 1471-1474", asme: "—", iso: "ISO 8740-8745", bs: "BS 4235 Pt3", tensile: "—", yield_: "—", application: "Hinge Joints, Pivot Pins, Gearbox Components" },
      { product: "Knurled Pin", grades: ["As per DIN 1469"], material: "Carbon Steel / SS 304", din: "DIN 1469", asme: "—", iso: "ISO 8745", bs: "—", tensile: "—", yield_: "—", application: "Permanent Locating, Name Plates, Pivot Bushings" },
      { product: "Hitch Pin", grades: ["As per DIN 11023"], material: "Carbon Steel / SS 304", din: "DIN 11023", asme: "ASME B18.8", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Trailer Hitches, Agricultural Linkages, Drawbars" },
      { product: "Lynch Pin", grades: ["As per standard"], material: "Carbon Steel / Spring Steel", din: "DIN 11023", asme: "ASME B18.8", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Trailer Pins, Safety Retention, Quick Release Arms" },
      { product: "Solid Pin", grades: ["m6 / h8 / f7 tolerance"], material: "Carbon / Alloy / SS 303 / Brass", din: "DIN 7", asme: "ASME B18.8.2", iso: "ISO 2338", bs: "BS 4235", tensile: "—", yield_: "—", application: "Heavy Shear, Die Alignment, Press Fits" },
      { product: "Taper Cotter Pin", grades: ["IS 549 / DIN 1477"], material: "Carbon Steel / Alloy Steel", din: "DIN 1477", asme: "—", iso: "IS 549", bs: "—", tensile: "—", yield_: "—", application: "Pump Shafts, Motor Couplings, Wheel Hubs" },
      { product: "Quick Release Pin", grades: ["Grade 8 / A2-70"], material: "Alloy Steel / SS 316 / Hardened Steel", din: "DIN 11023", asme: "MIL-P-20022", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Maintenance Access, Aircraft Ground Support, Jig Fixtures" },
      { product: "Ball Lock Pin", grades: ["Grade 8 / SS A4"], material: "Hardened Alloy Steel / SS 316", din: "—", asme: "MIL-P-20022", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Tooling Fixtures, Defence Equipment, Aerospace Ground" },
      { product: "Safety Pin (Industrial)", grades: ["As per DIN 11023"], material: "Carbon Steel / SS 304 / Spring Steel", din: "DIN 11023", asme: "ASME B18.8.1", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Lock-wiring, Cotter Retention, Clevis Guards" },
      { product: "Ejector Pin (Die & Mould)", grades: ["HRC 50–54 (H13)", "HRC 60–62 (D2)"], material: "H13 / D2 / SS 303 / Nitrided Steel", din: "DIN 16756", asme: "—", iso: "JIS B5116", bs: "—", tensile: "—", yield_: "—", application: "Injection Moulding, Die Casting, Compression Moulding" },
      { product: "Guide Pin (Mould Base)", grades: ["HRC 52–56"], material: "420 SS / H13 / Nitrided", din: "DIN 9841", asme: "—", iso: "JIS B5101", bs: "—", tensile: "—", yield_: "—", application: "Mould Alignment, Progressive Die Sets, Stamping Tools" },
      { product: "Straight Pin", grades: ["m6 / h8 / f7 tolerance"], material: "Carbon Steel / SS 304 / Brass / Aluminium", din: "DIN 7", asme: "ASME B18.8.2", iso: "ISO 2338", bs: "BS 4235", tensile: "—", yield_: "—", application: "General Location, Pivot Points, Cotter Holes" },
      { product: "Solid Pin (General)", grades: ["As per diameter tolerance"], material: "Mild Steel / Alloy Steel / SS 316", din: "DIN 7", asme: "ASME B18.8.2", iso: "ISO 8734", bs: "BS 4235", tensile: "—", yield_: "—", application: "Cross Pins, Dowel Holes, Pivot Applications" },
    ],
  },
  {
    name: "Rivets",
    entries: [
      { product: "Blind Rivet / Pop Rivet", grades: ["ASTM B117", "ISO 15978"], material: "Aluminium / Steel / SS / Monel", din: "DIN 7337", asme: "ASME B18.29.5", iso: "ISO 15978", bs: "BS EN ISO 15978", tensile: "210–450 MPa", yield_: "120–380 MPa", application: "Sheet Metal, Automotive Bodies, HVAC Ducts" },
      { product: "Solid Rivet", grades: ["ASTM A502 Gr1/2"], material: "Carbon Steel / Copper / Aluminium / Monel", din: "DIN 124", asme: "ASME B18.1.1", iso: "ISO 1051", bs: "BS 641", tensile: "300–500 MPa", yield_: "200–350 MPa", application: "Bridges, Boilers, Ships, Railway Wagons" },
      { product: "Semi Tubular Rivet", grades: ["As per ISO 8750"], material: "Carbon Steel / Brass / Aluminium", din: "DIN 7337 (partial)", asme: "—", iso: "ISO 8750", bs: "BS EN ISO 8750", tensile: "210–380 MPa", yield_: "120–280 MPa", application: "Brake Linings, Leather Goods, Hinges" },
      { product: "Structural Rivet", grades: ["ASTM A502 Gr1/2/3"], material: "Carbon / Alloy Steel / Monel", din: "—", asme: "ASTM A502", iso: "ISO 15978", bs: "BS EN ISO 15978", tensile: "480–700 MPa", yield_: "340–500 MPa", application: "Steel Bridges, Building Structures, Overhead Cranes" },
    ],
  },
  {
    name: "Industrial / Special",
    entries: [
      { product: "Threaded Bar", grades: ["4.6", "8.8", "B7", "A2-70", "A4-80"], material: "MS / Alloy / SS 304 / SS 316", din: "DIN 976", asme: "ASME B18.31.3", iso: "ISO 7681", bs: "BS 4848", tensile: "400–860 MPa", yield_: "240–720 MPa", application: "Hanger Rods, Tie Rods, Construction" },
      { product: "Studs", grades: ["B7", "B7M", "B16", "L7", "8.8"], material: "ASTM A193 B7 / Alloy / SS", din: "DIN 835", asme: "ASME B18.31.2", iso: "ISO 4014", bs: "BS 4882", tensile: "860 MPa", yield_: "720 MPa", application: "Flanges, Valves, Cylinders, Compressors" },
      { product: "Pipe Clamp Bolt", grades: ["4.6", "8.8", "SS 316"], material: "Carbon / Stainless Steel", din: "DIN 3570", asme: "ASME B18.31.5", iso: "—", bs: "—", tensile: "400–830 MPa", yield_: "240–660 MPa", application: "Pipe Supports, Hangers, Pipe Racks" },
      { product: "Turnbuckle", grades: ["4.6", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 1478/1479", asme: "ASME B18.14", iso: "ISO 8801", bs: "BS 3032", tensile: "400 MPa", yield_: "240 MPa", application: "Rigging, Bracing, Guy Wires" },
      { product: "Eye Nut", grades: ["C15E", "A2-70", "SS 316"], material: "Forged Carbon / SS 316", din: "DIN 582", asme: "ASME B18.15", iso: "ISO 1580", bs: "BS 4278", tensile: "400 MPa", yield_: "240 MPa", application: "Lifting, Rigging, Crane Attachment" },
      { product: "T Bolt", grades: ["8.8", "10.9", "A2-70"], material: "Carbon / Stainless Steel", din: "DIN 787", asme: "—", iso: "ISO 299", bs: "—", tensile: "800–1040 MPa", yield_: "640–940 MPa", application: "Machine Tool T-slots, Extrusion Profiles" },
      { product: "Shear Connector", grades: ["ASTM A108 Grade 1015"], material: "Low Carbon Steel (ASTM A108)", din: "—", asme: "ASTM A108", iso: "—", bs: "BS EN ISO 13918", tensile: "415 MPa min", yield_: "345 MPa min", application: "Composite Beams, Bridges, Floor Systems" },
      { product: "Circlips", grades: ["DIN 471 / 472"], material: "Spring Steel / SS 420", din: "DIN 471/472", asme: "—", iso: "ISO 1234", bs: "BS 3673", tensile: "—", yield_: "—", application: "Gear Shafts, Bearings, Hydraulic Cylinders" },
      { product: "Retaining Rings", grades: ["DIN 5417 / ASME B27.7"], material: "Spring Steel / Beryllium Copper / SS", din: "DIN 5417", asme: "ASME B27.7", iso: "—", bs: "—", tensile: "—", yield_: "—", application: "Gearboxes, Pumps, Actuators" },
    ],
  },
];
