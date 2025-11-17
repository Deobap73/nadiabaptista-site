// src/components/layout/Header.tsx

'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className='site-header'>
      <div className='site-header__inner'>
        <div className='site-header__brand'>
          <Link href='/'>
            <span className='site-header__title'>Nádia Baptista</span>
            <span className='site-header__subtitle'>Psicóloga em Porto</span>
          </Link>
        </div>

        <nav className='site-header__nav' aria-label='Navegação principal'>
          <ul className='site-header__nav-list'>
            <li>
              <Link href='/about' className='site-header__nav-link'>
                Sobre
              </Link>
            </li>
            <li>
              <Link href='/services' className='site-header__nav-link'>
                Serviços
              </Link>
            </li>
            <li>
              <Link href='/faq' className='site-header__nav-link'>
                Perguntas frequentes
              </Link>
            </li>
            <li>
              <Link href='/blog' className='site-header__nav-link'>
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='site-header__nav-link site-header__nav-link--primary'>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
