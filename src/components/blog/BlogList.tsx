// src/components/blog/BlogList.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import type { BlogPostPublic, BlogCategory } from '@/types/blog';
import BlogCard from './BlogCard';
import BlogCategoryTabs from './BlogCategoryTabs';

type ApiPostsResponse = {
  ok: boolean;
  posts: BlogPostPublic[];
};

type ApiCategoriesResponse = {
  ok: boolean;
  categories: BlogCategory[];
};

function sortByPublishedAtDesc(posts: BlogPostPublic[]): BlogPostPublic[] {
  return [...posts].sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return db - da;
  });
}

export default function BlogList() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [posts, setPosts] = useState<BlogPostPublic[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');

      try {
        const catsRes = await fetch('/api/categories', { cache: 'no-store' });
        const catsJson = (await catsRes.json()) as ApiCategoriesResponse;

        if (!cancelled && catsJson.ok) {
          setCategories(catsJson.categories);
        }

        const postsRes = await fetch('/api/posts', { cache: 'no-store' });
        const postsJson = (await postsRes.json()) as ApiPostsResponse;

        if (!cancelled && postsJson.ok) {
          setPosts(postsJson.posts);
          setStatus('ready');
          return;
        }

        if (!cancelled) setStatus('error');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const ordered = sortByPublishedAtDesc(posts);

    if (activeCategory === 'all') return ordered;

    return ordered.filter((p) => p.category?.slug === activeCategory);
  }, [posts, activeCategory]);

  const tabItems = useMemo(() => {
    const items = [{ id: 'all', name: 'All', slug: 'all' }, ...categories];
    return items;
  }, [categories]);

  if (status === 'loading' || status === 'idle') {
    return (
      <section className='blog_list' aria-label='Artigos do blog'>
        <div className='blog_list__loading'>
          <p className='blog_list__loading_title'>A carregar artigos</p>
          <p className='blog_list__loading_text'>Só um momento.</p>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className='blog_list' aria-label='Artigos do blog'>
        <div className='blog_list__empty'>
          <p className='blog_list__empty_title'>Não foi possível carregar.</p>
          <p className='blog_list__empty_text'>Tenta novamente mais tarde.</p>
        </div>
      </section>
    );
  }

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
