// src/components/home/HomeQuickLinks.tsx

import Link from 'next/link';

export default function HomeQuickLinks() {
  return (
    <section aria-labelledby='home-quick-links-title'>
      <h2 id='home-quick-links-title'>Acessos rápidos</h2>
      <nav aria-label='Secções principais'>
        <ul>
          <li>
            <Link href='/services'>Serviços e abordagens</Link>
          </li>
          <li>
            <Link href='/about'>Sobre mim</Link>
          </li>
          <li>
            <Link href='/faq'>Perguntas frequentes</Link>
          </li>
          <li>
            <Link href='/contact'>Marcar sessão</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
