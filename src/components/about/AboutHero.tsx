// src\components\about\AboutHero.tsx

import Image from 'next/image';
import Link from 'next/link';
import { aboutImages } from '../../lib/images';

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
                  src={aboutImages.aboutHeroDesktop}
                  alt='Retrato profissional da Nadia Baptista sentada num sofa, num ambiente calmo e iluminado'
                  width={920}
                  height={1100}
                  priority
                  className='about_hero__image'
                />
              </div>

              <div className='about_hero__image_mobile'>
                <Image
                  src={aboutImages.aboutHeroMobile}
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
              Olá, sou a Nádia e estudo Psicologia. Tenho 18 anos e iniciei este ano a minha
              formação académica na Universidade Fernando Pessoa, onde estou a realizar a
              licenciatura em Psicologia.
              <br /> Criei este blog para partilhar o meu percurso, as aprendizagens que vou
              desenvolvendo ao longo da licenciatura e, no futuro, divulgar parte do meu trabalho.
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
