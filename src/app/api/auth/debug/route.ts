// src/app/api/auth/debug/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const jar = await cookies();
    const hasCookie = Boolean(jar.get('nb_session')?.value);

    const session = await verifySession();

    return NextResponse.json(
      {
        hasCookie,
        isValid: Boolean(session),
        session: session ? { userId: session.userId, role: session.role } : null,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ hasCookie: false, isValid: false, session: null }, { status: 200 });
  }
}
