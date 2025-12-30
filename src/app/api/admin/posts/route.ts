// src/app/api/admin/posts/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';
import type { Prisma } from '@prisma/client';

type CreateBody = {
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

type DbCreateContent = Prisma.PostCreateInput['content'];

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

function serializeForDbCreate(doc: Record<string, unknown>): DbCreateContent {
  return JSON.stringify(doc) as unknown as DbCreateContent;
}

async function getCategoryLite(categoryId: string | null): Promise<CategoryLite | null> {
  if (!categoryId) return null;

  const cat = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, name: true, slug: true },
  });

  return cat ? { id: cat.id, name: cat.name, slug: cat.slug } : null;
}

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false }, { status: 401 });

    const posts = await prisma.post.findMany({
      orderBy: [{ updatedAt: 'desc' }],
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

    const categoryIds = Array.from(
      new Set(posts.map((p) => p.categoryId).filter(Boolean))
    ) as string[];

    const categories = categoryIds.length
      ? await prisma.category.findMany({
          where: { id: { in: categoryIds } },
          select: { id: true, name: true, slug: true },
        })
      : [];

    const categoryMap = new Map<string, CategoryLite>();
    for (const c of categories) categoryMap.set(c.id, { id: c.id, name: c.name, slug: c.slug });

    const data = posts.map((p) => {
      const doc = parseRichDoc(p.content);
      const safeDoc = doc || { type: 'doc', content: [{ type: 'paragraph' }] };

      return mapPostToPublic({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: safeDoc,
        status: p.status,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        coverImageUrl: p.coverImageUrl,
        category: p.categoryId ? categoryMap.get(p.categoryId) || null : null,
      });
    });

    return NextResponse.json({ ok: true, posts: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false }, { status: 401 });

    const body = (await req.json()) as CreateBody;

    const title = (body.title || '').trim();
    const slug = normalizeSlug(body.slug || '');

    const doc = parseRichDoc(body.content);

    if (!title || !slug || !doc) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
    if (existing) {
      return NextResponse.json({ ok: false, error: 'Slug already exists' }, { status: 409 });
    }

    const status = body.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    const publishedAt = status === 'PUBLISHED' ? new Date() : null;

    const created = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: body.excerpt ?? null,
        content: serializeForDbCreate(doc),
        status,
        publishedAt,
        categoryId: body.categoryId ?? null,
        coverImageUrl: body.coverImageUrl ?? null,
        coverImagePublicId: body.coverImagePublicId ?? null,
        authorId: session.userId === 'admin' ? null : session.userId,
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

    const category = await getCategoryLite(created.categoryId);

    const createdDoc = parseRichDoc(created.content) || doc;

    const data = mapPostToPublic({
      id: created.id,
      title: created.title,
      slug: created.slug,
      excerpt: created.excerpt,
      content: createdDoc,
      status: created.status,
      publishedAt: created.publishedAt,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      coverImageUrl: created.coverImageUrl,
      category,
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
