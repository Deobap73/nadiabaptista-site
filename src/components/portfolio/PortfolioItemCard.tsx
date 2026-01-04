// src/components/portfolio/PortfolioItemCard.tsx

import React from 'react';

// Define strict interface for the card props to ensure type safety
export interface PortfolioItemCardProps {
  title: string;
  type: string;
  period?: string;
  description: string;
  highlight?: string;
}

/**
 * Reusable card component for portfolio details.
 * Focuses on semantic structure and clean typography.
 */
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

        {/* Meta information container for badge-like display */}
        <div className='portfolioCardMeta'>
          <p className='portfolioCardType'>{type}</p>
          {period && (
            <span className='portfolioCardSeparator' aria-hidden='true'>
              {' '}
              •{' '}
            </span>
          )}
          {period && <p className='portfolioCardPeriod'>{period}</p>}
        </div>
      </header>

      <div className='portfolioCardBody'>
        <p className='portfolioCardDescription'>{description}</p>

        {/* Optional highlight section for key achievements or specific roles */}
        {highlight && (
          <footer className='portfolioCardFooter'>
            <p className='portfolioCardHighlight'>
              <strong>Key Highlight:</strong> {highlight}
            </p>
          </footer>
        )}
      </div>
    </article>
  );
}
