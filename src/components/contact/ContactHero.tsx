// src/components/contact/ContactHero.tsx

import Image from 'next/image';
import { contactImages } from '@/lib/images';

export default function ContactHero() {
  return (
    <section className='contact_hero'>
      <div className='contact_hero__container site-container site-container--wide'>
        <div className='contact_hero__grid'>
          <div className='contact_hero__media'>
            <Image
              src={contactImages.contactHeroDesktop}
              alt='Retrato profissional em ambiente de trabalho'
              width={560}
              height={560}
              className='contact_hero__image'
              sizes='(min-width: 1024px) 560px, 100vw'
              priority
            />
          </div>

          <div className='contact_hero__panel'>
            <div className='contact_hero__panel_top'>
              <h1 className='contact_hero__title'>Entre em contacto comigo</h1>
            </div>

            <div className='contact_hero__panel_bottom'>
              <p className='contact_hero__text'>
                Envie mensagem através do
                <br />
                formulário abaixo e retornarei o contacto
                <br />
                logo que possível.
              </p>
            </div>
          </div>

          <div className='contact_hero__media_mobile'>
            <Image
              src={contactImages.contactHeroMobile}
              alt='Retrato profissional em ambiente de trabalho'
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
