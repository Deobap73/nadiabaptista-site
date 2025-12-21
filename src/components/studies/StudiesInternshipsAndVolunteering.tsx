// src/components/studies/StudiesInternshipsAndVolunteering.tsx

'use client';

import { useMemo, useState } from 'react';

type InternshipItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

const ITEMS: InternshipItem[] = [
  {
    id: 'aapj_1',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_2',
    title: 'Associação de Apoio Psicológico a\nAdultos',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_3',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_4',
    title: 'Associação de Apoio Psicológico a\nVelhos',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_5',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_6',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_7',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_8',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
  {
    id: 'aapj_9',
    title: 'Associação de Apoio Psicológico a\nJovens',
    subtitle: 'Estágio curricular, fevereiro 2025 a julho 2025',
    description:
      'Participação em sessões de acolhimento, apoio a grupos de jovens em contexto escolar, colaboração na preparação de materiais psicoeducativos',
  },
];

const ITEMS_PER_PAGE = 3;

export default function StudiesInternshipsAndVolunteering() {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(ITEMS.length / ITEMS_PER_PAGE));

  const visibleItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return ITEMS.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  function goTo(next: number) {
    const safe = Math.min(Math.max(1, next), totalPages);
    setPage(safe);
  }

  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  return (
    <section className='studies_internships' aria-labelledby='studies_internships_heading'>
      <div className='studies_internships__container site-container site-container--wide'>
        <header className='studies_internships__header'>
          <h2 id='studies_internships_heading' className='studies_internships__title'>
            Experiência prática
          </h2>

          <p className='studies_internships__subtitle'>
            Aplicar a teoria em contexto real tem sido fundamental no meu desenvolvimento como
            futura psicóloga
          </p>
        </header>

        <div className='studies_internships__grid' role='list'>
          {visibleItems.map((item) => (
            <article key={item.id} className='studies_internships__card' role='listitem'>
              <h3 className='studies_internships__card_title'>
                {item.title.split('\n').map((line, idx) => (
                  <span key={`${item.id}_${idx}`}>
                    {line}
                    {idx === 0 ? <br /> : null}
                  </span>
                ))}
              </h3>

              <p className='studies_internships__card_subtitle'>{item.subtitle}</p>

              <p className='studies_internships__card_text'>{item.description}</p>
            </article>
          ))}
        </div>

        <nav
          className='studies_internships__pagination'
          aria-label='Paginação de experiência prática'>
          <button
            type='button'
            className='studies_internships__page_btn'
            onClick={() => goTo(page - 1)}
            disabled={isPrevDisabled}
            aria-label='Página anterior'>
            ‹
          </button>

          <button
            type='button'
            className='studies_internships__page_btn'
            onClick={() => goTo(1)}
            aria-current={page === 1 ? 'page' : undefined}>
            1
          </button>

          {totalPages >= 2 ? (
            <button
              type='button'
              className='studies_internships__page_btn'
              onClick={() => goTo(2)}
              aria-current={page === 2 ? 'page' : undefined}>
              2
            </button>
          ) : null}

          {totalPages > 2 ? <span className='studies_internships__page_ellipsis'>…</span> : null}

          <button
            type='button'
            className='studies_internships__page_btn'
            onClick={() => goTo(page + 1)}
            disabled={isNextDisabled}
            aria-label='Página seguinte'>
            ›
          </button>
        </nav>
      </div>
    </section>
  );
}
