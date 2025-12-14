// src/components/blog/BlogHero.tsx

import Image from 'next/image';
import { blogImages } from '../../lib/images';

export default function BlogHero() {
  return (
    <section className='blog_hero' aria-labelledby='blog_hero_heading'>
      <div className='blog_hero__container site-container site-container--wide'>
        <div className='blog_hero__grid'>
          <header className='blog_hero__content'>
            <p className='blog_hero__eyebrow'>Mente Forte, Jogo Vencedor</p>

            <h1 id='blog_hero_heading' className='blog_hero__title'>
              A Psicologia em Campo e<br />
              na Vida
            </h1>

            <div className='blog_hero__text'>
              <p>
                A vitória começa na cabeça. Traduzo conceitos da Psicologia (motivação, ansiedade,
                coesão de grupo) aplicados no desporto.
              </p>
              <p>
                Do vólei a qualquer modalidade. Um espaço para estudantes, atletas e treinadores que
                procuram ferramentas científicas para fortalecer o foco e a confiança.
              </p>
            </div>
          </header>

          <div className='blog_hero__media'>
            <div className='blog_hero__media_bg' aria-hidden='true' />
            <Image
              src={blogImages.blogHeroDesktop}
              alt='Retrato da Nadia Baptista em ambiente interior, sentada no chão com bola de voleibol'
              width={560}
              height={560}
              className='blog_hero__image'
              sizes='(min-width: 1024px) 560px, 100vw'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
