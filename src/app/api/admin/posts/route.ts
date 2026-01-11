// src/app/api/admin/posts/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic } from '@/lib/blog/postMapper';
import { isAdminRequest } from '../shared/requireAdminApi';
import type { RichTextDoc } from '@/types/blog';
import { PostLang } from '@prisma/client';

export const runtime = 'nodejs';

type TranslationInput = {
  title?: string;
  excerpt?: string | null;
  content?: unknown;
};

type CreateBody = {
  slug?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  categoryId?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
  translations?: {
    pt?: TranslationInput;
    en?: TranslationInput;
  };
};

const EMPTY_DOC: RichTextDoc = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

function isDocLike(value: unknown): value is RichTextDoc {
  return (
    Boolean(value) && typeof value === 'object' && (value as { type?: unknown }).type === 'doc'
  );
}

function safeDocOrNull(value: unknown): RichTextDoc | null {
  if (!value) return null;
  if (isDocLike(value)) return value;
  return null;
}

function hasAnyText(doc: RichTextDoc | null): boolean {
  if (!doc) return false;

  try {
    const raw = JSON.stringify(doc);
    if (!raw.includes('"text"')) return false;

    const matches = raw.match(/"text"\s*:\s*"(.*?)"/g) || [];
    const joined = matches
      .join(' ')
      .replace(/"text"\s*:\s*"/g, '')
      .replace(/"/g, '')
      .trim();

    return joined.length > 0;
  } catch {
    return false;
  }
}

function normalizeSlug(value: string): string {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '');
}

function mapDbTranslationsToApi(
  translations: Array<{ lang: PostLang; title: string; excerpt: string | null; content: unknown }>
): Array<{ lang: 'pt' | 'en'; title: string; excerpt: string | null; content: RichTextDoc }> {
  return translations.map((t) => {
    const lang: 'pt' | 'en' = t.lang === PostLang.en ? 'en' : 'pt';

    return {
      lang,
      title: t.title,
      excerpt: t.excerpt ?? null,
      content: isDocLike(t.content) ? (t.content as RichTextDoc) : EMPTY_DOC,
    };
  });
}

export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      orderBy: [{ updatedAt: 'desc' }],
      include: {
        category: { select: { id: true, name: true, slug: true } },
        translations: { select: { lang: true, title: true, excerpt: true, content: true } },
      },
    });

    const data = posts
      .map((p) => {
        const pt = p.translations.find((t) => t.lang === PostLang.pt) || null;
        if (!pt) return null;

        const translations = mapDbTranslationsToApi(p.translations);

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
            title: pt.title,
            excerpt: pt.excerpt ?? null,
            content: isDocLike(pt.content) ? (pt.content as RichTextDoc) : EMPTY_DOC,
          },
          translations,
        });
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    return NextResponse.json({ ok: true, posts: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await req.json()) as CreateBody;

    const slug = normalizeSlug(body.slug || '');
    if (!slug) {
      return NextResponse.json({ ok: false, error: 'Missing slug' }, { status: 400 });
    }

    const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true } });
    if (existing) {
      return NextResponse.json({ ok: false, error: 'Slug already exists' }, { status: 409 });
    }

    const pt = body.translations?.pt || {};
    const ptTitle = (pt.title || '').trim();
    const ptDoc = safeDocOrNull(pt.content);

    if (!ptTitle || !ptDoc || !hasAnyText(ptDoc)) {
      return NextResponse.json({ ok: false, error: 'PT fields missing' }, { status: 400 });
    }

    const en = body.translations?.en || {};
    const enTitle = (en.title || '').trim();
    const enDoc = safeDocOrNull(en.content);

    const canCreateEn = Boolean(enTitle) && Boolean(enDoc) && hasAnyText(enDoc);

    const status = body.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    const publishedAt = status === 'PUBLISHED' ? new Date() : null;

    const created = await prisma.post.create({
      data: {
        slug,
        status,
        publishedAt,
        categoryId: body.categoryId ?? null,
        coverImageUrl: body.coverImageUrl ?? null,
        coverImagePublicId: body.coverImagePublicId ?? null,
        authorId: null,
        translations: {
          create: [
            {
              lang: PostLang.pt,
              title: ptTitle,
              excerpt: pt.excerpt ?? null,
              content: ptDoc,
            },
            ...(canCreateEn
              ? [
                  {
                    lang: PostLang.en,
                    title: enTitle,
                    excerpt: en.excerpt ?? null,
                    content: enDoc as RichTextDoc,
                  },
                ]
              : []),
          ],
        },
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        translations: { select: { lang: true, title: true, excerpt: true, content: true } },
      },
    });

    const ptCreated = created.translations.find((t) => t.lang === PostLang.pt) || null;
    if (!ptCreated) {
      return NextResponse.json({ ok: false, error: 'Missing PT translation' }, { status: 500 });
    }

    const translations = mapDbTranslationsToApi(created.translations);

    const data = mapPostToPublic({
      id: created.id,
      slug: created.slug,
      status: created.status,
      publishedAt: created.publishedAt,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
      coverImageUrl: created.coverImageUrl,
      coverImagePublicId: created.coverImagePublicId,
      category: created.category,
      translation: {
        title: ptCreated.title,
        excerpt: ptCreated.excerpt ?? null,
        content: isDocLike(ptCreated.content) ? (ptCreated.content as RichTextDoc) : EMPTY_DOC,
      },
      translations,
    });

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
