// src/lib/reactions/reactionCookie.ts

import crypto from 'node:crypto';
import type { NextResponse } from 'next/server';

const COOKIE_NAME = 'nb_react_v1';

function randomId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function secretSalt(): string {
  return (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev_secret').trim();
}

export function hashVoterId(voterId: string): string {
  const salt = secretSalt();
  return crypto.createHash('sha256').update(`${salt}:${voterId}`).digest('hex');
}

export function getOrSetVoterId(req: Request, res: NextResponse): string {
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader
    .split(';')
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${COOKIE_NAME}=`));

  const existing = match ? decodeURIComponent(match.split('=').slice(1).join('=')) : '';

  const voterId = existing || randomId();

  if (!existing) {
    const isProd = process.env.NODE_ENV === 'production';

    res.cookies.set(COOKIE_NAME, voterId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return voterId;
}
