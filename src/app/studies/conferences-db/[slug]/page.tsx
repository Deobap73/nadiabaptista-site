// src/app/studies/conferences-db/[slug]/page.tsx

import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { getConferences } from '@/lib/studies/getConferences';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConferenceDbDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const items = await getConferences();
  const item = items.find((x) => x.slug === slug);

  if (!item) notFound();

  return (
    <main className='site-main'>
      <section className='studies_conference_db_page'>
        <div className='studies_conference_db_page__container site-container site-container--wide'>
          <BackButton />

          <header className='studies_conference_db_page__header'>
            <h1 className='studies_conference_db_page__title'>{item.title}</h1>

            <p className='studies_conference_db_page__meta'>
              {item.dateLabel ? item.dateLabel : 'Sem data'}
              <br />
              {item.location ? item.location : 'Sem local'}
            </p>
          </header>

          {item.content ? (
            <div className='studies_conference_db_page__content'>
              <p className='studies_conference_db_page__text'>{item.content}</p>
            </div>
          ) : (
            <p className='studies_conference_db_page__empty'>Sem conteúdo por agora</p>
          )}

          <BackButton />
        </div>
      </section>
    </main>
  );
}
