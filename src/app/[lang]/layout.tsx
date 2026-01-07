// src/app/[lang]/layout.tsx

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import type { Lang } from '@/lib/i18n';
import { normalizeLang } from '@/lib/i18n';

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const safe = normalizeLang(lang);

  const titleDefault =
    safe === 'pt'
      ? 'Nádia Baptista | Neuropsicologia e Psicologia do Desporto no Porto'
      : 'Nadia Baptista | Neuropsychology and Sport Psychology in Porto';

  const descriptionDefault =
    safe === 'pt'
      ? 'Exploração académica e literacia em saúde mental na Universidade Fernando Pessoa. Foco em Neuropsicologia, Psicologia do Desporto e performance cognitiva no Porto.'
      : 'Academic exploration and mental health literacy at Universidade Fernando Pessoa. Focus on neuropsychology, sport psychology, and cognitive performance in Porto.';

  const canonical = safe === 'pt' ? '/pt' : '/en';

  return {
    metadataBase: new URL('https://nadiabaptista.pt'),
    title: {
      default: titleDefault,
      template: `%s | ${safe === 'pt' ? 'Nádia Baptista' : 'Nadia Baptista'}`,
    },
    description: descriptionDefault,
    alternates: {
      canonical,
      languages: {
        'pt-PT': '/pt',
        en: '/en',
      },
    },
    openGraph: {
      title:
        safe === 'pt'
          ? 'Nádia Baptista | Psicologia, Cérebro e Performance'
          : 'Nadia Baptista | Mind, Brain and Performance',
      description:
        safe === 'pt'
          ? 'Investigação e literacia em Neuropsicologia e Psicologia do Desporto. Estudante na UFP Porto.'
          : 'Research and literacy in neuropsychology and sport psychology. Psychology student in Porto.',
      url: `https://nadiabaptista.pt/${safe}`,
      siteName: 'Nádia Baptista',
      locale: safe === 'pt' ? 'pt_PT' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://res.cloudinary.com/dleir1jqn/image/upload/v1767350948/NadiaBaptista-site/og-image.webp',
          width: 1200,
          height: 630,
          alt: 'Nádia Baptista',
          type: 'image/webp',
        },
      ],
    },
    // src/app/[lang]/layout.tsx

    icons: {
      apple: [{ url: '/icons/apple-icon-180.png', sizes: '180x180', type: 'image/png' }],
      icon: [
        // Provide explicit size for the 96x96 icon to help Google recognition
        { url: '/favicon.ico', sizes: '96x96', type: 'image/x-icon' },
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'], // Explicit shortcut icon for older crawlers
      other: [
        {
          rel: 'mask-icon',
          url: '/icons/maskable-icon-192.png',
        },
      ],
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  const safe = normalizeLang(lang) as Lang;

  return <MainLayout lang={safe}>{children}</MainLayout>;
}
