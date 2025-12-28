// src/app/studies/conferences/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getConferences } from '@/lib/studies/getConferences';

export default async function StudiesConferencesListPage() {
  const items = await getConferences();
  const countText = `${items.length} itens`;

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
              Conferências e Seminários
            </h1>

            <span className='studies_conferences_list__count'>{countText}</span>
          </div>

          <p className='studies_conferences_list__text'>
            Aqui encontras os eventos em que participei, com foco em aprendizagem contínua e novas
            perspetivas na psicologia
          </p>
        </header>

        {items.length === 0 ? (
          <p className='studies_conferences_list__text'>Sem itens por agora.</p>
        ) : (
          <div className='studies_conferences_list__grid'>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/studies/conferences/${item.slug}`}
                className='studies_conferences_list__card'>
                <div className='studies_conferences_list__media'>
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt=''
                      fill
                      sizes='(width >= 1024px) 360px, 92vw'
                      className='studies_conferences_list__image'
                    />
                  ) : null}
                </div>

                <div className='studies_conferences_list__content'>
                  <p className='studies_conferences_list__kicker'>
                    {item.dateLabel ? item.dateLabel : 'Evento'}
                  </p>
                  <h2 className='studies_conferences_list__card_title'>{item.title}</h2>
                  <p className='studies_conferences_list__meta'>
                    {item.location ? item.location : 'Sem localização por agora.'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
