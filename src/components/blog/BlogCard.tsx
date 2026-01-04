// src/components/blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPostPublic } from '@/types/blog';
import type { Lang } from '@/lib/i18n';
import { getCommonDict, withLangPrefix } from '@/lib/i18n';

type BlogCardProps = {
  lang: Lang;
  post: BlogPostPublic;
  variant?: 'default' | 'featured';
};

function formatDate(value: string | null, lang: Lang): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  const locale = lang === 'en' ? 'en' : 'pt-PT';

  try {
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: '2-digit' });
  } catch {
    return value;
  }
}

export default function BlogCard({ lang, post, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured';
  const common = getCommonDict(lang);

  const href = withLangPrefix(lang, `/blog/${encodeURIComponent(post.slug)}`);

  return (
    <article
      className={`blog_card ${isFeatured ? 'blog_card__featured' : ''}`}
      aria-label={post.title}>
      <Link className='blog_card__link' href={href}>
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
            <span className='blog_card__date'>{formatDate(post.publishedAt, lang)}</span>
            <span className='blog_card__reading'>
              {post.readingTimeMinutes} {common.minutesShort}
            </span>
          </div>

          <h3 className='blog_card__title'>{post.title}</h3>

          {post.excerpt ? <p className='blog_card__excerpt'>{post.excerpt}</p> : null}

          {post.category ? (
            <div className='blog_card__tags' aria-label={common.categoryAria}>
              <span className='blog_card__tag'>{post.category.name}</span>
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
