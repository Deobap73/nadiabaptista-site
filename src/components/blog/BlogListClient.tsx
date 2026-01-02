// src/components/blog/BlogListClient.tsx

'use client';

import { useMemo, useState } from 'react';
import type { BlogPostPublic, BlogCategory } from '@/types/blog';
import BlogCard from './BlogCard';
import BlogCategoryTabs from './BlogCategoryTabs';

type Props = {
  initialPosts: BlogPostPublic[];
  initialCategories: BlogCategory[];
};

function sortByPublishedAtDesc(posts: BlogPostPublic[]): BlogPostPublic[] {
  return [...posts].sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });
}

export default function BlogListClient({ initialPosts, initialCategories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    const ordered = sortByPublishedAtDesc(initialPosts);

    if (activeCategory === 'all') return ordered;

    return ordered.filter((p) => p.category?.slug === activeCategory);
  }, [initialPosts, activeCategory]);

  const tabItems = useMemo(() => {
    return [{ id: 'all', name: 'All', slug: 'all' }, ...initialCategories];
  }, [initialCategories]);

  return (
    <section className='blog_list' aria-label='Artigos do blog'>
      <BlogCategoryTabs
        categories={tabItems}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {filtered.length ? (
        <div className='blog_list__grid' aria-label='Lista de artigos'>
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className='blog_list__empty'>
          <p className='blog_list__empty_title'>Ainda não há artigos nesta categoria.</p>
          <p className='blog_list__empty_text'>Volta mais tarde.</p>
        </div>
      )}
    </section>
  );
}
