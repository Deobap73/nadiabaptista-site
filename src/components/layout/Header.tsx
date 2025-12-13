// src/components/layout/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { homeImages } from '../../lib/images';

export default function Header() {
  return (
    <header className='site-header'>
      <div className='site-header__inner'>
        <Link href='/' aria-label='Go to homepage'>
          <Image
            src={homeImages.logoNadia}
            alt='Assinatura da psicóloga Nadia Baptista'
            width={260}
            height={90}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
