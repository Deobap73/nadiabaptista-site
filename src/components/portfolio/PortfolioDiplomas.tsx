// src/components/portfolio/PortfolioDiplomas.tsx

'use client';

import { useMemo, useState } from 'react';

export type DiplomaCard = {
  id: string;
  title: string;
  description: string;
};

const DIPLOMAS: DiplomaCard[] = [
  {
    id: 'terapia-individual',
    title: 'Terapia Individual',
    description:
      'Apoio emocional e acompanhamento psicológico num espaço seguro e confidencial.\n\nAs sessões destinam se a adultos e focam se na compreensão do bem estar emocional, padrões de comportamento e estratégias práticas para lidar com desafios do dia a dia.',
  },
  {
    id: 'consultas-trabalho',
    title: 'Consultas no Local de Trabalho',
    description:
      'Apoio especializado para profissionais e equipas que enfrentam desgaste emocional, dificuldades de comunicação ou impacto psicológico relacionado com o ambiente laboral.\n\nEstas consultas ajudam a melhorar a saúde mental no trabalho, prevenir burnout e promover relações mais saudáveis.',
  },
  {
    id: 'cursos-autoajuda',
    title: 'Cursos de Autoajuda',
    description:
      'Programas orientados para quem procura desenvolver competências pessoais, gerir stress, fortalecer autoestima e promover equilíbrio emocional.\n\nOs cursos combinam exercícios práticos, reflexões guiadas e ferramentas simples para aplicar no quotidiano.',
  },

  /* Exemplos para testar paginação e garantir escalabilidade.
     Trocar por diplomas reais quando estiverem definidos. */
  {
    id: 'mindfulness',
    title: 'Formação em Mindfulness',
    description:
      'Princípios e práticas para desenvolver atenção plena no quotidiano.\n\nAplicações simples para autorregulação emocional e foco.',
  },
  {
    id: 'comunicacao',
    title: 'Comunicação e Relações',
    description:
      'Ferramentas para melhorar comunicação, limites e relações saudáveis.\n\nEstratégias práticas para contextos pessoais e profissionais.',
  },
  {
    id: 'gestao-stress',
    title: 'Gestão de Stress',
    description:
      'Técnicas para reconhecer sinais, reduzir sobrecarga e recuperar equilíbrio.\n\nRotinas curtas e sustentáveis para o dia a dia.',
  },
];

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

export default function PortfolioDiplomas() {
  const itemsPerPage = 3;

  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(DIPLOMAS.length / itemsPerPage));

  const safePage = Math.min(Math.max(1, page), totalPages);

  const visibleCards = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return DIPLOMAS.slice(start, start + itemsPerPage);
  }, [safePage]);

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

        <div className='portfolio_diplomas__grid' role='list'>
          {visibleCards.map((card) => (
            <article key={card.id} className='portfolio_diplomas__card' role='listitem'>
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
      </div>
    </section>
  );
}
