import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "@/lib/api";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api<{ token: string }>("/api/admin/login", { method: "POST", body: JSON.stringify({ username: u, password: p }) });
      setToken(res.token);
      nav("/admin");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-6">
      <form onSubmit={submit} className="bg-card rounded-xl shadow-elegant p-8 w-full max-w-md border border-border">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-charcoal" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">M.I. Engineering Works content panel</p>
        </div>
        <label className="block mb-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email</span>
          <input type="email" value={u} onChange={(e) => setU(e.target.value)} required data-testid="input-username" placeholder="miengineering17@gmail.com"
            className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <label className="block mb-5">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Password</span>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} required data-testid="input-password"
            className="mt-1 w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </label>
        <button type="submit" disabled={busy} data-testid="button-login"
          className="w-full bg-gradient-gold text-charcoal font-semibold py-2.5 rounded-md hover:opacity-90 transition disabled:opacity-60">
          {busy ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-xs text-muted-foreground mt-4 text-center">Default: <code className="bg-secondary px-1 rounded">miengineering17@gmail.com</code> / <code className="bg-secondary px-1 rounded">6392</code></p>
      </form>
    </div>
  );
};

export default AdminLogin;
