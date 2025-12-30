// src/app/layout.tsx
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import MainLayout from '../components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Nadia Baptista · Psychology student in Porto',
  description:
    'Website of Nadia Baptista, psychology student in Porto. Studies, portfolio, blog and contact in a calm and clear space.',
  icons: {
    apple: '/icons/apple-icon-180.png',
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/maskable-icon-192.png',
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
