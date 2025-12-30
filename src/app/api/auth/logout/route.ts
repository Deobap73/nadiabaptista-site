// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { getSessionOptions, SESSION_COOKIE_NAME } from '@/lib/auth/session';

export const runtime = 'nodejs';

function clearCookie(res: NextResponse, name: string) {
  const opts = getSessionOptions();

  res.cookies.set(name, '', {
    ...opts.cookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });
}

export async function POST() {
  const res = NextResponse.json({ ok: true });

  clearCookie(res, SESSION_COOKIE_NAME);

  clearCookie(res, 'nb_role');
  clearCookie(res, 'nb_userId');

  return res;
}
