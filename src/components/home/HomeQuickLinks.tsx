// src/components/home/HomeQuickLinks.tsx

import Link from 'next/link';

export default function HomeQuickLinks() {
  return (
    <section className='homeQuickLinks' aria-labelledby='homeQuickLinksTitle'>
      <div className='pageContainer homeQuickLinksInner'>
        <header className='homeQuickLinksHeader'>
          <p className='homeQuickLinksKicker'>Acessos rapidos</p>
          <h2 id='homeQuickLinksTitle' className='homeQuickLinksTitle'>
            Explore o percurso e o trabalho da Nadia
          </h2>
          <p className='homeQuickLinksIntro'>
            Se quiser conhecer melhor o caminho academico, as experiencias e os textos que a Nadia
            vai partilhando, pode usar estes atalhos.
          </p>
        </header>

        <nav className='homeQuickLinksNav' aria-label='Acessos rapidos principais'>
          <ul className='homeQuickLinksList'>
            <li className='homeQuickLinksItem'>
              <h3 className='homeQuickLinksItemTitle'>Studies</h3>
              <p className='homeQuickLinksItemText'>
                Areas de interesse, projetos academicos e participacao em formacoes e seminarios.
              </p>
              <Link href='/studies' className='homeQuickLinksItemLink'>
                Ir para Studies
              </Link>
            </li>

            <li className='homeQuickLinksItem'>
              <h3 className='homeQuickLinksItemTitle'>Portfolio</h3>
              <p className='homeQuickLinksItemText'>
                Visao geral do percurso, competencias e experiencias relevantes enquanto futura
                psicologa.
              </p>
              <Link href='/portfolio' className='homeQuickLinksItemLink'>
                Ver Portfolio
              </Link>
            </li>

            <li className='homeQuickLinksItem'>
              <h3 className='homeQuickLinksItemTitle'>Blog</h3>
              <p className='homeQuickLinksItemText'>
                Textos e reflexoes sobre psicologia, saude mental e temas que surgem ao longo dos
                estudos.
              </p>
              <Link href='/blog' className='homeQuickLinksItemLink'>
                Ler artigos
              </Link>
            </li>

            <li className='homeQuickLinksItem'>
              <h3 className='homeQuickLinksItemTitle'>Contact</h3>
              <p className='homeQuickLinksItemText'>
                Espaco para entrar em contacto em contexto academico ou para futuras oportunidades
                profissionais.
              </p>
              <Link href='/contact' className='homeQuickLinksItemLink'>
                Ir para Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
