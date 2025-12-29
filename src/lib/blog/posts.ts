// src/lib/blog/posts.ts

import type { BlogPostMock, BlogPostPublic } from '@/types/blog';
import { mockPosts } from './mockPosts';

function normalizeMockToPublic(post: BlogPostMock): BlogPostPublic {
  // Use publishedAt as base time for createdAt/updatedAt in phase 1
  const baseIso = new Date(post.publishedAt).toISOString();

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,

    status: 'PUBLISHED',
    publishedAt: new Date(post.publishedAt).toISOString(),
    createdAt: baseIso,
    updatedAt: baseIso,

    category: null,

    coverImageUrl: null,
    readingTimeMinutes: post.readingTimeMinutes,

    tags: post.tags,
    featured: post.featured,
    heroImageUrl: post.heroImageUrl ?? null,
  };
}

export function getAllPosts(): BlogPostPublic[] {
  const normalized = mockPosts.map(normalizeMockToPublic);

  return [...normalized].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function getPostBySlug(slug: string): BlogPostPublic | null {
  const all = getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
