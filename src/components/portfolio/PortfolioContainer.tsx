// src/components/portfolio/PortfolioContainer.tsx

import Image from 'next/image';

// English: Define the structure for each portfolio item
export type PortfolioItem = {
  id: string;
  title: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
};

type PortfolioContainerProps = {
  items: PortfolioItem[];
};

export default function PortfolioContainer({ items }: PortfolioContainerProps) {
  // English: Early return if no items are provided to avoid rendering an empty section
  if (!items || items.length === 0) return null;

  return (
    <section className='portfolio_container' aria-label='Portfolio List'>
      <div className='portfolio_container__container site-container'>
        <div className='portfolio_container__list'>
          {items.map((item, index) => {
            // English: Logic to alternate the layout (Image/Text vs Text/Image)
            const isReverse = index % 2 === 1;

            const itemClass = isReverse
              ? 'portfolio_container__item portfolio_container__item__reverse'
              : 'portfolio_container__item';

            const mediaClass = isReverse
              ? 'portfolio_container__media portfolio_container__media__reverse'
              : 'portfolio_container__media';

            const cardClass = isReverse
              ? 'portfolio_container__card portfolio_container__card__reverse'
              : 'portfolio_container__card';

            return (
              <article key={item.id} className={itemClass}>
                <div className={mediaClass}>
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    width={640}
                    height={640}
                    className='portfolio_container__image'
                    sizes='(min-width: 1024px) 420px, 90vw'
                    // English: Standard items use lazy loading by default for performance
                    loading='lazy'
                  />
                </div>

                <div className={cardClass}>
                  <h3 className='portfolio_container__title'>{item.title}</h3>

                  <div className='portfolio_container__text'>
                    {item.paragraphs.map((p, i) => (
                      <p key={`${item.id}_p_${i}`}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
