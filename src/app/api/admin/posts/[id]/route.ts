// src/app/api/admin/posts/[id]/route.ts

import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapPostToPublic, normalizeSlug } from '@/lib/blog/postMapper';
import { isAdminRequest } from '../../shared/requireAdminApi';
import {
  createNewsletterEventIfMissing,
  deliverNewsletterEvent,
} from '@/lib/newsletter/newsletterService';
import type { BlogLang, RichTextDoc } from '@/types/blog';

export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ id: string }>;
};

type TranslationInput = {
  title?: string;
  excerpt?: string | null;
  content?: unknown;
};

type UpdateBody = {
  slug?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  categoryId?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
  translations?: Partial<Record<BlogLang, TranslationInput>>;
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

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = (await req.json()) as UpdateBody;

    const existing = await prisma.post.findUnique({
      where: { id },
      include: {
        translations: { select: { lang: true, title: true, excerpt: true, content: true } },
      },
    });

    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    const nextSlug = body.slug ? normalizeSlug(body.slug) : existing.slug;

    if (nextSlug !== existing.slug) {
      const slugTaken = await prisma.post.findUnique({
        where: { slug: nextSlug },
        select: { id: true },
      });

      if (slugTaken) {
        return NextResponse.json({ ok: false, error: 'Slug already exists' }, { status: 409 });
      }
    }

    const ptExisting = existing.translations.find((t) => t.lang === 'pt') || null;
    if (!ptExisting) {
      return NextResponse.json({ ok: false, error: 'Missing PT translation' }, { status: 400 });
    }

    const ptNext = body.translations?.pt || {};
    const enNext = body.translations?.en || {};

    const ptTitle = (ptNext.title !== undefined ? ptNext.title : ptExisting.title).trim();
    const ptDocRaw =
      ptNext.content !== undefined
        ? safeDocOrNull(ptNext.content)
        : safeDocOrNull(ptExisting.content);

    if (!ptTitle || !ptDocRaw || !hasAnyText(ptDocRaw)) {
      return NextResponse.json({ ok: false, error: 'PT fields missing' }, { status: 400 });
    }

    const nextStatus = body.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    const publishedAt = nextStatus === 'PUBLISHED' ? existing.publishedAt || new Date() : null;

    const enTitle = (enNext.title || '').trim();
    const enDoc = safeDocOrNull(enNext.content);
    const wantsUpsertEn = Boolean(enTitle) && Boolean(enDoc) && hasAnyText(enDoc);

    const updated = await prisma.post.update({
      where: { id },
      data: {
        slug: nextSlug,
        status: nextStatus,
        publishedAt,
        categoryId: body.categoryId !== undefined ? body.categoryId : undefined,
        coverImageUrl: body.coverImageUrl !== undefined ? body.coverImageUrl : undefined,
        coverImagePublicId:
          body.coverImagePublicId !== undefined ? body.coverImagePublicId : undefined,

        translations: {
          upsert: [
            {
              where: { postId_lang: { postId: id, lang: 'pt' } },
              create: {
                lang: 'pt',
                title: ptTitle,
                excerpt: ptNext.excerpt ?? null,
                content: ptDocRaw,
              },
              update: {
                title: ptNext.title !== undefined ? ptNext.title.trim() : undefined,
                excerpt: ptNext.excerpt !== undefined ? ptNext.excerpt : undefined,
                content: ptNext.content !== undefined ? ptDocRaw : undefined,
              },
            },
          ],
          ...(wantsUpsertEn
            ? {
                upsert: [
                  {
                    where: { postId_lang: { postId: id, lang: 'pt' } },
                    create: {
                      lang: 'pt',
                      title: ptTitle,
                      excerpt: ptNext.excerpt ?? null,
                      content: ptDocRaw,
                    },
                    update: {
                      title: ptNext.title !== undefined ? ptNext.title.trim() : undefined,
                      excerpt: ptNext.excerpt !== undefined ? ptNext.excerpt : undefined,
                      content: ptNext.content !== undefined ? ptDocRaw : undefined,
                    },
                  },
                  {
                    where: { postId_lang: { postId: id, lang: 'en' } },
                    create: {
                      lang: 'en',
                      title: enTitle,
                      excerpt: enNext.excerpt ?? null,
                      content: enDoc!,
                    },
                    update: {
                      title: enTitle,
                      excerpt: enNext.excerpt ?? null,
                      content: enDoc!,
                    },
                  },
                ],
              }
            : {}),
        },
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        translations: { select: { lang: true, title: true, excerpt: true, content: true } },
      },
    });

    const ptUpdated = updated.translations.find((t) => t.lang === 'pt')!;

    const translations = updated.translations.map((t) => ({
      lang: t.lang,
      title: t.title,
      excerpt: t.excerpt ?? null,
      content: isDocLike(t.content) ? t.content : { type: 'doc', content: [{ type: 'paragraph' }] },
    }));

    const data = mapPostToPublic({
      id: updated.id,
      slug: updated.slug,
      status: updated.status,
      publishedAt: updated.publishedAt,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      coverImageUrl: updated.coverImageUrl,
      coverImagePublicId: updated.coverImagePublicId,
      category: updated.category,
      translation: {
        title: ptUpdated.title,
        excerpt: ptUpdated.excerpt ?? null,
        content: isDocLike(ptUpdated.content)
          ? ptUpdated.content
          : { type: 'doc', content: [{ type: 'paragraph' }] },
      },
      translations,
    });

    const becamePublished = existing.status === 'DRAFT' && nextStatus === 'PUBLISHED';

    if (becamePublished) {
      const ev = await createNewsletterEventIfMissing({
        kind: 'POST',
        entityId: updated.id,
        title: ptUpdated.title,
        urlPath: `/blog/${updated.slug}`,
      });

      if (ev.ok) await deliverNewsletterEvent(ev.eventId);
    }

    return NextResponse.json({ ok: true, post: data });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    const existing = await prisma.post.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
