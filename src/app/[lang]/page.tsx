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

  return {
    title: locale === 'en' ? 'Home' : 'Início',
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
