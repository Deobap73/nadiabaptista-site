// src\components\blog\BlogTopArticles.tsx

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import BlogCategoryTabs from './BlogCategoryTabs';

type BlogCategory = {
  label: string;
  matchTags: string[];
};

const BLOG_CATEGORIES: BlogCategory[] = [
  { label: 'Performance', matchTags: ['practice'] },
  { label: 'Equilíbrio', matchTags: ['wellbeing'] },
  { label: 'Teoria', matchTags: ['studies'] },
  { label: 'Resiliência', matchTags: ['mental-health', 'anxiety'] },
  { label: 'Voleibol', matchTags: ['young-adults', 'transitions'] },
];

function hasAnyTag(post: BlogPost, tags: string[]): boolean {
  return tags.some((t) => post.tags.includes(t));
}

function sortByNewest(a: BlogPost, b: BlogPost): number {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

export default function BlogTopArticles({ posts }: { posts: BlogPost[] }) {
  const categoryLabels = BLOG_CATEGORIES.map((c) => c.label);
  const [active, setActive] = useState<string>(categoryLabels[0]);

  const topCards = useMemo(() => {
    const ordered = [...posts].sort(sortByNewest);

    // Queremos mostrar 4 artigos das outras 4 categorias, sem duplicar posts
    const otherCategories = BLOG_CATEGORIES.filter((c) => c.label !== active);

    const usedIds = new Set<string>();
    const picked: BlogPost[] = [];

    for (const cat of otherCategories) {
      const match = ordered.find((p) => hasAnyTag(p, cat.matchTags) && !usedIds.has(p.id));
      if (match) {
        usedIds.add(match.id);
        picked.push(match);
      }
    }

    // Fallback: se não chegarmos a 4 por causa de poucos posts ou overlaps,
    // completamos com os mais recentes que ainda não foram usados.
    if (picked.length < 4) {
      const fill = ordered.filter((p) => !usedIds.has(p.id)).slice(0, 4 - picked.length);
      picked.push(...fill);
    }

    return picked.slice(0, 4);
  }, [posts, active]);

  return (
    <section className='blog_top' aria-label='Top artigos'>
      <header className='blog_top__header'>
        <h2 className='blog_top__title'>Top Artigos</h2>

        <Link href='/blog' className='blog_top__link'>
          Mais informações
        </Link>
      </header>

      <BlogCategoryTabs categories={categoryLabels} active={active} onChange={setActive} />

      <div className='blog_top__grid' aria-label='Selecao de artigos por categoria'>
        {topCards.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
