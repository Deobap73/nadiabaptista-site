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

/**
 * Ensures items is always a valid array
 */
function pickSafe(items: PublicConference[]): PublicConference[] {
  return Array.isArray(items) ? items : [];
}

/**
 * Separate component declared outside to avoid re-creation during render
 * This follows React best practices for performance and state consistency
 */
function ConferenceTitle({ title, idPrefix }: { title: string; idPrefix: string }) {
  return (
    <h2 id='studies_conferences_heading' className='studies_conferences__title'>
      {title.split('\n').map((line, i) => (
        <span key={`${idPrefix}_${i}`}>
          {line}
          <br />
        </span>
      ))}
    </h2>
  );
}

export default function StudiesConferencesAndSeminarsClient({ lang, items }: Props) {
  const dict = getStudiesDict(lang);
  const base = `/${lang}`;

  // Memoize the safe array to prevent unnecessary re-renders
  const safe = useMemo(() => pickSafe(items), [items]);

  // Destructure top items for the grid
  const [recent, image2, image4, image3] = safe;

  // Empty state handler
  if (!recent) {
    return (
      <section className='studies_conferences' aria-labelledby='studies_conferences_heading'>
        <div className='studies_conferences__container site-container site-container--wide'>
          <div className='studies_conferences__grid'>
            <header className='studies_conferences__intro'>
              <ConferenceTitle title={dict.conferences.title} idPrefix='empty' />
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
    <section
      className='studies_conferences'
      id='conferences'
      aria-labelledby='studies_conferences_heading'>
      <div className='studies_conferences__container site-container site-container--wide'>
        <div className='studies_conferences__grid'>
          <header className='studies_conferences__intro'>
            <ConferenceTitle title={dict.conferences.title} idPrefix='active' />
            <p className='studies_conferences__text'>{dict.conferences.subtitle}</p>
          </header>

          {/* Main featured conference */}
          <Link
            href={`${base}/studies/conferences/${recent.slug}`}
            className='studies_conferences__card studies_conferences__card_recent'
            aria-label={recent.title}>
            {recent.imageUrl && (
              <Image
                src={recent.imageUrl}
                alt={recent.title}
                fill
                priority
                sizes='(min-width: 1024px) 360px, 92vw'
                className='studies_conferences__image'
              />
            )}
          </Link>

          {/* Secondary conferences grid mapping */}
          {[image2, image3, image4].map(
            (item, idx) =>
              item && (
                <Link
                  key={item.id}
                  href={`${base}/studies/conferences/${item.slug}`}
                  className={`studies_conferences__card studies_conferences__card_${idx + 2}`}
                  aria-label={item.title}>
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes='(min-width: 1024px) 360px, 92vw'
                      className='studies_conferences__image'
                    />
                  )}
                </Link>
              )
          )}

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
