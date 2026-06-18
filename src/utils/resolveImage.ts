const KEY = "mi_image_overrides";

export function resolveImage(
  type: "product" | "industry" | "standard",
  slug: string,
  fallback: string
): string {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const overrides = JSON.parse(raw);
    return overrides[`${type}:${slug}`] || fallback;
  } catch {
    return fallback;
  }
}

export function saveImageOverride(
  type: "product" | "industry" | "standard",
  slug: string,
  url: string
): void {
  try {
    const raw = localStorage.getItem(KEY);
    const overrides = raw ? JSON.parse(raw) : {};
    if (url.trim()) {
      overrides[`${type}:${slug}`] = url.trim();
    } else {
      delete overrides[`${type}:${slug}`];
    }
    localStorage.setItem(KEY, JSON.stringify(overrides));
  } catch {}
}

export function getAllOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
