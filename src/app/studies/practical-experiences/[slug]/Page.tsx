// src/app/studies/practical-experiences/[slug]/page.tsx

import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import {
  getPracticalExperienceBySlug,
  getPracticalExperiences,
} from '@/lib/studies/getPracticalExperiences';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getPracticalExperiences();
  return items.map((it) => ({ slug: it.slug }));
}

export default async function PracticalExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const item = await getPracticalExperienceBySlug(slug);
  if (!item) notFound();

  return (
    <main className='site-main'>
      <section className='studies_conference_page'>
        <div className='studies_conference_page__container site-container site-container--wide'>
          <BackButton />

          <div className='studies_conference_page__grid'>
            <header className='studies_conference_page__header'>
              <p className='studies_conference_page__kicker'>
                {item.summary ? item.summary : 'Experiência prática'}
              </p>

              <h1 className='studies_conference_page__title'>{item.title}</h1>

              <p className='studies_conference_page__meta'>
                {item.content ? item.content : 'Sem descrição por agora.'}
              </p>
            </header>

            {item.imageUrl ? (
              <div className='studies_conference_page__media'>
                <Image
                  src={item.imageUrl}
                  alt=''
                  fill
                  className='studies_conference_page__image'
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
