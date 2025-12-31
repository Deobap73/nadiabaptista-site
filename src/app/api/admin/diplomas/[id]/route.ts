// src/app/api/admin/diplomas/[id]/route.ts

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminApi } from '../../shared/requireAdminApi';

export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await context.params;

  const item = await prisma.diploma.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item });
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await context.params;

  const body = (await req.json()) as {
    title?: string;
    issuer?: string;
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

  await prisma.diploma.update({
    where: { id },
    data: {
      title,
      issuer: body.issuer?.trim() || null,
      dateLabel: body.dateLabel?.trim() || null,
      description: body.description?.trim() || null,
      sortOrder: Number.isFinite(body.sortOrder as number) ? (body.sortOrder as number) : 0,
      imageUrl: body.imageUrl || null,
      imagePublicId: body.imagePublicId || null,
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = await context.params;

  await prisma.diploma.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
