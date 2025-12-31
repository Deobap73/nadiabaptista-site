// src/app/api/admin/shared/requireAdminApi.ts

import { verifySession, type SessionData } from '@/lib/auth/session';

export async function requireAdminApiSession(): Promise<SessionData | null> {
  const session = await verifySession();
  if (!session) return null;
  if (session.role !== 'ADMIN') return null;
  return session;
}

export async function isAdminRequest(): Promise<boolean> {
  const session = await requireAdminApiSession();
  return Boolean(session);
}
