// src/app/studies/academic-projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AcademicProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const items = await getAcademicProjects();
  const item = items.find((x) => x.slug === slug);

  if (!item) notFound();

  return (
    <main className='site-main'>
      <section className='studies_academic_project_page'>
        <div className='studies_academic_project_page__container site-container site-container--wide'>
          <BackButton />

          <header className='studies_academic_project_page__header'>
            <h1 className='studies_academic_project_page__title'>{item.title}</h1>
            {item.summary ? (
              <p className='studies_academic_project_page__subtitle'>{item.summary}</p>
            ) : null}
          </header>

          {item.content ? (
            <div className='studies_academic_project_page__content'>
              <p className='studies_academic_project_page__text'>{item.content}</p>
            </div>
          ) : (
            <p className='studies_academic_project_page__empty'>Sem conteúdo por agora</p>
          )}

          <BackButton />
        </div>
      </section>
    </main>
  );
}
