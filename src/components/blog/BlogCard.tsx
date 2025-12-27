// src/components/blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostPublic } from '@/types/blog';

type BlogCardProps = {
  post: BlogPostPublic;
  variant?: 'default' | 'featured';
};

function formatDate(value: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: '2-digit' });
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <article
      className={`blog_card ${isFeatured ? 'blog_card__featured' : ''}`}
      aria-label={post.title}>
      <Link className='blog_card__link' href={`/blog/${encodeURIComponent(post.slug)}`}>
        {post.coverImageUrl ? (
          <div className='blog_card__media'>
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className='blog_card__image'
              sizes={
                isFeatured ? '(min-width: 1024px) 620px, 100vw' : '(min-width: 1024px) 360px, 100vw'
              }
              priority={isFeatured}
            />
          </div>
        ) : null}

        <div className='blog_card__body'>
          <div className='blog_card__meta'>
            <span className='blog_card__date'>{formatDate(post.publishedAt)}</span>
            <span className='blog_card__reading'>{post.readingTimeMinutes} min</span>
          </div>

          <h3 className='blog_card__title'>{post.title}</h3>

          {post.excerpt ? <p className='blog_card__excerpt'>{post.excerpt}</p> : null}

          {post.category ? (
            <div className='blog_card__tags' aria-label='Categoria'>
              <span className='blog_card__tag'>{post.category.name}</span>
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
