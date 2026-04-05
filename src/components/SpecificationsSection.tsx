import { motion } from "framer-motion";

const SpecificationsSection = () => {
  return (
    <section id="specifications" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Specifications</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            ASTM A193 Grade B7 <span className="text-gradient-gold">Technical Data</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Grade B7 is a heat-treated chromium-molybdenum (Cr-Mo) alloy steel with minimum tensile strength of 125 ksi (860 MPa).
          </p>
        </div>

        <div className="space-y-12">
          {/* Chemical Composition */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden">
            <div className="bg-gradient-dark px-6 py-4">
              <h3 className="font-heading text-xl font-semibold text-gold-light">Chemical Composition</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Element</th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Range</th>
                    <th className="text-left px-6 py-3 font-semibold text-foreground">Product Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Carbon", "0.37–0.49 %", "0.02 %"],
                    ["Manganese", "0.65–1.10 %", "0.04 %"],
                    ["Phosphorus, max", "0.035 %", "0.005 % over"],
                    ["Sulfur, max", "0.040 %", "0.005 % over"],
                    ["Silicon", "0.15–0.35 %", "0.02 %"],
                    ["Chromium", "0.75–1.20 %", "0.05 %"],
                    ["Molybdenum", "0.15–0.25 %", "0.02 %"],
                  ].map(([el, range, variation]) => (
                    <tr key={el} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-3 font-medium text-foreground">{el}</td>
                      <td className="px-6 py-3 text-muted-foreground">{range}</td>
                      <td className="px-6 py-3 text-muted-foreground">{variation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mechanical Properties - Metric */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden">
            <div className="bg-gradient-dark px-6 py-4">
              <h3 className="font-heading text-xl font-semibold text-gold-light">Mechanical Properties — Metric Sizes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Diameter</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Min Temp °F</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Tensile (MPa)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Yield (MPa)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Elong. %</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Red. Area %</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Hardness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["M64 and Under", "593", "860", "720", "16", "50", "321 HBW / 35 HRC"],
                    ["Over M64 to M100", "593", "795", "655", "16", "50", "321 HBW / 35 HRC"],
                    ["Over M100 to M180", "593", "690", "515", "18", "50", "321 HBW / 35 HRC"],
                  ].map(([d, t, ts, ys, e, r, h]) => (
                    <tr key={d} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{d}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ts}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ys}</td>
                      <td className="px-4 py-3 text-muted-foreground">{e}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r}</td>
                      <td className="px-4 py-3 text-muted-foreground">{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mechanical Properties - Imperial */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden">
            <div className="bg-gradient-dark px-6 py-4">
              <h3 className="font-heading text-xl font-semibold text-gold-light">Mechanical Properties — Inch Sizes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Diameter</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Min Temp °F</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Tensile (ksi)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Yield (ksi)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Elong. %</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Red. Area %</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Hardness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["2.5\" and Under", "1100", "125", "105", "16", "50", "321 HBW / 35 HRC"],
                    ["Over 2.5\" to 4\"", "1100", "115", "95", "16", "50", "321 HBW / 35 HRC"],
                    ["Over 4\" to 7\"", "1100", "100", "75", "18", "50", "321 HBW / 35 HRC"],
                  ].map(([d, t, ts, ys, e, r, h]) => (
                    <tr key={d} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{d}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ts}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ys}</td>
                      <td className="px-4 py-3 text-muted-foreground">{e}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r}</td>
                      <td className="px-4 py-3 text-muted-foreground">{h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Recommended Hardware */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Recommended Hardware</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Nuts: ASTM A194 Grade 2H</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Washers: ASTM F436 Type 1</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Raw Material</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> AISI 4140 Alloy Steel</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> AISI 4142 Alloy Steel</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificationsSection;
