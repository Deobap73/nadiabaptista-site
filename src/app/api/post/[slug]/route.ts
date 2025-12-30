// src/app/api/post/[slug]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';
import type { Prisma } from '@prisma/client';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

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

    const safeDoc = parseRichDoc(post.content) || getSafeEmptyDoc();

    const data = mapPostToPublic({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: safeDoc,
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
