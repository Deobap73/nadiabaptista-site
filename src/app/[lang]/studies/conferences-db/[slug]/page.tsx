// src/app/[lang]/studies/conferences-db/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { getConferences } from '@/lib/studies/getConferences';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang; slug: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ConferenceDbDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dict = getStudiesDict(lang);

  const items = await getConferences();
  const item = items.find((x) => x.slug === slug);

  if (!item) notFound();

  const dateFallback = lang === 'en' ? 'No date' : 'Sem data';
  const locationFallback = lang === 'en' ? 'No location' : 'Sem local';
  const empty = lang === 'en' ? 'No content for now' : 'Sem conteúdo por agora';

  return (
    <main className='site-main'>
      <section className='studies_conference_db_page'>
        <div className='studies_conference_db_page__container site-container site-container--wide'>
          <BackButton lang={lang} />

          <header className='studies_conference_db_page__header'>
            <h1 className='studies_conference_db_page__title'>{item.title}</h1>

            <p className='studies_conference_db_page__meta'>
              {item.dateLabel ? item.dateLabel : dateFallback}
              <br />
              {item.location ? item.location : locationFallback}
            </p>
          </header>

          {item.content ? (
            <div className='studies_conference_db_page__content'>
              <p className='studies_conference_db_page__text'>{item.content}</p>
            </div>
          ) : (
            <p className='studies_conference_db_page__empty'>{empty}</p>
          )}

          <BackButton lang={lang} />
        </div>
      </section>
    </main>
  );
}
