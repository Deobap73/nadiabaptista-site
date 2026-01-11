// src/types/blog.ts

import type { JSONContent } from '@tiptap/core';

export type PostStatus = 'DRAFT' | 'PUBLISHED';
export type BlogLang = 'pt' | 'en';

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
};

export type RichTextDoc = JSONContent;

export type BlogPostTranslation = {
  lang: BlogLang;
  title: string;
  excerpt: string | null;
  content: RichTextDoc;
};

export type BlogPostPublic = {
  id: string;
  slug: string;

  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  category: BlogCategory | null;

  coverImageUrl: string | null;
  coverImagePublicId?: string | null;

  readingTimeMinutes: number;

  title: string;
  excerpt: string | null;
  content: RichTextDoc;

  translations?: BlogPostTranslation[];
};

export type BlogPostAdmin = BlogPostPublic;
export type BlogPost = BlogPostPublic;
