// src/components/portfolio/PortfolioDiplomasClient.tsx

'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { PublicDiploma } from '@/lib/portfolio/getDiplomas';
import type { Lang } from '@/lib/i18n';
import { getPortfolioDict } from '@/lib/i18n/portfolio';

type Props = {
  lang: Lang;
  items: PublicDiploma[];
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

  const pageNumbers: number[] = [1];
  if (totalPages >= 2) pageNumbers.push(2);

  return {
    currentPage,
    totalPages,
    pageNumbers,
    showEllipsis: totalPages > 2,
  };
}

export default function PortfolioDiplomasClient({ lang, items }: Props) {
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
    setPage(Math.min(Math.max(1, target), totalPages));
  }

  const hasItems = items.length > 0;

  return (
    <section className='portfolio_diplomas' aria-labelledby='portfolio_diplomas_heading'>
      <div className='portfolio_diplomas__container site-container'>
        <header className='portfolio_diplomas__header'>
          <h2 id='portfolio_diplomas_heading' className='portfolio_diplomas__title'>
            {dict.diplomas.title}
          </h2>

          <p className='portfolio_diplomas__lead'>
            {dict.diplomas.leadLines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </header>

        {hasItems ? (
          <>
            <div className='portfolio_diplomas__grid' role='list'>
              {visibleCards.map((card) => (
                <article key={card.id} className='portfolio_diplomas__card' role='listitem'>
                  {card.imageUrl ? (
                    <div className='portfolio_diplomas__card_media' aria-hidden='true'>
                      <Image
                        src={card.imageUrl}
                        alt=''
                        width={480}
                        height={320}
                        className='portfolio_diplomas__card_image'
                      />
                    </div>
                  ) : null}

                  <h3 className='portfolio_diplomas__card_title'>{card.title}</h3>

                  {card.description ? (
                    <p className='portfolio_diplomas__card_text'>{card.description}</p>
                  ) : null}
                </article>
              ))}
            </div>

            <nav className='portfolio_diplomas__pagination' aria-label={dict.diplomas.pagerLabel}>
              <button
                type='button'
                className='portfolio_diplomas__page_btn'
                onClick={goPrev}
                disabled={safePage === 1}
                aria-label={dict.diplomas.prev}>
                ‹
              </button>

              <div className='portfolio_diplomas__page_numbers'>
                {pagination.pageNumbers.map((n) => (
                  <button
                    key={n}
                    type='button'
                    className={[
                      'portfolio_diplomas__page_num',
                      n === safePage ? 'portfolio_diplomas__page_num_active' : '',
                    ].join(' ')}
                    onClick={() => goTo(n)}
                    aria-current={n === safePage ? 'page' : undefined}>
                    {n}
                  </button>
                ))}

                {pagination.showEllipsis ? (
                  <span className='portfolio_diplomas__page_ellipsis'>...</span>
                ) : null}
              </div>

              <button
                type='button'
                className='portfolio_diplomas__page_btn'
                onClick={goNext}
                disabled={safePage === totalPages}
                aria-label={dict.diplomas.next}>
                ›
              </button>
            </nav>
          </>
        ) : (
          <p className='portfolio_diplomas__empty'>{dict.diplomas.empty}</p>
        )}
      </div>
    </section>
  );
}
