// src/components/portfolio/PortfolioAchievementsClient.tsx

'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { PublicAchievement } from '@/lib/portfolio/getAchievements';
import type { Lang } from '@/lib/i18n';
import { getPortfolioDict } from '@/lib/i18n/portfolio';

type Props = {
  lang: Lang;
  items: PublicAchievement[];
};

type PaginationModel = {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  showEllipsis: boolean;
};

function buildPagination(currentPage: number, totalPages: number): PaginationModel {
  if (totalPages <= 1) {
    return { currentPage, totalPages, pageNumbers: [1], showEllipsis: false };
  }

  const pageNumbers: number[] = [];
  pageNumbers.push(1);

  if (totalPages >= 2) pageNumbers.push(2);

  const showEllipsis = totalPages > 2;
  return { currentPage, totalPages, pageNumbers, showEllipsis };
}

export default function PortfolioAchievementsClient({ lang, items }: Props) {
  const dict = useMemo(() => getPortfolioDict(lang), [lang]);

  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const visibleCards = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, safePage]);

  const pagination = useMemo(() => buildPagination(safePage, totalPages), [safePage, totalPages]);

  function goPrev() {
    setPage((p) => Math.max(1, p - 1));
  }

  function goNext() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  function goTo(target: number) {
    setPage(() => Math.min(Math.max(1, target), totalPages));
  }

  const hasItems = items.length > 0;

  return (
    <section className='portfolio_achievements' aria-labelledby='portfolio_achievements_heading'>
      <div className='portfolio_achievements__container site-container'>
        <header className='portfolio_achievements__header'>
          <h2 id='portfolio_achievements_heading' className='portfolio_achievements__title'>
            {dict.achievements.title}
          </h2>

          <p className='portfolio_achievements__lead'>{dict.achievements.lead}</p>
        </header>

        {hasItems ? (
          <>
            <div className='portfolio_achievements__grid' role='list'>
              {visibleCards.map((card) => (
                <article key={card.id} className='portfolio_achievements__card' role='listitem'>
                  {card.imageUrl ? (
                    <div className='portfolio_achievements__card_media' aria-hidden='true'>
                      <Image
                        className='portfolio_achievements__card_image'
                        src={card.imageUrl}
                        alt=''
                        width={900}
                        height={600}
                        loading='lazy'
                      />
                    </div>
                  ) : null}

                  <h3 className='portfolio_achievements__card_title'>{card.title}</h3>

                  {card.dateLabel ? (
                    <p className='portfolio_achievements__card_meta'>{card.dateLabel}</p>
                  ) : null}

                  {card.description ? (
                    <p className='portfolio_achievements__card_text'>{card.description}</p>
                  ) : null}
                </article>
              ))}
            </div>

            <nav
              className='portfolio_achievements__pagination'
              aria-label={dict.achievements.pagerLabel}>
              <button
                type='button'
                className='portfolio_achievements__page_btn'
                onClick={goPrev}
                disabled={safePage === 1}
                aria-label={dict.achievements.prev}>
                ‹
              </button>

              <div className='portfolio_achievements__page_numbers' aria-label='Páginas'>
                {pagination.pageNumbers.map((n) => (
                  <button
                    key={n}
                    type='button'
                    className={[
                      'portfolio_achievements__page_num',
                      n === safePage ? 'portfolio_achievements__page_num_active' : '',
                    ].join(' ')}
                    onClick={() => goTo(n)}
                    aria-current={n === safePage ? 'page' : undefined}>
                    {n}
                  </button>
                ))}

                {pagination.showEllipsis ? (
                  <span className='portfolio_achievements__page_ellipsis' aria-hidden='true'>
                    ...
                  </span>
                ) : null}
              </div>

              <button
                type='button'
                className='portfolio_achievements__page_btn'
                onClick={goNext}
                disabled={safePage === totalPages}
                aria-label={dict.achievements.next}>
                ›
              </button>
            </nav>
          </>
        ) : (
          <p className='portfolio_achievements__empty'>{dict.achievements.empty}</p>
        )}
      </div>
    </section>
  );
}
