import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Play, X, ArrowRight, Image as ImageIcon } from "lucide-react";
import { api, type Media } from "@/lib/api-extras";

const GallerySection = () => {
  const { data, isLoading } = useQuery<Media[]>({ queryKey: ["/api/media"], queryFn: () => api("/api/media") });
  const [open, setOpen] = useState<Media | null>(null);
  const items = (data || []).slice(0, 8);

  if (!isLoading && items.length === 0) return null;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">Inside Our Workshop</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-3">Photos & <span className="text-gradient-gold">Videos</span></h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">A look inside our manufacturing operations, finished products, and project deliveries.</p>
          <div className="gold-divider w-24 mx-auto mt-6" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square bg-secondary/50 animate-pulse rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((m) => (
              <button key={m.id} onClick={() => setOpen(m)} data-testid={`gallery-item-${m.id}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/40 hover:shadow-gold transition">
                <img src={m.thumbnail || m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                {m.type === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center"><Play className="w-5 h-5 text-charcoal" /></span>
                  </span>
                )}
                {m.title && (
                  <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-xs text-white text-left">{m.title}</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/gallery" data-testid="link-all-gallery" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition">
            <ImageIcon className="w-4 h-4" /> View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {open && <Lightbox media={open} onClose={() => setOpen(null)} />}
    </section>
  );
};

export const Lightbox = ({ media, onClose }: { media: Media; onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
    <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-white p-2"><X className="w-6 h-6" /></button>
    <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
      {media.type === "video" ? (
        <video src={media.url} controls autoPlay className="w-full rounded-lg max-h-[80vh]" />
      ) : (
        <img src={media.url} alt={media.title} className="w-full rounded-lg max-h-[85vh] object-contain" />
      )}
      {media.title && <div className="text-white mt-3 text-center font-semibold">{media.title}</div>}
      {media.caption && <div className="text-white/70 text-sm mt-1 text-center">{media.caption}</div>}
    </div>
  </div>
);

export default GallerySection;
