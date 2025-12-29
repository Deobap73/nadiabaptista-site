// src/app/studies/practical-experiences/page.tsx

import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { getPracticalExperiences } from '@/lib/studies/getPracticalExperiences';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PracticalExperiencesPage() {
  const items = await getPracticalExperiences();

  return (
    <main className='site-main'>
      <section className='studies_projects_page'>
        <div className='studies_projects_page__container site-container site-container--wide'>
          <BackButton />

          <header className='studies_projects_page__header'>
            <h1 className='studies_projects_page__title'>Experiência prática</h1>
            <p className='studies_projects_page__subtitle'>
              Estágios, voluntariado e experiências aplicadas em contexto real.
            </p>
          </header>

          {items.length === 0 ? (
            <p className='studies_projects_page__subtitle'>Sem itens por agora.</p>
          ) : (
            <div className='studies_projects_page__list'>
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/studies/practical-experiences/${p.slug}`}
                  className='studies_projects_page__card'>
                  <div className='studies_projects_page__card_inner'>
                    <p className='studies_projects_page__card_title'>{p.title}</p>
                    <p className='studies_projects_page__card_meta'>
                      {p.summary ? p.summary : 'Sem subtitle por agora.'}
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
