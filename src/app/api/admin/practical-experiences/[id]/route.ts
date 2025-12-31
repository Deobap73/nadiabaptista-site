// src/app/api/admin/practical-experiences/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminApi } from '../../shared/requireAdminApi';

export const runtime = 'nodejs';

type RouteContext = {
  params: { id: string };
};

function isUniqueConstraintError(err: unknown) {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: string }).code === 'P2002'
  );
}

export async function GET(_: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = context.params;

  const item = await prisma.practicalExperience.findUnique({ where: { id } });
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
    summary?: string;
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

  try {
    await prisma.practicalExperience.update({
      where: { id },
      data: {
        title,
        slug,
        summary: body.summary?.trim() || null,
        content: body.content?.trim() || null,
        sortOrder: Number.isFinite(body.sortOrder as number) ? (body.sortOrder as number) : 0,
        imageUrl: body.imageUrl || null,
        imagePublicId: body.imagePublicId || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return NextResponse.json({ ok: false, error: 'Slug already exists.' }, { status: 409 });
    }

    return NextResponse.json({ ok: false, error: 'Failed to update item.' }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const { id } = context.params;

  try {
    await prisma.practicalExperience.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to delete item.' }, { status: 500 });
  }
}
