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

  // Optional, used by some UI and legacy mock data
  tags?: string[];
  featured?: boolean;
  heroImageUrl?: string | null;
};

export type BlogPostAdmin = BlogPostPublic;
export type BlogPost = BlogPostPublic;

export type BlogPostMock = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTimeMinutes: number;

  tags?: string[];
  featured?: boolean;
  heroImageUrl?: string;
};
