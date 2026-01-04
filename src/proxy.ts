// src/proxy.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SUPPORTED = ['pt', 'en'] as const;
type Lang = (typeof SUPPORTED)[number];

function normalizeLang(v: string | null): Lang {
  const s = (v || '').trim().toLowerCase();
  if (s.startsWith('en')) return 'en';
  return 'pt';
}

function isPublicFile(pathname: string): boolean {
  return /\.(.*)$/.test(pathname);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/nav') ||
    isPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  const first = pathname.split('/')[1] || '';
  const hasLangPrefix = SUPPORTED.includes(first as Lang);

  const cookieLang = normalizeLang(req.cookies.get('nb_lang')?.value || null);

  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieLang}`;
    return NextResponse.redirect(url);
  }

  if (!hasLangPrefix) {
    const url = req.nextUrl.clone();
    url.pathname = `/${cookieLang}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
