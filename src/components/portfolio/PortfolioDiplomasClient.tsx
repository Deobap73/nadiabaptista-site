// src/components/portfolio/PortfolioDiplomasClient.tsx

'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { PublicDiploma } from '@/lib/portfolio/getDiplomas';

type Props = {
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

  const pageNumbers: number[] = [];
  pageNumbers.push(1);

  if (totalPages >= 2) pageNumbers.push(2);

  const showEllipsis = totalPages > 2;
  return { currentPage, totalPages, pageNumbers, showEllipsis };
}

export default function PortfolioDiplomasClient({ items }: Props) {
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
    <section className='portfolio_diplomas' aria-labelledby='portfolio_diplomas_heading'>
      <div className='portfolio_diplomas__container site-container'>
        <header className='portfolio_diplomas__header'>
          <h2 id='portfolio_diplomas_heading' className='portfolio_diplomas__title'>
            Os meus diplomas
          </h2>

          <p className='portfolio_diplomas__lead'>
            Sentir se confiante, tanto a nível psicológico como emocional, é o componente chave para
            a felicidade.
            <br />
            Para isso, ajudo os meus clientes a desenvolver competências para ter um sono de
            qualidade, reduzir o stress e ter a confiança em si mesmos, o que constitui a base da
            autoconfiança.
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
                        className='portfolio_diplomas__card_image'
                        src={card.imageUrl}
                        alt=''
                        loading='lazy'
                      />
                    </div>
                  ) : null}

                  <h3 className='portfolio_diplomas__card_title'>{card.title}</h3>
                  <p className='portfolio_diplomas__card_text'>{card.description}</p>
                </article>
              ))}
            </div>

            <nav className='portfolio_diplomas__pagination' aria-label='Paginação de diplomas'>
              <button
                type='button'
                className='portfolio_diplomas__page_btn'
                onClick={goPrev}
                disabled={safePage === 1}
                aria-label='Página anterior'>
                ‹
              </button>

              <div className='portfolio_diplomas__page_numbers' aria-label='Páginas'>
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
                  <span className='portfolio_diplomas__page_ellipsis' aria-hidden='true'>
                    ...
                  </span>
                ) : null}
              </div>

              <button
                type='button'
                className='portfolio_diplomas__page_btn'
                onClick={goNext}
                disabled={safePage === totalPages}
                aria-label='Página seguinte'>
                ›
              </button>
            </nav>
          </>
        ) : (
          <p className='portfolio_diplomas__empty'>Sem itens por agora</p>
        )}
      </div>
    </section>
  );
}
