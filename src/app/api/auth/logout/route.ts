// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, sessionOptions } from '@/lib/auth/session';

function clearCookie(res: NextResponse, name: string) {
  res.cookies.set(name, '', {
    ...sessionOptions.cookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });
}

export async function POST() {
  const res = NextResponse.json({ ok: true });

  clearCookie(res, SESSION_COOKIE_NAME);

  // Backward compatibility, in case old versions created these
  clearCookie(res, 'nb_role');
  clearCookie(res, 'nb_userId');

  return res;
}
