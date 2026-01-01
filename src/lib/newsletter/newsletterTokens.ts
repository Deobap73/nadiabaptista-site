// src/lib/newsletter/newsletterTokens.ts

import crypto from 'node:crypto';

function requireEnv(name: string): string {
  const v = (process.env[name] || '').trim();
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}

export function hashToken(rawToken: string): string {
  const secret = requireEnv('NEWSLETTER_TOKEN_SECRET');
  const h = crypto.createHash('sha256');
  h.update(secret);
  h.update(':');
  h.update(rawToken);
  return h.digest('hex');
}

export function getConfirmExpiryMs(): number {
  return 1000 * 60 * 60 * 48;
}

export function normalizeEmail(email: string): string {
  return (email || '').trim().toLowerCase();
}
