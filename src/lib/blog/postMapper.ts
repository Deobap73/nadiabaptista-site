// src/lib/blog/postMapper.ts

import type { BlogPostPublic, RichTextDoc } from '@/types/blog';

type JsonLike = string | number | boolean | null | { [k: string]: unknown } | unknown[];

function isRecord(value: unknown): value is { [k: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function extractTextFromRichDoc(doc: RichTextDoc): string {
  const parts: string[] = [];

  function walk(node: unknown) {
    if (node === null) return;

    if (typeof node === 'string') {
      parts.push(node);
      return;
    }

    if (isArray(node)) {
      for (const item of node) walk(item);
      return;
    }

    if (isRecord(node)) {
      const maybeText = node.text;
      if (typeof maybeText === 'string') parts.push(maybeText);

      const content = node.content;
      if (content !== undefined) walk(content);

      return;
    }
  }

  walk(doc as JsonLike);

  return parts.join(' ');
}

function estimateReadingTimeMinutes(doc: RichTextDoc): number {
  const text = extractTextFromRichDoc(doc);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export function mapPostToPublic(input: {
  id: string;
  slug: string;

  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  coverImageUrl: string | null;
  coverImagePublicId: string | null;

  category: { id: string; name: string; slug: string } | null;

  translation: {
    title: string;
    excerpt: string | null;
    content: RichTextDoc;
  };

  translations?: Array<{
    lang: 'pt' | 'en';
    title: string;
    excerpt: string | null;
    content: RichTextDoc;
  }>;
}): BlogPostPublic {
  return {
    id: input.id,
    slug: input.slug,

    status: input.status,
    publishedAt: input.publishedAt ? input.publishedAt.toISOString() : null,
    createdAt: input.createdAt.toISOString(),
    updatedAt: input.updatedAt.toISOString(),

    category: input.category
      ? { id: input.category.id, name: input.category.name, slug: input.category.slug }
      : null,

    coverImageUrl: input.coverImageUrl,
    coverImagePublicId: input.coverImagePublicId,

    title: input.translation.title,
    excerpt: input.translation.excerpt,
    content: input.translation.content,

    readingTimeMinutes: estimateReadingTimeMinutes(input.translation.content),

    translations: input.translations ?? [],
  };
}

export function normalizeSlug(value: string): string {
  const decoded = decodeURIComponent(value || '');
  return decoded
    .replace(/^\/+|\/+$/g, '')
    .trim()
    .toLowerCase();
}
