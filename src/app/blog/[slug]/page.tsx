// src/app/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/BlogArticle';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) return { title: 'Artigo não encontrado' };

    const json = (await res.json()) as {
      ok: boolean;
      post?: { title: string; excerpt: string | null; coverImageUrl: string | null };
    };
    if (!json.ok || !json.post) return { title: 'Artigo não encontrado' };

    return {
      title: json.post.title,
      description: json.post.excerpt || undefined,
      openGraph: json.post.coverImageUrl
        ? {
            title: json.post.title,
            description: json.post.excerpt || '',
            images: [{ url: json.post.coverImageUrl }],
          }
        : undefined,
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
