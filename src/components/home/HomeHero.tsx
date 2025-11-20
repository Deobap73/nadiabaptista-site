// src/components/home/HomeHero.tsx
'use client';

import Image from 'next/image';
import { homeImages } from '../../lib/images';

export default function HomeHero() {
  return (
    <section className='home-hero' aria-labelledby='home-hero-heading'>
      {/* Versão desktop */}
      <div className='home-hero__desktop'>
        {/* Fundo azul a toda a largura com altura fixa */}
        <div className='home-hero__bg-full'></div>

        {/* Conteúdo central limitado ao max width */}
        <div className='home-hero__container'>
          <div className='home-hero__inner'>
            {/* Logo real */}
            <div className='home-hero__logo-wrapper'>
              <div className='home-hero__logo'>
                <Image
                  src={homeImages.logoNadia}
                  alt='Assinatura da psicóloga Nadia Baptista'
                  width={260}
                  height={90}
                  priority
                />
              </div>
            </div>

            {/* Conteúdo principal foto + texto */}
            <div className='home-hero__content'>
              {/* Foto à esquerda */}
              <div className='home-hero__image-wrapper'>
                <Image
                  src={homeImages.heroDesktop}
                  alt='Retrato da psicóloga Nadia Baptista num consultório acolhedor'
                  width={480}
                  height={600}
                  className='home-hero__image'
                  sizes='(min-width: 1024px) 480px, 100vw'
                  priority
                />
              </div>

              {/* Texto à direita */}
              <div className='home-hero__text'>
                <p className='home-hero__name-prefix'>Dª Nadia</p>
                <h1 id='home-hero-heading' className='home-hero__heading'>
                  Baptista
                </h1>
                <div className='home-hero__divider' />
                <p className='home-hero__description'>
                  Encontre o espaço seguro para se ouvir. Juntos, criaremos o caminho para a sua
                  maior clareza mental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versão mobile */}
      <div className='home-hero__mobile'>
        <div className='home-hero__mobile-image-wrapper'>
          <Image
            src={homeImages.heroMobile}
            alt='Retrato da psicóloga Nadia Baptista em ambiente acolhedor'
            width={480}
            height={600}
            className='home-hero__mobile-image'
            sizes='100vw'
            priority
          />
        </div>
      </div>
    </section>
  );
}
