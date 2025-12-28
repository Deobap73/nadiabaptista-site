// src/components/studies/StudiesProjectsInvestigationClient.tsx

'use client';

import Link from 'next/link';
import type { PublicAcademicProject } from '@/lib/studies/getAcademicProjects';

type Props = {
  items: PublicAcademicProject[];
};

function pickText(project: PublicAcademicProject) {
  const raw = project.summary || project.content || '';
  const text = raw.trim();
  if (!text) return '';
  return text.length > 180 ? `${text.slice(0, 180).trim()}...` : text;
}

function FeaturedCard({ project }: { project: PublicAcademicProject }) {
  const excerpt = pickText(project);

  return (
    <article className='studies_projects__card studies_projects__card--featured'>
      <div className='studies_projects__card_body'>
        <h3 className='studies_projects__card_title'>{project.title}</h3>
        <p className='studies_projects__card_type'>Trabalho académico</p>

        <p className='studies_projects__card_excerpt'>{excerpt || 'Sem descrição por agora.'}</p>
      </div>

      <div className='studies_projects__card_footer'>
        <p className='studies_projects__card_meta'>sortOrder: {project.sortOrder}</p>

        <Link className='studies_projects__btn' href={`/studies/projects/${project.slug}`}>
          Ver resumo
        </Link>
      </div>
    </article>
  );
}

function CompactCard({ project }: { project: PublicAcademicProject }) {
  const excerpt = pickText(project);

  return (
    <article className='studies_projects__card studies_projects__card--compact'>
      <div className='studies_projects__card_body'>
        <h3 className='studies_projects__card_title studies_projects__card_title--compact'>
          {project.title}
        </h3>
        <p className='studies_projects__card_type'>Trabalho académico</p>

        <p className='studies_projects__card_excerpt studies_projects__card_excerpt--compact'>
          {excerpt || 'Sem descrição por agora.'}
        </p>
      </div>

      <div className='studies_projects__card_footer studies_projects__card_footer--compact'>
        <p className='studies_projects__card_meta'>sortOrder: {project.sortOrder}</p>

        <Link className='studies_projects__btn' href={`/studies/projects/${project.slug}`}>
          Ver resumo
        </Link>
      </div>
    </article>
  );
}

export default function StudiesProjectsInvestigationClient({ items }: Props) {
  const safe = Array.isArray(items) ? items : [];
  const featured = safe[0];
  const others = safe.slice(1, 3);

  if (!featured) {
    return (
      <section className='studies_projects'>
        <div className='studies_projects__container site-container site-container--wide'>
          <header className='studies_projects__header'>
            <h2 className='studies_projects__title'>
              Projetos de Investigação e Trabalhos Académicos
            </h2>
            <p className='studies_projects__subtitle'>
              Apresento alguns trabalhos, relatórios e projetos que refletem o meu percurso
              académico
            </p>
          </header>

          <p className='studies_projects__subtitle'>Sem projetos por agora.</p>
        </div>
      </section>
    );
  }

  return (
    <section className='studies_projects'>
      <div className='studies_projects__container site-container site-container--wide'>
        <header className='studies_projects__header'>
          <h2 className='studies_projects__title'>
            Projetos de Investigação e Trabalhos Académicos
          </h2>
          <p className='studies_projects__subtitle'>
            Apresento alguns trabalhos, relatórios e projetos que refletem o meu percurso académico
          </p>
        </header>

        <div className='studies_projects__grid'>
          <div className='studies_projects__col studies_projects__col--left'>
            <FeaturedCard project={featured} />
          </div>

          <div className='studies_projects__col studies_projects__col--right'>
            <div className='studies_projects__stack'>
              {others.map((project) => (
                <CompactCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        <div className='studies_projects__cta'>
          <Link className='studies_projects__cta_btn' href='/studies/projects'>
            Ver Todos os projectos
          </Link>
        </div>
      </div>
    </section>
  );
}
