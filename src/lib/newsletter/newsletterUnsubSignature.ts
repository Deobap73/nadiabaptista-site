// src/lib/newsletter/newsletterUnsubSignature.ts

import crypto from 'node:crypto';

function requireEnv(name: string): string {
  const v = (process.env[name] || '').trim();
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function signUnsubscribe(email: string): string {
  const secret = requireEnv('NEWSLETTER_TOKEN_SECRET');
  const h = crypto.createHmac('sha256', secret);
  h.update(email);
  return h.digest('hex');
}

export function verifyUnsubscribe(email: string, sig: string): boolean {
  const expected = signUnsubscribe(email);
  return timingSafeEqual(expected, sig);
}

function timingSafeEqual(a: string, b: string): boolean {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}
