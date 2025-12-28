// src/app/api/admin/achievements/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '../../shared/requireAdminApi';

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const item = await prisma.achievement.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item });
}

export async function PUT(req: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as {
    title?: string;
    dateLabel?: string;
    description?: string;
    sortOrder?: number;
    imageUrl?: string | null;
    imagePublicId?: string | null;
  };

  const title = (body.title || '').trim();
  if (!title) {
    return NextResponse.json({ ok: false, error: 'Title is required.' }, { status: 400 });
  }

  await prisma.achievement.update({
    where: { id: params.id },
    data: {
      title,
      dateLabel: body.dateLabel?.trim() || null,
      description: body.description?.trim() || null,
      sortOrder: Number.isFinite(body.sortOrder as number) ? (body.sortOrder as number) : 0,
      imageUrl: body.imageUrl || null,
      imagePublicId: body.imagePublicId || null,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.achievement.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
