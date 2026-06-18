import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, FileText, Download, ExternalLink, Film, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Lightbox } from "@/components/GallerySection";
import { api, type Media } from "@/lib/api-extras";
import { useSiteContent } from "@/hooks/useSiteContent";

const TABS = ["All", "Photos", "Videos", "PDF", "Certificates"] as const;
type Tab = typeof TABS[number];

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [lightboxItem, setLightboxItem] = useState<Media | null>(null);
  const { get } = useSiteContent();

  const { data: mediaItems = [], isLoading } = useQuery<Media[]>({
    queryKey: ["/api/media"],
    queryFn: () => api("/api/media"),
  });

  const { data: siteContent } = useQuery<Record<string, string>>({
    queryKey: ["/api/site-content"],
    queryFn: () => api("/api/site-content"),
  });

  const catalogUrl = siteContent?.["catalog.pdfUrl"] || "";

  const photos = mediaItems.filter((m) => m.type === "photo" || m.type === "image" as any);
  const videos = mediaItems.filter((m) => m.type === "video");
  const mediaPdfs = mediaItems.filter((m) => m.type === "pdf");
  const certificates = mediaItems.filter((m) => m.type === "certificate");

  const allPdfs: Array<{ id: string | number; title: string; url: string; caption?: string; isCatalog?: boolean }> = [
    ...(catalogUrl ? [{ id: "catalog", title: "Product Catalog", url: catalogUrl, caption: "M.I. Engineering Works — Full product catalog with specifications, grades & standards.", isCatalog: true }] : []),
    ...mediaPdfs.map((m) => ({ id: m.id, title: m.title || "Document", url: m.url, caption: m.caption })),
  ];

  const filtered: Media[] = activeTab === "All"
    ? mediaItems.filter((m) => m.type !== "pdf" && m.type !== "certificate")
    : activeTab === "Photos" ? photos
    : activeTab === "Videos" ? videos
    : [];

  const counts = {
    All: mediaItems.filter((m) => m.type !== "pdf" && m.type !== "certificate").length,
    Photos: photos.length,
    Videos: videos.length,
    PDF: allPdfs.length,
    Certificates: certificates.length,
  };

  const tabIcon = (tab: Tab) => {
    if (tab === "Photos") return <ImageIcon className="w-3.5 h-3.5" />;
    if (tab === "Videos") return <Film className="w-3.5 h-3.5" />;
    if (tab === "PDF") return <FileText className="w-3.5 h-3.5" />;
    if (tab === "Certificates") return <Award className="w-3.5 h-3.5" />;
    return null;
  };

  return (
    <PageTransition>
      <SEO
        title="Gallery — Photos, Videos & Catalog | M.I. Engineering Works"
        description="Explore our manufacturing gallery — photos of industrial fasteners, product videos, and downloadable PDF catalog. M.I. Engineering Works, Mumbai."
        path="/gallery"
      />
      <Header />

      {/* Hero banner */}
      <div className="relative bg-gradient-dark border-b border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(hsl(265 90% 65% / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(265 90% 65% / 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-0 left-0 w-64 h-px bg-gradient-to-r from-primary/60 to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-px bg-gradient-to-l from-accent/40 to-transparent" />
        <div className="container relative z-10 py-14 md:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'hsl(180 100% 60%)' }}>Inside Our Workshop</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3">
              Gallery &amp; <span className="text-gradient-gold">Certificates</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Photos, videos, product catalog and company certifications — all in one place.
            </p>
            <div className="gold-divider w-24 mx-auto mt-6" />
          </motion.div>
        </div>
      </div>

      <div className="bg-background min-h-[60vh]">
        <div className="container py-10">

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tabIcon(tab)}
                {tab}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab ? "bg-white/20" : "bg-border"}`}>
                  {counts[tab]}
                </span>
              </button>
            ))}
          </div>

          {/* PDF section */}
          {activeTab === "PDF" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="space-y-4 max-w-3xl"
            >
              {allPdfs.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-10 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <div className="font-heading text-lg font-semibold text-foreground mb-2">No PDFs Yet</div>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Upload PDFs from the admin panel → Photos, Videos & PDFs section.
                  </p>
                </div>
              ) : (
                allPdfs.map((pdf) => (
                  <div key={pdf.id} className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                        {pdf.title}
                        {pdf.isCatalog && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">Catalog</span>}
                      </div>
                      {pdf.caption && <div className="text-sm text-muted-foreground mt-1">{pdf.caption}</div>}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <a href={pdf.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-gold text-charcoal text-sm font-semibold hover:opacity-90 transition">
                          <ExternalLink className="w-4 h-4" /> View PDF
                        </a>
                        <a href={pdf.url} download
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
                          <Download className="w-4 h-4" /> Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {/* Certificates section */}
          {activeTab === "Certificates" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="space-y-4 max-w-3xl"
            >
              {certificates.length === 0 ? (
                <div className="bg-card rounded-xl border border-border p-10 text-center">
                  <Award className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                  <div className="font-heading text-lg font-semibold text-foreground mb-2">No Certificates Uploaded Yet</div>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Company certificates (ISO, BIS, test reports, etc.) will appear here once uploaded from the admin panel.
                  </p>
                </div>
              ) : (
                certificates.map((cert) => (
                  <div key={cert.id} className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--accent)/0.2))" }}>
                      {cert.thumbnail ? (
                        <img src={cert.thumbnail} alt={cert.title} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <Award className="w-7 h-7 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                        {cert.title || "Certificate"}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-bold uppercase tracking-wider">Certified</span>
                      </div>
                      {cert.caption && <div className="text-sm text-muted-foreground mt-1">{cert.caption}</div>}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <a href={cert.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-gold text-charcoal text-sm font-semibold hover:opacity-90 transition">
                          <ExternalLink className="w-4 h-4" /> View Certificate
                        </a>
                        <a href={cert.url} download
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition">
                          <Download className="w-4 h-4" /> Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {/* Photo / Video grid */}
          {activeTab !== "PDF" && activeTab !== "Certificates" && (
            <>
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-secondary/50 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
                  {activeTab === "Photos"
                    ? <ImageIcon className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
                    : <Film className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />}
                  <div className="font-heading text-xl font-semibold text-foreground mb-2">No {activeTab} Yet</div>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    {activeTab === "Photos"
                      ? "Product and facility photos will appear here once uploaded."
                      : "Manufacturing and product videos will appear here once uploaded."}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-3">
                    Admins can upload media via the admin panel → Photos, Videos &amp; PDFs
                  </p>
                </motion.div>
              ) : (
                <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  {filtered.map((m, idx) => (
                    <motion.button key={m.id}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      onClick={() => setLightboxItem(m)}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-border hover:border-primary/40 hover:shadow-gold transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <img src={m.thumbnail || m.url} alt={m.title || "Gallery item"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      {m.type === "video" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                          <span className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-charcoal ml-0.5" />
                          </span>
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {m.title && (
                        <span className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white font-medium text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                          {m.title}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-black/50 text-white/80">
                        {m.type === "video" ? "Video" : "Photo"}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </>
          )}

          {/* All empty state */}
          {activeTab === "All" && !isLoading && filtered.length === 0 && (
            <div className="text-center py-10 mt-4 bg-card rounded-xl border border-border">
              <div className="text-sm text-muted-foreground max-w-md mx-auto px-6">
                <p className="font-semibold text-foreground mb-1">Gallery is being set up</p>
                <p>Photos and videos of our manufacturing facility, products, and projects will appear here.</p>
                <p className="text-xs mt-3 text-muted-foreground/60">Admins: Admin → Photos, Videos, PDFs &amp; Certificates</p>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
      {lightboxItem && <Lightbox media={lightboxItem} onClose={() => setLightboxItem(null)} />}
    </PageTransition>
  );
};

export default GalleryPage;
