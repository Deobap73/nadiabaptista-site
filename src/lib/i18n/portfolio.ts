// src/lib/i18n/portfolio.ts

import type { Lang } from '@/lib/i18n';

type PortfolioDict = {
  hero: {
    titleLines: string[];
    paragraph: string;
  };
  achievements: {
    title: string;
    lead: string;
    empty: string;
    pagerLabel: string;
    prev: string;
    next: string;
  };
  diplomas: {
    title: string;
    leadLines: string[];
    empty: string;
    pagerLabel: string;
    prev: string;
    next: string;
  };
};

const PT: PortfolioDict = {
  hero: {
    titleLines: ['Competências em Formação.', 'O Caminho para a Prática', 'Ética'],
    paragraph:
      'A Psicologia é uma jornada contínua de aprendizagem e aplicação. Este espaço reflete o meu compromisso com a excelência, apresentando o meu percurso académico, as áreas de investigação que me movem e as experiências práticas que moldam a minha futura prática clínica. A minha formação é a base sólida para o cuidado e a ética profissional que irei oferecer. Conheça as competências e projetos que estou a desenvolver.',
  },
  achievements: {
    title: 'Conquistas',
    lead: 'Alguns marcos que representam etapas importantes no meu percurso académico e pessoal.',
    empty: 'Sem itens por agora',
    pagerLabel: 'Paginação de conquistas',
    prev: 'Página anterior',
    next: 'Página seguinte',
  },
  diplomas: {
    title: 'Os meus diplomas',
    leadLines: [
      'Sentir se confiante, tanto a nível psicológico como emocional, é o componente chave para a felicidade.',
      'O conhecimento e a formação contínua são a base desse caminho.',
    ],
    empty: 'Sem diplomas por agora',
    pagerLabel: 'Paginação de diplomas',
    prev: 'Página anterior',
    next: 'Página seguinte',
  },
};

const EN: PortfolioDict = {
  hero: {
    titleLines: ['Skills in Progress.', 'The Path to Ethical', 'Practice'],
    paragraph:
      'Psychology is a continuous journey of learning and application. This space reflects my commitment to excellence, showing my academic path, the research areas that guide me, and the practical experiences shaping my future practice. My training is the solid base for the care and professional ethics I will offer. Explore the skills and projects I am developing.',
  },
  achievements: {
    title: 'Achievements',
    lead: 'A few milestones that represent important steps in my academic and personal path.',
    empty: 'No items for now',
    pagerLabel: 'Achievements pagination',
    prev: 'Previous page',
    next: 'Next page',
  },
  diplomas: {
    title: 'My diplomas',
    leadLines: [
      'Confidence, both psychological and emotional, is a key component of wellbeing.',
      'Continuous learning is part of that path.',
    ],
    empty: 'No diplomas for now',
    pagerLabel: 'Diplomas pagination',
    prev: 'Previous page',
    next: 'Next page',
  },
};

export function getPortfolioDict(lang: Lang): PortfolioDict {
  return lang === 'en' ? EN : PT;
}
