// src/lib/auth/session.ts

import type { SessionOptions } from 'iron-session';

export type SessionData = {
  userId?: string;
  role?: 'ADMIN' | 'CLIENT';
};

function requireEnv(name: string): string {
  const value = (process.env[name] || '').trim();
  if (!value) throw new Error(`Missing ${name} in environment variables.`);
  return value;
}

export const sessionOptions: SessionOptions = {
  password: requireEnv('AUTH_SECRET'),
  cookieName: 'nb_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
};
