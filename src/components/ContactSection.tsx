import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Get In Touch</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Contact <span className="text-gradient-gold">Us</span>
          </h2>
          <motion.div
            className="gold-divider w-24 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.a
            href="mailto:mienginering17@gmail.com"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-card rounded-lg border border-border p-8 text-center shadow-elegant hover:shadow-gold hover:border-primary/40 transition-all group"
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mail className="w-6 h-6 text-charcoal" />
            </motion.div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">mienginering17@gmail.com</p>
          </motion.a>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-card rounded-lg border border-border p-8 text-center shadow-elegant hover:shadow-gold hover:border-primary/40 transition-all group"
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.15, rotate: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Phone className="w-6 h-6 text-charcoal" />
            </motion.div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Phone</h3>
            <p className="text-muted-foreground text-sm">
              <a href="tel:9819972301" className="hover:text-primary transition-colors block">+91 98199 72301</a>
              <a href="tel:9137658733" className="hover:text-primary transition-colors block mt-1">+91 91376 58733</a>
            </p>
          </motion.div>

          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-card rounded-lg border border-border p-8 text-center shadow-elegant hover:shadow-gold hover:border-primary/40 transition-all group"
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MapPin className="w-6 h-6 text-charcoal" />
            </motion.div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Address</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              301, 01, Mehar Iron Bazar,<br />
              Iron Market, Khedwadi,<br />
              Girgaon, Mumbai – 400004
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
