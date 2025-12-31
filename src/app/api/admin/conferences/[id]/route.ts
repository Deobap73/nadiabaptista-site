// src/app/api/admin/conferences/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '../../shared/requireAdminApi';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const item = await prisma.conferenceSeminar.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item });
}

export async function PUT(req: Request, context: RouteContext) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
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

  if (!body.title?.trim() || !body.slug?.trim()) {
    return NextResponse.json({ ok: false, error: 'Invalid data' }, { status: 400 });
  }

  await prisma.conferenceSeminar.update({
    where: { id },
    data: {
      title: body.title.trim(),
      slug: body.slug.trim(),
      dateLabel: body.dateLabel?.trim() || null,
      location: body.location?.trim() || null,
      content: body.content?.trim() || null,
      sortOrder: Number(body.sortOrder) || 0,
      imageUrl: body.imageUrl || null,
      imagePublicId: body.imagePublicId || null,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, context: RouteContext) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.conferenceSeminar.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
