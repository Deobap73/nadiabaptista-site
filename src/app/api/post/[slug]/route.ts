// src/app/api/post/[slug]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';
import type { RichTextDoc } from '@/types/blog';
import { PostLang } from '@prisma/client';

export const runtime = 'nodejs';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

function safeLang(value: string | null): PostLang {
  return value === 'en' ? PostLang.en : PostLang.pt;
}

function isDocLike(value: unknown): value is RichTextDoc {
  return (
    Boolean(value) && typeof value === 'object' && (value as { type?: unknown }).type === 'doc'
  );
}

const EMPTY_DOC: RichTextDoc = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

function safeDoc(value: unknown): RichTextDoc {
  return isDocLike(value) ? value : EMPTY_DOC;
}

export async function GET(req: Request, { params }: RouteProps) {
  try {
    const url = new URL(req.url);
    const lang = safeLang(url.searchParams.get('lang'));

    const { slug } = await params;
    const target = normalizeSlug(slug);

    const post = await prisma.post.findFirst({
      where: { slug: target, status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        translations: {
          where: { lang: { in: [lang, PostLang.pt] } },
          select: { lang: true, title: true, excerpt: true, content: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    const preferred = post.translations.find((t) => t.lang === lang) || null;
    const fallback = post.translations.find((t) => t.lang === PostLang.pt) || null;
    const pick = preferred || fallback;

    if (!pick) {
      return NextResponse.json({ ok: false, error: 'Missing translation' }, { status: 404 });
    }

    const data = mapPostToPublic({
      id: post.id,
      slug: post.slug,
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      coverImageUrl: post.coverImageUrl,
      coverImagePublicId: post.coverImagePublicId,
      category: post.category,
      translation: {
        title: pick.title,
        excerpt: pick.excerpt ?? null,
        content: safeDoc(pick.content),
      },
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
