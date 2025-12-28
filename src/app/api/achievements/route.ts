// src/app/api/achievements/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.achievement.findMany({
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      select: {
        id: true,
        title: true,
        dateLabel: true,
        description: true,
        sortOrder: true,
        imageUrl: true,
      },
    });

    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to load achievements' }, { status: 500 });
  }
}
