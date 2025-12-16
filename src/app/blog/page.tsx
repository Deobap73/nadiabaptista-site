// src/app/blog/page.tsx

import BlogHero from '@/components/blog/BlogHero';
import BlogTopArticles from '@/components/blog/BlogTopArticles';
import BlogLatestArticles from '@/components/blog/BlogLatestArticles';
import { getAllPosts } from '@/lib/blog/posts';
import HomeNewsletterBanner from '@/components/home/HomeNewsletterBanner';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className='blog_page'>
      <BlogHero />
      <div className='blog_page__container site-container'>
        <BlogTopArticles posts={posts} />
        <BlogLatestArticles posts={posts} />

        <HomeNewsletterBanner />
      </div>
    </main>
  );
}
