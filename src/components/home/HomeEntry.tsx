// src/components/home/HomeEntry.tsx
'use client';

import { useState, useEffect } from 'react';
import HomeDesktop from './HomeDesktop';
import LandingMobile from './LandingMobile';
import HomeMobile from './HomeMobile';

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

  if (!isMobile) {
    return <HomeDesktop />;
  }

  if (!showMobileHome) {
    return <LandingMobile onContinue={() => setShowMobileHome(true)} />;
  }

  return <HomeMobile />;
}
