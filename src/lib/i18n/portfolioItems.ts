// src/lib/i18n/portfolioItems.ts

import type { Lang } from '@/lib/i18n';
import type { PortfolioItem } from '@/components/portfolio/PortfolioContainer';
import { portfolioImages } from '@/lib/images';

const PT: PortfolioItem[] = [
  {
    id: 'secundario',
    title: 'SECUNDÁRIO TERMINADO · O FIM DE UM CICLO',
    paragraphs: [
      'Esse marco representou muito mais do que a finalização de um ciclo de estudos.',
      'Foi aqui que comecei a compreender o comportamento humano e as dinâmicas sociais.',
      'Esta fase foi também determinante para despertar o interesse pela Psicologia.',
    ],
    imageUrl: portfolioImages.portfolio_1,
    imageAlt: 'Material de estudo organizado sobre uma secretária',
  },
  /* {
    id: 'outro-item',
    title: 'OUTRO MOMENTO MARCANTE',
    paragraphs: [
      'Este segundo card serve apenas como exemplo.',
      'Mostra como a alternância esquerda direita funciona automaticamente.',
    ],
    imageUrl: portfolioImages.portfolio_1,
    imageAlt: 'Mesa de trabalho com computador e materiais de estudo',
  }, */
];

const EN: PortfolioItem[] = [
  {
    id: 'secundario',
    title: 'HIGH SCHOOL COMPLETED · THE END OF A CYCLE',
    paragraphs: [
      'This milestone meant more than finishing a study cycle.',
      'It is where I began to understand human behaviour and social dynamics.',
      'This phase also helped awaken a real interest in Psychology.',
    ],
    imageUrl: portfolioImages.portfolio_1,
    imageAlt: 'Organised study materials on a desk',
  },
  /* {
    id: 'outro-item',
    title: 'ANOTHER IMPORTANT MOMENT',
    paragraphs: [
      'This second card is just an example.',
      'It shows how the left right alternation works automatically.',
    ],
    imageUrl: portfolioImages.portfolio_1,
    imageAlt: 'Workspace desk with computer and study materials',
  }, */
];

export function getPortfolioItems(lang: Lang): PortfolioItem[] {
  return lang === 'en' ? EN : PT;
}
