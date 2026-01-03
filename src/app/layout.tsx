// src/app/layout.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import MainLayout from '../components/layout/MainLayout';
import GoogleTagManager from '@/components/seo/GoogleTagManager';

export const metadata: Metadata = {
  metadataBase: new URL('https://nadiabaptista.pt'),
  title: {
    default: 'Nádia Baptista | Neuropsicologia e Psicologia do Desporto no Porto',
    template: '%s | Nádia Baptista',
  },
  description:
    'Exploração académica e literacia em saúde mental na Universidade Fernando Pessoa. Foco em Neuropsicologia, Psicologia do Desporto e performance cognitiva no Porto.',
  keywords: [
    'Nádia Baptista',
    'Psicologia Porto',
    'Estudante de Psicologia UFP',
    'Neuropsicologia Porto',
    'Psicologia do Desporto',
    'Saúde Mental Porto',
    'Performance Cognitiva',
    'Literacia em Saúde Mental',
    'Universidade Fernando Pessoa',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nádia Baptista | Psicologia, Cérebro e Performance',
    description:
      'Investigação e literacia em Neuropsicologia e Psicologia do Desporto. Estudante na UFP Porto.',
    url: 'https://nadiabaptista.pt',
    siteName: 'Nádia Baptista - Psicologia',
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dleir1jqn/image/upload/v1767350948/NadiaBaptista-site/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Nádia Baptista - Neuropsicologia e Psicologia do Desporto',
        type: 'image/webp',
      },
    ],
  },
  icons: {
    apple: '/icons/apple-icon-180.png',
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: [{ rel: 'mask-icon', url: '/icons/maskable-icon-192.png' }],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || '').trim();

  return (
    <html lang='pt-PT' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GoogleTagManager gtmId={gtmId} />

        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}

        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
