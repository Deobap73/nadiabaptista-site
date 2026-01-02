// src/app/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/BlogArticle';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

function getBaseUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
  if (fromEnv) return fromEnv;
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = getBaseUrl();

  try {
    const res = await fetch(`${baseUrl}/api/post/${slug}`, { cache: 'no-store' });
    if (!res.ok) return { title: 'Artigo não encontrado' };

    const json = (await res.json()) as {
      ok: boolean;
      post?: { title: string; excerpt: string | null; coverImageUrl: string | null; slug: string };
    };

    if (!json.ok || !json.post) return { title: 'Artigo não encontrado' };

    return {
      title: json.post.title,
      description: json.post.excerpt || undefined,
      alternates: {
        canonical: `/blog/${json.post.slug}`,
      },
      openGraph: {
        title: json.post.title,
        description: json.post.excerpt || '',
        url: `https://nadiabaptista.pt/blog/${json.post.slug}`,
        images: json.post.coverImageUrl ? [{ url: json.post.coverImageUrl }] : undefined,
      },
    };
  } catch {
    return { title: 'Artigo' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <main className='blog_post_page'>
      <BlogArticle slug={slug} />
    </main>
  );
}
