// src/lib/blog/postsDb.ts

import { prisma } from '@/lib/prisma';
import { mapPostToPublic } from '@/lib/blog/postMapper';
import type { BlogPostPublic } from '@/types/blog';
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

export async function getPublishedPostsFromDb(categorySlug?: string): Promise<BlogPostPublic[]> {
  const category = (categorySlug || '').trim().toLowerCase();

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

  return posts.map((p) => {
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
}

export async function getPublishedPostBySlugFromDb(slug: string): Promise<BlogPostPublic | null> {
  const target = (slug || '').trim().toLowerCase();

  const post = await prisma.post.findFirst({
    where: { slug: target, status: 'PUBLISHED' },
    include: {
      category: { select: { id: true, name: true, slug: true } },
    },
  });

  if (!post) return null;

  const safeDoc = parseRichDoc(post.content) || getSafeEmptyDoc();

  return mapPostToPublic({
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
}
