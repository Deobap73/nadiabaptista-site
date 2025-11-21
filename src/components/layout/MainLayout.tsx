// src/components/layout/MainLayout.tsx

'use client';

import React from 'react';
/* import { Header } from './Header'; */
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout
 * Wraps every page with the global header and footer.
 * Pages only care about their own content and use `pageContainer`
 * for horizontal alignment.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='siteShell'>
      {/* <Header /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
