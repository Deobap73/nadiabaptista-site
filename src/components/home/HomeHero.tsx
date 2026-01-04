// src/components/home/HomeHero.tsx

'use client';

import Image from 'next/image';
import { homeImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { getHomeDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeHero({ lang }: Props) {
  const dict = getHomeDict(lang);

  return (
    <section className='home-hero' aria-labelledby='home-hero-heading'>
      <div className='home-hero__desktop'>
        <div className='home-hero__bg-full' />

        <div className='home-hero__container site-container site-container--wide'>
          <div className='home-hero__inner'>
            <div className='home-hero__content'>
              <div className='home-hero__image-wrapper'>
                <Image
                  src={homeImages.heroDesktop}
                  alt={dict.hero.imageAltDesktop}
                  width={480}
                  height={600}
                  className='home-hero__image'
                  sizes='(min-width: 1024px) 480px, 100vw'
                  priority
                />
              </div>

              <div className='home-hero__text'>
                <p className='home-hero__name-prefix'>{dict.hero.namePrefix}</p>
                <h1 id='home-hero-heading' className='home-hero__heading'>
                  {dict.hero.heading}
                </h1>
                <div className='home-hero__divider' />
                <p className='home-hero__description'>{dict.hero.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='home-hero__mobile'>
        <div className='home-hero__mobile-image-wrapper'>
          <Image
            src={homeImages.heroMobile}
            alt={dict.hero.imageAltMobile}
            width={480}
            height={600}
            className='home-hero__mobile-image'
            sizes='100vw'
            priority
          />
        </div>
      </div>
    </section>
  );
}
