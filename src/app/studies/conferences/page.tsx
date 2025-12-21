// src/app/studies/conferences/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { StudiesConferenceKind } from '@/lib/studies/conferencesAndSeminars';
import { STUDIES_CONFERENCES } from '@/lib/studies/conferencesAndSeminars';

type FilterValue = 'all' | StudiesConferenceKind;

export default function StudiesConferencesListPage() {
  const [filter, setFilter] = useState<FilterValue>('all');

  const filteredItems = useMemo(() => {
    if (filter === 'all') return STUDIES_CONFERENCES;
    return STUDIES_CONFERENCES.filter((item) => item.kind === filter);
  }, [filter]);

  const countText = `${filteredItems.length} itens`;

  return (
    <section
      className='studies_conferences_list'
      aria-labelledby='studies_conferences_list_heading'>
      <div className='studies_conferences_list__container site-container site-container--wide'>
        <Link href='/studies' className='studies_conferences_list__back'>
          Voltar
        </Link>

        <header className='studies_conferences_list__header'>
          <div className='studies_conferences_list__title_row'>
            <h1 id='studies_conferences_list_heading' className='studies_conferences_list__title'>
              Conferencias e Seminarios
            </h1>

            <span className='studies_conferences_list__count'>{countText}</span>
          </div>

          <p className='studies_conferences_list__text'>
            Aqui encontras os eventos em que participei, com foco em aprendizagem continua e novas
            perspetivas na psicologia
          </p>

          <div className='studies_conferences_list__filters' role='tablist' aria-label='Filtros'>
            <button
              type='button'
              className={`studies_conferences_list__filter ${
                filter === 'all' ? 'studies_conferences_list__filter_active' : ''
              }`}
              onClick={() => setFilter('all')}
              role='tab'
              aria-selected={filter === 'all'}>
              Todos
            </button>

            <button
              type='button'
              className={`studies_conferences_list__filter ${
                filter === 'conference' ? 'studies_conferences_list__filter_active' : ''
              }`}
              onClick={() => setFilter('conference')}
              role='tab'
              aria-selected={filter === 'conference'}>
              Conferencias
            </button>

            <button
              type='button'
              className={`studies_conferences_list__filter ${
                filter === 'seminar' ? 'studies_conferences_list__filter_active' : ''
              }`}
              onClick={() => setFilter('seminar')}
              role='tab'
              aria-selected={filter === 'seminar'}>
              Seminarios
            </button>
          </div>
        </header>

        <div className='studies_conferences_list__grid'>
          {filteredItems.map((item) => (
            <Link
              key={item.slug}
              href={`/studies/conferences/${item.slug}`}
              className='studies_conferences_list__card'>
              <div className='studies_conferences_list__media'>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes='(width >= 1024px) 360px, 92vw'
                  className='studies_conferences_list__image'
                />
              </div>

              <div className='studies_conferences_list__content'>
                <p className='studies_conferences_list__kicker'>{item.subtitle}</p>
                <h2 className='studies_conferences_list__card_title'>{item.label}</h2>
                <p className='studies_conferences_list__meta'>
                  {item.dateText}
                  <br />
                  {item.cityText}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
