// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { sealData } from 'iron-session';

type LoginBody = {
  email?: string;
  password?: string;
};

type SessionPayload = {
  userId: string;
  role: 'ADMIN' | 'CLIENT';
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

    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const payload: SessionPayload = {
      userId: 'admin',
      role: 'ADMIN',
    };

    const token = await sealData(payload, { password: secret });

    const res = NextResponse.json({ ok: true, role: 'admin' as const });

    res.cookies.set('nb_session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
