// src/app/blog/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockPosts } from '../../../lib/blog/mockPosts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post not found · Blog · Nadia Baptista',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  return {
    title: `${post.title} · Blog · Nadia Baptista`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.publishedAt);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const paragraphs = post.content.split('\n\n');

  return (
    <main className='pageContainer'>
      <article className='blogPost' aria-labelledby='blogPostTitle'>
        <header className='blogPostHeader'>
          <p className='pageKicker'>Blog</p>
          <h1 id='blogPostTitle' className='blogPostTitle'>
            {post.title}
          </h1>

          <p className='blogPostMeta'>
            <span className='blogPostDate'>{formattedDate}</span>
            <span className='blogPostDot'>•</span>
            <span className='blogPostReading'>{post.readingTimeMinutes} min read</span>
          </p>

          {post.tags.length > 0 && (
            <ul className='blogPostTags' aria-label='Tags'>
              {post.tags.map((tag) => (
                <li key={tag} className='blogPostTag'>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className='blogPostHero'>
          <div className='blogPostHeroImageWrap'>
            <Image
              src={post.heroImageUrl}
              alt={post.title}
              fill
              sizes='(max-width: 768px) 100vw, 800px'
              className='blogPostHeroImage'
              priority={post.featured}
            />
          </div>
        </div>

        <section className='blogPostContent'>
          {paragraphs.map((para, index) => (
            <p key={index} className='blogPostParagraph'>
              {para}
            </p>
          ))}
        </section>
      </article>
    </main>
  );
}
