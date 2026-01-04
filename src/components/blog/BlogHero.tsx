// src/components/blog/BlogHero.tsx

import Image from 'next/image';
import { blogImages } from '../../lib/images';
import type { Lang } from '@/lib/i18n';
import { getBlogDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function BlogHero({ lang }: Props) {
  const dict = getBlogDict(lang);

  return (
    <section className='blog_hero' aria-labelledby='blog_hero_heading'>
      <div className='blog_hero__container site-container site-container--wide'>
        <div className='blog_hero__grid'>
          <header className='blog_hero__content'>
            <p className='blog_hero__eyebrow'>{dict.hero.eyebrow}</p>

            <h1 id='blog_hero_heading' className='blog_hero__title'>
              {dict.hero.titleLine1}
              <br />
              {dict.hero.titleLine2}
            </h1>

            <div className='blog_hero__text'>
              <p>{dict.hero.p1}</p>
              <p>{dict.hero.p2}</p>
            </div>
          </header>

          <div className='blog_hero__media'>
            <div className='blog_hero__media_bg' aria-hidden='true' />
            <Image
              src={blogImages.blogHeroDesktop}
              alt={dict.hero.imageAlt}
              width={560}
              height={560}
              className='blog_hero__image'
              sizes='(min-width: 1024px) 560px, 100vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
