// src/components/about/AboutMyStorie.tsx

import Image from 'next/image';
import { aboutImages } from '@/lib/images';

export default function AboutMyStorie() {
  return (
    <section className='about_mystorie' aria-labelledby='about_mystorie_heading'>
      <div className='about_mystorie__container'>
        <header className='about_mystorie__intro'>
          <h2 id='about_mystorie_heading' className='about_mystorie__title'>
            UMA TRAJETÓRIA BASEADA
            <br />
            NO ACREDITAR
          </h2>
        </header>
        <div className='about_mystorie__top'>
          <p className='about_mystorie__text'>
            Acredito em conduzir o acompanhamento ao ritmo que precisa que flua. Para mim, um
            processo terapêutico não é só resolver dificuldades ou encontrar respostas rápidas, é
            escolher formar um olhar honesto e ter coragem para mudar a narrativa. Faço questão de
            acompanhar o seu percurso com presença e sensibilidade, sem pressa e sem receitas
            prontas. Se sente que é esse o caminho, estou aqui do seu lado.
          </p>

          <div className='about_mystorie__image_top'>
            <Image
              src={aboutImages.aboutMyStorie1}
              alt='Nadia sentada no chão num ambiente calmo e acolhedor'
              width={980}
              height={640}
              className='about_mystorie__img'
              sizes='(min-width: 1024px) 560px, 100vw'
            />
          </div>
        </div>

        <div className='about_mystorie__bottom'>
          <div className='about_mystorie__image_bottom'>
            <Image
              src={aboutImages.aboutMyStorie2}
              alt='Nadia encostada a uma pilha de livros com expressão serena'
              width={980}
              height={640}
              className='about_mystorie__img'
              sizes='(min-width: 1024px) 620px, 100vw'
            />
          </div>

          <div className='about_mystorie__panel'>
            <p className='about_mystorie__panel_text'>
              Acredito em conduzir o acompanhamento ao ritmo que precisa que flua. Para mim, um
              processo terapêutico não é só resolver dificuldades ou encontrar respostas rápidas, é
              escolher formar um olhar honesto e ter coragem para mudar a narrativa. Faço questão de
              acompanhar o seu percurso com presença e sensibilidade, sem pressa e sem receitas
              prontas. Se sente que é esse o caminho, estou aqui do seu lado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
