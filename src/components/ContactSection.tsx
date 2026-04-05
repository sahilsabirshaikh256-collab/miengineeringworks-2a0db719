import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Get In Touch</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Contact <span className="text-gradient-gold">Us</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.a
            href="mailto:mienginering17@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg border border-border p-8 text-center shadow-elegant hover:shadow-gold hover:border-primary/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-charcoal" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">mienginering17@gmail.com</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-lg border border-border p-8 text-center shadow-elegant hover:shadow-gold hover:border-primary/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-charcoal" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">Phone</h3>
            <p className="text-muted-foreground text-sm">
              <a href="tel:9819972301" className="hover:text-primary transition-colors block">+91 98199 72301</a>
              <a href="tel:9137658733" className="hover:text-primary transition-colors block mt-1">+91 91376 58733</a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-lg border border-border p-8 text-center shadow-elegant hover:shadow-gold hover:border-primary/40 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-charcoal" />
            </div>
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
