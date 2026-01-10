// src/lib/http/getBaseUrl.ts

import { headers } from 'next/headers';

function toOrigin(raw: string): string {
  const value = (raw || '').trim();
  if (!value) return '';

  try {
    // If someone sets https://site.com/pt, this returns https://site.com
    return new URL(value).origin;
  } catch {
    // Fallback, remove trailing slashes
    return value.replace(/\/+$/, '');
  }
}

export async function getBaseUrl(): Promise<string> {
  const envUrl = toOrigin(process.env.NEXT_PUBLIC_SITE_URL || '');
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
