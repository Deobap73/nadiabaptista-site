// src/app/studies/conferences/[slug]/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getConferenceBySlug } from '@/lib/studies/getConferences';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getConferenceBySlug(slug);

  if (!item) {
    return {
      title: 'Conferências e Seminários',
      description: 'Conferências e seminários na área de psicologia.',
    };
  }

  const metaBits = [
    item.dateLabel ? item.dateLabel : '',
    item.location ? item.location : '',
  ].filter(Boolean);

  return {
    title: `${item.title} | Conferências e Seminários`,
    description: metaBits.join('. '),
  };
}

export default async function StudiesConferencePage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getConferenceBySlug(slug);

  if (!item) notFound();

  return (
    <section className='studies_conference_page'>
      <div className='studies_conference_page__container site-container site-container--wide'>
        <Link href='/studies' className='studies_conference_page__back'>
          Voltar
        </Link>

        <div className='studies_conference_page__grid'>
          <header className='studies_conference_page__header'>
            <p className='studies_conference_page__kicker'>
              {item.dateLabel ? item.dateLabel : 'Evento'}
            </p>

            <h1 className='studies_conference_page__title'>{item.title}</h1>

            <p className='studies_conference_page__meta'>
              {item.location ? item.location : 'Sem localização por agora.'}
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
