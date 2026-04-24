import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Calculator, Sun, Moon, RotateCcw, Printer } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Material = "MS" | "SS";

// Density (g/cc) used for the per-piece weight formula:
//  weight (kg) = D * D * L * 0.0063 / 1000
// 0.0063 corresponds to mild steel (~7.85 g/cc).
// For SS304/SS316 (~7.93 g/cc) the multiplier is ~0.00637.
const MATERIAL_FACTOR: Record<Material, number> = {
  MS: 0.0063,
  SS: 0.00637,
};

const fmt = (n: number, d = 3) =>
  Number.isFinite(n) ? n.toLocaleString("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d > 2 ? 2 : 0 }) : "0";

const fmtINR = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
    : "₹0.00";

const CalculatorPage = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    (typeof window !== "undefined" && localStorage.getItem("calc_theme") === "light") ? "light" : "dark"
  );
  useEffect(() => {
    localStorage.setItem("calc_theme", theme);
  }, [theme]);

  const [material, setMaterial] = useState<Material>("MS");
  const [diameter, setDiameter] = useState<string>("16"); // mm
  const [length, setLength] = useState<string>("100");    // mm
  const [qty, setQty] = useState<string>("100");
  const [ratePerKg, setRatePerKg] = useState<string>("120");
  const [profit, setProfit] = useState<string>("15");      // %
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [gstRate, setGstRate] = useState<string>("18");    // %

  const D = parseFloat(diameter) || 0;
  const L = parseFloat(length) || 0;
  const Q = parseFloat(qty) || 0;
  const R = parseFloat(ratePerKg) || 0;
  const P = parseFloat(profit) || 0;
  const G = parseFloat(gstRate) || 0;

  const calc = useMemo(() => {
    const factor = MATERIAL_FACTOR[material];
    const weightPerPiece = (D * D * L * factor) / 1000; // kg
    const totalWeight = weightPerPiece * Q;             // kg
    const baseCost = totalWeight * R;                   // ₹
    const profitAmt = baseCost * (P / 100);
    const subtotal = baseCost + profitAmt;
    const gstAmt = includeGst ? subtotal * (G / 100) : 0;
    const grandTotal = subtotal + gstAmt;
    const ratePerPiece = Q > 0 ? grandTotal / Q : 0;
    return { weightPerPiece, totalWeight, baseCost, profitAmt, subtotal, gstAmt, grandTotal, ratePerPiece };
  }, [D, L, Q, R, P, G, includeGst, material]);

  const reset = () => {
    setMaterial("MS");
    setDiameter("16"); setLength("100"); setQty("100");
    setRatePerKg("120"); setProfit("15"); setIncludeGst(true); setGstRate("18");
  };

  const isDark = theme === "dark";
  const wrap = isDark
    ? "bg-[#0c0c0c] text-yellow-50"
    : "bg-yellow-50 text-neutral-900";
  const cardBase = isDark
    ? "bg-[#161616] border border-yellow-400/30"
    : "bg-white border border-neutral-200 shadow-md";
  const inputBase = isDark
    ? "bg-[#0c0c0c] border-yellow-400/30 text-yellow-50 placeholder:text-yellow-100/40 focus:border-yellow-400"
    : "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-yellow-500";
  const labelBase = isDark ? "text-yellow-100/80" : "text-neutral-700";
  const accent = isDark ? "text-yellow-400" : "text-yellow-700";
  const stripe = isDark ? "border-b border-yellow-400/15" : "border-b border-neutral-200";

  return (
    <div className={`min-h-screen flex flex-col ${wrap} transition-colors`}>
      <Helmet>
        <title>Fasteners Weight & Rate Calculator | M.I. Engineering Works</title>
        <meta name="description" content="Industrial weight & rate calculator for MS / SS fasteners — diameter, length, quantity, profit % and GST. Built by M.I. Engineering Works, Mumbai." />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="container py-10 md:py-14">
          {/* Header strip */}
          <div className={`flex flex-wrap items-center justify-between gap-3 mb-8 pb-5 ${stripe}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-md flex items-center justify-center ${isDark ? "bg-yellow-400 text-black" : "bg-yellow-500 text-black"} shadow-md`}>
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide">
                  Fasteners Weight & Rate Calculator
                </h1>
                <p className={`text-xs md:text-sm ${isDark ? "text-yellow-100/60" : "text-neutral-600"}`}>
                  Industrial-grade tool · Mild Steel (MS) & Stainless Steel (SS) · GST-aware
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                data-testid="button-toggle-theme"
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase px-3 py-2 rounded border ${isDark ? "border-yellow-400/40 hover:bg-yellow-400/10" : "border-neutral-400 hover:bg-neutral-100"}`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? "Light" : "Dark"}
              </button>
              <button
                onClick={reset}
                data-testid="button-reset"
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase px-3 py-2 rounded border ${isDark ? "border-yellow-400/40 hover:bg-yellow-400/10" : "border-neutral-400 hover:bg-neutral-100"}`}
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <button
                onClick={() => window.print()}
                data-testid="button-print"
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase px-3 py-2 rounded ${isDark ? "bg-yellow-400 text-black hover:bg-yellow-300" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
              >
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Inputs */}
            <div className={`${cardBase} rounded-xl p-6`}>
              <h2 className={`font-heading text-lg font-bold uppercase tracking-wider mb-5 ${accent}`}>Inputs</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Material" labelCls={labelBase}>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value as Material)}
                    data-testid="select-material"
                    className={`w-full rounded-md border px-3 py-2.5 text-sm font-semibold uppercase ${inputBase}`}
                  >
                    <option value="MS">MS — Mild Steel</option>
                    <option value="SS">SS — Stainless Steel</option>
                  </select>
                </Field>

                <Field label="Quantity (pcs)" labelCls={labelBase}>
                  <input
                    type="number" min="0" inputMode="numeric"
                    value={qty} onChange={(e) => setQty(e.target.value)}
                    data-testid="input-qty"
                    className={`w-full rounded-md border px-3 py-2.5 text-sm ${inputBase}`}
                  />
                </Field>

                <Field label="Diameter D (mm)" labelCls={labelBase}>
                  <input
                    type="number" min="0" step="0.1"
                    value={diameter} onChange={(e) => setDiameter(e.target.value)}
                    data-testid="input-diameter"
                    className={`w-full rounded-md border px-3 py-2.5 text-sm ${inputBase}`}
                  />
                </Field>

                <Field label="Length L (mm)" labelCls={labelBase}>
                  <input
                    type="number" min="0" step="0.1"
                    value={length} onChange={(e) => setLength(e.target.value)}
                    data-testid="input-length"
                    className={`w-full rounded-md border px-3 py-2.5 text-sm ${inputBase}`}
                  />
                </Field>

                <Field label="Rate per Kg (₹)" labelCls={labelBase}>
                  <input
                    type="number" min="0" step="0.01"
                    value={ratePerKg} onChange={(e) => setRatePerKg(e.target.value)}
                    data-testid="input-rate"
                    className={`w-full rounded-md border px-3 py-2.5 text-sm ${inputBase}`}
                  />
                </Field>

                <Field label="Profit %" labelCls={labelBase}>
                  <input
                    type="number" min="0" step="0.1"
                    value={profit} onChange={(e) => setProfit(e.target.value)}
                    data-testid="input-profit"
                    className={`w-full rounded-md border px-3 py-2.5 text-sm ${inputBase}`}
                  />
                </Field>
              </div>

              <div className={`mt-5 flex flex-wrap items-center justify-between gap-3 pt-5 border-t ${isDark ? "border-yellow-400/15" : "border-neutral-200"}`}>
                <label className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeGst}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    data-testid="checkbox-gst"
                    className="w-4 h-4 accent-yellow-500"
                  />
                  Add GST
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${labelBase}`}>GST %</span>
                  <input
                    type="number" min="0" step="0.1" disabled={!includeGst}
                    value={gstRate} onChange={(e) => setGstRate(e.target.value)}
                    data-testid="input-gst-rate"
                    className={`w-20 rounded-md border px-2 py-1.5 text-sm font-semibold ${inputBase} disabled:opacity-50`}
                  />
                  <span className="text-xs">%</span>
                </div>
              </div>

              <p className={`mt-4 text-[11px] leading-relaxed ${isDark ? "text-yellow-100/50" : "text-neutral-500"}`}>
                Formula: Weight (kg) = D × D × L × {MATERIAL_FACTOR[material].toFixed(5)} / 1000
                <br />Density factor switches automatically with material (MS / SS).
              </p>
            </div>

            {/* Results */}
            <div className={`${cardBase} rounded-xl p-6`}>
              <h2 className={`font-heading text-lg font-bold uppercase tracking-wider mb-5 ${accent}`}>Results</h2>

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Weight / piece" value={`${fmt(calc.weightPerPiece, 4)} kg`} dark={isDark} testid="result-weight-piece" />
                <Stat label="Total weight" value={`${fmt(calc.totalWeight, 3)} kg`} dark={isDark} testid="result-total-weight" />
                <Stat label="Base cost" value={fmtINR(calc.baseCost)} dark={isDark} testid="result-base-cost" />
                <Stat label={`Profit (${P}%)`} value={fmtINR(calc.profitAmt)} dark={isDark} testid="result-profit" />
                <Stat label="Subtotal" value={fmtINR(calc.subtotal)} dark={isDark} testid="result-subtotal" />
                <Stat label={includeGst ? `GST (${G}%)` : "GST (off)"} value={fmtINR(calc.gstAmt)} dark={isDark} testid="result-gst" />
              </div>

              <div className={`mt-5 rounded-lg p-5 ${isDark ? "bg-yellow-400 text-black" : "bg-yellow-500 text-black"} shadow-lg`}>
                <div className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-80">Grand Total</div>
                <div className="font-heading text-3xl md:text-4xl font-extrabold mt-1" data-testid="result-grand-total">
                  {fmtINR(calc.grandTotal)}
                </div>
                <div className="text-xs font-semibold mt-1 opacity-90" data-testid="result-rate-piece">
                  Rate / piece: {fmtINR(calc.ratePerPiece)}
                </div>
              </div>

              <div className={`mt-4 text-[11px] ${isDark ? "text-yellow-100/50" : "text-neutral-500"}`}>
                M.I. Engineering Works · GSTIN 27CBFPM8207D1ZR · Mumbai
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Field = ({ label, children, labelCls }: { label: string; children: React.ReactNode; labelCls: string }) => (
  <div>
    <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${labelCls}`}>{label}</label>
    {children}
  </div>
);

const Stat = ({ label, value, dark, testid }: { label: string; value: string; dark: boolean; testid: string }) => (
  <div className={`rounded-md p-3 ${dark ? "bg-[#0c0c0c] border border-yellow-400/15" : "bg-neutral-100 border border-neutral-200"}`}>
    <div className={`text-[10px] uppercase tracking-wider font-semibold ${dark ? "text-yellow-100/60" : "text-neutral-600"}`}>{label}</div>
    <div className={`mt-1 font-heading text-base md:text-lg font-bold ${dark ? "text-yellow-50" : "text-neutral-900"}`} data-testid={testid}>{value}</div>
  </div>
);

export default CalculatorPage;
