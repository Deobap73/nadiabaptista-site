// src/app/api/admin/posts/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';

type CreateBody = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  categoryId?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
};

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false }, { status: 401 });

    const posts = await prisma.post.findMany({
      include: { category: { select: { id: true, name: true, slug: true } } },
      orderBy: [{ updatedAt: 'desc' }],
    });

    const data = posts.map((p) =>
      mapPostToPublic({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        status: p.status,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        coverImageUrl: p.coverImageUrl,
        category: p.category,
      })
    );

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
    const content = (body.content || '').trim();

    if (!title || !slug || !content) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const existing = await prisma.post.findUnique({ where: { slug } });
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
        content,
        status,
        publishedAt,
        categoryId: body.categoryId ?? null,
        coverImageUrl: body.coverImageUrl ?? null,
        coverImagePublicId: body.coverImagePublicId ?? null,
        authorId: session.userId === 'admin' ? null : session.userId,
      },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    const data = mapPostToPublic({
      id: created.id,
      title: created.title,
      slug: created.slug,
      excerpt: created.excerpt,
      content: created.content,
      status: created.status,
      publishedAt: created.publishedAt,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      coverImageUrl: created.coverImageUrl,
      category: created.category,
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
