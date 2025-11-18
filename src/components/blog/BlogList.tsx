// src/components/blog/BlogList.tsx

import type { BlogPost } from '../../types/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  if (!posts.length) {
    return (
      <p className='blogEmpty'>
        There are no texts published yet. This space will gather notes and reflections as Nadia
        keeps studying and writing.
      </p>
    );
  }

  const sortedPosts = [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <section className='blogListSection' aria-labelledby='blogListTitle'>
      <header className='blogListHeader'>
        <p className='pageKicker'>Blog</p>
        <h1 id='blogListTitle' className='pageTitle'>
          Notes and reflections along the way
        </h1>
        <p className='pageIntro'>
          This blog gathers short texts written during the years of study. The idea is not to give
          answers, but to share questions, readings and thoughts that appear along the path.
        </p>
      </header>

      <div className='blogListGrid'>
        {sortedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
