// src/app/studies/conferences/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  STUDIES_CONFERENCES,
  getStudiesConferenceBySlug,
} from '@/lib/studies/conferencesAndSeminars';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return STUDIES_CONFERENCES.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getStudiesConferenceBySlug(slug);

  if (!item) {
    return {
      title: 'Conferencias e Seminarios',
      description: 'Conferencias e seminarios na area de psicologia.',
    };
  }

  return {
    title: `${item.label} | Conferencias e Seminarios`,
    description: `${item.subtitle}. ${item.dateText}. ${item.cityText}.`,
  };
}

export default async function StudiesConferencePage({ params }: PageProps) {
  const { slug } = await params;

  const item = getStudiesConferenceBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <section className='studies_conference_page'>
      <div className='studies_conference_page__container site-container site-container--wide'>
        <Link href='/studies' className='studies_conference_page__back'>
          Voltar
        </Link>

        <div className='studies_conference_page__grid'>
          <header className='studies_conference_page__header'>
            <p className='studies_conference_page__kicker'>{item.subtitle}</p>

            <h1 className='studies_conference_page__title'>{item.label}</h1>

            <p className='studies_conference_page__meta'>
              {item.dateText}
              <br />
              {item.cityText}
            </p>
          </header>

          <div className='studies_conference_page__media'>
            <Image
              src={item.imageSrc}
              alt={item.imageAlt}
              fill
              sizes='(min-width: 1024px) 560px, 92vw'
              className='studies_conference_page__image'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
