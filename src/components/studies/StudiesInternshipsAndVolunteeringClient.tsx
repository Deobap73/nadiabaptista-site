// src/components/studies/StudiesInternshipsAndVolunteeringClient.tsx

'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';
import type { PublicPracticalExperience } from '@/lib/studies/getPracticalExperiences';

type Props = {
  lang: Lang;
  items: PublicPracticalExperience[];
};

const ITEMS_PER_PAGE = 3;

function pickSubtitle(item: PublicPracticalExperience) {
  const raw = item.summary || '';
  const text = raw.trim();
  if (!text) return '';
  return text.length > 90 ? `${text.slice(0, 90).trim()}...` : text;
}

function pickDescription(item: PublicPracticalExperience) {
  const raw = item.content || '';
  const text = raw.trim();
  if (!text) return '';
  return text.length > 160 ? `${text.slice(0, 160).trim()}...` : text;
}

export default function StudiesInternshipsAndVolunteeringClient({ lang, items }: Props) {
  const dict = getStudiesDict(lang);
  const base = `/${lang}`;
  const safe = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(safe.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const visibleItems = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return safe.slice(start, start + ITEMS_PER_PAGE);
  }, [safe, safePage]);

  function goTo(next: number) {
    const target = Math.min(Math.max(1, next), totalPages);
    setPage(target);
  }

  const isPrevDisabled = safePage <= 1;
  const isNextDisabled = safePage >= totalPages;

  return (
    <section className='studies_internships' aria-labelledby='studies_internships_heading'>
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
                      href={`${base}/studies/practical-experiences/${item.slug}`}>
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

                <button
                  type='button'
                  className='studies_internships__page_btn'
                  onClick={() => goTo(1)}
                  aria-current={safePage === 1 ? 'page' : undefined}>
                  1
                </button>

                {totalPages >= 2 ? (
                  <button
                    type='button'
                    className='studies_internships__page_btn'
                    onClick={() => goTo(2)}
                    aria-current={safePage === 2 ? 'page' : undefined}>
                    2
                  </button>
                ) : null}

                {totalPages > 2 ? (
                  <span className='studies_internships__page_ellipsis' aria-hidden='true'>
                    {dict.internships.pagination.ellipsis}
                  </span>
                ) : null}

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
