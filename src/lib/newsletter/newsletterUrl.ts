// src/lib/newsletter/newsletterUrl.ts

function getBaseUrl(): string {
  const v = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (v) return v.replace(/\/+$/, '');
  return 'https://nadiabaptista.pt';
}

export function buildPublicUrl(path: string): string {
  const base = getBaseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
