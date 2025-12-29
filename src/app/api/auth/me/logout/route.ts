// src/app/api/auth/me/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set('nb_session', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });

  return res;
}
