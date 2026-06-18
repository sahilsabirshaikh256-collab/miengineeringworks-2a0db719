import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { gradeChartCategories } from "@/data/staticData";

const ALL = "All Categories";

const GradeChartSection = ({ defaultCategory }: { defaultCategory?: string }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory || ALL);
  const [open, setOpen] = useState(false);

  const categoryNames = [ALL, ...gradeChartCategories.map((c) => c.name)];

  const displayedCategories = useMemo(() => {
    if (selectedCategory === ALL) return gradeChartCategories;
    return gradeChartCategories.filter((c) => c.name === selectedCategory);
  }, [selectedCategory]);

  const totalEntries = displayedCategories.reduce((sum, c) => sum + c.entries.length, 0);

  return (
    <section id="grade-chart" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary inline-block">Reference</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Fastener <span className="text-gradient-gold">Grade Chart</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm">
            Complete dimensional standards, grades, materials and applications for all fastener types.
            Filter by category using the dropdown below.
          </p>
          <motion.div
            className="gold-divider w-24 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Category Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:border-primary/40 transition min-w-[220px] justify-between"
            >
              <span>{selectedCategory}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute top-full left-0 mt-1 z-50 min-w-[220px] bg-card border border-border rounded-lg shadow-elegant overflow-hidden">
                {categoryNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => { setSelectedCategory(name); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-secondary ${
                      selectedCategory === name ? "text-primary font-semibold bg-secondary/50" : "text-foreground"
                    }`}
                  >
                    {name}
                    {name !== ALL && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({gradeChartCategories.find((c) => c.name === name)?.entries.length ?? 0})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {gradeChartCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name === selectedCategory && selectedCategory !== ALL ? ALL : cat.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedCategory === cat.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="ml-auto text-xs text-muted-foreground">
            Showing {totalEntries} products
          </div>
        </div>

        {/* Grade Tables by Category */}
        <div className="space-y-8">
          {displayedCategories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden"
            >
              <div className="bg-gradient-dark px-6 py-3 flex items-center justify-between">
                <h3 className="font-heading text-lg font-semibold text-gold-light">{cat.name}</h3>
                <span className="text-xs text-gold-light/50">{cat.entries.length} products</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Product</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Grades</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Material</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">DIN</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">ASME / ASTM</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">ISO</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">BS</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Tensile</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Yield</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {cat.entries.map((d) => (
                      <tr key={d.product} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 font-semibold text-primary whitespace-nowrap text-xs">{d.product}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {d.grades.map((g) => (
                              <span key={g} className="bg-primary/10 px-2 py-0.5 rounded text-primary font-medium text-[10px] whitespace-nowrap">{g}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground text-xs max-w-[160px]">{d.material}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.din}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.asme}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.iso}</td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs whitespace-nowrap">{d.bs}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{d.tensile}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{d.yield_}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px]">{d.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standards Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-secondary/30 rounded-lg border border-border"
        >
          <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Standards Reference</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { code: "ASTM", full: "American Society for Testing & Materials" },
              { code: "ASME", full: "American Society of Mechanical Engineers" },
              { code: "ISO", full: "International Organization for Standardization" },
              { code: "DIN", full: "Deutsches Institut für Normung (Germany)" },
              { code: "BS", full: "British Standards Institution" },
              { code: "IS", full: "Bureau of Indian Standards" },
            ].map(({ code, full }) => (
              <div key={code}>
                <p className="font-semibold text-primary text-sm">{code}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{full}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Material Grades Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-6 bg-card rounded-lg border border-border"
        >
          <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Material Grades Quick Reference</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { grade: "MS / Mild Steel", spec: "IS 2062 / ASTM A36", use: "General purpose, low-stress" },
              { grade: "Carbon Steel", spec: "AISI 1045 / DIN C45", use: "Machinery, structural" },
              { grade: "High Tensile (8.8/10.9/12.9)", spec: "ISO 898-1", use: "Structural, heavy engineering" },
              { grade: "ASTM A193 B7", spec: "42CrMo4 / AISI 4140", use: "Pressure vessels, flanges, high-temp" },
              { grade: "ASTM A194 2H", spec: "Medium carbon alloy", use: "Mating nuts for A193 B7 studs" },
              { grade: "SS 304 (A2)", spec: "18-8 Austenitic SS", use: "General corrosion resistance" },
              { grade: "SS 316 (A4)", spec: "18-10 Mo Austenitic SS", use: "Marine, chemical, food grade" },
              { grade: "SS 202", spec: "Cr-Mn Austenitic SS", use: "General corrosion, economy grade" },
              { grade: "SS 410", spec: "Martensitic SS", use: "Moderate corrosion + strength" },
              { grade: "Alloy Steel (B16/L7)", spec: "Cr-Mo-V alloy", use: "High-temp, pressure service" },
              { grade: "Brass (CuZn)", spec: "CW614N / C36000", use: "Electrical, decorative, marine" },
              { grade: "Titanium (Grade 2/5)", spec: "ASTM B348 / AMS 4928", use: "Aerospace, lightweight, corrosion" },
              { grade: "Inconel 625 / 718", spec: "ASTM B446 / B637", use: "Extreme temp, superalloy service" },
              { grade: "Monel 400 / K500", spec: "ASTM B164 / B865", use: "Seawater, acids, chemical plant" },
              { grade: "Copper (C11000)", spec: "ASTM B152", use: "Electrical, plumbing, heat exchangers" },
            ].map(({ grade, spec, use }) => (
              <div key={grade} className="p-3 rounded-md bg-secondary/40 border border-border/50">
                <div className="font-semibold text-primary">{grade}</div>
                <div className="text-muted-foreground font-mono mt-0.5">{spec}</div>
                <div className="text-foreground/70 mt-0.5">{use}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GradeChartSection;
