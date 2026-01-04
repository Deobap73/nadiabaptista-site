// src/components/portfolio/PortfolioDiplomasClient.tsx

'use client';

import Image from 'next/image';
import { useMemo, useState, useRef } from 'react';
import type { PublicDiploma } from '@/lib/portfolio/getDiplomas';
import type { Lang } from '@/lib/i18n';
import { getPortfolioDict } from '@/lib/i18n/portfolio';

type Props = {
  lang: Lang;
  items: PublicDiploma[];
};

export default function PortfolioDiplomasClient({ lang, items }: Props) {
  const dict = useMemo(() => getPortfolioDict(lang), [lang]);
  const sectionRef = useRef<HTMLElement>(null);

  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  // Ensure safe access to items array
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const totalPages = Math.max(1, Math.ceil(safeItems.length / itemsPerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const visibleCards = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return safeItems.slice(start, start + itemsPerPage);
  }, [safeItems, safePage]);

  /**
   * Handles pagination navigation and ensures the user is scrolled back
   * to the top of the section.
   */
  const handlePageChange = (target: number) => {
    const destination = Math.min(Math.max(1, target), totalPages);
    setPage(destination);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasItems = safeItems.length > 0;

  return (
    <section
      ref={sectionRef}
      className='portfolio_diplomas'
      aria-labelledby='portfolio_diplomas_heading'>
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
                  {card.imageUrl && (
                    <div className='portfolio_diplomas__card_media' aria-hidden='true'>
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        width={480}
                        height={320}
                        className='portfolio_diplomas__card_image'
                        loading='lazy'
                      />
                    </div>
                  )}

                  <h3 className='portfolio_diplomas__card_title'>{card.title}</h3>

                  {card.description && (
                    <p className='portfolio_diplomas__card_text'>{card.description}</p>
                  )}
                </article>
              ))}
            </div>

            <nav className='portfolio_diplomas__pagination' aria-label={dict.diplomas.pagerLabel}>
              <button
                type='button'
                className='portfolio_diplomas__page_btn'
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                aria-label={dict.diplomas.prev}>
                ‹
              </button>

              <div className='portfolio_achievements__page_numbers'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type='button'
                    className={`portfolio_diplomas__page_num ${
                      n === safePage ? 'portfolio_diplomas__page_num_active' : ''
                    }`}
                    onClick={() => handlePageChange(n)}
                    aria-current={n === safePage ? 'page' : undefined}>
                    {n}
                  </button>
                ))}
              </div>

              <button
                type='button'
                className='portfolio_diplomas__page_btn'
                onClick={() => handlePageChange(safePage + 1)}
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
