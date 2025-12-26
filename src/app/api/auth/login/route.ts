// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;

    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || '';

    const isAdmin = email === adminEmail && password === adminPassword;

    if (!isAdmin) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const sessionValue = crypto.randomUUID();
    const res = NextResponse.json({ ok: true, role: 'admin' as const });

    res.cookies.set('nb_session', sessionValue, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    res.cookies.set('nb_role', 'admin', {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
