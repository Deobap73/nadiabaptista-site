// src/app/layout.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/globals.scss';
import MainLayout from '../components/layout/MainLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://nadiabaptista.pt'),
  title: {
    default: 'Nadia Baptista | Neuropsicologia e Psicologia do Desporto no Porto',
    template: '%s | Nadia Baptista',
  },
  description:
    'Exploração académica e literacia em saúde mental na Universidade Fernando Pessoa. Foco em Neuropsicologia, Psicologia do Desporto e performance cognitiva no Porto.',
  keywords: [
    'Nadia Baptista',
    'Psicologia Porto',
    'Estudante de Psicologia UFP',
    'Neuropsicologia Porto',
    'Psicologia do Desporto',
    'Saúde Mental Porto',
    'Performance Cognitiva',
    'Literacia em Saúde Mental',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nadia Baptista | Psicologia, Cérebro e Performance',
    description:
      'Investigação e literacia em Neuropsicologia e Psicologia do Desporto. Estudante na UFP Porto.',
    url: 'https://nadiabaptista.pt',
    siteName: 'Nadia Baptista - Psicologia',
    locale: 'pt_PT',
    type: 'website',
    // --- The field for the OG image. ---
    images: [
      {
        url: 'https://res.cloudinary.com/dleir1jqn/image/upload/v1767350948/NadiaBaptista-site/og-image.webp', // URL completa da imagem
        width: 1200, // Recommended width for OG images
        height: 630, // Recommended height for OG images.
        alt: 'Nadia Baptista - Neuropsicologia e Psicologia do Desporto', // Alternative text for accessibility and SEO.
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
  return (
    <html lang='pt-PT'>
      <body suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
