// src/components/admin/AdminBlogManager.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogPostAdmin } from '@/types/blog';

type ApiAdminPostsResponse = {
  ok: boolean;
  posts?: BlogPostAdmin[];
};

function formatStatus(value: string): string {
  if (value === 'PUBLISHED') return 'Published';
  return 'Draft';
}

export default function AdminBlogManager() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [posts, setPosts] = useState<BlogPostAdmin[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');

      try {
        const res = await fetch('/api/admin/posts', { cache: 'no-store' });
        const json = (await res.json()) as ApiAdminPostsResponse;

        if (!cancelled && json.ok && json.posts) {
          setPosts(json.posts);
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

  const ordered = useMemo(() => {
    return [...posts].sort((a, b) => {
      const da = new Date(a.updatedAt).getTime();
      const db = new Date(b.updatedAt).getTime();
      return db - da;
    });
  }, [posts]);

  if (status === 'loading') {
    return (
      <div className='admin_blog'>
        <div className='admin_blog__toolbar'>
          <p className='admin_blog__hint'>A carregar</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='admin_blog'>
        <div className='admin_blog__toolbar'>
          <p className='admin_blog__hint'>Erro ao carregar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='admin_blog'>
      <div className='admin_blog__toolbar'>
        <Link className='admin_blog__button' href='/admin/blog/new'>
          Criar artigo
        </Link>
      </div>

      {ordered.length ? (
        <div className='admin_blog__list'>
          {ordered.map((p) => (
            <div key={p.id} className='admin_blog__row'>
              <div className='admin_blog__row_main'>
                <p className='admin_blog__row_title'>{p.title}</p>
                <p className='admin_blog__row_meta'>
                  {formatStatus(p.status)}
                  {p.category ? `, ${p.category.name}` : ''}
                </p>
              </div>

              <div className='admin_blog__row_actions'>
                <Link className='admin_blog__link' href={`/blog/${p.slug}`}>
                  Ver
                </Link>
                <Link className='admin_blog__link' href={`/admin/blog/${p.id}/edit`}>
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='admin_blog__empty'>
          <p className='admin_blog__empty_title'>Ainda não há artigos.</p>
        </div>
      )}
    </div>
  );
}
