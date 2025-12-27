// src/components/blog/BlogArticle.tsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostPublic } from '@/types/blog';

type Props = {
  slug: string;
};

type ApiPostResponse = {
  ok: boolean;
  post?: BlogPostPublic;
};

function formatDate(value: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: '2-digit' });
}

function renderParagraphs(content: string) {
  const blocks = content.trim().split(/\n\s*\n/g);

  return (
    <div className='blog_article__rich'>
      {blocks.map((b, i) => (
        <p key={i}>{b}</p>
      ))}
    </div>
  );
}

export default function BlogArticle({ slug }: Props) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'not_found'>('loading');
  const [post, setPost] = useState<BlogPostPublic | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');

      try {
        const res = await fetch(`/api/posts/${slug}`, { cache: 'no-store' });

        if (res.status === 404) {
          if (!cancelled) setStatus('not_found');
          return;
        }

        const json = (await res.json()) as ApiPostResponse;

        if (!cancelled && json.ok && json.post) {
          setPost(json.post);
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
  }, [slug]);

  if (status === 'loading') {
    return (
      <article className='blog_article' aria-label='Artigo'>
        <div className='blog_article__container site-container'>
          <div className='blog_article__loading'>
            <p className='blog_article__loading_title'>A carregar artigo</p>
            <p className='blog_article__loading_text'>Só um momento.</p>
          </div>
        </div>
      </article>
    );
  }

  if (status === 'not_found') {
    return (
      <article className='blog_article' aria-label='Artigo não encontrado'>
        <div className='blog_article__container site-container'>
          <div className='blog_article__empty'>
            <p className='blog_article__empty_title'>Artigo não encontrado.</p>
            <Link href='/blog' className='blog_article__back'>
              Voltar ao blog
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (status === 'error' || !post) {
    return (
      <article className='blog_article' aria-label='Erro ao carregar artigo'>
        <div className='blog_article__container site-container'>
          <div className='blog_article__empty'>
            <p className='blog_article__empty_title'>Não foi possível carregar.</p>
            <p className='blog_article__empty_text'>Tenta novamente mais tarde.</p>
            <Link href='/blog' className='blog_article__back'>
              Voltar ao blog
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className='blog_article' aria-label={post.title}>
      <header className='blog_article__header'>
        <div className='blog_article__container site-container'>
          <p className='blog_article__kicker'>Blog</p>

          <h1 className='blog_article__title'>{post.title}</h1>

          <div className='blog_article__meta'>
            <span className='blog_article__date'>{formatDate(post.publishedAt)}</span>
            <span className='blog_article__reading'>{post.readingTimeMinutes} min</span>
          </div>

          {post.category ? (
            <div className='blog_article__tags' aria-label='Categoria'>
              <span className='blog_article__tag'>{post.category.name}</span>
            </div>
          ) : null}
        </div>
      </header>

      <div className='blog_article__container site-container'>
        {post.coverImageUrl ? (
          <div className='blog_article__cover'>
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className='blog_article__cover_image'
              sizes='(min-width: 1024px) 960px, 100vw'
              priority
            />
          </div>
        ) : null}

        <div className='blog_article__content'>{renderParagraphs(post.content)}</div>

        <footer className='blog_article__footer'>
          <Link href='/blog' className='blog_article__back'>
            Voltar ao blog
          </Link>
        </footer>
      </div>
    </article>
  );
}
