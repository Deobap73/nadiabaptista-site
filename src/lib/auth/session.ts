// src/lib/auth/session.ts

import type { SessionOptions } from 'iron-session';

export const SESSION_COOKIE_NAME = 'nb_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionData = {
  userId?: string;
  role?: 'ADMIN' | 'CLIENT';
};

function requireEnv(name: string): string {
  const value = (process.env[name] || '').trim();
  if (!value) throw new Error(`Missing ${name} in environment variables.`);
  return value;
}

function getCookieDomain() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) return undefined;

  const domain = (process.env.SESSION_COOKIE_DOMAIN || '').trim();
  return domain || undefined;
}

export function getSessionOptions(): SessionOptions {
  const isProd = process.env.NODE_ENV === 'production';
  const domain = getCookieDomain();

  return {
    password: requireEnv('AUTH_SECRET'),
    cookieName: SESSION_COOKIE_NAME,
    cookieOptions: {
      secure: isProd,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain,
    },
  };
}
