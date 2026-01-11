// src/components/blog/BlogList.tsx

import type { BlogCategory, BlogPostPublic } from '@/types/blog';
import BlogListClient from './BlogListClient';
import type { Lang } from '@/lib/i18n';
import { getBaseUrl } from '@/lib/http/getBaseUrl';

type ApiPostsResponse = {
  ok: boolean;
  posts: BlogPostPublic[];
};

type ApiCategoriesResponse = {
  ok: boolean;
  categories: BlogCategory[];
};

type Props = {
  lang: Lang;
};

export default async function BlogList({ lang }: Props) {
  const baseUrl = await getBaseUrl();

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
    const postsRes = await fetch(`${baseUrl}/api/post?lang=${lang}`, { cache: 'no-store' });
    if (postsRes.ok) {
      const postsJson = (await postsRes.json()) as ApiPostsResponse;
      if (postsJson.ok) posts = postsJson.posts;
    }
  } catch {
    posts = [];
  }

  return <BlogListClient lang={lang} initialPosts={posts} initialCategories={categories} />;
}
