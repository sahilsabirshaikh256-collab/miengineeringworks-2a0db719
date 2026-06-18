export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  sortOrder: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  standard: string;
  description: string;
  sizes: string;
  threads: string;
  length: string;
  material: string;
  finish: string[];
  grades: string[];
  applications: string[];
  dimensions: { label: string; value: string }[];
}

export interface Industry {
  id: number;
  slug: string;
  name: string;
  description: string;
  heroDescription: string;
  image: string;
  grades: { grade: string; specification: string; usage: string }[];
  applications: { name: string; description: string; image: string }[];
  keyRequirements: string[];
  recommendedProductSlugs?: string[];
}

export interface Standard {
  id: number;
  slug: string;
  code: string;
  name: string;
  region: string;
  description: string;
  image: string;
  scope: string;
  applications: string[];
  materials: string[];
  examples: string[];
}

export interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  message: string;
  createdAt: string;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

const TOKEN_KEY = "mi_admin_token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Base URL for all API calls.
 * In development: empty string → Vite proxy forwards /api/* to localhost:3001
 * In cPanel / standalone production: set VITE_API_BASE_URL=https://api.yourdomain.com
 * In Vercel / same-origin: leave unset (relative paths work)
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export async function api<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = API_BASE + path;
  const res = await fetch(url, { ...opts, headers });

  if (!res.ok) {
    if ((res.status === 401 || res.status === 403) && path.startsWith("/api/admin")) {
      clearToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin/login")) {
        window.dispatchEvent(new CustomEvent("mi-auth-expired"));
      }
      const err = await res.json().catch(() => ({}));
      throw new AuthError(err.error || `Unauthorized (${res.status})`, res.status);
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function uploadFile(file: File): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/api/admin/upload`, {
    method: "POST",
    body: fd,
    headers,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
