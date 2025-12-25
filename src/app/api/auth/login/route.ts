// src\app\api\auth\login\route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sealData } from 'iron-session';
import { prisma } from '@/lib/prisma';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) throw new Error(`Missing ${name}`);
  return value.trim();
}

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;

    const email = (body.email ?? '').trim().toLowerCase();
    const password = body.password ?? '';

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Missing credentials.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, role: true, passwordHash: true },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const sessionSecret = requireEnv('SESSION_SECRET');

    const token = await sealData({ userId: user.id, role: user.role }, { password: sessionSecret });

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, role: user.role },
    });

    res.cookies.set('nb_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false, message: 'Login failed.' }, { status: 500 });
  }
}
