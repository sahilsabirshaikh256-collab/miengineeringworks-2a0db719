import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, Notebook, ChevronRight, Users, Wallet, AlertCircle, IndianRupee } from "lucide-react";
import AdminLayout from "./AdminLayout";
import type { LedgerEntry } from "@shared/schema";

const inr = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
    : "₹0.00";

const num = (s: string | number | null | undefined) =>
  parseFloat(String(s ?? "0").replace(/[^0-9.\-]/g, "")) || 0;

type CustomerSummary = {
  name: string;
  entries: number;
  total: number;
  paid: number;
  pending: number;
};

export default function AdminLedger() {
  const { data: rows = [], isLoading } = useQuery<LedgerEntry[]>({
    queryKey: ["/api/admin/ledger"],
  });
  const [search, setSearch] = useState("");

  const customers: CustomerSummary[] = useMemo(() => {
    const map = new Map<string, CustomerSummary>();
    for (const r of rows) {
      const name = (r.customerName || "").trim();
      if (!name) continue;
      const key = name.toLowerCase();
      const due = num(r.amountDue);
      const recv = num(r.amountReceived);
      const isPaid = due > 0 && recv >= due;
      const cur = map.get(key) || { name, entries: 0, total: 0, paid: 0, pending: 0 };
      cur.entries += 1;
      cur.total += due;
      cur.paid += isPaid ? due : 0;
      cur.pending += isPaid ? 0 : Math.max(0, due - recv);
      map.set(key, cur);
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => c.name.toLowerCase().includes(q));
  }, [customers, search]);

  const totals = useMemo(() => {
    let total = 0, paid = 0, pending = 0;
    for (const c of customers) { total += c.total; paid += c.paid; pending += c.pending; }
    return { total, paid, pending, count: customers.length };
  }, [customers]);

  return (
    <AdminLayout>
      <Helmet><title>Ledger / Khata · Admin</title></Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Notebook className="w-6 h-6 text-primary" /> Ledger / Khata
          </h1>
          <p className="text-sm text-muted-foreground">Click any customer to open their ledger and manage entries.</p>
        </div>
      </div>

      {/* Top totals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat label="Customers" value={String(totals.count)} icon={Users} tone="blue" testid="stat-customers" />
        <Stat label="Total Amount" value={inr(totals.total)} icon={IndianRupee} tone="amber" testid="stat-total" />
        <Stat label="Total Paid" value={inr(totals.paid)} icon={Wallet} tone="green" testid="stat-paid" />
        <Stat label="Total Pending" value={inr(totals.pending)} icon={AlertCircle} tone="red" testid="stat-pending" />
      </div>

      {/* Search */}
      <div className="bg-card border rounded-xl p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customer name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-customer"
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Customer list */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {isLoading && (
          <div className="p-10 text-center text-muted-foreground">Loading…</div>
        )}
        {!isLoading && filtered.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No customers yet. Open any customer's page to add entries — or use{" "}
            <Link to="/admin/ledger/__new" className="text-primary font-semibold hover:underline">
              Add new customer
            </Link>
            .
          </div>
        )}
        {!isLoading && filtered.length > 0 && (
          <ul className="divide-y divide-border">
            {filtered.map((c) => {
              const slug = encodeURIComponent(c.name);
              return (
                <li key={c.name}>
                  <Link
                    to={`/admin/ledger/${slug}`}
                    data-testid={`row-customer-${c.name}`}
                    className="grid grid-cols-12 gap-3 items-center px-4 py-4 hover:bg-secondary/40 transition"
                  >
                    <div className="col-span-12 sm:col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-gold text-charcoal flex items-center justify-center font-bold text-sm shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.entries} {c.entries === 1 ? "entry" : "entries"}</div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3 text-right">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Pending</div>
                      <div className={`font-bold ${c.pending > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                        {inr(c.pending)}
                      </div>
                    </div>
                    <div className="col-span-5 sm:col-span-3 text-right">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Paid</div>
                      <div className="font-bold text-emerald-700 dark:text-emerald-400">{inr(c.paid)}</div>
                    </div>
                    <div className="col-span-1 text-right text-muted-foreground">
                      <ChevronRight className="w-5 h-5 ml-auto" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <Link
          to="/admin/ledger/__new"
          data-testid="link-new-customer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-4 py-2.5 rounded-md hover:opacity-90"
        >
          + Add New Customer
        </Link>
      </div>
    </AdminLayout>
  );
}

const Stat = ({
  label, value, icon: Icon, tone, testid,
}: {
  label: string; value: string; icon: any; tone: "amber" | "green" | "red" | "blue"; testid: string;
}) => {
  const palette =
    tone === "green" ? "border-emerald-500/30 text-emerald-700 dark:text-emerald-400" :
    tone === "red" ? "border-red-500/30 text-red-700 dark:text-red-400" :
    tone === "blue" ? "border-sky-500/30 text-sky-700 dark:text-sky-400" :
    "border-amber-500/30 text-amber-700 dark:text-amber-400";
  return (
    <div className={`bg-card border-2 rounded-xl p-4 ${palette}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">{label}</div>
          <div className="font-heading text-xl md:text-2xl font-bold mt-1" data-testid={testid}>{value}</div>
        </div>
        <Icon className="w-6 h-6 opacity-70" />
      </div>
    </div>
  );
};
