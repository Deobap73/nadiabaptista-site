// src/app/api/admin/posts/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';

type RouteProps = {
  params: Promise<{ id: string }>;
};

type UpdateBody = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  categoryId?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
};

export async function PUT(req: Request, { params }: RouteProps) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false }, { status: 401 });

    const { id } = await params;
    const body = (await req.json()) as UpdateBody;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    const nextSlug = body.slug ? normalizeSlug(body.slug) : existing.slug;

    if (nextSlug !== existing.slug) {
      const slugTaken = await prisma.post.findUnique({ where: { slug: nextSlug } });
      if (slugTaken) {
        return NextResponse.json({ ok: false, error: 'Slug already exists' }, { status: 409 });
      }
    }

    const nextStatus = body.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    const publishedAt = nextStatus === 'PUBLISHED' ? existing.publishedAt || new Date() : null;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title.trim() : undefined,
        slug: nextSlug,
        excerpt: body.excerpt !== undefined ? body.excerpt : undefined,
        content: body.content !== undefined ? body.content : undefined,
        status: nextStatus,
        publishedAt,
        categoryId: body.categoryId !== undefined ? body.categoryId : undefined,
        coverImageUrl: body.coverImageUrl !== undefined ? body.coverImageUrl : undefined,
        coverImagePublicId:
          body.coverImagePublicId !== undefined ? body.coverImagePublicId : undefined,
      },
      include: { category: { select: { id: true, name: true, slug: true } } },
    });

    const data = mapPostToPublic({
      id: updated.id,
      title: updated.title,
      slug: updated.slug,
      excerpt: updated.excerpt,
      content: updated.content,
      status: updated.status,
      publishedAt: updated.publishedAt,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      coverImageUrl: updated.coverImageUrl,
      category: updated.category,
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteProps) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false }, { status: 401 });

    const { id } = await params;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
