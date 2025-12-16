// src/components/blog/BlogList.tsx

import type { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

type BlogListProps = {
  posts: BlogPost[];
};

export default function BlogList({ posts }: BlogListProps) {
  const ordered = [...posts].sort((a, b) => {
    const da = new Date(a.publishedAt).getTime();
    const db = new Date(b.publishedAt).getTime();
    return db - da;
  });

  const featured = ordered.filter((p) => p.featured).slice(0, 2);
  const rest = ordered.filter((p) => !featured.some((f) => f.id === p.id));

  return (
    <section className='blog_list' aria-label='Artigos do blog'>
      {featured.length ? (
        <div className='blog_list__featured' aria-label='Artigos em destaque'>
          {featured.map((post) => (
            <BlogCard key={post.id} post={post} variant='featured' />
          ))}
        </div>
      ) : null}

      <div className='blog_list__grid' aria-label='Lista de artigos'>
        {rest.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
