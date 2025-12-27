// src/app/blog/page.tsx

import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';
import HomeNewsletterBanner from '@/components/home/HomeNewsletterBanner';

export default function BlogPage() {
  return (
    <main className='blog_page'>
      <BlogHero />
      <div className='blog_page__container site-container'>
        <BlogList />
      </div>
      <HomeNewsletterBanner />
    </main>
  );
}
