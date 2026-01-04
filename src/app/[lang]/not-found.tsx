// src/app/[lang]/not-found.tsx

import Link from 'next/link';

type Lang = 'pt' | 'en';

type Props = {
  params?: { lang?: Lang };
};

function safeLang(value: unknown): Lang {
  return value === 'en' ? 'en' : 'pt';
}

export default function NotFoundPage({ params }: Props) {
  const lang = safeLang(params?.lang);

  return (
    <main className='pageContainer notFoundPage'>
      <section className='notFoundSection'>
        <p className='notFoundKicker'>Página não encontrada</p>

        <h1 className='notFoundTitle'>Esta página não existe.</h1>

        <p className='notFoundText'>
          Por vezes, um link muda ou uma página ainda não está pronta. Pode voltar à página inicial
          e continuar a explorar o caminho que a Nádia está a seguir como estudante de psicologia.
        </p>

        <Link href={`/${lang}`} className='notFoundButton'>
          Voltar à página inicial
        </Link>
      </section>
    </main>
  );
}
