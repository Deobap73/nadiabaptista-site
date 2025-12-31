// src/app/api/auth/me/route.ts

import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await verifySession();

    if (!session) {
      return NextResponse.json({ ok: true, isAuthenticated: false, role: null });
    }

    return NextResponse.json({
      ok: true,
      isAuthenticated: true,
      role: session.role === 'ADMIN' ? 'admin' : 'user',
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
