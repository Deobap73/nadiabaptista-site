// src/components/layout/Footer.tsx

'use client';

import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='site-footer'>
      <div className='site-footer__inner'>
        <div className='site-footer__info'>
          <p className='site-footer__title'>Nádia Baptista</p>
          <p className='site-footer__text'>
            Psicóloga em Porto. Espaço de escuta, cuidado e crescimento emocional.
          </p>
        </div>

        <div className='site-footer__links'>
          <Link href='/contact' className='site-footer__link'>
            Marcar consulta
          </Link>
          <Link href='/privacy' className='site-footer__link'>
            Política de privacidade
          </Link>
        </div>

        <p className='site-footer__copy'>© {year} Nádia Baptista. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
