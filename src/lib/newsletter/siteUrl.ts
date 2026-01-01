// src/lib/newsletter/siteUrl.ts

function normalizeUrl(raw: string): string {
  const v = (raw || '').trim();
  if (!v) return 'https://nadiabaptista.pt';
  if (v.startsWith('http://') || v.startsWith('https://')) return v;
  return `https://${v}`;
}

export function getPublicSiteUrl(): string {
  const fromEnv =
    (process.env.NEXT_PUBLIC_SITE_URL || '').trim() || (process.env.SITE_URL || '').trim();

  return normalizeUrl(fromEnv || 'https://nadiabaptista.pt');
}

export function joinUrl(base: string, path: string): string {
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}
