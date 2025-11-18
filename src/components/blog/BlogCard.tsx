// src/components/blog/BlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt);

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className='blogCard'>
      <Link href={`/blog/${post.slug}`} className='blogCardLink'>
        <div className='blogCardImageWrap'>
          <Image
            src={post.heroImageUrl}
            alt={post.title}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            className='blogCardImage'
            priority={post.featured}
          />
        </div>

        <div className='blogCardBody'>
          <p className='blogCardMeta'>
            <span className='blogCardDate'>{formattedDate}</span>
            <span className='blogCardDot'>•</span>
            <span className='blogCardReading'>{post.readingTimeMinutes} min read</span>
          </p>

          <h3 className='blogCardTitle'>{post.title}</h3>

          <p className='blogCardExcerpt'>{post.excerpt}</p>

          {post.tags.length > 0 && (
            <ul className='blogCardTags' aria-label='Tags'>
              {post.tags.map((tag) => (
                <li key={tag} className='blogCardTag'>
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </article>
  );
}
