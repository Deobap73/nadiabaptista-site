// src/app/studies/page.tsx

export default function StudiesPage() {
  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='studiesTitle'>
        <header>
          <p className='pageKicker'>Percurso academico</p>
          <h1 id='studiesTitle'>Estudos e areas de interesse</h1>
          <p className='pageIntro'>
            Esta pagina apresenta as areas de interesse, projetos academicos e experiencias praticas
            que fazem parte do caminho da Nadia enquanto estudante de psicologia. O objetivo e
            mostrar como esta a construir a base teorica e humana que mais tarde sustentara a
            pratica clinica.
          </p>
        </header>

        <section aria-labelledby='areasTitle'>
          <h2 id='areasTitle'>Areas de interesse em psicologia</h2>
          <p>
            Aqui mais tarde podemos detalhar as areas que mais a interessam, como por exemplo
            psicologia clinica, intervencao com jovens adultos, saude mental em contexto
            universitario ou outras tematicas que estejam presentes no percurso de estudo.
          </p>
        </section>

        <section aria-labelledby='projectsTitle'>
          <h2 id='projectsTitle'>Projetos e trabalhos academicos</h2>
          <p>
            Este espaco pode reunir resumos de trabalhos academicos, artigos, relatorios de cadeiras
            importantes ou projetos de investigacao em que tenha participado. No futuro podemos usar
            cards individuais para cada projeto.
          </p>
        </section>

        <section aria-labelledby='practiceTitle'>
          <h2 id='practiceTitle'>Estagios, voluntariado e pratica</h2>
          <p>
            Quando existirem experiencias praticas, como estagios ou voluntariado em contexto de
            saude mental, podemos descreve las aqui com foco no papel desempenhado e no que foi
            aprendido em cada contexto.
          </p>
        </section>

        <section aria-labelledby='eventsTitle'>
          <h2 id='eventsTitle'>Conferencias, seminarios e formacoes</h2>
          <p>
            Participacao em eventos academicos e formacoes complementares tambem pode ser listada
            neste espaco, reforcando o compromisso continuo com a atualizacao e aprendizagem.
          </p>
        </section>
      </section>
    </main>
  );
}
