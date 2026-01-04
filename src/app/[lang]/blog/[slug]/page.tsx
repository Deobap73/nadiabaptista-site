// src/app/[lang]/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/BlogArticle';
import { blogPostJsonLd, toJsonLd } from '@/lib/seo/jsonLd';
import type { Lang } from '@/lib/i18n';
import { normalizeLang } from '@/lib/i18n';

type PageProps = {
  params: { lang: string; slug: string };
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

function getBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (fromEnv) return fromEnv;
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

async function fetchPost(slug: string): Promise<ApiPostResponse | null> {
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/post/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as ApiPostResponse;
  } catch {
    return null;
  }
}

function siteOrigin(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = normalizeLang(params.lang) as Lang;
  const slug = params.slug;

  const json = await fetchPost(slug);

  if (!json || !json.ok || !json.post) {
    return {
      title: lang === 'pt' ? 'Artigo não encontrado' : 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  const post = json.post;

  const origin = siteOrigin();
  const url = `${origin}/${lang}/blog/${post.slug}`;
  const canonical = `/${lang}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: {
      canonical,
      languages: {
        'pt-PT': `/pt/blog/${post.slug}`,
        en: `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      url,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const lang = normalizeLang(params.lang) as Lang;
  const slug = params.slug;

  if (!slug) notFound();

  const json = await fetchPost(slug);
  const post = json && json.ok && json.post ? json.post : null;

  if (!post) notFound();

  const origin = siteOrigin();
  const url = `${origin}/${lang}/blog/${post.slug}`;

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

      <BlogArticle slug={slug} lang={lang} />
    </main>
  );
}
