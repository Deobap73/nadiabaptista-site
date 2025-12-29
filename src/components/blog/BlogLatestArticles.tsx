// src/components/blog/BlogLatestArticles.tsx

import type { BlogPostPublic } from '@/types/blog';
import BlogCard from './BlogCard';
import Link from 'next/link';

type Props = {
  posts: BlogPostPublic[];
};

export default function BlogLatestArticles({ posts }: Props) {
  const ordered = [...posts].sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bTime - aTime;
  });

  const [main, ...rest] = ordered.slice(0, 4);

  if (!main) return null;

  return (
    <section className='blog_latest'>
      <header className='blog_latest__header'>
        <h2 className='blog_latest__title'>Últimos Artigos</h2>
        <Link href='/blog' className='blog_latest__link'>
          Mais informações
        </Link>
      </header>

      <div className='blog_latest__layout'>
        <div className='blog_latest__main'>
          <BlogCard post={main} variant='featured' />
        </div>

        <div className='blog_latest__side'>
          {rest.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
