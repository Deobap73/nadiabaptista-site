// src/app/[lang]/blog/page.tsx

import BlogHero from '@/components/blog/BlogHero';
import BlogList from '@/components/blog/BlogList';
import HomeNewsletterBanner from '@/components/home/HomeNewsletterBanner';
import type { Lang } from '@/lib/i18n';

type Props = {
  params: { lang: Lang };
};

export default function BlogPage({ params }: Props) {
  const lang = params.lang;

  return (
    <main className='blog_page'>
      <BlogHero lang={lang} />
      <div className='blog_page__container site-container'>
        <BlogList lang={lang} />
      </div>
      <HomeNewsletterBanner lang={lang} />
    </main>
  );
}
