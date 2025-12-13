// src/components/home/LandingMobile.tsx
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { homeImages } from '@/lib/images';

type LandingMobileProps = {
  onEnter: () => void;
};

export default function LandingMobile({ onEnter }: LandingMobileProps) {
  useEffect(() => {
    document.body.classList.add('is-landing-mobile');
    return () => {
      document.body.classList.remove('is-landing-mobile');
    };
  }, []);

  return (
    <section className='landing-mobile' aria-labelledby='landing-heading'>
      <div className='landing-mobile__inner'>
        <div className='landing-mobile__logo'>
          <Image
            src={homeImages.logoNadia}
            alt='Assinatura Nadia Baptista Psicóloga'
            width={240}
            height={90}
            priority
          />
        </div>

        <div className='landing-mobile__text-block'>
          <h1 id='landing-heading' className='landing-mobile__title'>
            Nádia
            <br />
            <span>Baptista</span>
          </h1>

          <div className='landing-mobile__divider' aria-hidden='true'></div>

          <p className='landing-mobile__intro'>
            Encontre o espaço seguro para se ouvir. Juntos, criaremos o caminho para a sua maior
            clareza mental.
          </p>
        </div>

        <div className='landing-mobile__photo'>
          <Image
            src={homeImages.landingMobile}
            alt='Retrato da psicóloga Nadia Baptista'
            width={360}
            height={520}
            priority
          />

          <button type='button' className='landing-mobile__cta btn btn--primary' onClick={onEnter}>
            Seja bem vindo
          </button>
        </div>
      </div>
    </section>
  );
}
