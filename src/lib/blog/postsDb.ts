// src/lib/blog/postsDb.ts

import { prisma } from '@/lib/prisma';
import { mapPostToPublic } from '@/lib/blog/postMapper';
import type { BlogLang, BlogPostPublic, RichTextDoc } from '@/types/blog';

function safeLang(value: string | null | undefined): BlogLang {
  return value === 'en' ? 'en' : 'pt';
}

function isDocLike(value: unknown): value is RichTextDoc {
  return (
    Boolean(value) && typeof value === 'object' && (value as { type?: unknown }).type === 'doc'
  );
}

function safeDoc(value: unknown): RichTextDoc {
  if (isDocLike(value)) return value;
  return { type: 'doc', content: [{ type: 'paragraph' }] };
}

export async function getPublishedPostsFromDb(
  categorySlug?: string,
  lang?: BlogLang
): Promise<BlogPostPublic[]> {
  const category = (categorySlug || '').trim().toLowerCase();
  const pickLang = safeLang(lang);

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
        where: { lang: { in: [pickLang, 'pt'] } },
        select: { lang: true, title: true, excerpt: true, content: true },
      },
    },
    orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
  });

  const mapped = posts.map((p) => {
    const preferred = p.translations.find((t) => t.lang === pickLang) || null;
    const fallback = p.translations.find((t) => t.lang === 'pt') || null;
    const t = preferred || fallback;

    if (!t) return null;

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
        title: t.title,
        excerpt: t.excerpt ?? null,
        content: safeDoc(t.content),
      },
    });
  });

  return mapped.filter((x): x is BlogPostPublic => x !== null);
}

export async function getPublishedPostBySlugFromDb(
  slug: string,
  lang?: BlogLang
): Promise<BlogPostPublic | null> {
  const target = (slug || '').trim().toLowerCase();
  const pickLang = safeLang(lang);

  const post = await prisma.post.findFirst({
    where: { slug: target, status: 'PUBLISHED' },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      translations: {
        where: { lang: { in: [pickLang, 'pt'] } },
        select: { lang: true, title: true, excerpt: true, content: true },
      },
    },
  });

  if (!post) return null;

  const preferred = post.translations.find((t) => t.lang === pickLang) || null;
  const fallback = post.translations.find((t) => t.lang === 'pt') || null;
  const t = preferred || fallback;

  if (!t) return null;

  return mapPostToPublic({
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
      title: t.title,
      excerpt: t.excerpt ?? null,
      content: safeDoc(t.content),
    },
  });
}
