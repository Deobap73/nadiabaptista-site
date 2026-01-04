// src/components/about/AboutHero.tsx

import Image from 'next/image';
import Link from 'next/link';
import { aboutImages } from '../../lib/images';
import type { Lang } from '@/lib/i18n';
import { aboutCopy } from '@/lib/i18n/about';

type Props = {
  lang: Lang;
};

export default function AboutHero({ lang }: Props) {
  const t = aboutCopy[lang];

  return (
    <section className='about_hero' aria-labelledby='about_hero_title'>
      <div className='site-container site-container--wide'>
        <div className='about_hero__grid'>
          <div className='about_hero__media'>
            {/*  Decorative background element */}
            <div className='about_hero__bg' aria-hidden='true' />

            <div className='about_hero__image_wrap'>
              {/* Desktop version - priority enabled for LCP */}
              <div className='about_hero__image_desktop'>
                <Image
                  src={aboutImages.aboutHeroDesktop}
                  alt={t.hero.imageAlt}
                  width={920}
                  height={1100}
                  priority
                  className='about_hero__image'
                  sizes='(min-width: 1024px) 50vw, 100vw'
                />
              </div>

              {/* Mobile version */}
              <div className='about_hero__image_mobile'>
                <Image
                  src={aboutImages.aboutHeroMobile}
                  alt={t.hero.imageAlt}
                  width={920}
                  height={1100}
                  priority
                  className='about_hero__image'
                  sizes='100vw'
                />
              </div>
            </div>
          </div>

          <div className='about_hero__content'>
            <h1 id='about_hero_title' className='about_hero__title'>
              {t.hero.title}
            </h1>

            <div className='about_hero__divider' aria-hidden='true' />

            <div className='about_hero__text'>
              {/* Properly mapping multi-line text from dictionary */}
              {t.hero.text.split('\n').map((line, idx) => (
                <p key={`hero_line_${idx}`}>{line}</p>
              ))}
            </div>

            <Link className='about_hero__cta' href={`/${lang}/contact`}>
              {t.hero.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
