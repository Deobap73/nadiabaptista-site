// src/app/api/admin/achievements/[id]/route.ts

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
  const item = await prisma.achievement.findUnique({ where: { id } });

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
    dateLabel?: string;
    description?: string;
    sortOrder?: number;
    imageUrl?: string | null;
    imagePublicId?: string | null;
  };

  if (!body.title?.trim()) {
    return NextResponse.json({ ok: false, error: 'Title is required.' }, { status: 400 });
  }

  await prisma.achievement.update({
    where: { id },
    data: {
      title: body.title.trim(),
      dateLabel: body.dateLabel?.trim() || null,
      description: body.description?.trim() || null,
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
  await prisma.achievement.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
