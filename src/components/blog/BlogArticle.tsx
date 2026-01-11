// src/components/blog/BlogArticle.tsx

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Lang } from '@/lib/i18n';
import { getBlogArticleDict, withLangPrefix } from '@/lib/i18n';

import { getBaseUrl } from '@/lib/http/getBaseUrl';
import RichTextRenderer from '@/components/editor/RichTextRenderer';

import type { RichTextDoc } from '@/types/blog';

type Props = {
  slug: string;
  lang: Lang;
};

type ApiPostResponse = {
  ok: boolean;
  post?: {
    title: string;
    slug: string;
    excerpt: string | null;
    content: RichTextDoc;
    coverImageUrl: string | null;
    publishedAt: string | null;
    updatedAt: string;
    category?: { name: string } | null;
  };
};

async function fetchPost(slug: string, lang: Lang): Promise<ApiPostResponse | null> {
  const baseUrl = await getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/post/${slug}?lang=${lang}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as ApiPostResponse;
  } catch {
    return null;
  }
}

function formatDate(iso: string | null, lang: Lang): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';

  const locale = lang === 'en' ? 'en' : 'pt-PT';

  try {
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
}

export default async function BlogArticle({ slug, lang }: Props) {
  const dict = getBlogArticleDict(lang);
  const json = await fetchPost(slug, lang);

  if (!json || !json.ok || !json.post) notFound();

  const post = json.post;

  const publishedText = formatDate(post.publishedAt, lang);
  const updatedText = formatDate(post.updatedAt, lang);

  const blogHref = withLangPrefix(lang, '/blog');

  return (
    <article className='blog_article'>
      <div className='blog_article__container site-container site-container--wide'>
        <div className='blog_article__top'>
          <Link href={blogHref} className='blog_article__back'>
            {dict.backToBlog}
          </Link>
        </div>

        <header className='blog_article__header'>
          <h1 className='blog_article__title'>{post.title}</h1>

          {post.excerpt ? <p className='blog_article__excerpt'>{post.excerpt}</p> : null}

          <div className='blog_article__meta'>
            {publishedText ? (
              <span className='blog_article__meta_item'>
                {dict.published}: {publishedText}
              </span>
            ) : null}

            {updatedText ? (
              <span className='blog_article__meta_item'>
                {dict.updated}: {updatedText}
              </span>
            ) : null}

            {post.category?.name ? (
              <span className='blog_article__meta_item'>{post.category.name}</span>
            ) : null}
          </div>
        </header>

        {post.coverImageUrl ? (
          <div className='blog_article__cover'>
            <Image
              src={post.coverImageUrl}
              alt=''
              width={1200}
              height={720}
              className='blog_article__cover_image'
              sizes='(min-width: 1024px) 1100px, 100vw'
              priority
            />
          </div>
        ) : null}

        <div className='blog_article__content'>
          <RichTextRenderer content={post.content} />
        </div>

        <div className='blog_article__bottom'>
          <Link href={blogHref} className='blog_article__back'>
            {dict.backToBlog}
          </Link>
        </div>
      </div>
    </article>
  );
}
