// src\app\api\admin\shared\requireAdminApi.ts

import { NextResponse } from 'next/server';
import { verifySession, type SessionData } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function isAdminRequest(): Promise<boolean> {
  const session = await verifySession();
  return Boolean(session && session.role === 'ADMIN');
}

export async function requireAdminApi(): Promise<
  { ok: true; session: SessionData } | NextResponse
> {
  try {
    const session = await verifySession();

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    return { ok: true, session };
  } catch {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
}
