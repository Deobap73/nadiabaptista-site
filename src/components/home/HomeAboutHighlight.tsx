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
              alt='Retrato profissional da psicóloga Nadia Baptista'
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
              <span className='home-about-highlight__title-line'>Nadia Baptista</span>
            </h2>
            <span className='home-about-highlight__divider' aria-hidden='true' />
          </header>

          <p className='home-about-highlight__text'>
            Acredito em conduzir o aconselhamento da maneira que gostaria que fosse feito para mim.
            As sessões são uma série de conversas onde discutimos situações difíceis da vida e
            encontramos opções, soluções e formas de lidar com elas. Eu ofereço ferramentas para
            abordar a vida de maneira diferente, reduzindo a necessidade de aconselhamento a longo
            prazo. Se experiências anteriores estiverem a ser um obstáculo, nós exploramo las no
            contexto de avançar em vez de viver no passado.
          </p>

          <Link href='/about' className='home-about-highlight__button btn btn--primary'>
            Mais informações
          </Link>
        </div>
      </div>
    </section>
  );
}
