// src/app/api/posts/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic } from '@/lib/blog/postMapper';
import type { Prisma } from '@prisma/client';

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

function parseRichDoc(value: Prisma.JsonValue): Record<string, unknown> | null {
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

function getSafeEmptyDoc(): Record<string, unknown> {
  return { type: 'doc', content: [{ type: 'paragraph' }] };
}

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

    const data = posts.map((p) => {
      const safeDoc = parseRichDoc(p.content) || getSafeEmptyDoc();

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
        category: p.category,
      });
    });

    return NextResponse.json({ ok: true, posts: data });
  } catch {
    return NextResponse.json({ ok: false, posts: [] }, { status: 500 });
  }
}
