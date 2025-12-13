// src\components\home\HomeHowICanHelp.tsx

import React from 'react';
import { howICanHelpCards, type HelpCard } from '@/content/home/howICanHelpCards';

const HomeHowICanHelp: React.FC = () => {
  return (
    <section className='home-how-help' aria-labelledby='home-how-help-title'>
      <div className='home-how-help__container site-container'>
        <header className='home-how-help__header'>
          <h2 id='home-how-help-title' className='home-how-help__title'>
            COMO POSSO AJUDAR
          </h2>
          <p className='home-how-help__intro'>
            Sentir se confiante, tanto a nível psicológico como emocional, é o componente chave para
            a felicidade. Para isso, ajudo os meus clientes a desenvolver competências para ter um
            sono de qualidade, reduzir o stress e ter a confiança em si mesmos, o que constitui a
            base da autoconfiança.
          </p>
        </header>

        <div className='home-how-help__cards'>
          {howICanHelpCards.map((card: HelpCard) => (
            <article key={card.title} className='home-how-help__card'>
              <h3 className='home-how-help__card-title'>{card.title}</h3>
              <p className='home-how-help__card-text'>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHowICanHelp;
