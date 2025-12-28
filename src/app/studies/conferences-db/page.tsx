// src/app/studies/conferences-db/page.tsx

import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { getConferences } from '@/lib/studies/getConferences';

export default async function ConferencesDbPage() {
  const items = await getConferences();

  return (
    <main className='site-main'>
      <section className='studies_conferences_db'>
        <div className='studies_conferences_db__container site-container site-container--wide'>
          <BackButton />

          <header className='studies_conferences_db__header'>
            <h1 className='studies_conferences_db__title'>Conferências e seminários</h1>
            <p className='studies_conferences_db__subtitle'>
              Eventos em que participei, agora carregados da base de dados.
            </p>
          </header>

          {items.length === 0 ? (
            <p className='studies_conferences_db__empty'>Sem itens por agora</p>
          ) : (
            <div className='studies_conferences_db__grid'>
              {items.map((it) => (
                <Link
                  key={it.id}
                  href={`/studies/conferences-db/${it.slug}`}
                  className='studies_conferences_db__card'>
                  <p className='studies_conferences_db__card_title'>{it.title}</p>

                  <p className='studies_conferences_db__card_meta'>
                    {it.dateLabel ? it.dateLabel : 'Sem data'}
                    <br />
                    {it.location ? it.location : 'Sem local'}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
