// src/components/blog/BlogListClient.tsx

'use client';

import { useMemo, useState } from 'react';
import type { BlogPostPublic, BlogCategory } from '@/types/blog';
import BlogCard from './BlogCard';
import BlogCategoryTabs from './BlogCategoryTabs';
import type { Lang } from '@/lib/i18n';
import { getBlogDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
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

export default function BlogListClient({ lang, initialPosts, initialCategories }: Props) {
  const dict = getBlogDict(lang);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    const ordered = sortByPublishedAtDesc(initialPosts);

    if (activeCategory === 'all') return ordered;

    return ordered.filter((p) => p.category?.slug === activeCategory);
  }, [initialPosts, activeCategory]);

  const tabItems = useMemo(() => {
    return [{ id: 'all', name: dict.list.allTab, slug: 'all' }, ...initialCategories];
  }, [initialCategories, dict.list.allTab]);

  return (
    <section className='blog_list' aria-label={dict.list.ariaLabel}>
      <BlogCategoryTabs
        lang={lang}
        categories={tabItems}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {filtered.length ? (
        <div className='blog_list__grid' aria-label={dict.list.gridAria}>
          {filtered.map((post) => (
            <BlogCard lang={lang} key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className='blog_list__empty'>
          <p className='blog_list__empty_title'>{dict.list.emptyTitle}</p>
          <p className='blog_list__empty_text'>{dict.list.emptyText}</p>
        </div>
      )}
    </section>
  );
}
