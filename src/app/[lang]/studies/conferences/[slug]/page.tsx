// src/app/[lang]/studies/conferences/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getConferenceBySlug } from '@/lib/studies/getConferences';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict, getCommonDict } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang; slug: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const studiesDict = getStudiesDict(lang);

  const item = await getConferenceBySlug(slug);

  if (!item) {
    return {
      title: studiesDict.conferences.title,
      description:
        lang === 'en'
          ? 'Conferences and seminars in the field of psychology.'
          : 'Conferências e seminários na área de psicologia.',
    };
  }

  const metaBits = [item.dateLabel ? item.dateLabel : '', item.location ? item.location : '']
    .filter(Boolean)
    .join('. ');

  const suffix = studiesDict.conferences.title.replace('\n', ' ');
  return {
    title: `${item.title} | ${suffix}`,
    description: metaBits || studiesDict.conferences.subtitle.replace('\n', ' '),
  };
}

export default async function StudiesConferencePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const item = await getConferenceBySlug(slug);

  if (!item) notFound();

  const common = getCommonDict(lang);

  return (
    <section className='studies_conference_page'>
      <div className='studies_conference_page__container site-container site-container--wide'>
        <Link href={`/${lang}/studies`} className='studies_conference_page__back'>
          {common.back}
        </Link>

        <div className='studies_conference_page__grid'>
          <header className='studies_conference_page__header'>
            <p className='studies_conference_page__kicker'>
              {item.dateLabel ? item.dateLabel : lang === 'en' ? 'Event' : 'Evento'}
            </p>

            <h1 className='studies_conference_page__title'>{item.title}</h1>

            <p className='studies_conference_page__meta'>
              {item.location
                ? item.location
                : lang === 'en'
                ? 'No location for now.'
                : 'Sem localização por agora.'}
            </p>

            {item.content ? <p className='studies_conference_page__meta'>{item.content}</p> : null}
          </header>

          {item.imageUrl ? (
            <div className='studies_conference_page__media'>
              <Image
                src={item.imageUrl}
                alt=''
                fill
                sizes='(min-width: 1024px) 560px, 92vw'
                className='studies_conference_page__image'
                priority
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
