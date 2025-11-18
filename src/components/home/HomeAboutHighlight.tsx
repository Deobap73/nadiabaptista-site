// src/components/home/HomeAboutHighlight.tsx

import Link from 'next/link';

export default function HomeAboutHighlight() {
  return (
    <section className='homeAbout' aria-labelledby='homeAboutTitle'>
      <div className='pageContainer homeAboutInner'>
        <div className='homeAboutText'>
          <p className='homeAboutKicker'>Sobre a Nadia</p>
          <h2 id='homeAboutTitle' className='homeAboutTitle'>
            Um caminho em psicologia que ainda esta a crescer
          </h2>
          <p className='homeAboutIntro'>
            A Nadia e estudante de psicologia em Porto e esta a construir, passo a passo, a base
            teorica e humana que mais tarde quer levar para a pratica clinica. O interesse principal
            dela esta ligado a saude mental de jovens adultos e adultos em momentos de mudanca.
          </p>
          <p className='homeAboutBody'>
            Este site nao apresenta ainda servicos clinicos. E um espaco para partilhar estudos,
            projetos, reflexoes e o percurso ate se tornar psicologa. A ideia e que, com o tempo,
            quem chegar aqui consiga ver com clareza quem ela e e o cuidado que coloca em tudo o que
            faz.
          </p>

          <div className='homeAboutActions'>
            <Link href='/portfolio' className='homeAboutPrimaryLink'>
              Ver percurso e competencias
            </Link>
            <Link href='/studies' className='homeAboutSecondaryLink'>
              Explorar estudos e projetos
            </Link>
          </div>
        </div>

        <div className='homeAboutSide' aria-hidden='true'>
          <div className='homeAboutTag'>Estudante de psicologia em Porto</div>
          <div className='homeAboutNoteBox'>
            <p className='homeAboutNoteTitle'>Como gosto de trabalhar</p>
            <p className='homeAboutNoteText'>
              Escuta atenta, curiosidade genuina pela historia de cada pessoa e cuidado com o ritmo
              de cada processo. Estes sao os principios que guiam o caminho da Nadia enquanto futura
              psicologa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
