// src/lib/auth/requireAdmin.ts

import { redirect } from 'next/navigation';
import { verifySession, type SessionData } from './session';

export async function requireAdmin(): Promise<SessionData> {
  const session = await verifySession();

  if (!session) {
    redirect('/login');
  }

  if (session.role !== 'ADMIN') {
    redirect('/login');
  }

  return session;
}
