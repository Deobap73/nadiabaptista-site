// src/app/api/auth/me/route.ts

import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await verifySession();

    if (!session) {
      return NextResponse.json({ isAuthenticated: false, role: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        isAuthenticated: true,
        role: session.role === 'ADMIN' ? 'admin' : 'user',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ isAuthenticated: false, role: null }, { status: 200 });
  }
}
