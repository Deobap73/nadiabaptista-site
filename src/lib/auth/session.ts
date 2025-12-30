// src/lib/auth/session.ts

import type { SessionOptions } from 'iron-session';

export type SessionData = {
  userId?: string;
  role?: 'ADMIN' | 'CLIENT';
};

function requireEnv(name: string): string {
  const value = (process.env[name] || '').trim();
  if (!value) throw new Error(`Missing ${name} in environment variables.`);
  if (name === 'AUTH_SECRET' && value.length < 32) {
    throw new Error('AUTH_SECRET must have at least 32 characters.');
  }
  return value;
}

export const SESSION_COOKIE_NAME = 'nb_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getSessionOptions(): SessionOptions {
  return {
    password: requireEnv('AUTH_SECRET'),
    cookieName: SESSION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    },
  };
}
