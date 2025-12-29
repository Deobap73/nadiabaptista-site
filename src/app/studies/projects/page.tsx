// src/app/studies/projects/page.tsx

import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StudiesProjectsPage() {
  const items = await getAcademicProjects();

  return (
    <main className='site-main'>
      <section className='studies_projects_page'>
        <div className='studies_projects_page__container site-container site-container--wide'>
          <BackButton />

          <header className='studies_projects_page__header'>
            <h1 className='studies_projects_page__title'>Projetos</h1>
            <p className='studies_projects_page__subtitle'>
              Lista completa de projetos de investigação e trabalhos académicos.
            </p>
          </header>

          {items.length === 0 ? (
            <p className='studies_projects_page__subtitle'>Sem itens por agora.</p>
          ) : (
            <div className='studies_projects_page__list'>
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/studies/projects/${p.slug}`}
                  className='studies_projects_page__card'>
                  <div className='studies_projects_page__card_inner'>
                    <p className='studies_projects_page__card_title'>{p.title}</p>
                    <p className='studies_projects_page__card_meta'>sortOrder: {p.sortOrder}</p>
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
