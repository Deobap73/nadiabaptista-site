// src/components/home/HomeAboutHighlight.tsx

import Image from 'next/image';
import Link from 'next/link';
import { homeImages } from '@/lib/images';

export default function HomeAboutHighlight() {
  return (
    <section className='home-about-highlight' aria-labelledby='home-about-highlight-heading'>
      <div className='home-about-highlight__inner site-container site-container--wide'>
        {/* Imagem */}
        <div className='home-about-highlight__media'>
          <div className='home-about-highlight__image-wrapper'>
            <Image
              src={homeImages.aboutDesktop}
              alt='Retrato profissional da psicóloga Nádia Baptista'
              width={480}
              height={600}
              sizes='(min-width: 1024px) 480px, 100vw'
              className='home-about-highlight__image'
              priority
            />
          </div>
        </div>

        {/* Conteúdo de texto */}
        <div className='home-about-highlight__content'>
          <header className='home-about-highlight__header'>
            <h2 id='home-about-highlight-heading' className='home-about-highlight__title'>
              <span className='home-about-highlight__title-line'>Nádia Baptista</span>
            </h2>
            <span className='home-about-highlight__divider' aria-hidden='true' />
          </header>

          <p className='home-about-highlight__text'>
            Defendo uma abordagem à Psicologia que alia o rigor científico da Neuropsicologia à
            dinâmica do Desporto. O meu foco enquanto estudante é compreender como podemos otimizar
            processos cognitivos para encontrar soluções práticas e eficazes. Acredito na partilha
            de ferramentas que capacitem o indivíduo a lidar com desafios de forma autónoma, olhando
            para as experiências passadas como aprendizagem para potenciar o rendimento futuro.
          </p>

          <Link href='/about' className='home-about-highlight__button btn btn--primary'>
            Mais informações
          </Link>
        </div>
      </div>
    </section>
  );
}
