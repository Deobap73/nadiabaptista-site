// src/components/layout/MainLayout.tsx

'use client';

import React from 'react';
/* import { Header } from './Header'; */
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 * Wraps page content with the global shell: header (no momento comentado) and footer.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='site-shell'>
      {/* <Header /> */}
      <main className='site-main'>{children}</main>
      <Footer />
    </div>
  );
}
