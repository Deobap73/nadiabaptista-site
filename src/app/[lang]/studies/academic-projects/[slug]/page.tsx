// src/app/[lang]/studies/academic-projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import BackLinkButton from '@/components/ui/BackLinkButton';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import type { Lang } from '@/lib/i18n';
import { normalizeLang } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AcademicProjectDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  const locale = normalizeLang(lang) as Lang;

  const items = await getAcademicProjects();
  const item = items.find((x) => x.slug === slug);

  if (!item) notFound();

  const backHref = `/${locale}/studies/academic-projects`;

  return (
    <main className='site-main'>
      <section className='studies_academic_project_page'>
        <div className='studies_academic_project_page__container site-container site-container--wide'>
          <BackLinkButton lang={locale} href={backHref} />

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

          <BackLinkButton lang={locale} href={backHref} />
        </div>
      </section>
    </main>
  );
}
