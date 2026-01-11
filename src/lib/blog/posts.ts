// src/lib/blog/posts.ts

import type { BlogPostPublic } from '@/types/blog';
import { getPublishedPostBySlugFromDb, getPublishedPostsFromDb } from '@/lib/blog/postsDb';

export async function getAllPosts(categorySlug?: string): Promise<BlogPostPublic[]> {
  return getPublishedPostsFromDb(categorySlug);
}

export async function getPostBySlug(slug: string): Promise<BlogPostPublic | null> {
  return getPublishedPostBySlugFromDb(slug);
}
