// src/types/blog.ts

import type { JSONContent } from '@tiptap/core';

export type PostStatus = 'DRAFT' | 'PUBLISHED';

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type RichTextDoc = JSONContent;

export type BlogPostPublic = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: RichTextDoc;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  category: BlogCategory | null;

  coverImageUrl: string | null;
  readingTimeMinutes: number;

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
  excerpt: string | null;
  content: RichTextDoc;
  publishedAt: string;
  readingTimeMinutes: number;
  tags?: string[];
  featured?: boolean;
  heroImageUrl?: string | null;
};
