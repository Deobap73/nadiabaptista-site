// src/app/api/admin/conferences/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '../shared/requireAdminApi';

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const items = await prisma.conferenceSeminar.findMany({
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    select: { id: true, title: true, sortOrder: true, updatedAt: true },
  });

  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as {
    title?: string;
    slug?: string;
    dateLabel?: string;
    location?: string;
    content?: string;
    sortOrder?: number;
    imageUrl?: string | null;
    imagePublicId?: string | null;
  };

  const title = (body.title || '').trim();
  const slug = (body.slug || '').trim();

  if (!title) return NextResponse.json({ ok: false, error: 'Title is required.' }, { status: 400 });
  if (!slug) return NextResponse.json({ ok: false, error: 'Slug is required.' }, { status: 400 });

  const created = await prisma.conferenceSeminar.create({
    data: {
      title,
      slug,
      dateLabel: body.dateLabel?.trim() || null,
      location: body.location?.trim() || null,
      content: body.content?.trim() || null,
      sortOrder: Number.isFinite(body.sortOrder as number) ? (body.sortOrder as number) : 0,
      imageUrl: body.imageUrl || null,
      imagePublicId: body.imagePublicId || null,
    },
    select: { id: true },
  });

  return NextResponse.json({ ok: true, id: created.id });
}
