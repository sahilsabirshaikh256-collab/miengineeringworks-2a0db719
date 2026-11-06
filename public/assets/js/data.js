// Static site data — M.I. Engineering Works
const PRODUCTS = [
  {
    "slug": "stud-bolts",
    "name": "Stud Bolts",
    "category": "Studs",
    "img": "/images/stud-bolt.jpg",
    "standard": "ASME B16.5 / DIN 976",
    "description": "Fully threaded or partially threaded stud bolts manufactured from ASTM A193 Grade B7 chromium-molybdenum steel. Designed for high-temperature, high-pressure flange connections in petrochemical, oil & gas, and power generation industries.",
    "sizes": "M6 to M100 | 1/4\" to 4\"",
    "threads": "Metric (Coarse & Fine) | UNC / UNF | BSW / BSF",
    "length": "30mm to 3000mm | Custom lengths available",
    "material": "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)",
    "finish": [
      "Plain / Black Oxide",
      "Hot Dip Galvanized",
      "Zinc Plated",
      "PTFE / Xylan Coated",
      "Cadmium Plated"
    ],
    "grades": [
      "B7",
      "B7M",
      "B16",
      "L7",
      "L7M",
      "B8",
      "B8M",
      "Grade 10.9",
      "Grade 12.9"
    ],
    "applications": [
      "Flange Connections",
      "Pressure Vessels",
      "Heat Exchangers",
      "Pipelines",
      "Refineries",
      "Power Plants"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M6 – M100"
      },
      {
        "label": "Length Range",
        "value": "30mm – 3000mm"
      },
      {
        "label": "Thread Pitch",
        "value": "As per standard"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min)"
      },
      {
        "label": "Yield Strength",
        "value": "720 MPa (min)"
      },
      {
        "label": "Hardness",
        "value": "235–302 HB"
      }
    ]
  },
  {
    "slug": "double-end-studs",
    "name": "Double End Studs",
    "category": "Studs",
    "img": "/images/double-end-stud.jpg",
    "standard": "ASME B18.2.1 / DIN 2510",
    "description": "Double end studs with equal or unequal thread lengths on both ends. Used in applications where bolts cannot be used due to space constraints. Manufactured to ASTM A193 B7 specifications for critical high-pressure service.",
    "sizes": "M8 to M80 | 5/16\" to 3\"",
    "threads": "Metric (Coarse & Fine) | UNC / UNF",
    "length": "40mm to 2000mm",
    "material": "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)",
    "finish": [
      "Plain / Black Oxide",
      "Hot Dip Galvanized",
      "Zinc Plated",
      "PTFE Coated"
    ],
    "grades": [
      "B7",
      "B7M",
      "B16",
      "L7",
      "B8",
      "B8M"
    ],
    "applications": [
      "Turbine Casings",
      "Valve Bodies",
      "Pump Assemblies",
      "Compressor Joints"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M8 – M80"
      },
      {
        "label": "Length Range",
        "value": "40mm – 2000mm"
      },
      {
        "label": "Thread Length",
        "value": "Equal or unequal ends"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min)"
      },
      {
        "label": "Yield Strength",
        "value": "720 MPa (min)"
      },
      {
        "label": "Hardness",
        "value": "235–302 HB"
      }
    ]
  },
  {
    "slug": "hex-bolts",
    "name": "Hex Bolts",
    "category": "Bolts",
    "img": "/images/hex-bolt.jpg",
    "standard": "ASME B18.2.1 / DIN 931",
    "description": "Hexagonal head bolts manufactured from high-strength alloy steel per ASTM A193 Grade B7. Available in full thread and partial thread configurations for structural and industrial fastening applications.",
    "sizes": "M6 to M64 | 1/4\" to 2-1/2\"",
    "threads": "Metric Coarse & Fine | UNC / UNF",
    "length": "16mm to 500mm",
    "material": "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)",
    "finish": [
      "Plain / Black Oxide",
      "Hot Dip Galvanized",
      "Zinc Plated",
      "Dacromet"
    ],
    "grades": [
      "B7",
      "B16",
      "L7",
      "Grade 8.8",
      "Grade 10.9",
      "Grade 12.9"
    ],
    "applications": [
      "Structural Steelwork",
      "Heavy Equipment",
      "Bridge Construction",
      "Industrial Machinery"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M6 – M64"
      },
      {
        "label": "Head Width (A/F)",
        "value": "10mm – 95mm"
      },
      {
        "label": "Head Height",
        "value": "4mm – 41mm"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min)"
      },
      {
        "label": "Yield Strength",
        "value": "720 MPa (min)"
      },
      {
        "label": "Hardness",
        "value": "235–302 HB"
      }
    ]
  },
  {
    "slug": "heavy-hex-bolts",
    "name": "Heavy Hex Bolts",
    "category": "Bolts",
    "img": "/images/heavy-hex-bolt.jpg",
    "standard": "ASME B18.2.1 / DIN 6914",
    "description": "Heavy hexagonal head bolts with larger head dimensions for greater bearing surface area. Designed for high-strength structural and pressure applications. Manufactured from ASTM A193 Grade B7 alloy steel.",
    "sizes": "M12 to M100 | 1/2\" to 4\"",
    "threads": "Metric Coarse | UNC",
    "length": "30mm to 800mm",
    "material": "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)",
    "finish": [
      "Plain / Black Oxide",
      "Hot Dip Galvanized",
      "PTFE Coated"
    ],
    "grades": [
      "B7",
      "B7M",
      "B16",
      "L7",
      "Grade 10.9"
    ],
    "applications": [
      "Petrochemical Plants",
      "Steel Structures",
      "Pressure Vessels",
      "Heavy Machinery"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M12 – M100"
      },
      {
        "label": "Head Width (A/F)",
        "value": "22mm – 155mm"
      },
      {
        "label": "Head Height",
        "value": "8mm – 64mm"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min)"
      },
      {
        "label": "Yield Strength",
        "value": "720 MPa (min)"
      },
      {
        "label": "Hardness",
        "value": "235–302 HB"
      }
    ]
  },
  {
    "slug": "socket-head-cap-screws",
    "name": "Socket Head Cap Screws",
    "category": "Screws",
    "img": "/images/socket-cap-screw.jpg",
    "standard": "ASME B18.3 / DIN 912",
    "description": "High-strength socket head cap screws with cylindrical heads and internal hexagonal (Allen) drive. Ideal for applications requiring a flush or recessed head. Available in ASTM A193 Grade B7 and higher grades.",
    "sizes": "M3 to M48 | #4 to 1-1/2\"",
    "threads": "Metric Coarse & Fine | UNC / UNF",
    "length": "6mm to 300mm",
    "material": "ASTM A193 Grade B7 / Alloy Steel",
    "finish": [
      "Plain / Black Oxide",
      "Zinc Plated",
      "Nickel Plated"
    ],
    "grades": [
      "B7",
      "Grade 10.9",
      "Grade 12.9"
    ],
    "applications": [
      "Machine Tools",
      "Die & Mold",
      "Automotive",
      "Precision Equipment"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M3 – M48"
      },
      {
        "label": "Head Diameter",
        "value": "5.5mm – 72mm"
      },
      {
        "label": "Head Height",
        "value": "3mm – 48mm"
      },
      {
        "label": "Socket Size",
        "value": "2.5mm – 36mm"
      },
      {
        "label": "Tensile Strength",
        "value": "1040 MPa (min) for 12.9"
      },
      {
        "label": "Hardness",
        "value": "280–365 HB"
      }
    ]
  },
  {
    "slug": "countersunk-screws",
    "name": "Countersunk Screws",
    "category": "Screws",
    "img": "/images/countersunk-screw.jpg",
    "standard": "ASME B18.3 / DIN 7991",
    "description": "Flat-head countersunk socket screws with 90° head angle for flush mounting applications. Manufactured from high-grade alloy steel with precision threading for critical assemblies.",
    "sizes": "M3 to M24 | #4 to 1\"",
    "threads": "Metric Coarse & Fine | UNC / UNF",
    "length": "8mm to 150mm",
    "material": "Alloy Steel / Stainless Steel",
    "finish": [
      "Plain / Black Oxide",
      "Zinc Plated",
      "Nickel Plated"
    ],
    "grades": [
      "Grade 10.9",
      "Grade 12.9",
      "B8",
      "B8M"
    ],
    "applications": [
      "Aerospace",
      "Electronics Enclosures",
      "Flush-Mount Assemblies",
      "Precision Machinery"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M3 – M24"
      },
      {
        "label": "Head Diameter",
        "value": "6mm – 44mm"
      },
      {
        "label": "Head Angle",
        "value": "90°"
      },
      {
        "label": "Socket Size",
        "value": "2mm – 14mm"
      },
      {
        "label": "Tensile Strength",
        "value": "1040 MPa (min) for 12.9"
      },
      {
        "label": "Hardness",
        "value": "280–365 HB"
      }
    ]
  },
  {
    "slug": "socket-set-screws",
    "name": "Socket Set Screws",
    "category": "Screws",
    "img": "/images/set-screw.jpg",
    "standard": "ASME B18.3 / DIN 913-916",
    "description": "Headless set screws with internal hex drive, available in flat, cup, cone, and dog point styles. Used for securing pulleys, gears, and collars on shafts. Manufactured to high hardness specifications.",
    "sizes": "M3 to M24 | #4 to 1\"",
    "threads": "Metric Coarse & Fine | UNC / UNF",
    "length": "3mm to 80mm",
    "material": "Alloy Steel / Stainless Steel",
    "finish": [
      "Plain / Black Oxide",
      "Zinc Plated"
    ],
    "grades": [
      "Grade 14.9 (45H)",
      "Grade 12.9",
      "B8",
      "B8M"
    ],
    "applications": [
      "Shaft Locking",
      "Pulley Mounting",
      "Gear Assemblies",
      "Collar Fixing"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M3 – M24"
      },
      {
        "label": "Point Types",
        "value": "Flat / Cup / Cone / Dog"
      },
      {
        "label": "Socket Size",
        "value": "1.5mm – 12mm"
      },
      {
        "label": "Tensile Strength",
        "value": "N/A (Compressive)"
      },
      {
        "label": "Hardness",
        "value": "43–53 HRC"
      }
    ]
  },
  {
    "slug": "eye-bolts",
    "name": "Eye Bolts",
    "category": "Bolts",
    "img": "/images/eye-bolt.jpg",
    "standard": "ASME B18.15 / DIN 444",
    "description": "Forged eye bolts with circular loop head for lifting, rigging, and anchoring applications. Available in shouldered and non-shouldered types. Manufactured from high-strength alloy steel for safe working loads.",
    "sizes": "M8 to M48 | 5/16\" to 2\"",
    "threads": "Metric Coarse | UNC",
    "length": "Custom as per requirement",
    "material": "ASTM A193 Grade B7 / C15 / C45 Steel",
    "finish": [
      "Plain / Self-Colour",
      "Hot Dip Galvanized",
      "Zinc Plated"
    ],
    "grades": [
      "B7",
      "Grade 8.8",
      "C15E"
    ],
    "applications": [
      "Lifting & Rigging",
      "Anchoring",
      "Cable Termination",
      "Structural Tie-Downs"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M8 – M48"
      },
      {
        "label": "Eye Inner Dia",
        "value": "20mm – 90mm"
      },
      {
        "label": "Type",
        "value": "Shouldered / Non-shouldered"
      },
      {
        "label": "WLL (Working Load)",
        "value": "As per size"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min)"
      }
    ]
  },
  {
    "slug": "u-bolts",
    "name": "U Bolts",
    "category": "Bolts",
    "img": "/images/u-bolt.jpg",
    "standard": "ASME B18.31.5 / DIN 3570",
    "description": "U-shaped bolts used for clamping pipes, tubes, and round sections to structural supports. Available in round bend and square bend configurations. Manufactured from high-tensile alloy and stainless steel.",
    "sizes": "M6 to M36 | 1/4\" to 1-1/2\" (Pipe OD: 1/2\" to 24\")",
    "threads": "Metric Coarse | UNC",
    "length": "As per pipe size",
    "material": "ASTM A193 B7 / SS 304 / SS 316",
    "finish": [
      "Plain / Self-Colour",
      "Hot Dip Galvanized",
      "Zinc Plated",
      "PTFE Coated"
    ],
    "grades": [
      "B7",
      "B8",
      "B8M",
      "L7"
    ],
    "applications": [
      "Pipe Clamping",
      "Structural Supports",
      "Automotive Suspension",
      "Marine Applications"
    ],
    "dimensions": [
      {
        "label": "Rod Diameter",
        "value": "M6 – M36"
      },
      {
        "label": "Pipe Size Range",
        "value": "1/2\" – 24\" NB"
      },
      {
        "label": "Bend Type",
        "value": "Round / Square"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min) for B7"
      },
      {
        "label": "Thread Length",
        "value": "As per standard"
      }
    ]
  },
  {
    "slug": "anchor-bolts",
    "name": "Anchor Bolts",
    "category": "Bolts",
    "img": "/images/anchor-bolt.jpg",
    "standard": "DIN 529",
    "description": "L-shaped, J-shaped, and straight anchor bolts for embedding in concrete foundations. Used for securing structural columns, heavy machinery, and equipment bases. Custom lengths and configurations available.",
    "sizes": "M10 to M100 | 3/8\" to 4\"",
    "threads": "Metric Coarse | UNC",
    "length": "150mm to 6000mm | Custom lengths",
    "material": "ASTM A193 B7 / ASTM F1554 Grade 105",
    "finish": [
      "Plain / Self-Colour",
      "Hot Dip Galvanized",
      "Zinc Plated"
    ],
    "grades": [
      "B7",
      "F1554 Gr. 36/55/105",
      "Grade 8.8"
    ],
    "applications": [
      "Foundation Anchoring",
      "Structural Steel",
      "Heavy Machinery Bases",
      "Wind Turbine Foundations"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M10 – M100"
      },
      {
        "label": "Embed Length",
        "value": "As per design"
      },
      {
        "label": "Bend Type",
        "value": "L / J / Straight"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min) for B7"
      },
      {
        "label": "Projection Length",
        "value": "As per requirement"
      }
    ]
  },
  {
    "slug": "threaded-rods",
    "name": "Threaded Rods",
    "category": "Studs",
    "img": "/images/threaded-rod.jpg",
    "standard": "DIN 976 / ASME B18.31.2",
    "description": "Fully threaded rods (all-thread rods) manufactured from ASTM A193 Grade B7 alloy steel. Used for through-bolting, anchor applications, and as general-purpose fasteners in construction and industrial settings.",
    "sizes": "M6 to M100 | 1/4\" to 4\"",
    "threads": "Metric Coarse & Fine | UNC / UNF | ACME",
    "length": "1 Meter / 2 Meter / 3 Meter | Custom Cut",
    "material": "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)",
    "finish": [
      "Plain / Black Oxide",
      "Hot Dip Galvanized",
      "Zinc Plated",
      "PTFE Coated"
    ],
    "grades": [
      "B7",
      "B7M",
      "B16",
      "L7",
      "B8",
      "B8M"
    ],
    "applications": [
      "Through-Bolting",
      "Suspension Systems",
      "Construction Hangers",
      "Chemical Plants"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "M6 – M100"
      },
      {
        "label": "Standard Lengths",
        "value": "1m / 2m / 3m"
      },
      {
        "label": "Thread Type",
        "value": "Full thread"
      },
      {
        "label": "Tensile Strength",
        "value": "860 MPa (min)"
      },
      {
        "label": "Yield Strength",
        "value": "720 MPa (min)"
      },
      {
        "label": "Hardness",
        "value": "235–302 HB"
      }
    ]
  },
  {
    "slug": "round-bars",
    "name": "Round Bars",
    "category": "Bars",
    "img": "/images/round-bar.jpg",
    "standard": "AISI 4140 / 4142",
    "description": "High-quality alloy steel round bars for machining fasteners, shafts, and custom components. Supplied in hot-rolled, cold-drawn, and peeled/ground conditions. Available in AISI 4140, 4142, and equivalent grades.",
    "sizes": "Ø10mm to Ø500mm",
    "threads": "N/A (Raw material)",
    "length": "1 Meter to 6 Meter | Custom Cut",
    "material": "AISI 4140 / 4142 / EN19 / 42CrMo4",
    "finish": [
      "Hot Rolled",
      "Cold Drawn (Bright)",
      "Peeled & Ground"
    ],
    "grades": [
      "AISI 4140",
      "AISI 4142",
      "EN19",
      "42CrMo4"
    ],
    "applications": [
      "Fastener Manufacturing",
      "Shaft & Axle Production",
      "Die & Tool Making",
      "General Machining"
    ],
    "dimensions": [
      {
        "label": "Diameter Range",
        "value": "Ø10mm – Ø500mm"
      },
      {
        "label": "Standard Lengths",
        "value": "1m – 6m"
      },
      {
        "label": "Condition",
        "value": "HR / CD / Peeled / Ground"
      },
      {
        "label": "Tensile Strength",
        "value": "850–1000 MPa"
      },
      {
        "label": "Yield Strength",
        "value": "680 MPa (min)"
      },
      {
        "label": "Hardness",
        "value": "230–280 HB"
      }
    ]
  }
];

