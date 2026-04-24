import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Plus, Search, Trash2, Pencil, X, Save, Notebook, Filter, Loader2, CheckCircle2, Circle } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { LedgerEntry } from "@shared/schema";

type StatusFilter = "all" | "paid" | "due";

const ALPHA = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

const emptyForm = {
  customerName: "", invoiceDate: "", invoiceNo: "",
  amountDue: "", paymentDate: "", amountReceived: "",
  receiptNo: "", notes: "",
};

const inr = (n: number) => Number.isFinite(n)
  ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
  : "₹0.00";

const num = (s: string) => parseFloat(String(s || "").replace(/[^0-9.\-]/g, "")) || 0;

export default function AdminLedger() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: rows = [], isLoading } = useQuery<LedgerEntry[]>({ queryKey: ["/api/admin/ledger"] });

  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("All");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [editing, setEditing] = useState<LedgerEntry | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  const create = useMutation({
    mutationFn: (data: typeof form) => api("/api/admin/ledger", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/ledger"] }); setAdding(false); setForm({ ...emptyForm }); toast({ title: "Entry added" }); },
    onError: (e: any) => toast({ title: "Failed", description: e.message, variant: "destructive" }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      api(`/api/admin/ledger/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/ledger"] }); setEditing(null); toast({ title: "Updated" }); },
    onError: (e: any) => toast({ title: "Failed", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => api(`/api/admin/ledger/${id}`, { method: "DELETE" }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["/api/admin/ledger"] }); toast({ title: "Deleted" }); },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (letter !== "All" && (r.customerName || "").trim().charAt(0).toUpperCase() !== letter) return false;
      const due = num(r.amountDue), recv = num(r.amountReceived);
      const isPaid = recv >= due && due > 0;
      if (status === "paid" && !isPaid) return false;
      if (status === "due" && isPaid) return false;
      if (!q) return true;
      return [r.customerName, r.invoiceNo, r.receiptNo, r.notes].some((v) => (v || "").toLowerCase().includes(q));
    }).sort((a, b) => (a.customerName || "").localeCompare(b.customerName || ""));
  }, [rows, letter, status, search]);

  const totals = useMemo(() => {
    let due = 0, recv = 0;
    for (const r of filtered) { due += num(r.amountDue); recv += num(r.amountReceived); }
    return { due, recv, balance: due - recv };
  }, [filtered]);

  const startEdit = (r: LedgerEntry) => {
    setEditing(r);
    setForm({
      customerName: r.customerName || "",
      invoiceDate: r.invoiceDate || "", invoiceNo: r.invoiceNo || "",
      amountDue: r.amountDue || "", paymentDate: r.paymentDate || "",
      amountReceived: r.amountReceived || "", receiptNo: r.receiptNo || "",
      notes: r.notes || "",
    });
  };

  const submit = () => {
    if (!form.customerName.trim()) { toast({ title: "Customer name required", variant: "destructive" }); return; }
    if (editing) update.mutate({ id: editing.id, data: form });
    else create.mutate(form);
  };

  return (
    <AdminLayout>
      <Helmet><title>Ledger / Khata · Admin</title></Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Notebook className="w-6 h-6 text-primary" /> Ledger / Khata
          </h1>
          <p className="text-sm text-muted-foreground">Track customer invoices, payments and dues.</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditing(null); setForm({ ...emptyForm }); }}
          data-testid="button-add-entry"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2.5 rounded-md hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New Entry
        </button>
      </div>

      {/* Totals */}
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <Stat label="Total Due" value={inr(totals.due)} testid="stat-total-due" tone="amber" />
        <Stat label="Total Received" value={inr(totals.recv)} testid="stat-total-recv" tone="green" />
        <Stat label="Outstanding Balance" value={inr(totals.balance)} testid="stat-balance" tone={totals.balance > 0 ? "red" : "green"} />
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-xl p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text" placeholder="Search by customer, invoice, receipt, notes…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search"
              className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} data-testid="select-status"
              className="rounded-md border border-border bg-background text-sm px-3 py-2 focus:outline-none focus:border-primary">
              <option value="all">All status</option>
              <option value="paid">Paid only</option>
              <option value="due">Due only</option>
            </select>
          </div>
        </div>

        {/* A–Z chips */}
        <div className="mt-3 flex flex-wrap gap-1">
          {ALPHA.map((l) => {
            const active = l === letter;
            return (
              <button key={l} onClick={() => setLetter(l)}
                data-testid={`chip-letter-${l.toLowerCase()}`}
                className={`min-w-[30px] text-xs font-bold px-2 py-1 rounded ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-primary/10 hover:text-primary"}`}>
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 sticky top-0 z-10 backdrop-blur">
              <tr className="text-left">
                <Th>Status</Th>
                <Th>Customer</Th>
                <Th>Invoice Date</Th>
                <Th>Invoice No.</Th>
                <Th className="text-right">Amount Due</Th>
                <Th>Payment Date</Th>
                <Th className="text-right">Amount Received</Th>
                <Th>Receipt No.</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={9} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={9} className="p-8 text-center text-muted-foreground">No entries match your filters.</td></tr>
              )}
              {filtered.map((r) => {
                const due = num(r.amountDue), recv = num(r.amountReceived);
                const paid = recv >= due && due > 0;
                return (
                  <tr key={r.id} className="border-t border-border hover:bg-secondary/30" data-testid={`row-ledger-${r.id}`}>
                    <Td>
                      {paid ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> PAID</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-bold"><Circle className="w-3.5 h-3.5" /> DUE</span>
                      )}
                    </Td>
                    <Td className="font-semibold">{r.customerName}</Td>
                    <Td>{r.invoiceDate || "—"}</Td>
                    <Td>{r.invoiceNo || "—"}</Td>
                    <Td className="text-right font-semibold">{inr(due)}</Td>
                    <Td>{r.paymentDate || "—"}</Td>
                    <Td className="text-right font-semibold text-emerald-700">{inr(recv)}</Td>
                    <Td>{r.receiptNo || "—"}</Td>
                    <Td className="text-right">
                      <button onClick={() => startEdit(r)} data-testid={`button-edit-${r.id}`} className="p-1.5 rounded hover:bg-primary/10 text-primary mr-1" aria-label="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm(`Delete entry for ${r.customerName}?`)) remove.mutate(r.id); }} data-testid={`button-delete-${r.id}`} className="p-1.5 rounded hover:bg-destructive/10 text-destructive" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {(adding || editing) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setAdding(false); setEditing(null); }}>
          <div className="bg-card rounded-xl border max-w-2xl w-full p-6 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-bold">{editing ? "Edit Entry" : "New Entry"}</h2>
              <button onClick={() => { setAdding(false); setEditing(null); }} aria-label="Close" className="p-1 rounded hover:bg-secondary"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Customer Name *" full>
                <input type="text" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className={inputCls} data-testid="input-customer-name" />
              </Field>
              <Field label="Invoice Date">
                <input type="date" value={form.invoiceDate} onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })} className={inputCls} data-testid="input-invoice-date" />
              </Field>
              <Field label="Invoice No.">
                <input type="text" value={form.invoiceNo} onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })} className={inputCls} data-testid="input-invoice-no" />
              </Field>
              <Field label="Amount Due (₹)">
                <input type="number" step="0.01" value={form.amountDue} onChange={(e) => setForm({ ...form, amountDue: e.target.value })} className={inputCls} data-testid="input-amount-due" />
              </Field>
              <Field label="Payment Date">
                <input type="date" value={form.paymentDate} onChange={(e) => setForm({ ...form, paymentDate: e.target.value })} className={inputCls} data-testid="input-payment-date" />
              </Field>
              <Field label="Amount Received (₹)">
                <input type="number" step="0.01" value={form.amountReceived} onChange={(e) => setForm({ ...form, amountReceived: e.target.value })} className={inputCls} data-testid="input-amount-received" />
              </Field>
              <Field label="Receipt No.">
                <input type="text" value={form.receiptNo} onChange={(e) => setForm({ ...form, receiptNo: e.target.value })} className={inputCls} data-testid="input-receipt-no" />
              </Field>
              <Field label="Notes" full>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputCls} resize-none`} data-testid="input-notes" />
              </Field>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => { setAdding(false); setEditing(null); }} className="px-4 py-2 rounded-md border border-border text-sm font-semibold hover:bg-secondary">Cancel</button>
              <button onClick={submit} disabled={create.isPending || update.isPending} data-testid="button-save-entry" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 disabled:opacity-60">
                {create.isPending || update.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editing ? "Update Entry" : "Save Entry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

const inputCls = "w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary";

const Field = ({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</label>
    {children}
  </div>
);

const Th = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-foreground/80 ${className}`}>{children}</th>
);

const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 text-sm ${className}`}>{children}</td>
);

const Stat = ({ label, value, tone, testid }: { label: string; value: string; tone: "amber" | "green" | "red"; testid: string }) => {
  const palette =
    tone === "green" ? "border-emerald-500/30 text-emerald-700 dark:text-emerald-400" :
    tone === "red"   ? "border-red-500/30 text-red-700 dark:text-red-400" :
                       "border-amber-500/30 text-amber-700 dark:text-amber-400";
  return (
    <div className={`bg-card border-2 rounded-xl p-4 ${palette}`}>
      <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">{label}</div>
      <div className="font-heading text-2xl font-bold mt-1" data-testid={testid}>{value}</div>
    </div>
  );
};
