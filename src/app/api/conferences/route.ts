// src/app/api/conferences/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.conferenceSeminar.findMany({
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        dateLabel: true,
        location: true,
        content: true,
        sortOrder: true,
        imageUrl: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to load conferences' }, { status: 500 });
  }
}