const GRADE_CATEGORIES = [
  {
    "name": "Bolts",
    "entries": [
      {
        "product": "Stud Bolt",
        "grades": [
          "B7",
          "B7M",
          "B16",
          "L7",
          "L7M",
          "B8",
          "B8M"
        ],
        "material": "ASTM A193 Grade B7 (42CrMo4)",
        "din": "DIN 976",
        "asme": "ASME B16.5 / B18.31.2",
        "iso": "ISO 4014",
        "bs": "BS 4882",
        "tensile": "860 MPa",
        "yield_": "720 MPa",
        "application": "Flange Connections, Pressure Vessels, Heat Exchangers"
      },
      {
        "product": "Tap End Stud",
        "grades": [
          "B7",
          "B7M",
          "B16",
          "L7",
          "8.8",
          "10.9"
        ],
        "material": "ASTM A193 Grade B7 / Alloy",
        "din": "DIN 938/939",
        "asme": "ASME B18.31.2",
        "iso": "ISO 4014",
        "bs": "BS 4882",
        "tensile": "860 MPa",
        "yield_": "720 MPa",
        "application": "Pump Casings, Valve Bodies, Engine Blocks"
      },
      {
        "product": "Double End Stud",
        "grades": [
          "B7",
          "B7M",
          "B16",
          "L7",
          "8.8"
        ],
        "material": "ASTM A193 Grade B7 / Alloy",
        "din": "DIN 938/939",
        "asme": "ASME B18.31.2",
        "iso": "ISO 4014",
        "bs": "BS 4882",
        "tensile": "860 MPa",
        "yield_": "720 MPa",
        "application": "Turbine Casings, Compressors, Flanged Joints"
      },
      {
        "product": "Hex Bolt",
        "grades": [
          "4.6",
          "5.6",
          "6.8",
          "8.8",
          "10.9",
          "12.9",
          "B7",
          "A2-70",
          "A4-80"
        ],
        "material": "Carbon / Alloy / Stainless Steel",
        "din": "DIN 931/933",
        "asme": "ASME B18.2.1",
        "iso": "ISO 4014/4017",
        "bs": "BS 3692/4190",
        "tensile": "400–1200 MPa",
        "yield_": "240–1080 MPa",
        "application": "Structural Steel, Machinery, General Engineering"
      },
      {
        "product": "Heavy Hex Bolt",
        "grades": [
          "8.8",
          "10.9",
          "12.9",
          "B7",
          "B16"
        ],
        "material": "Alloy Steel / ASTM A193",
        "din": "DIN 6914",
        "asme": "ASME B18.2.1",
        "iso": "ISO 7411",
        "bs": "BS 4395",
        "tensile": "860 MPa",
        "yield_": "720 MPa",
        "application": "Heavy Structural, Flanges, Bridges"
      },
      {
        "product": "Flange Bolt",
        "grades": [
          "8.8",
          "10.9",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 6921",
        "asme": "ASME B18.2.1",
        "iso": "ISO 1665",
        "bs": "—",
        "tensile": "800–1040 MPa",
        "yield_": "640–940 MPa",
        "application": "Automotive, Machinery, HVAC"
      },
      {
        "product": "Carriage Bolt",
        "grades": [
          "4.6",
          "8.8",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 603",
        "asme": "ASME B18.5",
        "iso": "ISO 8677",
        "bs": "BS 4933",
        "tensile": "400–830 MPa",
        "yield_": "240–660 MPa",
        "application": "Timber, Furniture, Playground Equipment"
      },
      {
        "product": "Eye Bolt",
        "grades": [
          "C15E",
          "Grade 8",
          "A2-70"
        ],
        "material": "Forged Carbon / SS 316",
        "din": "DIN 580",
        "asme": "ASME B18.15",
        "iso": "ISO 2342",
        "bs": "BS 2104",
        "tensile": "400–800 MPa",
        "yield_": "—",
        "application": "Lifting, Rigging, Crane Hooks"
      },
      {
        "product": "U Bolt",
        "grades": [
          "4.6",
          "8.8",
          "SS 304",
          "SS 316"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 3570",
        "asme": "ASME B18.31.5",
        "iso": "ISO 1479",
        "bs": "BS 1575",
        "tensile": "400–830 MPa",
        "yield_": "240–660 MPa",
        "application": "Pipe Clamps, Cable Support, Pipe Racks"
      },
      {
        "product": "J Bolt",
        "grades": [
          "F1554 Gr 36/55/105",
          "4.6",
          "8.8"
        ],
        "material": "Carbon / Alloy Steel",
        "din": "—",
        "asme": "ASTM F1554",
        "iso": "—",
        "bs": "—",
        "tensile": "400–860 MPa",
        "yield_": "248–724 MPa",
        "application": "Foundation Anchoring, Column Base Plates"
      },
      {
        "product": "Foundation Bolt",
        "grades": [
          "F1554 Gr 36/55/105",
          "8.8",
          "10.9"
        ],
        "material": "Carbon / Alloy Steel",
        "din": "—",
        "asme": "ASTM F1554",
        "iso": "—",
        "bs": "BS 7419",
        "tensile": "400–1040 MPa",
        "yield_": "248–940 MPa",
        "application": "Structural Columns, Machinery, Bridge Piers"
      },
      {
        "product": "Anchor Bolt",
        "grades": [
          "F1554 Gr 36/55/105",
          "8.8"
        ],
        "material": "Carbon / Alloy Steel",
        "din": "DIN 529",
        "asme": "ASME B18.31",
        "iso": "ISO 2320",
        "bs": "BS 4625",
        "tensile": "400–860 MPa",
        "yield_": "248–720 MPa",
        "application": "Foundation Bolting, Equipment Mounting"
      },
      {
        "product": "Elevator Bolt",
        "grades": [
          "4.6",
          "8.8"
        ],
        "material": "Carbon Steel",
        "din": "—",
        "asme": "ASME B18.5",
        "iso": "—",
        "bs": "—",
        "tensile": "400–830 MPa",
        "yield_": "240–660 MPa",
        "application": "Conveyor Belts, Elevator Buckets"
      },
      {
        "product": "Allen Bolt / Socket Head Cap Screw",
        "grades": [
          "10.9",
          "12.9",
          "A2-70",
          "A4-80"
        ],
        "material": "Alloy / Stainless Steel",
        "din": "DIN 912",
        "asme": "ASME B18.3",
        "iso": "ISO 4762",
        "bs": "BS 4168",
        "tensile": "1040–1220 MPa",
        "yield_": "940–1100 MPa",
        "application": "Machinery, Automotive, Precision Equipment"
      },
      {
        "product": "CSK Allen Bolt",
        "grades": [
          "10.9",
          "12.9",
          "A2-70"
        ],
        "material": "Alloy / Stainless Steel",
        "din": "DIN 7991",
        "asme": "ASME B18.3",
        "iso": "ISO 10642",
        "bs": "BS 4168",
        "tensile": "1040–1220 MPa",
        "yield_": "940–1100 MPa",
        "application": "Flush Mounting, Automotive Panels"
      },
      {
        "product": "Shoulder Bolt",
        "grades": [
          "12.9",
          "A2-70"
        ],
        "material": "Alloy Steel / SS 303",
        "din": "DIN 7379",
        "asme": "ASME B18.3",
        "iso": "—",
        "bs": "—",
        "tensile": "1220 MPa",
        "yield_": "—",
        "application": "Hinges, Linkages, Pivot Points"
      },
      {
        "product": "T Head Bolt",
        "grades": [
          "8.8",
          "10.9"
        ],
        "material": "Carbon / Alloy Steel",
        "din": "DIN 186/261",
        "asme": "—",
        "iso": "—",
        "bs": "—",
        "tensile": "800–1040 MPa",
        "yield_": "640–940 MPa",
        "application": "Machine Tools, CNC Fixtures"
      },
      {
        "product": "Track Bolt",
        "grades": [
          "Grade 4.6",
          "Grade 8.8"
        ],
        "material": "Carbon Steel IS 1086",
        "din": "—",
        "asme": "—",
        "iso": "IS 1084",
        "bs": "—",
        "tensile": "400–830 MPa",
        "yield_": "—",
        "application": "Railway Track Joints, Fishplates"
      },
      {
        "product": "Structural Bolt",
        "grades": [
          "A325",
          "A490",
          "10.9",
          "S10T"
        ],
        "material": "Medium Carbon Alloy Steel",
        "din": "DIN 6914",
        "asme": "ASTM A325/A490",
        "iso": "ISO 7411",
        "bs": "BS EN 14399",
        "tensile": "830–1040 MPa",
        "yield_": "660–900 MPa",
        "application": "Steel Structures, Bridges, Industrial Buildings"
      },
      {
        "product": "Threaded Rod / Stud Rod",
        "grades": [
          "4.6",
          "8.8",
          "B7",
          "A2-70",
          "A4-80"
        ],
        "material": "Carbon / Alloy / SS",
        "din": "DIN 976",
        "asme": "ASME B18.31.3",
        "iso": "ISO 7681",
        "bs": "BS 4848",
        "tensile": "400–860 MPa",
        "yield_": "240–720 MPa",
        "application": "MEP Hangers, Concrete Anchors, Structural Ties"
      },
      {
        "product": "Machine Bolt",
        "grades": [
          "4.6",
          "8.8"
        ],
        "material": "Carbon Steel",
        "din": "DIN 558",
        "asme": "ASME B18.2.1",
        "iso": "ISO 4016",
        "bs": "BS 4190",
        "tensile": "400–830 MPa",
        "yield_": "240–660 MPa",
        "application": "General Machinery, Agricultural Equipment"
      }
    ]
  },
  {
    "name": "Nuts",
    "entries": [
      {
        "product": "Hex Nut",
        "grades": [
          "4",
          "5",
          "8",
          "10",
          "ASTM A194 2H",
          "A2-70",
          "A4-80"
        ],
        "material": "Carbon / Alloy / Stainless Steel",
        "din": "DIN 934",
        "asme": "ASME B18.2.2",
        "iso": "ISO 4032",
        "bs": "BS 3692",
        "tensile": "400–830 HBW",
        "yield_": "Proof Load as per grade",
        "application": "General Fastening, Structural, Machinery"
      },
      {
        "product": "Heavy Hex Nut",
        "grades": [
          "ASTM A194 2H",
          "A194 2HM",
          "A194 4",
          "A194 7",
          "A194 8"
        ],
        "material": "Carbon / Alloy Steel",
        "din": "DIN 934 (heavy)",
        "asme": "ASME B18.2.2",
        "iso": "ISO 4034",
        "bs": "BS 4882",
        "tensile": "248–352 HBW",
        "yield_": "150 ksi Proof Load",
        "application": "Pressure Vessels, Flanges, High-Pressure Joints"
      },
      {
        "product": "Lock Nut / Jam Nut",
        "grades": [
          "6",
          "8",
          "10",
          "A2-70",
          "A194 2H"
        ],
        "material": "Carbon / Alloy / Stainless Steel",
        "din": "DIN 934 (thin)",
        "asme": "ASME B18.16.2",
        "iso": "ISO 4035",
        "bs": "BS 1769",
        "tensile": "—",
        "yield_": "Proof Load as per grade",
        "application": "Counter-locking, Jam Locking, Adjustment"
      },
      {
        "product": "Nylon Lock Nut",
        "grades": [
          "6",
          "8",
          "A2-70"
        ],
        "material": "Carbon Steel / SS 304",
        "din": "DIN 985",
        "asme": "ASME B18.16.2",
        "iso": "ISO 7042",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Electronics, Automotive, Light Machinery"
      },
      {
        "product": "Dome Nut / Cap Nut",
        "grades": [
          "6",
          "8",
          "A2-70"
        ],
        "material": "Carbon Steel / SS / Brass",
        "din": "DIN 1587",
        "asme": "ASME B18.6.3",
        "iso": "ISO 1580",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Decorative, Thread Protection, Automotive"
      },
      {
        "product": "Wing Nut",
        "grades": [
          "4",
          "6"
        ],
        "material": "Carbon / Brass / SS",
        "din": "DIN 315",
        "asme": "ASME B18.17",
        "iso": "ISO 315",
        "bs": "BS 1769",
        "tensile": "—",
        "yield_": "—",
        "application": "Hand-tightening, Quick-release, Signage"
      },
      {
        "product": "Coupling Nut",
        "grades": [
          "6",
          "8",
          "A2-70"
        ],
        "material": "Carbon / Alloy / SS",
        "din": "DIN 6334",
        "asme": "ASME B18.2.2",
        "iso": "ISO 4033",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Threaded-rod Extension, Anchor Systems"
      },
      {
        "product": "Square Nut",
        "grades": [
          "4",
          "6",
          "8"
        ],
        "material": "Carbon Steel",
        "din": "DIN 562/557",
        "asme": "ASME B18.2.2",
        "iso": "ISO 4033",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "T-slot Channels, Timber, Machine Tools"
      },
      {
        "product": "Flange Nut",
        "grades": [
          "6",
          "8",
          "10",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 6923",
        "asme": "—",
        "iso": "ISO 4161",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Automotive, Sheet Metal, Electrical Panels"
      },
      {
        "product": "Slotted / Castle Nut",
        "grades": [
          "6",
          "8",
          "B7"
        ],
        "material": "Carbon / Alloy Steel",
        "din": "DIN 935",
        "asme": "ASME B18.2.2",
        "iso": "ISO 7042",
        "bs": "BS 1769",
        "tensile": "—",
        "yield_": "—",
        "application": "Axle Nuts, Steering Joints, Safety-critical Connections"
      },
      {
        "product": "T Nut",
        "grades": [
          "8",
          "10",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 508",
        "asme": "ASME B18.29",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Machine Tables, CNC Fixtures, Aluminium Profiles"
      },
      {
        "product": "Weld Nut",
        "grades": [
          "6",
          "8"
        ],
        "material": "Carbon Steel / SS 304",
        "din": "DIN 929",
        "asme": "—",
        "iso": "ISO 21670",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Sheet Metal, Automotive Body, Electrical Cabinets"
      },
      {
        "product": "Cage Nut",
        "grades": [
          "6",
          "8"
        ],
        "material": "Carbon Steel (Zinc)",
        "din": "—",
        "asme": "EIA 310",
        "iso": "IEC 60297",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Server Racks, Telecom Cabinets, Electronic Enclosures"
      },
      {
        "product": "Serrated Flange Nut",
        "grades": [
          "6",
          "8",
          "10"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 6923 (serrated)",
        "asme": "—",
        "iso": "ISO 4161",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Automotive, Sheet Metal, Anti-vibration Assemblies"
      }
    ]
  },
  {
    "name": "Washers",
    "entries": [
      {
        "product": "Plain Washer",
        "grades": [
          "200 HV",
          "A2-70",
          "A4-80",
          "ASTM F844"
        ],
        "material": "Carbon / SS / Brass",
        "din": "DIN 125",
        "asme": "ASME B18.22.1",
        "iso": "ISO 7089",
        "bs": "BS 4320",
        "tensile": "—",
        "yield_": "—",
        "application": "Load Distribution, Surface Protection, Flanges"
      },
      {
        "product": "Spring Washer",
        "grades": [
          "C75 Spring Steel",
          "A2-70"
        ],
        "material": "Spring Steel / SS / Phosphor Bronze",
        "din": "DIN 127",
        "asme": "ASME B18.21.1",
        "iso": "ISO 7090",
        "bs": "BS 4464",
        "tensile": "—",
        "yield_": "—",
        "application": "Vibration Service, Automotive, Railways"
      },
      {
        "product": "Lock Washer",
        "grades": [
          "C75",
          "A2-70"
        ],
        "material": "Hardened Carbon / SS",
        "din": "DIN 127",
        "asme": "ASME B18.21.1",
        "iso": "ISO 10673",
        "bs": "BS 4464",
        "tensile": "—",
        "yield_": "—",
        "application": "Vibration, Machinery, Automotive"
      },
      {
        "product": "Flat Washer",
        "grades": [
          "ASTM F844",
          "ISO 7089"
        ],
        "material": "Carbon / SS / Nylon",
        "din": "DIN 125A",
        "asme": "ASME B18.22.1",
        "iso": "ISO 7089",
        "bs": "BS 4320",
        "tensile": "—",
        "yield_": "—",
        "application": "General, Structural, Electrical"
      },
      {
        "product": "Fender Washer",
        "grades": [
          "ASTM F844"
        ],
        "material": "Carbon / SS",
        "din": "—",
        "asme": "ASME B18.22.1",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Sheet Metal, Automotive Body, Oversized Holes"
      },
      {
        "product": "Square Washer",
        "grades": [
          "DIN 436"
        ],
        "material": "Carbon Steel",
        "din": "DIN 436",
        "asme": "—",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Timber Connections, Roof Purlins"
      },
      {
        "product": "Star Washer",
        "grades": [
          "C60 Steel",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 6797",
        "asme": "ASME B18.21.1",
        "iso": "ISO 6906",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Electrical Grounding, Electronics, Automotive"
      },
      {
        "product": "Belleville Washer",
        "grades": [
          "DIN 2093 Groups 1-3"
        ],
        "material": "51CrV4 Spring Steel",
        "din": "DIN 2093",
        "asme": "—",
        "iso": "ISO 16983",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Pressure Relief Valves, High-temp Joints"
      },
      {
        "product": "Tooth Lock Washer",
        "grades": [
          "HRC 44–50"
        ],
        "material": "Hardened Carbon / SS",
        "din": "DIN 6798",
        "asme": "ASME B18.21.1",
        "iso": "ISO 6906",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Electronic Assemblies, Electrical Grounds"
      },
      {
        "product": "Sealing Washer",
        "grades": [
          "Zinc + EPDM/Neoprene"
        ],
        "material": "Zinc Steel + Rubber",
        "din": "DIN 7980",
        "asme": "—",
        "iso": "ISO 7092",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Roofing, Plumbing, HVAC Panels"
      }
    ]
  },
  {
    "name": "Screws",
    "entries": [
      {
        "product": "Self Tapping Screw",
        "grades": [
          "ST Type A/AB/B"
        ],
        "material": "Case-hardened Carbon / SS 304",
        "din": "DIN 7971/7972",
        "asme": "ASME B18.6.3",
        "iso": "ISO 1479",
        "bs": "BS 988",
        "tensile": "380–450 HV",
        "yield_": "—",
        "application": "Sheet Metal, Plastics, Light Gauge Metal"
      },
      {
        "product": "Self Drilling Screw",
        "grades": [
          "Class 2/3/4"
        ],
        "material": "Case-hardened Carbon Steel",
        "din": "DIN 7504",
        "asme": "ASTM C1002",
        "iso": "ISO 15480",
        "bs": "AS 3566",
        "tensile": "380–450 HV",
        "yield_": "—",
        "application": "Roofing, Cladding, Steel Structures"
      },
      {
        "product": "Machine Screw",
        "grades": [
          "8.8",
          "A2-70"
        ],
        "material": "Carbon Steel / SS / Brass",
        "din": "DIN 84/963/965",
        "asme": "ASME B18.6.3",
        "iso": "ISO 1207",
        "bs": "BS 450",
        "tensile": "800 MPa",
        "yield_": "640 MPa",
        "application": "Electronics, Instruments, Light Machinery"
      },
      {
        "product": "Wood Screw",
        "grades": [
          "Softwood / Hardwood Grade"
        ],
        "material": "Carbon Steel / SS / Brass",
        "din": "DIN 97",
        "asme": "ASME B18.6.1",
        "iso": "ISO 1478",
        "bs": "BS 1210",
        "tensile": "—",
        "yield_": "—",
        "application": "Woodworking, Furniture, Joinery"
      },
      {
        "product": "Drywall Screw",
        "grades": [
          "ASTM C1002 Type S/W"
        ],
        "material": "Case-hardened Carbon Steel",
        "din": "—",
        "asme": "ASTM C1002",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Drywall, Plasterboard, Partitioning"
      },
      {
        "product": "Chipboard Screw",
        "grades": [
          "Grade 8.8"
        ],
        "material": "Carbon Steel",
        "din": "DIN 7505",
        "asme": "—",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Furniture, Cabinets, Flooring"
      },
      {
        "product": "Socket Set Screw",
        "grades": [
          "12.9",
          "A4-80"
        ],
        "material": "Alloy Steel / SS 316",
        "din": "DIN 913-916",
        "asme": "ASME B18.3",
        "iso": "ISO 4026-4029",
        "bs": "BS 4168",
        "tensile": "1220 MPa",
        "yield_": "1100 MPa",
        "application": "Shaft Locking, Couplings, Pulleys"
      },
      {
        "product": "Grub Screw",
        "grades": [
          "12.9"
        ],
        "material": "Alloy Steel",
        "din": "DIN 913/914",
        "asme": "ASME B18.3",
        "iso": "ISO 4026",
        "bs": "BS 4168",
        "tensile": "1220 MPa",
        "yield_": "1100 MPa",
        "application": "Shaft Collars, Set Positions"
      },
      {
        "product": "Hex Head Screw",
        "grades": [
          "8.8",
          "10.9",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 933",
        "asme": "ASME B18.2.1",
        "iso": "ISO 4017",
        "bs": "BS 3692",
        "tensile": "800–1040 MPa",
        "yield_": "640–940 MPa",
        "application": "Machinery, General Engineering"
      },
      {
        "product": "Pan Head Screw",
        "grades": [
          "8.8",
          "A2-70"
        ],
        "material": "Carbon Steel / SS",
        "din": "DIN 7985",
        "asme": "ASME B18.6.3",
        "iso": "ISO 7045",
        "bs": "BS 450",
        "tensile": "800 MPa",
        "yield_": "640 MPa",
        "application": "Electronics, Sheet Metal, Appliances"
      },
      {
        "product": "Countersunk Screw",
        "grades": [
          "8.8",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 965",
        "asme": "ASME B18.6.3",
        "iso": "ISO 7046",
        "bs": "BS 450",
        "tensile": "800 MPa",
        "yield_": "640 MPa",
        "application": "Flush Mounting, Hinges, Electronics"
      },
      {
        "product": "Button Head Screw",
        "grades": [
          "10.9",
          "A2-70"
        ],
        "material": "Alloy / Stainless Steel",
        "din": "DIN 9427",
        "asme": "ASME B18.3",
        "iso": "ISO 7380",
        "bs": "—",
        "tensile": "1040 MPa",
        "yield_": "940 MPa",
        "application": "Electronics, Automotive Panels, Covers"
      },
      {
        "product": "Phillips Screw",
        "grades": [
          "4.8",
          "A2-70"
        ],
        "material": "Carbon Steel / SS / Brass",
        "din": "DIN 7985",
        "asme": "ASME B18.6.3",
        "iso": "ISO 7045",
        "bs": "BS 450",
        "tensile": "420 MPa",
        "yield_": "340 MPa",
        "application": "General, Electronics, Furniture, Appliances"
      }
    ]
  },
  {
    "name": "Anchors & Fixings",
    "entries": [
      {
        "product": "Wedge Anchor",
        "grades": [
          "F1554 Gr 36/55",
          "5.6",
          "8.8"
        ],
        "material": "Carbon / SS 316",
        "din": "—",
        "asme": "ASTM F1554",
        "iso": "ETA Approved",
        "bs": "—",
        "tensile": "400–830 MPa",
        "yield_": "248–660 MPa",
        "application": "Structural Columns, Racking, Heavy Equipment"
      },
      {
        "product": "Sleeve Anchor",
        "grades": [
          "Grade 8"
        ],
        "material": "Carbon / SS 316",
        "din": "—",
        "asme": "—",
        "iso": "ETA Approved",
        "bs": "—",
        "tensile": "800 MPa",
        "yield_": "640 MPa",
        "application": "Masonry, Concrete, Natural Stone"
      },
      {
        "product": "Drop-In Anchor",
        "grades": [
          "Grade 8"
        ],
        "material": "Carbon / SS 304",
        "din": "—",
        "asme": "ICC-ES",
        "iso": "ETA Approved",
        "bs": "—",
        "tensile": "800 MPa",
        "yield_": "640 MPa",
        "application": "Ceilings, HVAC Hangers, Pipe Supports"
      },
      {
        "product": "Chemical Anchor",
        "grades": [
          "F1554 Gr 105",
          "8.8",
          "12.9"
        ],
        "material": "Alloy / SS 316 + Epoxy",
        "din": "—",
        "asme": "—",
        "iso": "ETA / ETAG 001",
        "bs": "—",
        "tensile": "860–1220 MPa",
        "yield_": "720–1100 MPa",
        "application": "High-Load Structural, Seismic Zones, Cracked Concrete"
      },
      {
        "product": "Shield Anchor",
        "grades": [
          "Grade 6"
        ],
        "material": "Carbon Steel (Zinc)",
        "din": "DIN 571",
        "asme": "—",
        "iso": "ISO 2339",
        "bs": "—",
        "tensile": "600 MPa",
        "yield_": "480 MPa",
        "application": "Brick Walls, Block Work, Hollow Core Slabs"
      },
      {
        "product": "Through Bolt Anchor",
        "grades": [
          "5.6",
          "8.8"
        ],
        "material": "Zinc Carbon Steel",
        "din": "—",
        "asme": "ASTM F1554",
        "iso": "ETA Approved",
        "bs": "—",
        "tensile": "500–830 MPa",
        "yield_": "300–660 MPa",
        "application": "Steel Structures, Facades, Post Bases"
      },
      {
        "product": "Concrete Screw Anchor",
        "grades": [
          "ASTM F1554"
        ],
        "material": "Case-hardened / SS",
        "din": "—",
        "asme": "ICC-ES AC193",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Concrete, Block, Brick — removable/reusable"
      }
    ]
  },
  {
    "name": "Pins",
    "entries": [
      {
        "product": "Dowel Pin",
        "grades": [
          "m6 / h8 tolerance",
          "Ground ±0.003mm"
        ],
        "material": "Case-hardened Steel / SS 303 / Carbide",
        "din": "DIN 7",
        "asme": "ASME B18.8.2",
        "iso": "ISO 8734",
        "bs": "BS 4235",
        "tensile": "—",
        "yield_": "—",
        "application": "Machine Alignment, Jigs, Die Sets, Hinge Pivots"
      },
      {
        "product": "Parallel Pin",
        "grades": [
          "h8 / m6 tolerance"
        ],
        "material": "Low Carbon Steel / SS 303 / SS 316",
        "din": "DIN 7",
        "asme": "ASME B18.8.2",
        "iso": "ISO 2338",
        "bs": "BS 4235",
        "tensile": "—",
        "yield_": "—",
        "application": "Location Pins, Alignment Fixtures, Hinge Pivots"
      },
      {
        "product": "Taper Pin",
        "grades": [
          "As per DIN 1 / #0 to #10"
        ],
        "material": "Carbon Steel / SS 303",
        "din": "DIN 1",
        "asme": "ASME B18.8.2",
        "iso": "ISO 2339",
        "bs": "BS 46 Pt2",
        "tensile": "—",
        "yield_": "—",
        "application": "Shaft Collars, Gears, Pulleys"
      },
      {
        "product": "Spring Pin (Slotted)",
        "grades": [
          "As per DIN 1481"
        ],
        "material": "Spring Steel / SS 420",
        "din": "DIN 1481",
        "asme": "—",
        "iso": "ISO 8752",
        "bs": "BS 4235 Pt2",
        "tensile": "—",
        "yield_": "—",
        "application": "Couplings, Hinges, Cam Assemblies"
      },
      {
        "product": "Roll Pin (Coiled Spring Pin)",
        "grades": [
          "As per DIN 7343"
        ],
        "material": "Spring Steel / SS 420",
        "din": "DIN 7343",
        "asme": "—",
        "iso": "ISO 8748",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Gearboxes, Linkages, Coupling Hubs"
      },
      {
        "product": "Split Pin / Cotter Pin",
        "grades": [
          "As per DIN 94"
        ],
        "material": "Low Carbon Steel / SS / Brass",
        "din": "DIN 94",
        "asme": "ASME B18.8.1",
        "iso": "ISO 1234",
        "bs": "BS 1574",
        "tensile": "—",
        "yield_": "—",
        "application": "Castle Nuts, Clevis Pins, Safety Locking"
      },
      {
        "product": "Clevis Pin",
        "grades": [
          "8.8",
          "A2-70"
        ],
        "material": "Carbon / Alloy / SS 316",
        "din": "DIN 1444",
        "asme": "ASME B18.8.1",
        "iso": "ISO 2340",
        "bs": "BS 4235",
        "tensile": "—",
        "yield_": "—",
        "application": "Lifting Gear, Hydraulic Cylinders, Clevis Connections"
      },
      {
        "product": "Grooved Pin",
        "grades": [
          "As per DIN 1471-1474"
        ],
        "material": "Carbon Steel",
        "din": "DIN 1471-1474",
        "asme": "—",
        "iso": "ISO 8740-8745",
        "bs": "BS 4235 Pt3",
        "tensile": "—",
        "yield_": "—",
        "application": "Hinge Joints, Pivot Pins, Gearbox Components"
      },
      {
        "product": "Knurled Pin",
        "grades": [
          "As per DIN 1469"
        ],
        "material": "Carbon Steel / SS 304",
        "din": "DIN 1469",
        "asme": "—",
        "iso": "ISO 8745",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Permanent Locating, Name Plates, Pivot Bushings"
      },
      {
        "product": "Hitch Pin",
        "grades": [
          "As per DIN 11023"
        ],
        "material": "Carbon Steel / SS 304",
        "din": "DIN 11023",
        "asme": "ASME B18.8",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Trailer Hitches, Agricultural Linkages, Drawbars"
      },
      {
        "product": "Lynch Pin",
        "grades": [
          "As per standard"
        ],
        "material": "Carbon Steel / Spring Steel",
        "din": "DIN 11023",
        "asme": "ASME B18.8",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Trailer Pins, Safety Retention, Quick Release Arms"
      },
      {
        "product": "Solid Pin",
        "grades": [
          "m6 / h8 / f7 tolerance"
        ],
        "material": "Carbon / Alloy / SS 303 / Brass",
        "din": "DIN 7",
        "asme": "ASME B18.8.2",
        "iso": "ISO 2338",
        "bs": "BS 4235",
        "tensile": "—",
        "yield_": "—",
        "application": "Heavy Shear, Die Alignment, Press Fits"
      },
      {
        "product": "Taper Cotter Pin",
        "grades": [
          "IS 549 / DIN 1477"
        ],
        "material": "Carbon Steel / Alloy Steel",
        "din": "DIN 1477",
        "asme": "—",
        "iso": "IS 549",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Pump Shafts, Motor Couplings, Wheel Hubs"
      },
      {
        "product": "Quick Release Pin",
        "grades": [
          "Grade 8 / A2-70"
        ],
        "material": "Alloy Steel / SS 316 / Hardened Steel",
        "din": "DIN 11023",
        "asme": "MIL-P-20022",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Maintenance Access, Aircraft Ground Support, Jig Fixtures"
      },
      {
        "product": "Ball Lock Pin",
        "grades": [
          "Grade 8 / SS A4"
        ],
        "material": "Hardened Alloy Steel / SS 316",
        "din": "—",
        "asme": "MIL-P-20022",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Tooling Fixtures, Defence Equipment, Aerospace Ground"
      },
      {
        "product": "Safety Pin (Industrial)",
        "grades": [
          "As per DIN 11023"
        ],
        "material": "Carbon Steel / SS 304 / Spring Steel",
        "din": "DIN 11023",
        "asme": "ASME B18.8.1",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Lock-wiring, Cotter Retention, Clevis Guards"
      },
      {
        "product": "Ejector Pin (Die & Mould)",
        "grades": [
          "HRC 50–54 (H13)",
          "HRC 60–62 (D2)"
        ],
        "material": "H13 / D2 / SS 303 / Nitrided Steel",
        "din": "DIN 16756",
        "asme": "—",
        "iso": "JIS B5116",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Injection Moulding, Die Casting, Compression Moulding"
      },
      {
        "product": "Guide Pin (Mould Base)",
        "grades": [
          "HRC 52–56"
        ],
        "material": "420 SS / H13 / Nitrided",
        "din": "DIN 9841",
        "asme": "—",
        "iso": "JIS B5101",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Mould Alignment, Progressive Die Sets, Stamping Tools"
      },
      {
        "product": "Straight Pin",
        "grades": [
          "m6 / h8 / f7 tolerance"
        ],
        "material": "Carbon Steel / SS 304 / Brass / Aluminium",
        "din": "DIN 7",
        "asme": "ASME B18.8.2",
        "iso": "ISO 2338",
        "bs": "BS 4235",
        "tensile": "—",
        "yield_": "—",
        "application": "General Location, Pivot Points, Cotter Holes"
      },
      {
        "product": "Solid Pin (General)",
        "grades": [
          "As per diameter tolerance"
        ],
        "material": "Mild Steel / Alloy Steel / SS 316",
        "din": "DIN 7",
        "asme": "ASME B18.8.2",
        "iso": "ISO 8734",
        "bs": "BS 4235",
        "tensile": "—",
        "yield_": "—",
        "application": "Cross Pins, Dowel Holes, Pivot Applications"
      }
    ]
  },
  {
    "name": "Rivets",
    "entries": [
      {
        "product": "Blind Rivet / Pop Rivet",
        "grades": [
          "ASTM B117",
          "ISO 15978"
        ],
        "material": "Aluminium / Steel / SS / Monel",
        "din": "DIN 7337",
        "asme": "ASME B18.29.5",
        "iso": "ISO 15978",
        "bs": "BS EN ISO 15978",
        "tensile": "210–450 MPa",
        "yield_": "120–380 MPa",
        "application": "Sheet Metal, Automotive Bodies, HVAC Ducts"
      },
      {
        "product": "Solid Rivet",
        "grades": [
          "ASTM A502 Gr1/2"
        ],
        "material": "Carbon Steel / Copper / Aluminium / Monel",
        "din": "DIN 124",
        "asme": "ASME B18.1.1",
        "iso": "ISO 1051",
        "bs": "BS 641",
        "tensile": "300–500 MPa",
        "yield_": "200–350 MPa",
        "application": "Bridges, Boilers, Ships, Railway Wagons"
      },
      {
        "product": "Semi Tubular Rivet",
        "grades": [
          "As per ISO 8750"
        ],
        "material": "Carbon Steel / Brass / Aluminium",
        "din": "DIN 7337 (partial)",
        "asme": "—",
        "iso": "ISO 8750",
        "bs": "BS EN ISO 8750",
        "tensile": "210–380 MPa",
        "yield_": "120–280 MPa",
        "application": "Brake Linings, Leather Goods, Hinges"
      },
      {
        "product": "Structural Rivet",
        "grades": [
          "ASTM A502 Gr1/2/3"
        ],
        "material": "Carbon / Alloy Steel / Monel",
        "din": "—",
        "asme": "ASTM A502",
        "iso": "ISO 15978",
        "bs": "BS EN ISO 15978",
        "tensile": "480–700 MPa",
        "yield_": "340–500 MPa",
        "application": "Steel Bridges, Building Structures, Overhead Cranes"
      }
    ]
  },
  {
    "name": "Industrial / Special",
    "entries": [
      {
        "product": "Threaded Bar",
        "grades": [
          "4.6",
          "8.8",
          "B7",
          "A2-70",
          "A4-80"
        ],
        "material": "MS / Alloy / SS 304 / SS 316",
        "din": "DIN 976",
        "asme": "ASME B18.31.3",
        "iso": "ISO 7681",
        "bs": "BS 4848",
        "tensile": "400–860 MPa",
        "yield_": "240–720 MPa",
        "application": "Hanger Rods, Tie Rods, Construction"
      },
      {
        "product": "Studs",
        "grades": [
          "B7",
          "B7M",
          "B16",
          "L7",
          "8.8"
        ],
        "material": "ASTM A193 B7 / Alloy / SS",
        "din": "DIN 835",
        "asme": "ASME B18.31.2",
        "iso": "ISO 4014",
        "bs": "BS 4882",
        "tensile": "860 MPa",
        "yield_": "720 MPa",
        "application": "Flanges, Valves, Cylinders, Compressors"
      },
      {
        "product": "Pipe Clamp Bolt",
        "grades": [
          "4.6",
          "8.8",
          "SS 316"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 3570",
        "asme": "ASME B18.31.5",
        "iso": "—",
        "bs": "—",
        "tensile": "400–830 MPa",
        "yield_": "240–660 MPa",
        "application": "Pipe Supports, Hangers, Pipe Racks"
      },
      {
        "product": "Turnbuckle",
        "grades": [
          "4.6",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 1478/1479",
        "asme": "ASME B18.14",
        "iso": "ISO 8801",
        "bs": "BS 3032",
        "tensile": "400 MPa",
        "yield_": "240 MPa",
        "application": "Rigging, Bracing, Guy Wires"
      },
      {
        "product": "Eye Nut",
        "grades": [
          "C15E",
          "A2-70",
          "SS 316"
        ],
        "material": "Forged Carbon / SS 316",
        "din": "DIN 582",
        "asme": "ASME B18.15",
        "iso": "ISO 1580",
        "bs": "BS 4278",
        "tensile": "400 MPa",
        "yield_": "240 MPa",
        "application": "Lifting, Rigging, Crane Attachment"
      },
      {
        "product": "T Bolt",
        "grades": [
          "8.8",
          "10.9",
          "A2-70"
        ],
        "material": "Carbon / Stainless Steel",
        "din": "DIN 787",
        "asme": "—",
        "iso": "ISO 299",
        "bs": "—",
        "tensile": "800–1040 MPa",
        "yield_": "640–940 MPa",
        "application": "Machine Tool T-slots, Extrusion Profiles"
      },
      {
        "product": "Shear Connector",
        "grades": [
          "ASTM A108 Grade 1015"
        ],
        "material": "Low Carbon Steel (ASTM A108)",
        "din": "—",
        "asme": "ASTM A108",
        "iso": "—",
        "bs": "BS EN ISO 13918",
        "tensile": "415 MPa min",
        "yield_": "345 MPa min",
        "application": "Composite Beams, Bridges, Floor Systems"
      },
      {
        "product": "Circlips",
        "grades": [
          "DIN 471 / 472"
        ],
        "material": "Spring Steel / SS 420",
        "din": "DIN 471/472",
        "asme": "—",
        "iso": "ISO 1234",
        "bs": "BS 3673",
        "tensile": "—",
        "yield_": "—",
        "application": "Gear Shafts, Bearings, Hydraulic Cylinders"
      },
      {
        "product": "Retaining Rings",
        "grades": [
          "DIN 5417 / ASME B27.7"
        ],
        "material": "Spring Steel / Beryllium Copper / SS",
        "din": "DIN 5417",
        "asme": "ASME B27.7",
        "iso": "—",
        "bs": "—",
        "tensile": "—",
        "yield_": "—",
        "application": "Gearboxes, Pumps, Actuators"
      }
    ]
  }
];
