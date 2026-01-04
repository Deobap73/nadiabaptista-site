// src/app/[lang]/studies/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { getAcademicProjectBySlug } from '@/lib/studies/getAcademicProjects';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang; slug: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StudyProjectPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dict = getStudiesDict(lang);

  const project = await getAcademicProjectBySlug(slug);
  if (!project) notFound();

  const body = (project.content || project.summary || '').trim();

  return (
    <main className='site-main'>
      <section className='studies_project_page'>
        <div className='studies_project_page__container site-container site-container--wide'>
          <header className='studies_project_page__header'>
            <h1 className='studies_project_page__title'>{project.title}</h1>
            <p className='studies_project_page__type'>{dict.projects.cardType}</p>
          </header>

          <BackButton lang={lang} />

          {body ? (
            <p className='studies_project_page__excerpt'>{body}</p>
          ) : (
            <p className='studies_project_page__excerpt'>{dict.projects.empty}</p>
          )}

          <p className='studies_project_page__meta'>sortOrder: {project.sortOrder}</p>

          <BackButton lang={lang} />
        </div>
      </section>
    </main>
  );
}
