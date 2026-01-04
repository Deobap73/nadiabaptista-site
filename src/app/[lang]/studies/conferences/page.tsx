// src/app/[lang]/studies/conferences/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getConferences } from '@/lib/studies/getConferences';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict, getCommonDict } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getCountText(lang: Lang, n: number): string {
  return lang === 'en' ? `${n} items` : `${n} itens`;
}

export default async function StudiesConferencesListPage({ params }: PageProps) {
  const { lang } = await params;

  const dict = getStudiesDict(lang);
  const common = getCommonDict(lang);

  const items = await getConferences();
  const countText = getCountText(lang, items.length);

  return (
    <section
      className='studies_conferences_list'
      aria-labelledby='studies_conferences_list_heading'>
      <div className='studies_conferences_list__container site-container site-container--wide'>
        <Link href={`/${lang}/studies`} className='studies_conferences_list__back'>
          {common.back}
        </Link>

        <header className='studies_conferences_list__header'>
          <div className='studies_conferences_list__title_row'>
            <h1 id='studies_conferences_list_heading' className='studies_conferences_list__title'>
              {dict.conferences.title}
            </h1>

            <span className='studies_conferences_list__count'>{countText}</span>
          </div>

          <p className='studies_conferences_list__text'>{dict.conferences.subtitle}</p>
        </header>

        {items.length === 0 ? (
          <p className='studies_conferences_list__text'>{dict.conferences.empty}</p>
        ) : (
          <div className='studies_conferences_list__grid'>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/studies/conferences/${item.slug}`}
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
                    {item.dateLabel ? item.dateLabel : lang === 'en' ? 'Event' : 'Evento'}
                  </p>
                  <h2 className='studies_conferences_list__card_title'>{item.title}</h2>
                  <p className='studies_conferences_list__meta'>
                    {item.location
                      ? item.location
                      : lang === 'en'
                      ? 'No location for now.'
                      : 'Sem localização por agora.'}
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
