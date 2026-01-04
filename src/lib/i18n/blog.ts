// src/lib/i18n/blog.ts

import type { Lang } from './types';

type BlogDict = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    p1: string;
    p2: string;
    imageAlt: string;
  };
  latest: {
    title: string;
    more: string;
  };
  top: {
    title: string;
    more: string;
    ariaLabel: string;
    gridAria: string;
  };
  list: {
    ariaLabel: string;
    gridAria: string;
    allTab: string;
    emptyTitle: string;
    emptyText: string;
  };
};

const PT: BlogDict = {
  hero: {
    eyebrow: 'Mente Forte, Jogo Vencedor',
    titleLine1: 'A Psicologia em Campo e',
    titleLine2: 'na Vida',
    p1: 'A vitória começa na cabeça. Traduzo conceitos da Psicologia (motivação, ansiedade, coesão de grupo) aplicados no desporto.',
    p2: 'Do vólei a qualquer modalidade. Um espaço para estudantes, atletas e treinadores que procuram ferramentas científicas para fortalecer o foco e a confiança.',
    imageAlt:
      'Retrato da Nádia Baptista em ambiente interior, sentada no chão com bola de voleibol',
  },
  latest: {
    title: 'Últimos Artigos',
    more: 'Mais informações',
  },
  top: {
    title: 'Top Artigos',
    more: 'Mais informações',
    ariaLabel: 'Top artigos',
    gridAria: 'Seleção de artigos por categoria',
  },
  list: {
    ariaLabel: 'Artigos do blog',
    gridAria: 'Lista de artigos',
    allTab: 'Todos',
    emptyTitle: 'Ainda não há artigos nesta categoria.',
    emptyText: 'Volta mais tarde.',
  },
};

const EN: BlogDict = {
  hero: {
    eyebrow: 'Strong Mind, Winning Game',
    titleLine1: 'Psychology on the Field and',
    titleLine2: 'in Life',
    p1: 'Winning starts in the mind. I translate psychology concepts (motivation, anxiety, team cohesion) applied to sport.',
    p2: 'From volleyball to any sport. A space for students, athletes, and coaches looking for scientific tools to strengthen focus and confidence.',
    imageAlt: 'Portrait of Nadia Baptista indoors, sitting on the floor with a volleyball',
  },
  latest: {
    title: 'Latest Articles',
    more: 'Learn more',
  },
  top: {
    title: 'Top Articles',
    more: 'Learn more',
    ariaLabel: 'Top articles',
    gridAria: 'Article selection by category',
  },
  list: {
    ariaLabel: 'Blog articles',
    gridAria: 'Articles list',
    allTab: 'All',
    emptyTitle: 'There are no articles in this category yet.',
    emptyText: 'Come back later.',
  },
};

export function getBlogDict(lang: Lang): BlogDict {
  return lang === 'en' ? EN : PT;
}
