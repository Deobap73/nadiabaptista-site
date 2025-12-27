// src/types/blog.ts

export type PostStatus = 'DRAFT' | 'PUBLISHED';

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPostPublic = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  category: BlogCategory | null;

  coverImageUrl: string | null;
  readingTimeMinutes: number;
};

export type BlogPostAdmin = BlogPostPublic;
