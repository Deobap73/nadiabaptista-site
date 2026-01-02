// src/app/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/BlogArticle';
import { blogPostJsonLd, toJsonLd } from '@/lib/seo/jsonLd';

type PageProps = {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const json = await fetchPost(slug);

  if (!json || !json.ok || !json.post) {
    return { title: 'Artigo não encontrado' };
  }

  const url = `https://nadiabaptista.pt/blog/${json.post.slug}`;

  return {
    title: json.post.title,
    description: json.post.excerpt || undefined,
    alternates: { canonical: `/blog/${json.post.slug}` },
    openGraph: {
      title: json.post.title,
      description: json.post.excerpt || '',
      url,
      images: json.post.coverImageUrl ? [{ url: json.post.coverImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const json = await fetchPost(slug);

  const post = json && json.ok && json.post ? json.post : null;

  const url = post ? `https://nadiabaptista.pt/blog/${post.slug}` : `https://nadiabaptista.pt/blog`;

  const jsonLd = post
    ? blogPostJsonLd({
        title: post.title,
        description: post.excerpt,
        url,
        image: post.coverImageUrl,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
      })
    : null;

  return (
    <main className='blog_post_page'>
      {jsonLd ? (
        <Script
          id='jsonld-blogpost'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
        />
      ) : null}

      <BlogArticle slug={slug} />
    </main>
  );
}
