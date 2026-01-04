// src/components/about/AboutMyStorie.tsx

import Image from 'next/image';
import { aboutImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { aboutCopy } from '@/lib/i18n/about';

type Props = {
  lang: Lang;
};

export default function AboutMyStorie({ lang }: Props) {
  const t = aboutCopy[lang];

  return (
    <section className='about_mystorie' aria-labelledby='about_mystorie_heading'>
      <div className='about_mystorie__container'>
        <header className='about_mystorie__intro'>
          <h2 id='about_mystorie_heading' className='about_mystorie__title'>
            {t.myStorie.title.split('\n').map((line, idx) => (
              <span key={String(idx)}>
                {line}
                <br />
              </span>
            ))}
          </h2>
        </header>

        <div className='about_mystorie__top'>
          <p className='about_mystorie__text'>
            {t.myStorie.topText.split('\n').map((line, idx) => (
              <span key={String(idx)}>
                {line}
                <br />
              </span>
            ))}
          </p>

          <div className='about_mystorie__image_top'>
            <Image
              src={aboutImages.aboutMyStorie1}
              alt={t.myStorie.imageTopAlt}
              width={980}
              height={640}
              className='about_mystorie__img'
              sizes='(min-width: 1024px) 560px, 100vw'
            />
          </div>
        </div>

        <div className='about_mystorie__bottom'>
          <div className='about_mystorie__image_bottom'>
            <Image
              src={aboutImages.aboutMyStorie2}
              alt={t.myStorie.imageBottomAlt}
              width={980}
              height={640}
              className='about_mystorie__img'
              sizes='(min-width: 1024px) 620px, 100vw'
            />
          </div>

          <div className='about_mystorie__panel'>
            <p className='about_mystorie__panel_text'>
              {t.myStorie.bottomText.split('\n').map((line, idx) => (
                <span key={String(idx)}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
