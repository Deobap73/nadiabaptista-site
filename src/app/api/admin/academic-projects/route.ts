// src/app/api/admin/academic-projects/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminApi } from '../shared/requireAdminApi';
import {
  createNewsletterEventIfMissing,
  deliverNewsletterEvent,
} from '@/lib/newsletter/newsletterService';

export const runtime = 'nodejs';

function isUniqueConstraintError(err: unknown) {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: string }).code === 'P2002'
  );
}

export async function GET() {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

  const items = await prisma.academicProject.findMany({
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    select: { id: true, title: true, sortOrder: true, updatedAt: true },
  });

  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (auth instanceof NextResponse) return auth;

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
    const created = await prisma.academicProject.create({
      data: {
        title,
        slug,
        summary: body.summary?.trim() || null,
        content: body.content?.trim() || null,
        sortOrder: Number.isFinite(body.sortOrder as number) ? (body.sortOrder as number) : 0,
        imageUrl: body.imageUrl || null,
        imagePublicId: body.imagePublicId || null,
      },
      select: { id: true },
    });

    const ev = await createNewsletterEventIfMissing({
      kind: 'ACADEMIC_PROJECT',
      entityId: created.id,
      title,
      urlPath: `/studies/academic-projects/${slug}`,
    });

    if (ev.ok) {
      await deliverNewsletterEvent(ev.eventId);
    }

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return NextResponse.json({ ok: false, error: 'Slug already exists.' }, { status: 409 });
    }

    return NextResponse.json({ ok: false, error: 'Failed to create item.' }, { status: 500 });
  }
}
