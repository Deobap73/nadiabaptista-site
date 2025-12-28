// src/app/api/admin/academic-projects/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminRequest } from '../../shared/requireAdminApi';

type Params = { params: { id: string } };

function isUniqueConstraintError(err: unknown) {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: string }).code === 'P2002'
  );
}

export async function GET(_: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const item = await prisma.academicProject.findUnique({
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
    slug?: string;
    summary?: string;
    content?: string;
    sortOrder?: number;
    imageUrl?: string | null;
    imagePublicId?: string | null;
  };

  const title = (body.title || '').trim();
  const slug = (body.slug || '').trim();

  if (!title) return NextResponse.json({ ok: false, error: 'Title is required.' }, { status: 400 });
  if (!slug) return NextResponse.json({ ok: false, error: 'Slug is required.' }, { status: 400 });

  try {
    await prisma.academicProject.update({
      where: { id: params.id },
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

export async function DELETE(_: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.academicProject.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to delete item.' }, { status: 500 });
  }
}
