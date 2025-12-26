// src/proxy.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const role = req.cookies.get('nb_role')?.value || '';
  const session = req.cookies.get('nb_session')?.value || '';

  const isAdmin = Boolean(session) && role === 'admin';

  if (isAdmin) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
