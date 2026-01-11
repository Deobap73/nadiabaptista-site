// src/app/api/post/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic } from '@/lib/blog/postMapper';
import type { RichTextDoc } from '@/types/blog';
import { PostLang } from '@prisma/client';

export const runtime = 'nodejs';

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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const category = (url.searchParams.get('category') || '').trim().toLowerCase();
    const lang = safeLang(url.searchParams.get('lang'));

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
        translations: {
          where: { lang: { in: [lang, PostLang.pt] } },
          select: { lang: true, title: true, excerpt: true, content: true },
        },
      },
      orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    });

    const data = posts
      .map((p) => {
        const preferred = p.translations.find((t) => t.lang === lang) || null;
        const fallback = p.translations.find((t) => t.lang === PostLang.pt) || null;
        const pick = preferred || fallback;

        if (!pick) return null;

        return mapPostToPublic({
          id: p.id,
          slug: p.slug,
          status: p.status,
          publishedAt: p.publishedAt,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          coverImageUrl: p.coverImageUrl,
          coverImagePublicId: p.coverImagePublicId,
          category: p.category,
          translation: {
            title: pick.title,
            excerpt: pick.excerpt ?? null,
            content: safeDoc(pick.content),
          },
        });
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    return NextResponse.json({ ok: true, posts: data });
  } catch {
    return NextResponse.json({ ok: false, posts: [] }, { status: 500 });
  }
}
