// src/app/studies/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getStudyProjectBySlug } from '@/lib/studies/projects';
import BackButton from '@/components/ui/BackButton';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StudyProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const project = getStudyProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className='site-main'>
      <section className='studies_project_page'>
        <div className='studies_project_page__container site-container site-container--wide'>
          <header className='studies_project_page__header'>
            <h1 className='studies_project_page__title'>{project.title}</h1>
            <p className='studies_project_page__type'>{project.typeLabel}</p>
          </header>

          <BackButton />
          <p className='studies_project_page__excerpt'>{project.excerpt}</p>

          <p className='studies_project_page__meta'>
            {project.institution}, {project.year}
          </p>
          <BackButton />
        </div>
      </section>
    </main>
  );
}
