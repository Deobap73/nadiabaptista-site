// src/lib/i18n/studies.ts

import type { Lang } from './types';

type StudiesDict = {
  hero: {
    title: string;
    p1: string;
    p2: string;
  };
  quickLinks: {
    title: string;
    explore: string;
    items: {
      sport: { label: string; alt: string };
      neuro: { label: string; alt: string };
      clinical: { label: string; alt: string };
    };
  };
  projects: {
    title: string;
    subtitle: string;
    cardType: string;
    empty: string;
    ctaAll: string;
    btnSummary: string;
  };
  internships: {
    title: string;
    subtitle: string;
    empty: string;
    btnDetail: string;
    ctaAll: string;
    fallbackSubtitle: string;
    fallbackDescription: string;
    pagination: {
      prev: string;
      next: string;
      aria: string;
      ellipsis: string;
    };
  };
  conferences: {
    title: string;
    subtitle: string;
    empty: string;
    ctaAll: string;
  };
};

const PT: StudiesDict = {
  hero: {
    title: 'Investigar Hoje para\nCuidar Amanhã',
    p1: 'A minha jornada académica é intencional e direcionada. Cada disciplina, cada artigo lido e cada projeto de investigação é um passo na construção de uma base sólida e especializada.',
    p2: 'Aqui apresento as áreas específicas de intervenção e investigação que despertam o meu maior interesse. O estudo aprofundado destes temas é o meu compromisso com a eficácia e a humanização da futura prática clínica.',
  },
  quickLinks: {
    title: 'Áreas de interesse',
    explore: 'EXPLORE',
    items: {
      sport: { label: 'Psicologia do Desporto', alt: 'Atleta em contexto desportivo' },
      neuro: { label: 'Neuropsicologia', alt: 'Representação visual do cérebro' },
      clinical: { label: 'Psicologia Clínica', alt: 'Contexto clínico' },
    },
  },
  projects: {
    title: 'Projetos de Investigação e Trabalhos Académicos',
    subtitle:
      'Apresento alguns trabalhos, relatórios e projetos que refletem o meu percurso académico',
    cardType: 'Trabalho académico',
    empty: 'Sem projetos por agora.',
    ctaAll: 'Ver todos os projetos',
    btnSummary: 'Ver resumo',
  },
  internships: {
    title: 'Experiência prática',
    subtitle:
      'Aplicar a teoria em contexto real tem sido fundamental no meu desenvolvimento como futura psicóloga',
    empty: 'Sem itens por agora.',
    btnDetail: 'Ver detalhe',
    ctaAll: 'Ver todos',
    fallbackSubtitle: 'Sem subtítulo por agora.',
    fallbackDescription: 'Sem descrição por agora.',
    pagination: {
      prev: 'Página anterior',
      next: 'Página seguinte',
      aria: 'Paginação de experiência prática',
      ellipsis: '…',
    },
  },
  conferences: {
    title: 'Conferências e\nSeminários',
    subtitle:
      'Participar em eventos académicos ajuda me a manter contacto com novas perspetivas e práticas na psicologia',
    empty: 'Sem itens por agora.',
    ctaAll: 'Ver todos',
  },
};

const EN: StudiesDict = {
  hero: {
    title: 'Research Today to\nCare Tomorrow',
    p1: 'My academic path is intentional and focused. Each course, each paper, and each research project is a step toward building a strong and specialized foundation.',
    p2: 'Here I share the areas of practice and research that interest me most. Studying these topics deeply is my commitment to evidence based and human future clinical work.',
  },
  quickLinks: {
    title: 'Areas of interest',
    explore: 'EXPLORE',
    items: {
      sport: { label: 'Sport Psychology', alt: 'Athlete in a sports context' },
      neuro: { label: 'Neuropsychology', alt: 'Visual representation of the brain' },
      clinical: { label: 'Clinical Psychology', alt: 'Clinical setting' },
    },
  },
  projects: {
    title: 'Research Projects and Academic Work',
    subtitle: 'A selection of projects and academic work that reflect my learning path',
    cardType: 'Academic work',
    empty: 'No projects yet.',
    ctaAll: 'See all projects',
    btnSummary: 'View summary',
  },
  internships: {
    title: 'Practical experience',
    subtitle:
      'Applying theory in real contexts has been essential for my growth as a future psychologist',
    empty: 'No items yet.',
    btnDetail: 'View details',
    ctaAll: 'See all',
    fallbackSubtitle: 'No subtitle yet.',
    fallbackDescription: 'No description yet.',
    pagination: {
      prev: 'Previous page',
      next: 'Next page',
      aria: 'Practical experience pagination',
      ellipsis: '…',
    },
  },
  conferences: {
    title: 'Conferences and\nSeminars',
    subtitle:
      'Attending academic events helps me stay close to new perspectives and practices in psychology',
    empty: 'No items yet.',
    ctaAll: 'See all',
  },
};

export function getStudiesDict(lang: Lang): StudiesDict {
  return lang === 'en' ? EN : PT;
}
