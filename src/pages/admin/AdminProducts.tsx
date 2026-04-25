import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./AdminLayout";
import EditDialog, { type Field } from "./EditDialog";
import { api, type Product, type Category } from "@/lib/api";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const empty: Partial<Product> = { slug: "", name: "", category: "", image: "", standard: "", description: "", sizes: "", threads: "", length: "", material: "", finish: [], grades: [], applications: [], dimensions: [] };

const AdminProducts = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data } = useQuery<Product[]>({ queryKey: ["/api/products"], queryFn: () => api("/api/products") });
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ["/api/categories"], queryFn: () => api("/api/categories") });
  const [editing, setEditing] = useState<any>(null);
  const [filter, setFilter] = useState<string>("");

  // Field schema rebuilds when categories arrive so the select is populated.
  const fields: Field[] = useMemo(() => [
    { name: "slug", label: "Slug", type: "text" },
    { name: "name", label: "Name", type: "text" },
    { name: "category", label: "Category", type: "select", options: categories.map((c) => ({ value: c.name, label: c.name })) },
    { name: "image", label: "Image", type: "image" },
    { name: "standard", label: "Standard", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "sizes", label: "Sizes", type: "text" },
    { name: "threads", label: "Threads", type: "text" },
    { name: "length", label: "Length", type: "text" },
    { name: "material", label: "Material", type: "text" },
    { name: "finish", label: "Finish Options", type: "list" },
    { name: "grades", label: "Grades", type: "list" },
    { name: "applications", label: "Applications", type: "list" },
    { name: "dimensions", label: "Dimensions", type: "json", placeholder: '[{"label":"Diameter","value":"M6 – M100"}]' },
  ], [categories]);

  const save = useMutation({
    mutationFn: (v: Product) => v.id
      ? api(`/api/admin/products/${v.id}`, { method: "PATCH", body: JSON.stringify(v) })
      : api("/api/admin/products", { method: "POST", body: JSON.stringify(v) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/products"] }); toast({ title: "Saved" }); },
  });
  const del = useMutation({
    mutationFn: (id: number) => api(`/api/admin/products/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/products"] }); toast({ title: "Deleted" }); },
  });

  const filtered = (data || []).filter((p) => !filter || p.category === filter);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{(data || []).length} products across {categories.length} categories. Edit names, descriptions, images, and specifications.</p>
        </div>
        <button onClick={() => setEditing(empty)} data-testid="button-add-product" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-gold text-charcoal rounded-md font-semibold">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setFilter("")} data-testid="filter-all"
          className={`text-xs px-3 py-1.5 rounded-full border transition ${filter === "" ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/40"}`}>
          All ({(data || []).length})
        </button>
        {categories.map((c) => {
          const count = (data || []).filter((p) => p.category === c.name).length;
          return (
            <button key={c.id} onClick={() => setFilter(c.name)} data-testid={`filter-${c.slug}`}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${filter === c.name ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-primary/40"}`}>
              {c.name} ({count})
            </button>
          );
        })}
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="text-left p-3">Image</th><th className="text-left p-3">Name</th><th className="text-left p-3">Category</th><th className="text-left p-3">Standard</th><th className="text-right p-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p) => (
              <tr key={p.id} data-testid={`row-product-${p.slug}`}>
                <td className="p-3 w-20">{p.image && <img src={p.image} alt="" className="w-14 h-14 object-cover rounded border border-border" />}</td>
                <td className="p-3"><div className="font-semibold text-foreground">{p.name}</div><div className="text-xs text-muted-foreground">/{p.slug}</div></td>
                <td className="p-3 text-muted-foreground text-xs">{p.category || <span className="opacity-40">—</span>}</td>
                <td className="p-3 text-muted-foreground">{p.standard}</td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(p)} data-testid={`button-edit-${p.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-border rounded hover:border-primary hover:text-primary mr-2"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) del.mutate(p.id); }} data-testid={`button-delete-${p.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-destructive/40 text-destructive rounded hover:bg-destructive/10"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={async (v) => save.mutateAsync(v)}
        title={editing?.id ? "Edit Product" : "New Product"}
        fields={fields}
        initial={editing || empty}
      />
    </AdminLayout>
  );
};

export default AdminProducts;
