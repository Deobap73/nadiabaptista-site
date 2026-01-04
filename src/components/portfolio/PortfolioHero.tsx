// src/components/portfolio/PortfolioHero.tsx

import Image from 'next/image';
import { portfolioImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { getPortfolioDict } from '@/lib/i18n/portfolio';

type Props = {
  lang: Lang;
};

export default function PortfolioHero({ lang }: Props) {
  const dict = getPortfolioDict(lang);

  // English: Fallback alt text to avoid TS errors if the dictionary is not yet updated
  const portraitAlt = 'Retrato da psicóloga Nádia Baptista';

  return (
    <section className='portfolio_hero' aria-labelledby='portfolio_hero_heading'>
      <div className='portfolio_hero__container site-container site-container--wide'>
        <div className='portfolio_hero__grid'>
          <div className='portfolio_hero__content'>
            <header className='portfolio_hero__header'>
              <h1 id='portfolio_hero_heading' className='portfolio_hero__title'>
                {dict.hero.titleLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
            </header>

            <div className='portfolio_hero__text'>
              <p className='portfolio_hero__paragraph'>{dict.hero.paragraph}</p>
            </div>
          </div>

          <div className='portfolio_hero__media'>
            {/* English: Primary desktop image. 
              Priority is set to true to improve LCP (Largest Contentful Paint).
            */}
            <Image
              src={portfolioImages.portfolioHeroDesktop}
              alt={portraitAlt}
              width={520}
              height={680}
              className='portfolio_hero__image portfolio_hero__image_desktop'
              sizes='(min-width: 1024px) 520px, 100vw'
              priority
            />

            {/* English: Mobile version of the hero image */}
            <Image
              src={portfolioImages.portfolioHeroMobile}
              alt={portraitAlt}
              width={900}
              height={1100}
              className='portfolio_hero__image portfolio_hero__image_mobile'
              sizes='100vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
