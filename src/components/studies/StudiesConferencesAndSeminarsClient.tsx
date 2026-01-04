// src/components/studies/StudiesConferencesAndSeminarsClient.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';
import type { PublicConference } from '@/lib/studies/getConferences';

type Props = {
  lang: Lang;
  items: PublicConference[];
};

function pickSafe(items: PublicConference[]) {
  return Array.isArray(items) ? items : [];
}

export default function StudiesConferencesAndSeminarsClient({ lang, items }: Props) {
  const dict = getStudiesDict(lang);
  const base = `/${lang}`;
  const safe = useMemo(() => pickSafe(items), [items]);

  const recent = safe[0];
  const image2 = safe[1];
  const image4 = safe[2];
  const image3 = safe[3];

  if (!recent) {
    return (
      <section className='studies_conferences' aria-labelledby='studies_conferences_heading'>
        <div className='studies_conferences__container site-container site-container--wide'>
          <div className='studies_conferences__grid'>
            <header className='studies_conferences__intro'>
              <h2 id='studies_conferences_heading' className='studies_conferences__title'>
                {dict.conferences.title.split('\n').map((line, i) => (
                  <span key={`c_${i}`}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>

              <p className='studies_conferences__text'>{dict.conferences.empty}</p>
            </header>

            <div className='studies_conferences__cta'>
              <Link href={`${base}/studies/conferences`} className='studies_conferences__button'>
                {dict.conferences.ctaAll}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='studies_conferences' aria-labelledby='studies_conferences_heading'>
      <div className='studies_conferences__container site-container site-container--wide'>
        <div className='studies_conferences__grid'>
          <header className='studies_conferences__intro'>
            <h2 id='studies_conferences_heading' className='studies_conferences__title'>
              {dict.conferences.title.split('\n').map((line, i) => (
                <span key={`c2_${i}`}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>

            <p className='studies_conferences__text'>{dict.conferences.subtitle}</p>
          </header>

          <Link
            href={`${base}/studies/conferences/${recent.slug}`}
            className='studies_conferences__card studies_conferences__card_recent'
            aria-label={recent.title}>
            {recent.imageUrl ? (
              <Image
                src={recent.imageUrl}
                alt=''
                fill
                sizes='(min-width: 1024px) 360px, 92vw'
                className='studies_conferences__image'
              />
            ) : null}
          </Link>

          {image2 ? (
            <Link
              href={`${base}/studies/conferences/${image2.slug}`}
              className='studies_conferences__card studies_conferences__card_2'
              aria-label={image2.title}>
              {image2.imageUrl ? (
                <Image
                  src={image2.imageUrl}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 360px, 92vw'
                  className='studies_conferences__image'
                />
              ) : null}
            </Link>
          ) : null}

          {image3 ? (
            <Link
              href={`${base}/studies/conferences/${image3.slug}`}
              className='studies_conferences__card studies_conferences__card_3'
              aria-label={image3.title}>
              {image3.imageUrl ? (
                <Image
                  src={image3.imageUrl}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 360px, 92vw'
                  className='studies_conferences__image'
                />
              ) : null}
            </Link>
          ) : null}

          {image4 ? (
            <Link
              href={`${base}/studies/conferences/${image4.slug}`}
              className='studies_conferences__card studies_conferences__card_4'
              aria-label={image4.title}>
              {image4.imageUrl ? (
                <Image
                  src={image4.imageUrl}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 360px, 92vw'
                  className='studies_conferences__image'
                />
              ) : null}
            </Link>
          ) : null}

          <div className='studies_conferences__cta'>
            <Link href={`${base}/studies/conferences`} className='studies_conferences__button'>
              {dict.conferences.ctaAll}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
