// src/lib/blog/posts.ts

import type { BlogPost } from '@/types/blog';
import { mockPosts } from '@/lib/blog/mockPosts';

function normalizeSlug(value: string): string {
  const decoded = decodeURIComponent(value || '');
  return decoded
    .replace(/^\/+|\/+$/g, '')
    .trim()
    .toLowerCase();
}

export function getAllPosts(): BlogPost[] {
  return [...mockPosts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const target = normalizeSlug(slug);

  return mockPosts.find((p) => normalizeSlug(p.slug) === target);
}
