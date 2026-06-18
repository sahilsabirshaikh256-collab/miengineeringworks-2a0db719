import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./AdminLayout";
import { api, uploadFile } from "@/lib/api";
import type { Media } from "@/lib/api-extras";
import { Trash2, Upload, Plus, Play, FileText, Award, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type MediaType = "photo" | "video" | "pdf" | "certificate";

const empty = { type: "photo" as MediaType, url: "", title: "", caption: "", thumbnail: "" };

const TYPE_LABELS: Record<MediaType, string> = {
  photo: "Photo",
  video: "Video",
  pdf: "PDF Document",
  certificate: "Certificate",
};

const AdminMedia = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data } = useQuery<Media[]>({ queryKey: ["/api/media"], queryFn: () => api("/api/media") });
  const [form, setForm] = useState<typeof empty>(empty);
  const [busy, setBusy] = useState(false);
  const [filterType, setFilterType] = useState<"all" | MediaType>("all");

  const create = useMutation({
    mutationFn: (v: typeof empty) => api("/api/admin/media", { method: "POST", body: JSON.stringify(v) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/media"] }); setForm(empty); toast({ title: "Uploaded successfully" }); },
    onError: (e: any) => toast({ title: "Failed", description: e.message, variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: (id: number) => api(`/api/admin/media/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/media"] }); toast({ title: "Deleted" }); },
  });

  const handleFileUpload = async (file: File, target: "url" | "thumbnail") => {
    try {
      setBusy(true);
      const { url } = await uploadFile(file);
      const detectedType: MediaType = file.type.startsWith("video/") ? "video" : file.type === "application/pdf" ? "pdf" : "photo";
      setForm((p) => ({ ...p, [target]: url, type: target === "url" ? detectedType : p.type }));
      toast({ title: "File uploaded", description: file.name });
    } catch (e: any) { toast({ title: "Upload failed", description: e.message, variant: "destructive" }); }
    finally { setBusy(false); }
  };

  const acceptFor = (type: MediaType) => {
    if (type === "video") return "video/*";
    if (type === "pdf") return "application/pdf";
    if (type === "certificate") return "image/*,application/pdf";
    return "image/*";
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) { toast({ title: "File required", description: "Please upload or paste a URL", variant: "destructive" }); return; }
    create.mutate(form);
  };

  const displayed = filterType === "all" ? (data || []) : (data || []).filter((m) => m.type === filterType);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold">Gallery & Certificates</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload photos, videos, PDFs and certificates — all show live on the public Gallery page.</p>
      </div>

      {/* Upload form */}
      <form onSubmit={submit} className="bg-card rounded-lg border border-border p-6 mb-8 space-y-4">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Upload New Item</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</span>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as MediaType, url: "", thumbnail: "" })}
              className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2"
              data-testid="select-media-type"
            >
              {(["photo", "video", "pdf", "certificate"] as MediaType[]).map((t) => (
                <option key={t} value={t}>{TYPE_LABELS[t]}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. ISO 9001:2015 Certificate" className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2" data-testid="input-media-title" />
          </label>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {form.type === "certificate" ? "Certificate File (PDF or Image)" : form.type === "pdf" ? "PDF File" : form.type === "video" ? "Video File" : "Image File"}
          </span>
          <div className="mt-1 flex items-center gap-3">
            <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="Paste URL or upload" className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm" data-testid="input-media-url" />
            <label className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 bg-gradient-gold text-charcoal rounded-md text-sm font-semibold">
              <Upload className="w-4 h-4" /> Upload
              <input type="file" accept={acceptFor(form.type)} className="hidden" data-testid="input-file-media" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f, "url"); }} />
            </label>
          </div>
        </div>

        {(form.type === "video" || form.type === "pdf" || form.type === "certificate") && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {form.type === "video" ? "Thumbnail (optional)" : "Cover Image (optional)"}
            </span>
            <div className="mt-1 flex items-center gap-3">
              <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="Cover image URL (shown in grid)" className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm" />
              <label className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 bg-secondary rounded-md text-sm">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f, "thumbnail"); }} />
              </label>
            </div>
          </div>
        )}

        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Caption / Description</span>
          <textarea value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} rows={2} placeholder={form.type === "certificate" ? "e.g. ISO 9001:2015 — Quality Management System" : ""} className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 text-sm resize-none" />
        </label>

        <button type="submit" disabled={busy || create.isPending} data-testid="button-add-media" className="px-5 py-2 rounded-md bg-gradient-gold text-charcoal font-semibold disabled:opacity-60">
          {create.isPending ? "Adding…" : "Add to Gallery"}
        </button>
      </form>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "photo", "video", "pdf", "certificate"] as const).map((t) => {
          const count = t === "all" ? (data?.length ?? 0) : (data || []).filter((m) => m.type === t).length;
          return (
            <button key={t} onClick={() => setFilterType(t)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${filterType === t ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/40"}`}>
              {t === "all" ? "All" : TYPE_LABELS[t]} ({count})
            </button>
          );
        })}
      </div>

      <div>
        <h2 className="font-heading text-lg font-bold mb-3">Items ({displayed.length})</h2>
        {displayed.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayed.map((m) => (
              <div key={m.id} className="bg-card border border-border rounded-lg overflow-hidden" data-testid={`media-${m.id}`}>
                <div className="relative aspect-square bg-secondary">
                  {(m.type === "pdf" || m.type === "certificate") ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-secondary/50">
                      {m.thumbnail ? (
                        <img src={m.thumbnail} alt={m.title} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          {m.type === "certificate"
                            ? <Award className="w-10 h-10 text-primary" />
                            : <FileText className="w-10 h-10 text-primary" />}
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {m.type === "certificate" ? "Certificate" : "PDF"}
                          </span>
                        </>
                      )}
                      <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${m.type === "certificate" ? "bg-green-500/90 text-white" : "bg-primary/90 text-white"}`}>
                        {m.type === "certificate" ? "Cert" : "PDF"}
                      </span>
                    </div>
                  ) : (
                    <>
                      <img src={m.thumbnail || m.url} alt={m.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                      {m.type === "video" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <span className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center"><Play className="w-4 h-4 text-charcoal" /></span>
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold text-foreground line-clamp-1">{m.title || "(untitled)"}</div>
                  <div className="text-xs text-muted-foreground capitalize mb-2">{m.type}</div>
                  <div className="flex flex-wrap gap-1">
                    {(m.type === "pdf" || m.type === "certificate") && (
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-primary/40 text-primary rounded hover:bg-primary/10">
                        <ExternalLink className="w-3 h-3" /> View
                      </a>
                    )}
                    <button onClick={() => { if (confirm("Delete this item?")) del.mutate(m.id); }} data-testid={`button-delete-media-${m.id}`} className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-destructive/40 text-destructive rounded hover:bg-destructive/10">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground text-sm">No items yet. Upload using the form above.</div>}
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
