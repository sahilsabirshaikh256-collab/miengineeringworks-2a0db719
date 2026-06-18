import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "./AdminLayout";
import { api } from "@/lib/api";
import { Trash2, Mail, Phone, Building2, Package, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  productName?: string;
  productGrade?: string;
  productStandard?: string;
  createdAt: string;
}

const AdminContacts = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts"],
    queryFn: () => api("/api/admin/contacts"),
  });

  const del = useMutation({
    mutationFn: (id: number) => api(`/api/admin/contacts/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      toast({ title: "Deleted" });
    },
  });

  const quoteRequests = (data || []).filter((c) => c.productName);
  const generalMessages = (data || []).filter((c) => !c.productName);

  return (
    <AdminLayout>
      <h1 className="font-heading text-3xl font-bold mb-2">Contact Submissions</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Quote requests and messages submitted via the website.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-2xl font-bold text-foreground">{(data || []).length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Total</div>
        </div>
        <div className="bg-card rounded-lg border border-primary/20 p-4">
          <div className="text-2xl font-bold text-primary">{quoteRequests.length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">Quote Requests</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="text-2xl font-bold text-foreground">{generalMessages.length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">General Messages</div>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((c) => (
            <div
              key={c.id}
              className={`bg-card rounded-lg border p-5 ${c.productName ? "border-primary/30 shadow-sm" : "border-border"}`}
              data-testid={`card-contact-${c.id}`}
            >
              {/* Quote Request badge */}
              {c.productName && (
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                    <Package className="w-3.5 h-3.5" /> Quote Request
                  </span>
                  <div className="flex flex-wrap gap-2 ml-1">
                    <span className="text-sm font-semibold text-foreground">{c.productName}</span>
                    {c.productGrade && (
                      <span className="inline-flex items-center gap-1 text-xs bg-secondary text-foreground px-2 py-0.5 rounded border border-border">
                        <Tag className="w-3 h-3 text-primary" /> {c.productGrade}
                      </span>
                    )}
                    {c.productStandard && (
                      <span className="text-xs text-muted-foreground self-center">{c.productStandard}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <div className="font-heading text-lg font-semibold text-foreground">{c.fullName}</div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${c.email}`} className="hover:text-primary transition-colors">{c.email}</a>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${c.phone}`} className="hover:text-primary transition-colors">{c.phone}</a>
                    </span>
                    {c.companyName && (
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" /> {c.companyName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</div>
                  <button
                    onClick={() => { if (confirm("Delete this submission?")) del.mutate(c.id); }}
                    data-testid={`button-delete-contact-${c.id}`}
                    className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-destructive/40 text-destructive rounded hover:bg-destructive/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap bg-secondary/30 rounded-md p-3 border border-border">
                {c.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-10 text-center text-muted-foreground">
          No submissions yet.
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContacts;
