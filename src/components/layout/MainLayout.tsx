// src\components\layout\MainLayout.tsx

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const isMainBackgroundRoute = pathname === '/' || pathname === '/contact';

  const shellClassName = isMainBackgroundRoute ? 'site-shell site-shell--main-bg' : 'site-shell';

  return (
    <div className={shellClassName}>
      <Header />
      <main className='site-main'>{children}</main>
      <Footer />
    </div>
  );
}
