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
            Alguns dos meus hobbies incluem jogar voleibol, uma atividade que ocupa uma parte
            importante da minha rotina e que me acompanha há vários anos. <br />
            Gosto de ouvir música e de descobrir sítios novos, tanto na minha cidade como fora dela.
            <br />
            Tenho também gosto por viajar e conhecer diferentes locais, apreciar as suas histórias,
            culturas e gastronomias e observar como cada lugar tem a sua identidade própria.
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
              Quando concluir a licenciatura, pretendo ingressar num mestrado em Psicologia do
              Desporto ou em Neuropsicologia, duas áreas que continuo a ponderar. <br />A Psicologia
              do Desporto atrai-me de forma particular, porque o desporto sempre fez parte da minha
              vida. <br />
              Como atleta, reconheço as dificuldades que podem surgir no dia a dia, sobretudo a
              gestão da pressão, das lesões e de outras exigências que nem sempre recebem o
              acompanhamento adequado. Gostaria de contribuir para esta área, oferecendo apoio
              especializado a quem vive estes desafios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
