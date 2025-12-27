// src/app/api/posts/[slug]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const target = normalizeSlug(slug);

    const post = await prisma.post.findFirst({
      where: { slug: target, status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    const data = mapPostToPublic({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      coverImageUrl: post.coverImageUrl,
      category: post.category,
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
