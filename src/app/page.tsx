// src/app/page.tsx

import type { Metadata } from 'next';
import HomeEntry from '@/components/home/HomeEntry';
import Script from 'next/script';
import { toJsonLd, websiteJsonLd, personJsonLd } from '@/lib/seo/jsonLd';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home · Nadia Baptista · Psychology student in Porto',
    description:
      'Homepage of Nadia Baptista, psychology student in Porto. Learn about her studies, portfolio, blog and how to get in touch.',
  };
}

export default function HomePage() {
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
      <HomeEntry />
    </>
  );
}
