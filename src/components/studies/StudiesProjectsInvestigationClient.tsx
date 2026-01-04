// src/components/studies/StudiesProjectsInvestigationClient.tsx

'use client';

import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';
import type { PublicAcademicProject } from '@/lib/studies/getAcademicProjects';

type Props = {
  lang: Lang;
  items: PublicAcademicProject[];
};

/**
 * SEO Hint: Otimizamos o truncamento para não cortar palavras a meio
 * e garantir que o resumo faça sentido para o crawler.
 */
function pickText(project: PublicAcademicProject) {
  const raw = project.summary || project.content || '';
  const text = raw.trim();
  if (!text) return '';
  if (text.length <= 180) return text;

  const trimmed = text.slice(0, 180);
  return `${trimmed.slice(0, Math.max(0, trimmed.lastIndexOf(' ')))}...`;
}

function FeaturedCard({
  lang,
  dict,
  project,
}: {
  lang: Lang;
  dict: ReturnType<typeof getStudiesDict>;
  project: PublicAcademicProject;
}) {
  const excerpt = pickText(project);
  const base = `/${lang}`;

  return (
    <article className='studies_projects__card studies_projects__card--featured'>
      <div className='studies_projects__card_body'>
        {/* H3 é o nível correto aqui, pois o H2 é o título da secção */}
        <h3 className='studies_projects__card_title'>{project.title}</h3>
        <p className='studies_projects__card_type'>{dict.projects.cardType}</p>
        <p className='studies_projects__card_excerpt'>
          {excerpt || dict.internships.fallbackDescription}
        </p>
      </div>

      <div className='studies_projects__card_footer'>
        <Link
          className='studies_projects__btn'
          href={`${base}/studies/projects/${project.slug}`}
          aria-label={`${dict.projects.btnSummary}: ${project.title}`}>
          {dict.projects.btnSummary}
        </Link>
      </div>
    </article>
  );
}

function CompactCard({
  lang,
  dict,
  project,
}: {
  lang: Lang;
  dict: ReturnType<typeof getStudiesDict>;
  project: PublicAcademicProject;
}) {
  const excerpt = pickText(project);
  const base = `/${lang}`;

  return (
    <article className='studies_projects__card studies_projects__card--compact'>
      <div className='studies_projects__card_body'>
        <h3 className='studies_projects__card_title studies_projects__card_title--compact'>
          {project.title}
        </h3>
        <p className='studies_projects__card_type'>{dict.projects.cardType}</p>

        <p className='studies_projects__card_excerpt studies_projects__card_excerpt--compact'>
          {excerpt || dict.internships.fallbackDescription}
        </p>
      </div>

      <div className='studies_projects__card_footer studies_projects__card_footer--compact'>
        <Link
          className='studies_projects__btn'
          href={`${base}/studies/projects/${project.slug}`}
          aria-label={`${dict.projects.btnSummary}: ${project.title}`}>
          {dict.projects.btnSummary}
        </Link>
      </div>
    </article>
  );
}

export default function StudiesProjectsInvestigationClient({ lang, items }: Props) {
  const dict = getStudiesDict(lang);
  const safe = Array.isArray(items) ? items : [];
  const featured = safe[0];
  const others = safe.slice(1, 3);
  const base = `/${lang}`;

  if (!featured) {
    return (
      <section className='studies_projects' id='investigation'>
        <div className='studies_projects__container site-container site-container--wide'>
          <header className='studies_projects__header'>
            <h2 className='studies_projects__title'>{dict.projects.title}</h2>
          </header>
          <p className='studies_projects__subtitle'>{dict.projects.empty}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='studies_projects' id='investigation'>
      <div className='studies_projects__container site-container site-container--wide'>
        <header className='studies_projects__header'>
          <h2 className='studies_projects__title'>{dict.projects.title}</h2>
          <p className='studies_projects__subtitle'>{dict.projects.subtitle}</p>
        </header>

        <div className='studies_projects__grid'>
          <div className='studies_projects__col studies_projects__col--left'>
            <FeaturedCard lang={lang} dict={dict} project={featured} />
          </div>

          <div className='studies_projects__col studies_projects__col--right'>
            <div className='studies_projects__stack'>
              {others.map((project) => (
                <CompactCard key={project.id} lang={lang} dict={dict} project={project} />
              ))}
            </div>
          </div>
        </div>

        <div className='studies_projects__cta'>
          <Link className='studies_projects__cta_btn' href={`${base}/studies/projects`}>
            {dict.projects.ctaAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
