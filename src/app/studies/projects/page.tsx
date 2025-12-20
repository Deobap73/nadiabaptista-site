// src/app/studies/projects/page.tsx

import Link from 'next/link';
import { STUDY_PROJECTS } from '@/lib/studies/projects';
import BackButton from '@/components/ui/BackButton';

export default function StudiesProjectsPage() {
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

          <div className='studies_projects_page__list'>
            {STUDY_PROJECTS.map((p) => (
              <Link
                key={p.id}
                href={`/studies/projects/${p.slug}`}
                className='studies_projects_page__card'>
                <div className='studies_projects_page__card_inner'>
                  <p className='studies_projects_page__card_title'>{p.title}</p>
                  <p className='studies_projects_page__card_meta'>
                    {p.institution}, {p.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
