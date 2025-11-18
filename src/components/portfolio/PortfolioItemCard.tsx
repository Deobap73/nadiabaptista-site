// src/components/portfolio/PortfolioItemCard.tsx

export interface PortfolioItemCardProps {
  title: string;
  type: string;
  period?: string;
  description: string;
  highlight?: string;
}

export default function PortfolioItemCard({
  title,
  type,
  period,
  description,
  highlight,
}: PortfolioItemCardProps) {
  return (
    <article className='portfolioCard'>
      <header className='portfolioCardHeader'>
        <h3 className='portfolioCardTitle'>{title}</h3>
        <p className='portfolioCardType'>{type}</p>
        {period && <p className='portfolioCardPeriod'>{period}</p>}
      </header>
      <p className='portfolioCardDescription'>{description}</p>
      {highlight && <p className='portfolioCardHighlight'>{highlight}</p>}
    </article>
  );
}
