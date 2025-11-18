// src/app/layout.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import MainLayout from '../components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Nadia Baptista · Psychology student in Porto',
  description:
    'Website of Nadia Baptista, psychology student in Porto. Studies, portfolio, blog and contact in a calm and clear space.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
