// src/app/[lang]/studies/academic-projects/page.tsx

import Link from 'next/link';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import BackLinkButton from '@/components/ui/BackLinkButton';
import type { Lang } from '@/lib/i18n';
import { normalizeLang } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AcademicProjectsPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = normalizeLang(lang) as Lang;

  const items = await getAcademicProjects();

  const backHref = `/${locale}/studies`;

  return (
    <main className='site-main'>
      <section className='studies_academic_projects'>
        <div className='studies_academic_projects__container site-container site-container--wide'>
          <BackLinkButton lang={locale} href={backHref} />

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
                  href={`/${locale}/studies/academic-projects/${it.slug}`}
                  className='studies_academic_projects__card'>
                  <p className='studies_academic_projects__card_title'>{it.title}</p>
                  <p className='studies_academic_projects__card_meta'>
                    {it.summary ? it.summary : 'Sem resumo'}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <BackLinkButton lang={locale} href={backHref} />
        </div>
      </section>
    </main>
  );
}
