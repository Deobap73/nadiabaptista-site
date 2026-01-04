// src/app/[lang]/studies/conferences-db/page.tsx
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { getConferences } from '@/lib/studies/getConferences';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ConferencesDbPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = getStudiesDict(lang);

  const items = await getConferences();

  const title = lang === 'en' ? 'Conferences and seminars' : 'Conferências e seminários';
  const subtitle =
    lang === 'en'
      ? 'Events I attended, now loaded from the database.'
      : 'Eventos em que participei, agora carregados da base de dados.';
  const empty = lang === 'en' ? 'No items for now' : 'Sem itens por agora';
  const dateFallback = lang === 'en' ? 'No date' : 'Sem data';
  const locationFallback = lang === 'en' ? 'No location' : 'Sem local';

  return (
    <main className='site-main'>
      <section className='studies_conferences_db'>
        <div className='studies_conferences_db__container site-container site-container--wide'>
          <BackButton lang={lang} />

          <header className='studies_conferences_db__header'>
            <h1 className='studies_conferences_db__title'>{title}</h1>
            <p className='studies_conferences_db__subtitle'>{subtitle}</p>
          </header>

          {items.length === 0 ? (
            <p className='studies_conferences_db__empty'>{empty}</p>
          ) : (
            <div className='studies_conferences_db__grid'>
              {items.map((it) => (
                <Link
                  key={it.id}
                  href={`/${lang}/studies/conferences-db/${it.slug}`}
                  className='studies_conferences_db__card'>
                  <p className='studies_conferences_db__card_title'>{it.title}</p>

                  <p className='studies_conferences_db__card_meta'>
                    {it.dateLabel ? it.dateLabel : dateFallback}
                    <br />
                    {it.location ? it.location : locationFallback}
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
