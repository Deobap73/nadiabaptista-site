// src/app/[lang]/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';

import BlogArticle from '@/components/blog/BlogArticle';
import { blogPostJsonLd, toJsonLd } from '@/lib/seo/jsonLd';

import type { Lang } from '@/lib/i18n';
import { normalizeLang } from '@/lib/i18n';

import { getBaseUrl } from '@/lib/http/getBaseUrl';

type RouteParams = {
  lang: string;
  slug: string;
};

type PageProps = {
  params: Promise<RouteParams>;
};

type ApiPostResponse = {
  ok: boolean;
  post?: {
    title: string;
    slug: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    publishedAt: string | null;
    updatedAt: string;
  };
};

export const dynamicParams = true;

async function fetchPost(slug: string): Promise<ApiPostResponse | null> {
  const baseUrl = await getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/post/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as ApiPostResponse;
  } catch {
    return null;
  }
}

async function siteOrigin(): Promise<string> {
  const baseUrl = await getBaseUrl();
  return baseUrl.replace(/\/+$/, '');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  const safeLang = normalizeLang(lang) as Lang;
  const json = await fetchPost(slug);

  if (!json || !json.ok || !json.post) {
    return {
      title: safeLang === 'pt' ? 'Artigo não encontrado' : 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  const post = json.post;
  const origin = await siteOrigin();

  const defaultOgImage =
    'https://res.cloudinary.com/dleir1jqn/image/upload/v1767350948/NadiaBaptista-site/og-image.webp';

  const postImage = post.coverImageUrl || defaultOgImage;

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: {
      canonical: `${origin}/${safeLang}/blog/${post.slug}`,
      languages: {
        'pt-PT': `${origin}/pt/blog/${post.slug}`,
        'en-US': `${origin}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url: `${origin}/${safeLang}/blog/${post.slug}`,
      siteName: 'Nádia Baptista',
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: ['Nádia Baptista'],
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [postImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;

  const safeLang = normalizeLang(lang) as Lang;

  if (!slug) notFound();

  const json = await fetchPost(slug);
  const post = json && json.ok && json.post ? json.post : null;

  if (!post) notFound();

  const origin = await siteOrigin();
  const url = `${origin}/${safeLang}/blog/${post.slug}`;

  const jsonLd = blogPostJsonLd({
    title: post.title,
    description: post.excerpt,
    url,
    image: post.coverImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  });

  return (
    <main className='blog_post_page'>
      <Script
        id='jsonld-blogpost'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
      />
      <BlogArticle slug={slug} lang={safeLang} />
    </main>
  );
}
