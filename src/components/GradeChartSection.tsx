import { motion } from "framer-motion";

const gradeData = [
  { grade: "B5", material: "Cr 5%", spec: "ASTM A193", tensile: "100 ksi min", use: "High-temperature service" },
  { grade: "B6", material: "410 SS", spec: "ASTM A193", tensile: "110 ksi min", use: "Corrosion-resistant high-temp" },
  { grade: "B6X", material: "410 SS (Modified)", spec: "ASTM A193", tensile: "90 ksi min", use: "Improved toughness" },
  { grade: "B7", material: "4140/4142 Alloy", spec: "ASTM A193", tensile: "125 ksi min", use: "Most common high-temp bolting" },
  { grade: "B7M", material: "4140/4142 Alloy", spec: "ASTM A193", tensile: "100 ksi min", use: "SSC-resistant (NACE MR0175)" },
  { grade: "B8 Class 1", material: "304 SS", spec: "ASTM A193", tensile: "75 ksi min", use: "Carbide solution treated" },
  { grade: "B8 Class 2", material: "304 SS", spec: "ASTM A193", tensile: "125 ksi min", use: "Strain hardened" },
  { grade: "B8M Class 1", material: "316 SS", spec: "ASTM A193", tensile: "75 ksi min", use: "Moly-bearing, solution treated" },
  { grade: "B8M Class 2", material: "316 SS", spec: "ASTM A193", tensile: "110 ksi min", use: "Moly-bearing, strain hardened" },
  { grade: "B8T", material: "321 SS", spec: "ASTM A193", tensile: "75 ksi min", use: "Ti-stabilized for high-temp" },
  { grade: "B8C", material: "347 SS", spec: "ASTM A193", tensile: "75 ksi min", use: "Cb-stabilized for high-temp" },
  { grade: "B16", material: "4140/4142 Alloy", spec: "ASTM A193", tensile: "125 ksi min", use: "Higher-temp than B7 (to 1000°F)" },
  { grade: "L7", material: "4140/4142 Alloy", spec: "ASTM A320", tensile: "125 ksi min", use: "Low-temperature service (-150°F)" },
  { grade: "L7M", material: "4140/4142 Alloy", spec: "ASTM A320", tensile: "100 ksi min", use: "Low-temp, SSC-resistant" },
  { grade: "L43", material: "4340 Alloy", spec: "ASTM A320", tensile: "125 ksi min", use: "Low-temperature to -150°F" },
  { grade: "B8 (A320)", material: "304 SS", spec: "ASTM A320", tensile: "75 ksi min", use: "Cryogenic service" },
  { grade: "B8M (A320)", material: "316 SS", spec: "ASTM A320", tensile: "75 ksi min", use: "Cryogenic, Moly-bearing" },
];

const dimensionalStandards = [
  { product: "Stud Bolts", din: "DIN 976", asme: "ASME B18.31.2", iso: "—", uni: "UNI 6610", bs: "BS 4882" },
  { product: "Double End Studs", din: "DIN 938/939", asme: "ASME B18.31.2", iso: "—", uni: "UNI 5911", bs: "BS 4882" },
  { product: "Hex Bolts", din: "DIN 931", asme: "ASME B18.2.1", iso: "ISO 4014", uni: "UNI 5737", bs: "BS 3692" },
  { product: "Heavy Hex Bolts", din: "DIN 6914", asme: "ASME B18.2.1", iso: "ISO 7411", uni: "UNI 5712", bs: "—" },
  { product: "Socket Head Cap Screws", din: "DIN 912", asme: "ASME B18.3", iso: "ISO 4762", uni: "UNI 5931", bs: "BS 4168-1" },
  { product: "Countersunk Screws", din: "DIN 7991", asme: "ASME B18.3", iso: "ISO 10642", uni: "UNI 5933", bs: "BS 4168-8" },
  { product: "Socket Set Screws", din: "DIN 913-916", asme: "ASME B18.3", iso: "ISO 4026-4029", uni: "UNI 5923-5929", bs: "BS 4168" },
  { product: "Eye Bolts", din: "DIN 444", asme: "ASME B18.15", iso: "—", uni: "UNI 6058", bs: "—" },
  { product: "U Bolts", din: "DIN 3570", asme: "ASME B18.31.5", iso: "—", uni: "—", bs: "—" },
  { product: "Anchor Bolts", din: "DIN 529", asme: "—", iso: "—", uni: "—", bs: "—" },
  { product: "Threaded Rods", din: "DIN 976", asme: "ASME B18.31.2", iso: "—", uni: "—", bs: "—" },
];

const GradeChartSection = () => {
  return (
    <section id="grade-chart" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Reference</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Fastener <span className="text-gradient-gold">Grade Chart</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        {/* Full Grade Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden mb-12">
          <div className="bg-gradient-dark px-6 py-4">
            <h3 className="font-heading text-xl font-semibold text-gold-light">ASTM A193 / A320 Fastener Grade Chart</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Grade</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Material</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Specification</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Tensile Strength</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {gradeData.map((g) => (
                  <tr key={g.grade} className={`hover:bg-secondary/30 transition-colors ${g.grade === "B7" ? "bg-primary/5 font-medium" : ""}`}>
                    <td className="px-4 py-3 font-semibold text-primary">{g.grade}</td>
                    <td className="px-4 py-3 text-foreground">{g.material}</td>
                    <td className="px-4 py-3 text-muted-foreground">{g.spec}</td>
                    <td className="px-4 py-3 text-muted-foreground">{g.tensile}</td>
                    <td className="px-4 py-3 text-muted-foreground">{g.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Dimensional Standards */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-lg border border-border shadow-elegant overflow-hidden">
          <div className="bg-gradient-dark px-6 py-4">
            <h3 className="font-heading text-xl font-semibold text-gold-light">Fastener Dimensional Standards</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Product</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">DIN</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">ASME</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">ISO</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">UNI</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">BS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {dimensionalStandards.map((d) => (
                  <tr key={d.product} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{d.product}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.din}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.asme}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.iso}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.uni}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.bs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GradeChartSection;
