import { Mail, Phone, MapPin } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const cardData = [
  {
    icon: Mail,
    title: "Email",
    content: <p className="text-muted-foreground text-sm">mienginering17@gmail.com</p>,
    href: "mailto:mienginering17@gmail.com",
    rotate: 10,
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <p className="text-muted-foreground text-sm">
        <a href="tel:9819972301" className="hover:text-primary transition-colors block">+91 98199 72301</a>
        <a href="tel:9137658733" className="hover:text-primary transition-colors block mt-1">+91 91376 58733</a>
      </p>
    ),
    rotate: -10,
  },
  {
    icon: MapPin,
    title: "Address",
    content: (
      <p className="text-muted-foreground text-sm leading-relaxed">
        301, 01, Mehar Iron Bazar,<br />
        Iron Market, Khedwadi,<br />
        Girgaon, Mumbai – 400004
      </p>
    ),
    rotate: 10,
  },
];

const Contact3DCard = ({ data, index }: { data: typeof cardData[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const Icon = data.icon;

  const inner = (
    <>
      <motion.div
        className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4"
        whileHover={{ scale: 1.15, rotate: data.rotate }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-6 h-6 text-charcoal" />
      </motion.div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{data.title}</h3>
      {data.content}
    </Wrapper>
  );
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
          {cardData.map((d, i) => (
            <Contact3DCard key={d.title} data={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
