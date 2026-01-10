// src/components/blog/BlogList.tsx

import type { BlogCategory, BlogPostPublic } from '@/types/blog';
import BlogListClient from './BlogListClient';
import type { Lang } from '@/lib/i18n';

type ApiPostsResponse = {
  ok: boolean;
  posts: BlogPostPublic[];
};

type ApiCategoriesResponse = {
  ok: boolean;
  categories: BlogCategory[];
};

function getBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (fromEnv) return fromEnv;
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

type Props = {
  lang: Lang;
};

export default async function BlogList({ lang }: Props) {
  const baseUrl = getBaseUrl();

  let posts: BlogPostPublic[] = [];
  let categories: BlogCategory[] = [];

  try {
    const catsRes = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
    if (catsRes.ok) {
      const catsJson = (await catsRes.json()) as ApiCategoriesResponse;
      if (catsJson.ok) categories = catsJson.categories;
    }
  } catch {
    categories = [];
  }

  try {
    const postsRes = await fetch(`${baseUrl}/api/post`, { cache: 'no-store' });
    if (postsRes.ok) {
      const postsJson = (await postsRes.json()) as ApiPostsResponse;
      if (postsJson.ok) posts = postsJson.posts;
    }
  } catch {
    posts = [];
  }

  return <BlogListClient lang={lang} initialPosts={posts} initialCategories={categories} />;
}
