import { motion } from "framer-motion";
import { Play, ShieldCheck, Factory, Award } from "lucide-react";

const videos = [
  {
    title: "Stud Bolt Manufacturing Process",
    thumbnail: "https://img.youtube.com/vi/6m2k6gVh3Sg/hqdefault.jpg",
    embedId: "6m2k6gVh3Sg",
    description: "Complete manufacturing process of ASTM A193 Grade B7 stud bolts",
  },
  {
    title: "Fastener Production Line",
    thumbnail: "https://img.youtube.com/vi/EsJQLaxbJpo/hqdefault.jpg",
    embedId: "EsJQLaxbJpo",
    description: "Industrial bolt & nut manufacturing in modern CNC facility",
  },
  {
    title: "Quality Testing & Inspection",
    thumbnail: "https://img.youtube.com/vi/V8XKS7tCsIA/hqdefault.jpg",
    embedId: "V8XKS7tCsIA",
    description: "Mechanical testing, hardness check & dimensional inspection of fasteners",
  },
];

const trustPoints = [
  {
    icon: Factory,
    title: "Premium Manufacturing",
    description: "State-of-the-art CNC machinery and hot forging processes",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Every fastener tested for hardness, tensile strength & dimensions",
  },
  {
    icon: Award,
    title: "Industry Certified",
    description: "Products conforming to ASTM, ASME, DIN & ISO standards",
  },
];

const VideoSection = () => {
  return (
    <section id="videos" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">
            Manufacturing Excellence
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3 text-foreground">
            See How We <span className="text-gradient-gold">Manufacture</span>
          </h2>
          <div className="gold-divider w-24 mx-auto mt-6" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Watch our precision manufacturing processes that ensure every fastener meets
            the highest quality standards for critical industrial applications.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {videos.map((video, i) => (
            <motion.div
              key={video.embedId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-xl border border-border shadow-elegant overflow-hidden group hover:shadow-gold transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base font-bold text-foreground mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 bg-secondary/40 rounded-xl p-6 border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold text-foreground mb-1">
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
