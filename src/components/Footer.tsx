import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageCircle, Linkedin, Facebook, Twitter, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "@/data/products";

const SOCIALS = [
  { href: "mailto:miengineering17@gmail.com", label: "Email", Icon: Mail, color: "hover:text-primary" },
  { href: "https://share.google/yGOyNRcx1ToTGVGK7", label: "Google Business Profile", Icon: Globe, color: "hover:text-[#EA4335]" },
  { href: "https://www.linkedin.com/in/mi-engineering-21a878402/", label: "LinkedIn", Icon: Linkedin, color: "hover:text-[#0A66C2]" },
  { href: "https://x.com/Engineerin86903", label: "X (Twitter)", Icon: Twitter, color: "hover:text-foreground" },
  { href: "https://www.facebook.com/profile.php?id=61587684155116", label: "Facebook", Icon: Facebook, color: "hover:text-[#1877F2]" },
  { href: "https://wa.me/919819972301", label: "WhatsApp", Icon: MessageCircle, color: "hover:text-[#25D366]" },
];

const Footer = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone || "N/A",
          company: "",
          message: formData.message,
        }),
      });
      if (r.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-dark text-gold-light/80">
      {/* Contact Form + Map */}
      <div className="container py-14 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <motion.div
            className="bg-[hsl(30,10%,16%)] rounded-2xl border border-primary/10 p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold mb-2">Send Us a Message</h3>
            <p className="text-sm text-gold-light/50 mb-6">Tell us what you need — we typically respond within one business day.</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                <h4 className="font-heading text-xl font-bold text-gold-light mb-2">Thank You!</h4>
                <p className="text-sm text-gold-light/60">Your enquiry has been delivered to our team. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name *">
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className={inputCls} data-testid="footer-input-name" />
                  </Field>
                  <Field label="Email *">
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className={inputCls} data-testid="footer-input-email" />
                  </Field>
                </div>
                <Field label="Phone Number">
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className={inputCls} data-testid="footer-input-phone" />
                </Field>
                <Field label="Message *">
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your requirements (product, size, quantity, grade…)" className={`${inputCls} resize-none`} data-testid="footer-input-message" />
                </Field>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading} data-testid="footer-button-send"
                  className="inline-flex items-center gap-2 bg-gradient-gold text-charcoal font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition shadow-gold text-sm disabled:opacity-60">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}

            {/* Quick contact buttons */}
            <div className="mt-6 pt-6 border-t border-primary/10 grid sm:grid-cols-2 gap-3">
              <a href="https://wa.me/919819972301?text=Hello%20M.I.%20Engineering%20Works" target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-lg hover:opacity-90 text-sm">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a href="tel:+919819972301" data-testid="footer-call"
                className="inline-flex items-center justify-center gap-2 border border-primary/40 text-gold-light font-semibold py-2.5 rounded-lg hover:bg-primary/10 text-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden border border-primary/10 min-h-[320px] md:min-h-[420px]"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <iframe
              title="M.I. Engineering Works Location"
              src="https://www.google.com/maps?q=Khedwadi,Girgaon,Mumbai,400004&output=embed"
              width="100%" height="100%" style={{ border: 0, minHeight: "320px" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        {/* Footer columns */}
        <div className="grid md:grid-cols-12 gap-10 border-t border-primary/10 pt-12">
          <div className="md:col-span-4">
            <h3 className="font-heading text-2xl font-bold text-gradient-gold mb-3">M.I. Engineering Works</h3>
            <p className="text-sm leading-relaxed text-gold-light/60 mb-5">
              Mumbai-based manufacturer & supplier of premium industrial fasteners — engineered, tested, and trusted across oil & gas, power, infrastructure and heavy engineering worldwide.
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ href, label, Icon, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                  data-testid={`social-${label.toLowerCase().replace(/\W+/g, "-")}`}
                  className={`w-10 h-10 inline-flex items-center justify-center rounded-full border border-primary/20 text-gold-light/80 transition-all hover:border-primary hover:scale-110 ${color}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-heading text-lg font-semibold text-gold-light mb-4">Our Products</h4>
            <ul className="space-y-2 text-sm text-gold-light/60">
              {products.slice(0, 8).map((p) => (
                <li key={p.slug}>
                  <Link to={`/product/${p.slug}`} className="hover:text-primary transition-colors hover:translate-x-1 inline-block">{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-heading text-lg font-semibold text-gold-light mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gold-light/60">
              <li><Link to="/applications" className="hover:text-primary transition-colors">Applications</Link></li>
              <li><Link to="/standards" className="hover:text-primary transition-colors">Standards</Link></li>
              <li><Link to="/specifications" className="hover:text-primary transition-colors">Specifications</Link></li>
              <li><Link to="/grade-chart" className="hover:text-primary transition-colors">Grade Chart</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Photos & Videos</Link></li>
              <li><a href="/api/catalog.pdf" className="hover:text-primary transition-colors">Download Catalog</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-heading text-lg font-semibold text-gold-light mb-4">Reach Us</h4>
            <ul className="space-y-3 text-sm text-gold-light/60">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary/70 shrink-0" />
                <a href="mailto:miengineering17@gmail.com" className="hover:text-primary transition-colors break-all">miengineering17@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary/70 shrink-0" />
                <div>
                  <a href="tel:+919819972301" className="hover:text-primary transition-colors block">+91 98199 72301</a>
                  <a href="tel:+919137658733" className="hover:text-primary transition-colors block">+91 91376 58733</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 text-primary/70 shrink-0" />
                <a href="https://wa.me/919819972301" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp Chat</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary/70 shrink-0" />
                <span>301, 01, Mehar Iron Bazar, Iron Market, Khedwadi, Girgaon, Mumbai – 400004</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gold-light/40">
          <p>© {new Date().getFullYear()} M.I. Engineering Works. All rights reserved.</p>
          <p>Engineered Quality · ASTM · DIN · ISO · BS · IS Compliant</p>
        </div>
      </div>
    </footer>
  );
};

const inputCls = "w-full bg-[hsl(30,10%,12%)] border border-primary/20 rounded-lg px-4 py-2.5 text-sm text-gold-light placeholder:text-gold-light/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-semibold text-gold-light/70 mb-1.5">{label}</label>
    {children}
  </div>
);

export default Footer;
