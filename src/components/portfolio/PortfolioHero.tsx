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
            <Image
              src={portfolioImages.portfolioHeroDesktop}
              alt='Retrato da psicóloga Nádia Baptista'
              width={520}
              height={680}
              className='portfolio_hero__image portfolio_hero__image_desktop'
              sizes='(min-width: 1024px) 520px, 100vw'
              priority
            />

            <Image
              src={portfolioImages.portfolioHeroMobile}
              alt='Retrato da psicóloga Nádia Baptista'
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
