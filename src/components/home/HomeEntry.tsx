// src/components/home/HomeEntry.tsx

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HomeDesktop from './HomeDesktop';
import LandingMobile from './LandingMobile';
import HomeMobile from './HomeMobile';
import type { Lang } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeEntry({ lang }: Props) {
  const searchParams = useSearchParams();

  const [isMobile, setIsMobile] = useState(false);
  const [showMobileHome, setShowMobileHome] = useState(false);

  useEffect(() => {
    const shouldOpen = searchParams.get('open_login') === '1';
    if (!shouldOpen) return;

    window.dispatchEvent(new Event('nb_open_login_modal'));
  }, [searchParams]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();
    window.addEventListener('resize', check);

    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isMobile) {
    return <HomeDesktop lang={lang} />;
  }

  if (!showMobileHome) {
    return <LandingMobile lang={lang} onEnter={() => setShowMobileHome(true)} />;
  }

  return <HomeMobile lang={lang} />;
}
