// src/lib/auth/session.ts

import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'nb_session';

type SessionRole = 'ADMIN' | 'USER';

export type SessionData = {
  userId: string;
  role: SessionRole;
};

type TokenPayload = {
  uid: string;
  role: SessionRole;
  iat: number;
  exp: number;
};

function getSecret(): string {
  const secret = (process.env.SESSION_SECRET || '').trim();
  if (!secret) throw new Error('Missing SESSION_SECRET');
  return secret;
}

function getMaxAgeSeconds(): number {
  const raw = (process.env.SESSION_MAX_AGE_DAYS || '').trim();
  const days = raw ? Number(raw) : 7;
  const safeDays = Number.isFinite(days) && days > 0 ? days : 7;
  return safeDays * 24 * 60 * 60;
}

/**
 * Important:
 * We keep "." exclusively as the token separator.
 * So we must never output "." inside base64url parts.
 *
 * We map:
 * "+" -> "~"
 * "/" -> "_"
 * and strip "=" padding.
 */
function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8')
    .toString('base64')
    .replace(/\+/g, '~')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(input: string): string {
  const normalized = input.replace(/~/g, '+').replace(/_/g, '/');
  const padLen = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(padLen);
  return Buffer.from(padded, 'base64').toString('utf8');
}

function sign(input: string, secret: string): string {
  const digest = createHmac('sha256', secret).update(input).digest('base64');
  return digest.replace(/\+/g, '~').replace(/\//g, '_').replace(/=+$/g, '');
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, 'utf8');
  const bBuf = Buffer.from(b, 'utf8');
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function buildToken(payload: TokenPayload): string {
  const secret = getSecret();
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'NB' }));
  const body = base64UrlEncode(JSON.stringify(payload));
  const content = `${header}.${body}`;
  const signature = sign(content, secret);
  return `${content}.${signature}`;
}

function parseToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = parts[0] || '';
    const body = parts[1] || '';
    const signature = parts[2] || '';

    const secret = getSecret();
    const content = `${header}.${body}`;
    const expected = sign(content, secret);

    if (!safeEqual(signature, expected)) return null;

    const payloadRaw = base64UrlDecode(body);
    const payload = JSON.parse(payloadRaw) as TokenPayload;

    if (!payload || typeof payload !== 'object') return null;
    if (!payload.uid || !payload.role || !payload.iat || !payload.exp) return null;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(data: SessionData): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const maxAge = getMaxAgeSeconds();

  const payload: TokenPayload = {
    uid: data.userId,
    role: data.role,
    iat: now,
    exp: now + maxAge,
  };

  const token = buildToken(payload);

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });

  jar.set('nb_role', '', { path: '/', maxAge: 0 });
}

export async function verifySession(): Promise<SessionData | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value || '';
  if (!token) return null;

  const payload = parseToken(token);
  if (!payload) return null;

  return { userId: payload.uid, role: payload.role };
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  jar.set('nb_role', '', { path: '/', maxAge: 0 });
}
