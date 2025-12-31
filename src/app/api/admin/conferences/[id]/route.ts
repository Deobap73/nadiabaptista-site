// src/app/api/admin/conferences/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminApi } from '../../shared/requireAdminApi';

export const runtime = 'nodejs';

type RouteContext = {
  params: { id: string };
};

export async function GET(_: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = context.params;

  const item = await prisma.conferenceSeminar.findUnique({ where: { id } });
  if (!item) {
    return NextResponse.json({ ok: false, error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item });
}

export async function PUT(req: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = context.params;

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

  if (!title || !slug) {
    return NextResponse.json({ ok: false, error: 'Invalid data' }, { status: 400 });
  }

  await prisma.conferenceSeminar.update({
    where: { id },
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
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = context.params;

  await prisma.conferenceSeminar.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
