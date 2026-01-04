// src/app/[lang]/studies/practical-experiences/page.tsx
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { getPracticalExperiences } from '@/lib/studies/getPracticalExperiences';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PracticalExperiencesPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = getStudiesDict(lang);

  const items = await getPracticalExperiences();

  return (
    <main className='site-main'>
      <section className='studies_projects_page'>
        <div className='studies_projects_page__container site-container site-container--wide'>
          <BackButton lang={lang} />

          <header className='studies_projects_page__header'>
            <h1 className='studies_projects_page__title'>{dict.internships.title}</h1>
            <p className='studies_projects_page__subtitle'>{dict.internships.subtitle}</p>
          </header>

          {items.length === 0 ? (
            <p className='studies_projects_page__subtitle'>{dict.internships.empty}</p>
          ) : (
            <div className='studies_projects_page__list'>
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/${lang}/studies/practical-experiences/${p.slug}`}
                  className='studies_projects_page__card'>
                  <div className='studies_projects_page__card_inner'>
                    <p className='studies_projects_page__card_title'>{p.title}</p>
                    <p className='studies_projects_page__card_meta'>
                      {p.summary ? p.summary : dict.internships.fallbackSubtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
