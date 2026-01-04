// src/components/contact/ContactHero.tsx

import Image from 'next/image';
import { contactImages } from '@/lib/images';
import type { Lang } from '@/lib/i18n';
import { getContactDict } from '@/lib/i18n/contact';

type Props = {
  lang: Lang;
};

export default function ContactHero({ lang }: Props) {
  const dict = getContactDict(lang);

  return (
    <section className='contact_hero'>
      <div className='contact_hero__container site-container site-container--wide'>
        <div className='contact_hero__grid'>
          {/* Desktop media version */}
          <div className='contact_hero__media'>
            <Image
              src={contactImages.contactHeroDesktop}
              alt={dict.hero.imageAlt}
              width={560}
              height={560}
              className='contact_hero__image'
              sizes='(min-width: 1024px) 560px, 100vw'
              priority
            />
          </div>

          <div className='contact_hero__panel'>
            <div className='contact_hero__panel_top'>
              <h1 className='contact_hero__title'>{dict.hero.title}</h1>
            </div>

            <div className='contact_hero__panel_bottom'>
              <p className='contact_hero__text'>
                {dict.hero.textLine1}
                <br />
                {dict.hero.textLine2}
                <br />
                {dict.hero.textLine3}
              </p>
            </div>
          </div>

          {/* Mobile media version optimized for smaller viewports */}
          <div className='contact_hero__media_mobile'>
            <Image
              src={contactImages.contactHeroMobile}
              alt={dict.hero.imageAlt}
              width={720}
              height={540}
              className='contact_hero__image'
              sizes='(max-width: 1023px) 100vw, 1px'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
