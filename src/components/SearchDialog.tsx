import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Package, Factory, Award } from "lucide-react";
import { productsData, industriesData, standardsData } from "@/data/staticData";

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (open) setQ("");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return { products: productsData.slice(0, 5), industries: industriesData.slice(0, 5), standards: standardsData.slice(0, 5) };
    const m = (t: string) => t?.toLowerCase().includes(s);
    return {
      products: productsData.filter((p) => m(p.name) || m(p.description) || m(p.standard)).slice(0, 8),
      industries: industriesData.filter((i) => m(i.name) || m(i.description)).slice(0, 8),
      standards: standardsData.filter((st) => m(st.code) || m(st.name) || m(st.description)).slice(0, 8),
    };
  }, [q]);

  if (!open) return null;
  const go = (path: string) => { onClose(); nav(path); };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-start justify-center p-4 pt-[10vh]" onClick={onClose}>
      <div className="bg-card w-full max-w-2xl rounded-xl border border-border shadow-elegant overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 text-primary" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, industries, standards…"
            data-testid="input-search"
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button onClick={onClose} aria-label="Close" data-testid="button-close-search" className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto py-2">
          <Group icon={Package} title="Products" items={results.products.map((p) => ({ key: p.slug, label: p.name, sub: p.standard, path: `/product/${p.slug}` }))} go={go} />
          <Group icon={Factory} title="Industries" items={results.industries.map((i) => ({ key: i.slug, label: i.name, sub: i.description, path: `/industry/${i.slug}` }))} go={go} />
          <Group icon={Award} title="Standards" items={results.standards.map((s) => ({ key: s.slug, label: `${s.code} — ${s.name}`, sub: s.region, path: `/standards/${s.slug}` }))} go={go} />
          {results.products.length + results.industries.length + results.standards.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-12">No results for "{q}"</div>
          )}
        </div>
      </div>
    </div>
  );
}

const Group = ({ icon: Icon, title, items, go }: any) => {
  if (!items?.length) return null;
  return (
    <div className="px-2 py-2">
      <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground"><Icon className="w-3 h-3" /> {title}</div>
      {items.map((it: any) => (
        <button key={it.key} onClick={() => go(it.path)} data-testid={`search-result-${it.key}`}
          className="w-full text-left px-3 py-2.5 rounded-md hover:bg-secondary/60 transition flex flex-col">
          <span className="font-semibold text-sm text-foreground">{it.label}</span>
          {it.sub && <span className="text-xs text-muted-foreground line-clamp-1">{it.sub}</span>}
        </button>
      ))}
    </div>
  );
};
