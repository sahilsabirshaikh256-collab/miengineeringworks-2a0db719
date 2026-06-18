import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./AdminLayout";
import EditDialog, { type Field } from "./EditDialog";
import { api, type Category, type Product } from "@/lib/api";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fields: Field[] = [
  { name: "slug", label: "URL Slug (lowercase, no spaces — e.g. 'bolts')", type: "text" },
  { name: "name", label: "Display Name (e.g. 'Bolts')", type: "text" },
  { name: "description", label: "Description (shown on category page & dropdown)", type: "textarea" },
  { name: "image", label: "Cover Image", type: "image" },
  { name: "sortOrder", label: "Sort Order (lower numbers appear first)", type: "text" },
];

const empty: Partial<Category> = { slug: "", name: "", description: "", image: "", sortOrder: 100 };

const AdminCategories = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ["/api/categories"], queryFn: () => api("/api/categories") });
  const { data: products = [] } = useQuery<Product[]>({ queryKey: ["/api/products"], queryFn: () => api("/api/products") });
  const [editing, setEditing] = useState<any>(null);

  const save = useMutation({
    mutationFn: (v: Category) => {
      const payload = { ...v, sortOrder: Number(v.sortOrder) || 0 };
      return v.id
        ? api(`/api/admin/categories/${v.id}`, { method: "PATCH", body: JSON.stringify(payload) })
        : api("/api/admin/categories", { method: "POST", body: JSON.stringify(payload) });
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/categories"] }); toast({ title: "Saved" }); },
  });
  const del = useMutation({
    mutationFn: (id: number) => api(`/api/admin/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/categories"] }); toast({ title: "Deleted" }); },
  });

  const productCount = (categoryName: string) =>
    products.filter((p) => p.category === categoryName).length;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Product Categories</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the {categories.length} top-level groupings shown in the Products mega-menu and on the homepage.
          </p>
        </div>
        <button onClick={() => setEditing(empty)} data-testid="button-add-category" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-gold text-charcoal rounded-md font-semibold">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Image</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Description</th>
              <th className="text-center p-3">Products</th>
              <th className="text-center p-3">Sort</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((c) => (
              <tr key={c.id} data-testid={`row-category-${c.slug}`}>
                <td className="p-3 w-20">{c.image && <img src={c.image} alt="" className="w-14 h-14 object-cover rounded border border-border" />}</td>
                <td className="p-3"><div className="font-semibold text-foreground">{c.name}</div></td>
                <td className="p-3 text-xs text-muted-foreground">/products/category/{c.slug}</td>
                <td className="p-3 text-xs text-muted-foreground max-w-md"><div className="line-clamp-2">{c.description}</div></td>
                <td className="p-3 text-center">
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">{productCount(c.name)}</span>
                </td>
                <td className="p-3 text-center text-xs text-muted-foreground">{c.sortOrder}</td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(c)} data-testid={`button-edit-${c.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-border rounded hover:border-primary hover:text-primary mr-2"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => { if (confirm(`Delete category "${c.name}"? Products in this category will become uncategorised.`)) del.mutate(c.id); }} data-testid={`button-delete-${c.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-destructive/40 text-destructive rounded hover:bg-destructive/10"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted-foreground p-12 text-sm">
                  No categories yet — click "Add Category" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        <strong>Tip:</strong> The category <em>Name</em> on this page must match the <em>Category</em> field on each product (e.g. "Bolts", "Nuts"). The <em>slug</em> is used in the URL.
      </p>

      <EditDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={async (v) => save.mutateAsync(v)}
        title={editing?.id ? "Edit Category" : "New Category"}
        fields={fields}
        initial={editing || empty}
      />
    </AdminLayout>
  );
};

export default AdminCategories;
