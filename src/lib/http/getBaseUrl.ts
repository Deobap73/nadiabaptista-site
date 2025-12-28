// src/lib/http/getBaseUrl.ts
import { headers } from 'next/headers';

export async function getBaseUrl() {
  const envUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();

  if (envUrl) return envUrl;

  try {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'http';
    if (host) return `${proto}://${host}`;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao obter headers:', e);
    }
  }

  return 'http://localhost:3000';
}
