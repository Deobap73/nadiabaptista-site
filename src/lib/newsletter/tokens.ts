// src/lib/newsletter/tokens.ts

import crypto from 'node:crypto';

export function isValidEmail(email: string): boolean {
  const v = (email || '').trim().toLowerCase();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function randomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}

export function sha256Hex(value: string): string {
  const h = crypto.createHash('sha256');
  h.update(value);
  return h.digest('hex');
}
