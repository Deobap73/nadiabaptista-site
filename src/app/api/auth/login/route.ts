// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { sealData } from 'iron-session';
import {
  getSessionOptions,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from '@/lib/auth/session';

export const runtime = 'nodejs';

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

    const secret = (process.env.AUTH_SECRET || '').trim();
    if (!secret || secret.length < 32) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const payload: SessionPayload = {
      userId: 'admin',
      role: 'ADMIN',
    };

    const token = await sealData(payload, { password: secret });

    const res = NextResponse.json({ ok: true, role: 'admin' as const });

    const opts = getSessionOptions();

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      ...opts.cookieOptions,
      maxAge: SESSION_MAX_AGE_SECONDS,
      expires: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
    });

    return res;
  } catch (err) {
    console.error('api auth login error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
