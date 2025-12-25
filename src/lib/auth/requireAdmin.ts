// src/lib/auth/requireAdmin.ts

import { cookies } from 'next/headers';
import { unsealData } from 'iron-session';

type SessionPayload = {
  userId?: string;
  role?: 'ADMIN' | 'CLIENT';
};

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('nb_session')?.value;

  if (!token) return null;

  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  try {
    const payload = await unsealData<SessionPayload>(token, {
      password: secret,
    });

    if (!payload.userId || payload.role !== 'ADMIN') return null;

    return payload;
  } catch {
    return null;
  }
}
