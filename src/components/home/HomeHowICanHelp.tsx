// src\components\home\HomeHowICanHelp.tsx

import React from 'react';
import { howICanHelpCards, type HelpCard } from './howICanHelpCards';

const HomeHowICanHelp: React.FC = () => {
  return (
    <section className='home-how-help' aria-labelledby='home-how-help-title'>
      <div className='home-how-help__container site-container'>
        <header className='home-how-help__header'>
          <h2 id='home-how-help-title' className='home-how-help__title'>
            MENTE, CÉREBRO E PERFORMANCE
          </h2>
          <p className='home-how-help__intro'>
            O equilíbrio entre o rendimento desportivo e a saúde cognitiva é a chave para o sucesso.
            Enquanto finalizo o meu percurso na Universidade Fernando Pessoa, exploro como a
            Neuropsicologia e a Psicologia do Desporto se cruzam para otimizar o foco, a gestão do
            stress e a resiliência emocional. Descubra a ciência por trás de uma mente de elite.
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
