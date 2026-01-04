// src/components/layout/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import { homeImages } from '../../lib/images';
import HeaderClientSlots from './HeaderClientSlots';
import type { Lang } from '@/lib/i18n';
import { withLangPrefix } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function Header({ lang }: Props) {
  return (
    <header className='site-header'>
      <div className='site-header__inner'>
        <HeaderClientSlots lang={lang} />

        <Link
          href={withLangPrefix(lang, '/')}
          aria-label='Go to homepage'
          className='site-header__logo-link'>
          <Image
            src={homeImages.logoNadia}
            alt='Assinatura da psicóloga Nádia Baptista'
            width={260}
            height={90}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
