// src/app/api/admin/posts/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';
import type { Prisma } from '@prisma/client';
import { isAdminRequest } from '@/app/api/admin/shared/requireAdminApi';

type RouteProps = {
  params: Promise<{ id: string }>;
};

type UpdateBody = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: unknown;
  status?: 'DRAFT' | 'PUBLISHED';
  categoryId?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
};

type CategoryLite = { id: string; name: string; slug: string };

type DbUpdateContent = Prisma.PostUpdateInput['content'];

function isDocLikeObject(value: unknown): value is Record<string, unknown> {
  if (!value) return false;
  if (typeof value !== 'object') return false;

  try {
    const raw = JSON.stringify(value);
    return raw.includes('"type"') && raw.includes('"doc"');
  } catch {
    return false;
  }
}

function parseRichDoc(value: unknown): Record<string, unknown> | null {
  if (!value) return null;

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown;
      return isDocLikeObject(parsed) ? (parsed as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }

  if (isDocLikeObject(value)) return value;

  return null;
}

function serializeForDbUpdate(doc: Record<string, unknown>): DbUpdateContent {
  return JSON.stringify(doc) as unknown as DbUpdateContent;
}

async function getCategoryLite(categoryId: string | null): Promise<CategoryLite | null> {
  if (!categoryId) return null;

  const cat = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, name: true, slug: true },
  });

  return cat ? { id: cat.id, name: cat.name, slug: cat.slug } : null;
}

export async function PUT(req: Request, { params }: RouteProps) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = (await req.json()) as UpdateBody;

    const existing = await prisma.post.findUnique({
      where: { id },
      select: { id: true, slug: true, publishedAt: true },
    });

    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    const nextSlug = body.slug ? normalizeSlug(body.slug) : existing.slug;

    if (nextSlug !== existing.slug) {
      const slugTaken = await prisma.post.findUnique({
        where: { slug: nextSlug },
        select: { id: true },
      });

      if (slugTaken) {
        return NextResponse.json({ ok: false, error: 'Slug already exists' }, { status: 409 });
      }
    }

    const nextStatus = body.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    const publishedAt = nextStatus === 'PUBLISHED' ? existing.publishedAt || new Date() : null;

    let nextContentForDb: DbUpdateContent | undefined = undefined;

    if (body.content !== undefined) {
      const doc = parseRichDoc(body.content);
      if (!doc) return NextResponse.json({ ok: false, error: 'Invalid content' }, { status: 400 });
      nextContentForDb = serializeForDbUpdate(doc);
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title.trim() : undefined,
        slug: nextSlug,
        excerpt: body.excerpt !== undefined ? body.excerpt : undefined,
        content: body.content !== undefined ? nextContentForDb : undefined,
        status: nextStatus,
        publishedAt,
        categoryId: body.categoryId !== undefined ? body.categoryId : undefined,
        coverImageUrl: body.coverImageUrl !== undefined ? body.coverImageUrl : undefined,
        coverImagePublicId:
          body.coverImagePublicId !== undefined ? body.coverImagePublicId : undefined,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        coverImageUrl: true,
        categoryId: true,
      },
    });

    const category = await getCategoryLite(updated.categoryId);

    const safeDoc = parseRichDoc(updated.content) || {
      type: 'doc',
      content: [{ type: 'paragraph' }],
    };

    const data = mapPostToPublic({
      id: updated.id,
      title: updated.title,
      slug: updated.slug,
      excerpt: updated.excerpt,
      content: safeDoc,
      status: updated.status,
      publishedAt: updated.publishedAt,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      coverImageUrl: updated.coverImageUrl,
      category,
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.post.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
