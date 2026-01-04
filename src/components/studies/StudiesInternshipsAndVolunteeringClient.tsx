// src/components/studies/StudiesInternshipsAndVolunteeringClient.tsx

'use client';

import Link from 'next/link';
import { useMemo, useState, useRef } from 'react';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';
import type { PublicPracticalExperience } from '@/lib/studies/getPracticalExperiences';

type Props = {
  lang: Lang;
  items: PublicPracticalExperience[];
};

const ITEMS_PER_PAGE = 3;

/**
 * Clean truncation for subtitles
 */
function pickSubtitle(item: PublicPracticalExperience) {
  const raw = item.summary || '';
  const text = raw.trim();
  if (!text) return '';
  if (text.length <= 90) return text;

  const trimmed = text.slice(0, 90);
  return `${trimmed.slice(0, Math.max(0, trimmed.lastIndexOf(' ')))}...`;
}

/**
 * Clean truncation for descriptions
 */
function pickDescription(item: PublicPracticalExperience) {
  const raw = item.content || '';
  const text = raw.trim();
  if (!text) return '';
  if (text.length <= 160) return text;

  const trimmed = text.slice(0, 160);
  return `${trimmed.slice(0, Math.max(0, trimmed.lastIndexOf(' ')))}...`;
}

export default function StudiesInternshipsAndVolunteeringClient({ lang, items }: Props) {
  const dict = getStudiesDict(lang);
  const base = `/${lang}`;
  const sectionRef = useRef<HTMLElement>(null);

  // Memoize safe items array to prevent unnecessary re-computations
  const safe = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(safe.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const visibleItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return safe.slice(start, start + ITEMS_PER_PAGE);
  }, [safe, safePage]);

  /**
   * Handles pagination and scrolls back to section header for better UX
   */
  function goTo(next: number) {
    const target = Math.min(Math.max(1, next), totalPages);
    setPage(target);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const isPrevDisabled = safePage <= 1;
  const isNextDisabled = safePage >= totalPages;

  return (
    <section
      ref={sectionRef}
      className='studies_internships'
      aria-labelledby='studies_internships_heading'>
      <div className='studies_internships__container site-container site-container--wide'>
        <header className='studies_internships__header'>
          <h2 id='studies_internships_heading' className='studies_internships__title'>
            {dict.internships.title}
          </h2>
          <p className='studies_internships__subtitle'>{dict.internships.subtitle}</p>
        </header>

        {safe.length === 0 ? (
          <p className='studies_internships__subtitle'>{dict.internships.empty}</p>
        ) : (
          <>
            <div className='studies_internships__grid' role='list'>
              {visibleItems.map((item) => (
                <article key={item.id} className='studies_internships__card' role='listitem'>
                  <h3 className='studies_internships__card_title'>{item.title}</h3>

                  <p className='studies_internships__card_subtitle'>
                    {pickSubtitle(item) || dict.internships.fallbackSubtitle}
                  </p>

                  <p className='studies_internships__card_text'>
                    {pickDescription(item) || dict.internships.fallbackDescription}
                  </p>

                  <div className='studies_internships__card_footer'>
                    <Link
                      className='studies_internships__card_link'
                      href={`${base}/studies/practical-experiences/${item.slug}`}
                      aria-label={`${dict.internships.btnDetail}: ${item.title}`}>
                      {dict.internships.btnDetail}
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className='studies_internships__footer'>
              <nav
                className='studies_internships__pagination'
                aria-label={dict.internships.pagination.aria}>
                <button
                  type='button'
                  className='studies_internships__page_btn'
                  onClick={() => goTo(safePage - 1)}
                  disabled={isPrevDisabled}
                  aria-label={dict.internships.pagination.prev}>
                  ‹
                </button>

                {/* Pagination logic: Only shows page numbers if needed */}
                <button
                  type='button'
                  className='studies_internships__page_btn'
                  onClick={() => goTo(1)}
                  aria-current={safePage === 1 ? 'page' : undefined}>
                  1
                </button>

                {totalPages >= 2 && (
                  <button
                    type='button'
                    className='studies_internships__page_btn'
                    onClick={() => goTo(2)}
                    aria-current={safePage === 2 ? 'page' : undefined}>
                    2
                  </button>
                )}

                {totalPages > 2 && (
                  <span className='studies_internships__page_ellipsis' aria-hidden='true'>
                    {dict.internships.pagination.ellipsis}
                  </span>
                )}

                <button
                  type='button'
                  className='studies_internships__page_btn'
                  onClick={() => goTo(safePage + 1)}
                  disabled={isNextDisabled}
                  aria-label={dict.internships.pagination.next}>
                  ›
                </button>
              </nav>

              <div className='studies_internships__cta'>
                <Link
                  className='studies_internships__cta_btn'
                  href={`${base}/studies/practical-experiences`}>
                  {dict.internships.ctaAll}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
