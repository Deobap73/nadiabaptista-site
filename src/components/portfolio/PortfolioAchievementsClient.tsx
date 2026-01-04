// src/components/portfolio/PortfolioAchievementsClient.tsx

'use client';

import Image from 'next/image';
import { useMemo, useState, useRef } from 'react';
import type { PublicAchievement } from '@/lib/portfolio/getAchievements';
import type { Lang } from '@/lib/i18n';
import { getPortfolioDict } from '@/lib/i18n/portfolio';

type Props = {
  lang: Lang;
  items: PublicAchievement[];
};

export default function PortfolioAchievementsClient({ lang, items }: Props) {
  const dict = useMemo(() => getPortfolioDict(lang), [lang]);
  const sectionRef = useRef<HTMLElement>(null);

  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  // English: Ensure items is an array and compute totals
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const totalPages = Math.max(1, Math.ceil(safeItems.length / itemsPerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const visibleCards = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return safeItems.slice(start, start + itemsPerPage);
  }, [safeItems, safePage]);

  /**
   * English: Handles page navigation and scrolls back to the section top for better UX
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
      className='portfolio_achievements'
      aria-labelledby='portfolio_achievements_heading'>
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
                  {card.imageUrl && (
                    <div className='portfolio_achievements__card_media' aria-hidden='true'>
                      <Image
                        className='portfolio_achievements__card_image'
                        src={card.imageUrl}
                        alt={card.title}
                        width={900}
                        height={600}
                        loading='lazy'
                      />
                    </div>
                  )}

                  <h3 className='portfolio_achievements__card_title'>{card.title}</h3>

                  {card.dateLabel && (
                    <p className='portfolio_achievements__card_meta'>{card.dateLabel}</p>
                  )}

                  {card.description && (
                    <p className='portfolio_achievements__card_text'>{card.description}</p>
                  )}
                </article>
              ))}
            </div>

            <nav
              className='portfolio_achievements__pagination'
              aria-label={dict.achievements.pagerLabel}>
              <button
                type='button'
                className='portfolio_achievements__page_btn'
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                aria-label={dict.achievements.prev}>
                ‹
              </button>

              <div className='portfolio_achievements__page_numbers'>
                {/* English: Dynamic page number rendering */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type='button'
                    className={`portfolio_achievements__page_num ${
                      n === safePage ? 'portfolio_achievements__page_num_active' : ''
                    }`}
                    onClick={() => handlePageChange(n)}
                    aria-current={n === safePage ? 'page' : undefined}>
                    {n}
                  </button>
                ))}
              </div>

              <button
                type='button'
                className='portfolio_achievements__page_btn'
                onClick={() => handlePageChange(safePage + 1)}
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
