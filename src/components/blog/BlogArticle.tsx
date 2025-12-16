// src/components/blog/BlogArticle.tsx

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

type BlogArticleProps = {
  post: BlogPost;
};

function formatDate(value: string): string {
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

export default function BlogArticle({ post }: BlogArticleProps) {
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

          {post.tags?.length ? (
            <div className='blog_article__tags' aria-label='Tags'>
              {post.tags.map((tag) => (
                <span key={tag} className='blog_article__tag'>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className='blog_article__container site-container'>
        <div className='blog_article__cover'>
          <Image
            src={post.heroImageUrl}
            alt={post.title}
            fill
            className='blog_article__cover_image'
            sizes='(min-width: 1024px) 960px, 100vw'
            priority
          />
        </div>

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
