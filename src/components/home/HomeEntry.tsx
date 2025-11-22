// src/components/home/HomeEntry.tsx

'use client';

import { useState, useEffect } from 'react';
import HomeDesktop from './HomeDesktop';
import LandingMobile from './LandingMobile';
import HomeMobile from './HomeMobile';
import MainLayout from '../layout/MainLayout';

export default function HomeEntry() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileHome, setShowMobileHome] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener('resize', check);

    return () => window.removeEventListener('resize', check);
  }, []);

  // Desktop: sempre com layout completo
  if (!isMobile) {
    return (
      <MainLayout>
        <HomeDesktop />
      </MainLayout>
    );
  }

  // Mobile antes de entrar no site: apenas Landing, sem footer
  if (!showMobileHome) {
    return <LandingMobile onEnter={() => setShowMobileHome(true)} />;
  }

  // Mobile depois de clicar "Seja bem vindo": HomeMobile com footer
  return (
    <MainLayout>
      <HomeMobile />
    </MainLayout>
  );
}
