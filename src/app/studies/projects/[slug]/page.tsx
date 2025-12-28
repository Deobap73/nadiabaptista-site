// src/app/studies/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { getAcademicProjectBySlug, getAcademicProjects } from '@/lib/studies/getAcademicProjects';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getAcademicProjects();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function StudyProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await getAcademicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const body = (project.content || project.summary || '').trim();

  return (
    <main className='site-main'>
      <section className='studies_project_page'>
        <div className='studies_project_page__container site-container site-container--wide'>
          <header className='studies_project_page__header'>
            <h1 className='studies_project_page__title'>{project.title}</h1>
            <p className='studies_project_page__type'>Trabalho académico</p>
          </header>

          <BackButton />

          {body ? (
            <p className='studies_project_page__excerpt'>{body}</p>
          ) : (
            <p className='studies_project_page__excerpt'>Sem conteúdo por agora.</p>
          )}

          <p className='studies_project_page__meta'>sortOrder: {project.sortOrder}</p>

          <BackButton />
        </div>
      </section>
    </main>
  );
}
