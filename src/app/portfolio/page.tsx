// src/app/portfolio/page.tsx

export default function PortfolioPage() {
  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='portfolioTitle'>
        <header>
          <p className='pageKicker'>Perfil profissional em construcao</p>
          <h1 id='portfolioTitle'>Portfolio e percurso da Nadia Baptista</h1>
          <p className='pageIntro'>
            Esta pagina apresenta o percurso academico, competencias e experiencias relevantes da
            Nadia enquanto futura psicologa. A ideia e oferecer uma visao clara e humana de como se
            esta a preparar para acompanhar pessoas em contexto clinico.
          </p>
        </header>

        <section aria-labelledby='educationTitle'>
          <h2 id='educationTitle'>Formacao academica</h2>
          <p>
            Aqui vamos detalhar o curso de psicologia, a instituicao de ensino e o ano previsto de
            conclusao. Mais tarde podemos adicionar cadeiras ou modulos que tenham sido
            particularmente marcantes.
          </p>
        </section>

        <section aria-labelledby='skillsTitle'>
          <h2 id='skillsTitle'>Competencias</h2>
          <p>
            Esta secao pode agrupar tanto competencias tecnicas ligadas a psicologia, como
            entrevista clinica ou fundamentos de avaliacao psicologica, como competencias
            relacionais, por exemplo empatia, escuta ativa e comunicacao clara.
          </p>
        </section>

        <section aria-labelledby='experienceTitle'>
          <h2 id='experienceTitle'>Experiencias e atividades</h2>
          <p>
            Quando existirem experiencias em contexto de saude, educacao ou intervencao social,
            podemos descreve las aqui, incluindo contexto, funcoes e aprendizagens principais.
          </p>
        </section>

        <section aria-labelledby='publicationsTitle'>
          <h2 id='publicationsTitle'>Trabalhos, apresentacoes e publicacoes</h2>
          <p>
            Se ao longo do percurso surgirem posters, apresentacoes em conferencias ou textos
            publicados, este sera o lugar certo para os reunir com uma linguagem acessivel para quem
            visita o site.
          </p>
        </section>
      </section>
    </main>
  );
}
