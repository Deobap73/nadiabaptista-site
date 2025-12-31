// src\app\api\admin\shared\requireAdminApi.ts

import { verifySession } from '@/lib/auth/session';

export async function isAdminRequest(): Promise<boolean> {
  const session = await verifySession();
  if (!session) return false;
  return session.role === 'ADMIN';
}
