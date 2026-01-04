// src/components/home/HomeAboutHighlight.tsx

import Image from 'next/image';
import Link from 'next/link';
import { homeImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { getHomeDict, withLangPrefix } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeAboutHighlight({ lang }: Props) {
  const dict = getHomeDict(lang);

  return (
    <section className='home-about-highlight' aria-labelledby='home-about-highlight-heading'>
      <div className='home-about-highlight__inner site-container site-container--wide'>
        <div className='home-about-highlight__media'>
          <div className='home-about-highlight__image-wrapper'>
            <Image
              src={homeImages.aboutDesktop}
              alt={dict.aboutHighlight.imageAlt}
              width={480}
              height={600}
              sizes='(min-width: 1024px) 480px, 100vw'
              className='home-about-highlight__image'
              priority
            />
          </div>
        </div>

        <div className='home-about-highlight__content'>
          <header className='home-about-highlight__header'>
            <h2 id='home-about-highlight-heading' className='home-about-highlight__title'>
              <span className='home-about-highlight__title-line'>{dict.aboutHighlight.title}</span>
            </h2>
            <span className='home-about-highlight__divider' aria-hidden='true' />
          </header>

          <p className='home-about-highlight__text'>{dict.aboutHighlight.text}</p>

          <Link
            href={withLangPrefix(lang, '/about')}
            className='home-about-highlight__button btn btn--primary'>
            {dict.aboutHighlight.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
