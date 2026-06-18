import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, getToken, clearToken, AuthError } from "@/lib/api";

const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 1500;

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<"checking" | "ok" | "denied">("checking");
  const navigate = useNavigate();
  const attemptsRef = useRef(0);

  useEffect(() => {
    const t = getToken();
    if (!t) { setState("denied"); return; }

    let cancelled = false;

    async function verify() {
      try {
        await api("/api/admin/verify");
        if (!cancelled) setState("ok");
      } catch (err) {
        if (cancelled) return;

        if (err instanceof AuthError) {
          clearToken();
          setState("denied");
          return;
        }

        attemptsRef.current += 1;
        if (attemptsRef.current < MAX_RETRIES) {
          setTimeout(() => { if (!cancelled) verify(); }, RETRY_DELAY_MS);
        } else {
          clearToken();
          setState("denied");
        }
      }
    }

    verify();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      setState("denied");
      navigate("/admin/login", { replace: true });
    };
    window.addEventListener("mi-auth-expired", handleExpired);
    return () => window.removeEventListener("mi-auth-expired", handleExpired);
  }, [navigate]);

  if (state === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-primary-foreground/70 text-sm">Connecting to server…</div>
        </div>
      </div>
    );
  }
  if (state === "denied") return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

export default RequireAdmin;
