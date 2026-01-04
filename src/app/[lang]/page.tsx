// src/app/[lang]/page.tsx

import type { Metadata } from 'next';
import Script from 'next/script';
import HomeEntry from '@/components/home/HomeEntry';
import { toJsonLd, websiteJsonLd, personJsonLd } from '@/lib/seo/jsonLd';
import type { Lang } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

function safeLang(v: Lang): Lang {
  return v === 'en' ? 'en' : 'pt';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = safeLang(lang);

  if (locale === 'en') {
    return {
      title: 'Home · Nadia Baptista · Psychology student in Porto',
      description:
        'Homepage of Nadia Baptista, psychology student in Porto. Learn about her studies, portfolio, blog and how to get in touch.',
      alternates: {
        canonical: '/en',
        languages: {
          'pt-PT': '/pt',
          en: '/en',
        },
      },
    };
  }

  return {
    title: 'Início · Nádia Baptista · Psicologia no Porto',
    description:
      'Página inicial de Nádia Baptista. Explora estudos, portfólio, blog e como entrar em contacto.',
    alternates: {
      canonical: '/pt',
      languages: {
        'pt-PT': '/pt',
        en: '/en',
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = safeLang(lang);

  return (
    <>
      <Script
        id='jsonld-website'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd()) }}
      />
      <Script
        id='jsonld-person'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: toJsonLd(personJsonLd()) }}
      />

      <HomeEntry lang={locale} />

      <meta name='nb-lang' content={locale} />
    </>
  );
}
