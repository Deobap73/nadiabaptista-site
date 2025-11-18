// src/components/layout/Header.tsx

import Link from 'next/link';

export default function Header() {
  return (
    <header className='siteHeader'>
      <div className='pageContainer siteHeaderInner'>
        <div className='siteHeaderBrand'>
          <Link href='/'>
            <span className='siteHeaderLogo'>Nadia Baptista</span>
            <span className='siteHeaderTagline'>Estudante de psicologia</span>
          </Link>
        </div>

        <nav className='siteHeaderNav' aria-label='Navegacao principal'>
          <ul className='siteHeaderNavList'>
            <li className='siteHeaderNavItem'>
              <Link href='/'>Home</Link>
            </li>
            <li className='siteHeaderNavItem'>
              <Link href='/studies'>Studies</Link>
            </li>
            <li className='siteHeaderNavItem'>
              <Link href='/portfolio'>Portfolio</Link>
            </li>
            <li className='siteHeaderNavItem'>
              <Link href='/blog'>Blog</Link>
            </li>
            <li className='siteHeaderNavItem'>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
