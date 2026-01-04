// src/components/home/LandingMobile.tsx

'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { homeImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { getHomeDict } from '@/lib/i18n';

type LandingMobileProps = {
  lang: Lang;
  onEnter: () => void;
};

export default function LandingMobile({ lang, onEnter }: LandingMobileProps) {
  const dict = useMemo(() => getHomeDict(lang), [lang]);

  useEffect(() => {
    document.body.classList.add('is-landing-mobile');
    return () => {
      document.body.classList.remove('is-landing-mobile');
    };
  }, []);

  return (
    <section className='landing-mobile' aria-labelledby='landing-heading'>
      <div className='landing-mobile__inner'>
        <div className='landing-mobile__text-block'>
          <h1 id='landing-heading' className='landing-mobile__title'>
            {dict.landingMobile.titleFirst}
            <br />
            <span>{dict.landingMobile.titleSecond}</span>
          </h1>

          <div className='landing-mobile__divider' aria-hidden='true' />

          <p className='landing-mobile__intro'>{dict.landingMobile.intro}</p>
        </div>

        <div className='landing-mobile__photo'>
          <Image
            src={homeImages.landingMobile}
            alt={dict.landingMobile.imageAlt}
            width={360}
            height={520}
            priority
          />

          <button type='button' className='landing-mobile__cta btn btn--primary' onClick={onEnter}>
            {dict.landingMobile.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
