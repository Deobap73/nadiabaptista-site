// src\app\studies\academic-projects\page.tsx

import Link from 'next/link';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import BackButton from '@/components/ui/BackButton';

export default async function AcademicProjectsPage() {
  const items = await getAcademicProjects();

  return (
    <main className='site-main'>
      <section className='studies_academic_projects'>
        <div className='studies_academic_projects__container site-container site-container--wide'>
          <BackButton />

          <header className='studies_academic_projects__header'>
            <h1 className='studies_academic_projects__title'>Projetos académicos</h1>
            <p className='studies_academic_projects__subtitle'>
              Lista de projetos e trabalhos académicos, com detalhes por item.
            </p>
          </header>

          {items.length === 0 ? (
            <p className='studies_academic_projects__empty'>Sem itens por agora</p>
          ) : (
            <div className='studies_academic_projects__grid'>
              {items.map((it) => (
                <Link
                  key={it.id}
                  href={`/studies/academic-projects/${it.slug}`}
                  className='studies_academic_projects__card'>
                  <p className='studies_academic_projects__card_title'>{it.title}</p>
                  <p className='studies_academic_projects__card_meta'>
                    {it.summary ? it.summary : 'Sem resumo'}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
