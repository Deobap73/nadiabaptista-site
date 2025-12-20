// src/components/studies/StudiesProjectsInvestigation.tsx

import Link from 'next/link';
import { STUDY_PROJECTS, type StudyProject } from '@/lib/studies/projects';

function FeaturedCard({ project }: { project: StudyProject }) {
  return (
    <article className='studies_projects__card studies_projects__card--featured'>
      <div className='studies_projects__card_body'>
        <h3 className='studies_projects__card_title'>{project.title}</h3>
        <p className='studies_projects__card_type'>{project.typeLabel}</p>

        <p className='studies_projects__card_excerpt'>{project.excerpt}</p>
      </div>

      <div className='studies_projects__card_footer'>
        <p className='studies_projects__card_meta'>
          {project.institution}, {project.year}
        </p>

        <Link className='studies_projects__btn' href={`/studies/projects/${project.slug}`}>
          Ver resumo
        </Link>
      </div>
    </article>
  );
}

function CompactCard({ project }: { project: StudyProject }) {
  return (
    <article className='studies_projects__card studies_projects__card--compact'>
      <div className='studies_projects__card_body'>
        <h3 className='studies_projects__card_title studies_projects__card_title--compact'>
          {project.title}
        </h3>
        <p className='studies_projects__card_type'>{project.typeLabel}</p>

        <p className='studies_projects__card_excerpt studies_projects__card_excerpt--compact'>
          {project.excerpt}
        </p>
      </div>

      <div className='studies_projects__card_footer studies_projects__card_footer--compact'>
        <p className='studies_projects__card_meta'>
          {project.institution}, {project.year}
        </p>

        <Link className='studies_projects__btn' href={`/studies/projects/${project.slug}`}>
          Ver resumo
        </Link>
      </div>
    </article>
  );
}

export default function StudiesProjectsInvestigation() {
  const featured = STUDY_PROJECTS.find((p) => p.featured) ?? STUDY_PROJECTS[0];
  const others = STUDY_PROJECTS.filter((p) => p.id !== featured.id).slice(0, 2);

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
