// src/components/layout/MainLayout.tsx

'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import type { Lang } from '@/lib/i18n';

interface MainLayoutProps {
  children: React.ReactNode;
  lang: Lang;
}

export default function MainLayout({ children, lang }: MainLayoutProps) {
  return (
    <div className='site-shell'>
      <Header lang={lang} />
      <main className='site-main'>{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
