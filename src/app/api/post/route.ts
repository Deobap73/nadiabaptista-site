// src/app/api/posts/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic } from '@/lib/blog/postMapper';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const category = (url.searchParams.get('category') || '').trim().toLowerCase();

    const posts = await prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        ...(category
          ? {
              category: {
                is: { slug: category },
              },
            }
          : {}),
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
      orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
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
    return NextResponse.json({ ok: false, posts: [] }, { status: 500 });
  }
}
