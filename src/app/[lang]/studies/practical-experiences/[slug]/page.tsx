// src/app/[lang]/studies/practical-experiences/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { getPracticalExperienceBySlug } from '@/lib/studies/getPracticalExperiences';
import type { Lang } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang; slug: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PracticalExperienceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  const item = await getPracticalExperienceBySlug(slug);
  if (!item) notFound();

  const kickerFallback = lang === 'en' ? 'Practical experience' : 'Experiência prática';
  const descFallback = lang === 'en' ? 'No description for now.' : 'Sem descrição por agora.';

  return (
    <main className='site-main'>
      <section className='studies_conference_page'>
        <div className='studies_conference_page__container site-container site-container--wide'>
          <BackButton lang={lang} />

          <div className='studies_conference_page__grid'>
            <header className='studies_conference_page__header'>
              <p className='studies_conference_page__kicker'>
                {item.summary ? item.summary : kickerFallback}
              </p>

              <h1 className='studies_conference_page__title'>{item.title}</h1>

              <p className='studies_conference_page__meta'>
                {item.content ? item.content : descFallback}
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

          <BackButton lang={lang} />
        </div>
      </section>
    </main>
  );
}
