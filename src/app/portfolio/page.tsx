// src/app/portfolio/page.tsx

import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioContainer, { type PortfolioItem } from '@/components/portfolio/PortfolioContainer';
import { portfolioImages } from '@/lib/images';

const portfolioItems: PortfolioItem[] = [
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
  {
    id: 'outro-item',
    title: 'OUTRO MOMENTO MARCANTE',
    paragraphs: [
      'Este segundo card serve apenas como exemplo.',
      'Mostra como a alternância esquerda direita funciona automaticamente.',
    ],
    imageUrl: portfolioImages.portfolio_1,
    imageAlt: 'Mesa de trabalho com computador e materiais de estudo',
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioContainer items={portfolioItems} />
    </>
  );
}
