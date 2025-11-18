// src/app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockPosts } from '../../../lib/blog/mockPosts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // In newer Next versions, params is a Promise in dev
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
