// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { clearSession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
