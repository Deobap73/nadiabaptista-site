// src\components\about\AboutHero.tsx

import Image from 'next/image';
import Link from 'next/link';
import { AboutImages } from '../../lib/images';

export default function AboutHero() {
  return (
    <section className='about_hero' aria-labelledby='about_hero_title'>
      <div className='site-container site-container--wide'>
        <div className='about_hero__grid'>
          <div className='about_hero__media'>
            <div className='about_hero__bg' aria-hidden='true' />

            <div className='about_hero__image_wrap'>
              <div className='about_hero__image_desktop'>
                <Image
                  src={AboutImages.aboutHeroDesktop}
                  alt='Retrato profissional da Nadia Baptista sentada num sofa, num ambiente calmo e iluminado'
                  width={920}
                  height={1100}
                  priority
                  className='about_hero__image'
                />
              </div>

              <div className='about_hero__image_mobile'>
                <Image
                  src={AboutImages.aboutHeroMobile}
                  alt='Retrato profissional da Nadia Baptista sentada num sofa, num ambiente calmo e iluminado'
                  width={920}
                  height={1100}
                  priority
                  className='about_hero__image'
                />
              </div>
            </div>
          </div>

          <div className='about_hero__content'>
            <h1 id='about_hero_title' className='about_hero__title'>
              Nádia Baptista
            </h1>

            <div className='about_hero__divider' aria-hidden='true' />

            <p className='about_hero__text'>
              Encontre o espaço seguro para se ouvir. Juntos, criaremos o caminho para a sua maior
              clareza mental.
            </p>

            <Link className='about_hero__cta' href='/contact'>
              Mais informações
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
