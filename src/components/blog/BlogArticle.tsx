// src/components/blog/BlogArticle.tsx

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostPublic } from '@/types/blog';
import RichTextRenderer from '@/components/editor/RichTextRenderer';

type Props = {
  slug: string;
};

type ApiPostResponse = {
  ok: boolean;
  post?: BlogPostPublic;
};

type FetchState = 'ok' | 'not_found' | 'error';

function getBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (fromEnv) return fromEnv;
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

function formatDate(value: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: '2-digit' });
}

export default async function BlogArticle({ slug }: Props) {
  const baseUrl = getBaseUrl();

  let state: FetchState = 'error';
  let post: BlogPostPublic | null = null;

  try {
    const res = await fetch(`${baseUrl}/api/post/${slug}`, { cache: 'no-store' });

    if (res.status === 404) {
      state = 'not_found';
    } else if (res.ok) {
      const json = (await res.json()) as ApiPostResponse;
      if (json.ok && json.post) {
        post = json.post;
        state = 'ok';
      } else {
        state = 'error';
      }
    } else {
      state = 'error';
    }
  } catch {
    state = 'error';
  }

  if (state === 'not_found') {
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

  if (state === 'error' || !post) {
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

        <div className='blog_article__content'>
          <RichTextRenderer content={post.content} />
        </div>

        <footer className='blog_article__footer'>
          <Link href='/blog' className='blog_article__back'>
            Voltar ao blog
          </Link>
        </footer>
      </div>
    </article>
  );
}
