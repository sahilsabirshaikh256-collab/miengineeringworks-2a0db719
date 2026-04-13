import { motion } from "framer-motion";
import { Shield, Award, Truck, Factory } from "lucide-react";

const highlights = [
  { icon: Factory, title: "Own Manufacturing Unit", desc: "In-house CNC machining, threading & heat treatment facility in Mumbai" },
  { icon: Shield, title: "Quality Certified", desc: "ISO 9001:2015 compliant with full material traceability & MTC" },
  { icon: Award, title: "25+ Years Legacy", desc: "Trusted by EPC contractors, refineries & power plants across India" },
  { icon: Truck, title: "Pan-India Delivery", desc: "Nationwide supply chain with competitive pricing & timely dispatch" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle glass orbs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-0 w-60 h-60 bg-primary/3 rounded-full blur-[80px]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">About Us</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
              M.I. Engineering <span className="text-gradient-gold">Works</span>
            </h2>
            <motion.div
              className="gold-divider w-20 mt-6 mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">M.I. Engineering Works</strong> is a leading manufacturer and supplier of <strong className="text-foreground">ASTM A193 Grade B7</strong> high-tensile fasteners based in Mumbai, India. With over <strong className="text-foreground">25 years of expertise</strong>, we supply stud bolts, hex bolts, threaded rods, anchor bolts, and specialty fasteners to oil refineries, petrochemical plants, power stations, and EPC contractors across India and the Middle East.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our state-of-the-art manufacturing facility is equipped with CNC turning, precision threading, and heat treatment capabilities. Every fastener undergoes rigorous quality inspection with full material test certificates (MTCs) per EN 10204 Type 3.1.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="backdrop-blur-md bg-card/80 border border-border rounded-xl p-5 hover:shadow-gold hover:border-primary/30 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-sm font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
