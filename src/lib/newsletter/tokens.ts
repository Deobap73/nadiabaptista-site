// src/lib/newsletter/tokens.ts

import crypto from 'crypto';

export function randomToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function isValidEmail(email: string): boolean {
  const v = email.trim().toLowerCase();
  if (!v) return false;
  if (v.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
