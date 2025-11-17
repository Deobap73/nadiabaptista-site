// src/components/layout/MainLayout.tsx

'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='site-shell'>
      <Header />
      <main className='site-main'>{children}</main>
      <Footer />
    </div>
  );
}
