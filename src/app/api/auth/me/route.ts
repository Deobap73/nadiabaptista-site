// src/app/api/auth/me/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSessionUserFromCookieString } from '@/lib/auth/getSessionUser';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore
      .getAll()
      .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
      .join('; ');

    const user = getSessionUserFromCookieString(cookieString);

    return NextResponse.json({
      isAuthenticated: user?.isAuthenticated ?? false,
      role: user?.role ?? null,
    });
  } catch {
    return NextResponse.json({ isAuthenticated: false, role: null }, { status: 200 });
  }
}
