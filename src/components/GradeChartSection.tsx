import { motion } from "framer-motion";
import { useEditableTables } from "@/hooks/useEditableTables";

const dimensionalStandardsWithProducts = [
  { product: "Stud Bolts", grades: ["B7", "B7M", "B16", "L7", "L7M", "B8", "B8M"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 976", asme: "ASME B18.31.2", iso: "ISO 4014", uni: "UNI 6610", bs: "BS 4882", tensile: "860 MPa", yield: "720 MPa", application: "Flange Connections, Pressure Vessels, Heat Exchangers" },
  { product: "Double End Studs", grades: ["B7", "B7M", "B16", "L7", "B8", "B8M"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 938/939", asme: "ASME B18.31.2", iso: "ISO 4014", uni: "UNI 5911", bs: "BS 4882", tensile: "860 MPa", yield: "720 MPa", application: "Turbine Casings, Valve Bodies, Pump Assemblies" },
  { product: "Hex Bolts", grades: ["B7", "B16", "L7", "Grade 8.8", "Grade 10.9", "Grade 12.9"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 931", asme: "ASME B18.2.1", iso: "ISO 4014", uni: "UNI 5737", bs: "BS 3692", tensile: "860 MPa", yield: "720 MPa", application: "Structural Steelwork, Heavy Equipment, Bridge Construction" },
  { product: "Heavy Hex Bolts", grades: ["B7", "B16", "Grade 10.9", "Grade 12.9"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 6914", asme: "ASME B18.2.1", iso: "ISO 7411", uni: "UNI 5712", bs: "—", tensile: "860 MPa", yield: "720 MPa", application: "Heavy Duty Fastening, Structural Applications" },
  { product: "Socket Head Cap Screws", grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9", "Stainless 304", "Stainless 316"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 912", asme: "ASME B18.3", iso: "ISO 4762", uni: "UNI 5931", bs: "BS 4168-1", tensile: "860 MPa", yield: "720 MPa", application: "Machinery, Industrial Equipment, Precision Assemblies" },
  { product: "Countersunk Screws", grades: ["Grade 8.8", "Grade 10.9", "Grade 12.9", "Stainless 304"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 7991", asme: "ASME B18.3", iso: "ISO 10642", uni: "UNI 5933", bs: "BS 4168-8", tensile: "860 MPa", yield: "720 MPa", application: "Flush Surface Fastening, Aircraft, Automotive" },
  { product: "Socket Set Screws", grades: ["Grade 8.8", "Grade 10.9", "Stainless 304", "Stainless 316"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 913-916", asme: "ASME B18.3", iso: "ISO 4026-4029", uni: "UNI 5923-5929", bs: "BS 4168", tensile: "860 MPa", yield: "720 MPa", application: "Mechanical Connections, Shaft Locking, Position Setting" },
  { product: "Eye Bolts", grades: ["B7", "B16", "Stainless 304", "Grade 10.9"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 444", asme: "ASME B18.15", iso: "ISO 2342", uni: "UNI 6058", bs: "BS 2104", tensile: "860 MPa", yield: "720 MPa", application: "Lifting Equipment, Cable Attachments, Rigging" },
  { product: "U Bolts", grades: ["B7", "Grade 8.8", "Grade 10.9", "Stainless 304"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 3570", asme: "ASME B18.31.5", iso: "ISO 1479", uni: "—", bs: "BS 1575", tensile: "860 MPa", yield: "720 MPa", application: "Pipe Clamps, Cable Support, Suspension Systems" },
  { product: "Anchor Bolts", grades: ["B7", "B16", "Grade 10.9", "Grade 12.9"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 529", asme: "ASME B18.31", iso: "ISO 2320", uni: "UNI 6531", bs: "BS 4625", tensile: "860 MPa", yield: "720 MPa", application: "Foundation Bolting, Equipment Mounting, Concrete Anchoring" },
  { product: "Threaded Rods / All Threaded Studs", grades: ["B7", "B7M", "B16", "L7", "Grade 10.9", "Grade 12.9"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 976", asme: "ASME B18.31.2", iso: "ISO 7681", uni: "UNI 5641", bs: "BS 4848", tensile: "860 MPa", yield: "720 MPa", application: "Continuous Fastening, Custom Stud Applications, Industrial Assembly" },
  { product: "Hexagon Nuts", grades: ["ASTM A194 2H", "ASTM A194 2HM", "ASTM A194 Gr 4", "ASTM A194 Gr 7", "ISO 10.9", "ISO 12.9"], material: "Carbon / Alloy Steel, Stainless Steel", din: "DIN 934", asme: "ASME B18.2.2", iso: "ISO 4032", uni: "UNI 5587", bs: "BS 3692", tensile: "248–352 HBW", yield: "150 ksi Proof Load", application: "General Fastening, Industrial Assembly, Structural Connections" },
  { product: "Lock Nuts", grades: ["ASTM A194 2H", "ASTM A194 Gr 4", "ISO 7040", "Nylon Insert"], material: "Carbon Steel, Alloy Steel", din: "DIN 985", asme: "ASME B18.16.2", iso: "ISO 7040", uni: "UNI 5587", bs: "BS 4149", tensile: "248–352 HBW", yield: "150 ksi Proof Load", application: "Vibration-Prone Applications, Machinery, Motor Mounting" },
  { product: "Flat Washers", grades: ["ASTM F844", "ASTM F436", "ISO 7089", "Stainless"], material: "Carbon Steel, Stainless Steel", din: "DIN 125", asme: "ASME B18.22.1", iso: "ISO 7089", uni: "UNI 6592", bs: "BS 4320", tensile: "—", yield: "—", application: "Stress Distribution, Surface Protection, Joint Sealing" },
  { product: "Lock Washers", grades: ["ASTM F959", "ASTM F434", "ISO 10673", "Belleville"], material: "Carbon Steel, Stainless Steel", din: "DIN 6901/6902", asme: "ASME B18.21.1", iso: "ISO 10673", uni: "UNI 6593", bs: "BS 4464", tensile: "—", yield: "—", application: "Anti-Vibration, Load Retention, Spring-Back Action" },
  { product: "Rivets", grades: ["ASTM B117", "ISO 1051", "Aircraft Type", "Monel"], material: "Aluminum, Copper, Stainless Steel", din: "DIN 302/661", asme: "ASME B18.14", iso: "ISO 1051", uni: "UNI 6616", bs: "BS 1449", tensile: "210–300 MPa", yield: "120–170 MPa", application: "Aircraft Construction, Ship Building, Sheet Metal Assembly" },
  { product: "Studs for Flanges", grades: ["B7", "B7M", "B16", "L7", "L7M"], material: "ASTM A193 Grade B7 (42CrMo4 / AISI 4140)", din: "DIN 2510", asme: "ASME B18.31.2", iso: "ISO 4014", uni: "UNI 6610", bs: "BS 4882", tensile: "860 MPa", yield: "720 MPa", application: "Flange Fastening, Pressure Equipment, High-Temperature Service" },
];

const GradeChartSection = () => {
  const { dims: dimensionalStandards } = useEditableTables();
  
  return (
    <section id="grade-chart" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="text-sm font-semibold tracking-[0.3em] uppercase text-primary inline-block"
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Reference
          </motion.span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Fastener <span className="text-gradient-gold">Dimensional Standards</span>
          </h2>
          <motion.div
            className="gold-divider w-24 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Comprehensive Dimensional Standards with All Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden">
          <div className="bg-gradient-dark px-6 py-4">
            <h3 className="font-heading text-xl font-semibold text-gold-light">Complete Fastener Product Chart with Grades & Dimensional Standards</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 sticky top-0">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Available Grades</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Material</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">DIN</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">ASME</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">ISO</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">UNI</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">BS</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Strength / Spec</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dimensionalStandardsWithProducts.map((d) => (
                  <tr key={d.product} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-primary whitespace-nowrap">{d.product}</td>
                    <td className="px-4 py-3 text-foreground text-xs">
                      <div className="flex flex-wrap gap-1">
                        {d.grades.map((grade) => (
                          <span key={grade} className="bg-primary/10 px-2 py-1 rounded text-primary font-medium">
                            {grade}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{d.material}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.din}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.asme}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.iso}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.uni}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">{d.bs}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                      <div>Tensile: {d.tensile}</div>
                      <div>Yield: {d.yield}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{d.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-secondary/30 rounded-lg border border-border"
        >
          <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Standards Reference</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="font-semibold text-primary">ASTM</p>
              <p className="text-sm text-muted-foreground">American Society for Testing and Materials</p>
            </div>
            <div>
              <p className="font-semibold text-primary">ASME</p>
              <p className="text-sm text-muted-foreground">American Society of Mechanical Engineers</p>
            </div>
            <div>
              <p className="font-semibold text-primary">ISO</p>
              <p className="text-sm text-muted-foreground">International Organization for Standardization</p>
            </div>
            <div>
              <p className="font-semibold text-primary">DIN</p>
              <p className="text-sm text-muted-foreground">Deutsches Institut für Normung (German Standards)</p>
            </div>
            <div>
              <p className="font-semibold text-primary">UNI</p>
              <p className="text-sm text-muted-foreground">Ente Nazionale di Unificazione (Italian Standards)</p>
            </div>
            <div>
              <p className="font-semibold text-primary">BS</p>
              <p className="text-sm text-muted-foreground">British Standards Institution</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GradeChartSection;
