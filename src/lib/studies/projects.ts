// src/lib/studies/projects.ts

export type StudyProject = {
  id: string;
  slug: string;
  title: string;
  typeLabel: string;
  excerpt: string;
  institution: string;
  year: string;
  featured?: boolean;
};

export const STUDY_PROJECTS: StudyProject[] = [
  {
    id: 'impacto_ansiedade_1',
    slug: 'impacto_da_ansiedade_em_estudantes_universitario',
    title: 'Impacto da ansiedade em estudantes universitário',
    typeLabel: 'Trabalho de investigação',
    excerpt:
      'Estudo focado na relação entre níveis de ansiedade, cargas de avaliação e estratégias de coping em estudantes do primeiro ano',
    institution: 'Universidade Fernando Pessoa',
    year: '2025',
    featured: true,
  },
  {
    id: 'impacto_ansiedade_2',
    slug: 'impacto_da_ansiedade_em_estudantes_universitario_2',
    title: 'Impacto da ansiedade em estudantes universitário',
    typeLabel: 'Trabalho de investigação',
    excerpt:
      'Estudo focado na relação entre níveis de ansiedade, cargas de avaliação e estratégias de coping em estudantes do primeiro ano',
    institution: 'Universidade Fernando Pessoa',
    year: '2025',
  },
  {
    id: 'impacto_ansiedade_3',
    slug: 'impacto_da_ansiedade_em_estudantes_universitario_3',
    title: 'Impacto da ansiedade em estudantes universitário',
    typeLabel: 'Trabalho de investigação',
    excerpt:
      'Estudo focado na relação entre níveis de ansiedade, cargas de avaliação e estratégias de coping em estudantes do primeiro ano',
    institution: 'Universidade Fernando Pessoa',
    year: '2025',
  },
];

export function getStudyProjectBySlug(slug: string) {
  return STUDY_PROJECTS.find((p) => p.slug === slug) ?? null;
}
