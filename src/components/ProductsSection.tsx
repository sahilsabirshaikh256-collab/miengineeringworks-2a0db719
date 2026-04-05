import { motion } from "framer-motion";
import studBolt from "@/assets/stud-bolt.jpg";
import doubleEndStud from "@/assets/double-end-stud.jpg";
import hexBolt from "@/assets/hex-bolt.jpg";
import heavyHexBolt from "@/assets/heavy-hex-bolt.jpg";
import socketCapScrew from "@/assets/socket-cap-screw.jpg";
import countersunkScrew from "@/assets/countersunk-screw.jpg";
import setScrew from "@/assets/set-screw.jpg";
import eyeBolt from "@/assets/eye-bolt.jpg";
import uBolt from "@/assets/u-bolt.jpg";
import anchorBolt from "@/assets/anchor-bolt.jpg";
import threadedRod from "@/assets/threaded-rod.jpg";
import roundBar from "@/assets/round-bar.jpg";

const products = [
  { name: "Stud Bolts", img: studBolt, standard: "ASME B16.5 / DIN 976" },
  { name: "Double End Studs", img: doubleEndStud, standard: "ASME B18.2.1 / DIN 2510" },
  { name: "Hex Bolts", img: hexBolt, standard: "ASME B18.2.1 / DIN 931" },
  { name: "Heavy Hex Bolts", img: heavyHexBolt, standard: "ASME B18.2.1 / DIN 6914" },
  { name: "Socket Head Cap Screws", img: socketCapScrew, standard: "ASME B18.3 / DIN 912" },
  { name: "Countersunk Screws", img: countersunkScrew, standard: "ASME B18.3 / DIN 7991" },
  { name: "Socket Set Screws", img: setScrew, standard: "ASME B18.3 / DIN 913-916" },
  { name: "Eye Bolts", img: eyeBolt, standard: "ASME B18.15 / DIN 444" },
  { name: "U Bolts", img: uBolt, standard: "ASME B18.31.5 / DIN 3570" },
  { name: "Anchor Bolts", img: anchorBolt, standard: "DIN 529" },
  { name: "Threaded Rods", img: threadedRod, standard: "DIN 976 / ASME B18.31.2" },
  { name: "Round Bars", img: roundBar, standard: "AISI 4140 / 4142" },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Our Products</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            ASTM A193 Grade B7 <span className="text-gradient-gold">Fasteners</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group bg-card rounded-lg border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden shadow-elegant hover:shadow-gold"
            >
              <div className="aspect-square bg-secondary/30 flex items-center justify-center p-4 overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" width={512} height={512} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 text-center border-t border-border">
                <h3 className="font-heading text-sm md:text-base font-semibold text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.standard}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
