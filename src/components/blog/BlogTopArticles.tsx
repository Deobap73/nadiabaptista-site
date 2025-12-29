// src/components/blog/BlogTopArticles.tsx

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogCategory, BlogPostPublic } from '@/types/blog';
import BlogCard from './BlogCard';
import BlogCategoryTabs from './BlogCategoryTabs';

function sortByNewest(a: BlogPostPublic, b: BlogPostPublic): number {
  const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
  const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
  return bTime - aTime;
}

export default function BlogTopArticles({ posts }: { posts: BlogPostPublic[] }) {
  const categories = useMemo<BlogCategory[]>(() => {
    const bySlug = new Map<string, BlogCategory>();

    for (const p of posts) {
      if (!p.category) continue;
      if (!bySlug.has(p.category.slug)) {
        bySlug.set(p.category.slug, p.category);
      }
    }

    return Array.from(bySlug.values());
  }, [posts]);

  const [active, setActive] = useState<string>(categories[0]?.slug || '');

  const topCards = useMemo(() => {
    const ordered = [...posts].sort(sortByNewest);

    const usedIds = new Set<string>();
    const picked: BlogPostPublic[] = [];

    const otherCategories = categories.filter((c) => c.slug !== active);

    for (const cat of otherCategories) {
      const match = ordered.find((p) => p.category?.slug === cat.slug && !usedIds.has(p.id));
      if (match) {
        usedIds.add(match.id);
        picked.push(match);
      }
    }

    if (picked.length < 4) {
      const fill = ordered.filter((p) => !usedIds.has(p.id)).slice(0, 4 - picked.length);
      picked.push(...fill);
    }

    return picked.slice(0, 4);
  }, [posts, categories, active]);

  if (categories.length === 0) return null;

  return (
    <section className='blog_top' aria-label='Top artigos'>
      <header className='blog_top__header'>
        <h2 className='blog_top__title'>Top Artigos</h2>

        <Link href='/blog' className='blog_top__link'>
          Mais informações
        </Link>
      </header>

      <BlogCategoryTabs categories={categories} active={active} onChange={setActive} />

      <div className='blog_top__grid' aria-label='Selecao de artigos por categoria'>
        {topCards.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
