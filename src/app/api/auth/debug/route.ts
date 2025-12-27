// src/app/api/auth/debug/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { unsealData } from 'iron-session';

type SessionPayload = {
  userId?: string;
  role?: 'ADMIN' | 'CLIENT';
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('nb_session')?.value || null;

  const secret = process.env.SESSION_SECRET || null;

  if (!token) {
    return NextResponse.json(
      { hasCookie: false, canUnseal: false, payload: null },
      { status: 200 }
    );
  }

  if (!secret) {
    return NextResponse.json(
      { hasCookie: true, canUnseal: false, payload: null, error: 'Missing SESSION_SECRET' },
      { status: 200 }
    );
  }

  try {
    const payload = await unsealData<SessionPayload>(token, { password: secret });
    return NextResponse.json({ hasCookie: true, canUnseal: true, payload }, { status: 200 });
  } catch {
    return NextResponse.json({ hasCookie: true, canUnseal: false, payload: null }, { status: 200 });
  }
}
