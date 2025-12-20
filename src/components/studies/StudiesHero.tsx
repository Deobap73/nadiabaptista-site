// src/components/studies/StudiesHero.tsx
import Image from 'next/image';
import { studiesImages } from '../../lib/images';

export default function StudiesHero() {
  return (
    <section className='studies_hero' aria-labelledby='studies_hero_heading'>
      <div className='studies_hero__container site-container site-container--wide'>
        <div className='studies_hero__layout'>
          {/* A ordem HTML foi mantida para acessibilidade, mas visualmente controlamos com CSS */}
          <div className='studies_hero__card'>
            <h1 id='studies_hero_heading' className='studies_hero__title'>
              Investigar Hoje para
              <br />
              Cuidar Amanhã
            </h1>

            <div className='studies_hero__text'>
              <p>
                A minha jornada académica é intencional e direcionada. Cada disciplina, cada artigo
                lido e cada projeto de investigação é um passo na construção de uma base sólida e
                especializada.
              </p>

              <p>
                Aqui apresento as áreas específicas de intervenção e investigação que despertam o
                meu maior interesse, como a [Mencionar uma ou duas áreas, ex: Terapia Cognitivo
                Comportamental em Ansiedade] e a [Ex: Neurociências Aplicadas]. O estudo aprofundado
                destes temas é o meu compromisso com a eficácia e humanização da futura prática
                clínica.
              </p>
            </div>
          </div>

          <div className='studies_hero__media'>
            <Image
              src={studiesImages.studiesHeroDesktop}
              alt='Estudo e investigação em ambiente académico'
              fill
              className='studies_hero__image'
              sizes='(min-width: 1024px) 50vw, 100vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
