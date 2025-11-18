// src/components/home/HomeHero.tsx

import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className='homeHero' aria-labelledby='homeHeroTitle'>
      <div className='pageContainer homeHeroInner'>
        <div className='homeHeroContent'>
          <p className='homeHeroKicker'>Consultas de psicologia em Porto</p>

          <h1 id='homeHeroTitle' className='homeHeroTitle'>
            Um espaco calmo para falar sobre o que esta a viver
          </h1>

          <p className='homeHeroText'>
            Acompanho jovens adultos e adultos em momentos de ansiedade, mudanca, luto ou sobrecarga
            emocional. O foco esta em compreender a sua historia e encontrar consigo formas mais
            leves de viver o quotidiano.
          </p>

          <div className='homeHeroActions'>
            <Link href='/contact' className='homeHeroPrimaryButton'>
              Marcar primeira sessao
            </Link>
            <Link href='/services' className='homeHeroSecondaryLink'>
              Ver como trabalho
            </Link>
          </div>

          <p className='homeHeroNote'>Atendimento presencial em Porto e online para todo o pais.</p>
        </div>

        <div className='homeHeroVisual' aria-hidden='true'>
          <div className='homeHeroCard'>
            <p className='homeHeroCardTitle'>Primeira sessao</p>
            <ul className='homeHeroCardList'>
              <li>Escuta sem julgamento</li>
              <li>Compreender o que a trouxe aqui</li>
              <li>Definir juntos os proximos passos</li>
            </ul>
            <p className='homeHeroCardFoot'>Duracao aproximada de 50 minutos.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
