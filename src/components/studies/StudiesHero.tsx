// src/components/studies/StudiesHero.tsx

import Image from 'next/image';
import { studiesImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function StudiesHero({ lang }: Props) {
  const dict = getStudiesDict(lang);

  return (
    <section className='studies_hero' aria-labelledby='studies_hero_heading'>
      <div className='studies_hero__container site-container site-container--wide'>
        <div className='studies_hero__layout'>
          <div className='studies_hero__card'>
            <h1 id='studies_hero_heading' className='studies_hero__title'>
              {dict.hero.title.split('\n').map((line, i) => (
                <span key={`t_${i}`}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>

            <div className='studies_hero__text'>
              <p>{dict.hero.p1}</p>
              <p>{dict.hero.p2}</p>
            </div>
          </div>

          <div className='studies_hero__media'>
            <Image
              src={studiesImages.studiesHeroDesktop}
              alt='Estudo e investigação em ambiente académico'
              fill
              className='studies_hero__image'
              sizes='(min-width: 1024px) 50vw, 100vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
