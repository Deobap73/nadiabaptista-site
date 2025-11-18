// src/components/home/HomeNewsletterBanner.tsx

import Link from 'next/link';

export default function HomeNewsletterBanner() {
  return (
    <section className='homeNewsletter' aria-labelledby='homeNewsletterTitle'>
      <div className='pageContainer homeNewsletterInner'>
        <div className='homeNewsletterText'>
          <p className='homeNewsletterKicker'>Acompanhar o percurso</p>
          <h2 id='homeNewsletterTitle' className='homeNewsletterTitle'>
            No futuro, um espaco para recursos e novidades
          </h2>
          <p className='homeNewsletterIntro'>
            Ao longo dos proximos anos, a Nadia vai partilhar artigos, notas de estudo e recursos
            sobre saude mental e psicologia. Esta secao podera tornar se uma pequena newsletter ou
            ponto de acesso rapido a esses conteudos.
          </p>
          <p className='homeNewsletterBody'>
            Para ja, se quiser acompanhar o que ela vai escrevendo, pode visitar o blog ou entrar em
            contacto em contexto academico ou profissional.
          </p>
        </div>

        <div className='homeNewsletterActions'>
          <Link href='/blog' className='homeNewsletterPrimary'>
            Ir para o blog
          </Link>
          <Link href='/contact' className='homeNewsletterSecondary'>
            Falar com a Nadia
          </Link>
        </div>
      </div>
    </section>
  );
}
