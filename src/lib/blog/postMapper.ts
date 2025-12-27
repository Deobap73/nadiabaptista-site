// src/lib/blog/postMapper.ts

import type { BlogPostPublic } from '@/types/blog';

function estimateReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export function mapPostToPublic(input: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  coverImageUrl: string | null;
  category: { id: string; name: string; slug: string } | null;
}): BlogPostPublic {
  return {
    id: input.id,
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    status: input.status,
    publishedAt: input.publishedAt ? input.publishedAt.toISOString() : null,
    createdAt: input.createdAt.toISOString(),
    updatedAt: input.updatedAt.toISOString(),
    category: input.category
      ? { id: input.category.id, name: input.category.name, slug: input.category.slug }
      : null,
    coverImageUrl: input.coverImageUrl,
    readingTimeMinutes: estimateReadingTimeMinutes(input.content),
  };
}

export function normalizeSlug(value: string): string {
  const decoded = decodeURIComponent(value || '');
  return decoded
    .replace(/^\/+|\/+$/g, '')
    .trim()
    .toLowerCase();
}
