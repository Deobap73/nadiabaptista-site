// src/components/about/AboutMyStory.tsx

import Image from 'next/image';
import { aboutImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { aboutCopy } from '@/lib/i18n/about';

type Props = {
  lang: Lang;
};

export default function AboutMyStory({ lang }: Props) {
  const t = aboutCopy[lang];

  return (
    <section className='about_mystory' aria-labelledby='about_mystory_heading'>
      <div className='about_mystory__container'>
        <header className='about_mystory__intro'>
          <h2 id='about_mystory_heading' className='about_mystory__title'>
            {/* English: Explicitly typing arguments to avoid implicit 'any' */}
            {t.myStory.title.split('\n').map((line: string, idx: number) => (
              <span key={`title_${idx}`}>
                {line}
                <br />
              </span>
            ))}
          </h2>
        </header>

        <div className='about_mystory__top'>
          <div className='about_mystory__text'>
            {t.myStory.topText.split('\n').map((line: string, idx: number) => (
              <p key={`top_text_${idx}`}>{line}</p>
            ))}
          </div>

          <div className='about_mystory__image_top'>
            <Image
              src={aboutImages.aboutMystory1} // Verify if your lib/images uses 'aboutMyStorie1' or 'aboutMystory1'
              alt={t.myStory.imageTopAlt}
              width={980}
              height={640}
              className='about_mystory__img'
              sizes='(min-width: 1024px) 560px, 100vw'
              loading='lazy'
            />
          </div>
        </div>

        <div className='about_mystory__bottom'>
          <div className='about_mystory__image_bottom'>
            <Image
              src={aboutImages.aboutMystory2}
              alt={t.myStory.imageBottomAlt}
              width={980}
              height={640}
              className='about_mystory__img'
              sizes='(min-width: 1024px) 620px, 100vw'
              loading='lazy'
            />
          </div>

          <div className='about_mystory__panel'>
            <div className='about_mystory__panel_text'>
              {t.myStory.bottomText.split('\n').map((line: string, idx: number) => (
                <p key={`bottom_text_${idx}`}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
