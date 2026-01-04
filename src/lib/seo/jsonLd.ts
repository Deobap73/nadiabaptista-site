// src/lib/seo/jsonLd.ts
import { Lang } from '../i18n';
import { MAIN_NAV_CONFIG } from '@/config/navigation';

export function toJsonLd(data: unknown): string {
  return JSON.stringify(data);
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nádia Baptista',
    url: 'https://nadiabaptista.pt',
    inLanguage: 'pt-PT',
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nádia Baptista',
    jobTitle: 'Estudante de Psicologia',
    description:
      'Futura psicóloga. Estudante de Psicologia no Porto com foco em neuropsicologia e psicologia do desporto.',
    url: 'https://nadiabaptista.pt',
  };
}

export function blogPostJsonLd(input: {
  title: string;
  description?: string | null;
  url: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description || undefined,
    url: input.url,
    image: input.image ? [input.image] : undefined,
    datePublished: input.datePublished || undefined,
    dateModified: input.dateModified || undefined,
    author: {
      '@type': 'Person',
      name: 'Nádia Baptista',
      jobTitle: 'Estudante de Psicologia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nádia Baptista',
    },
    inLanguage: 'pt-PT',
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness', // Ou 'HealthAndBeautyBusiness' conforme preferires
    'name': 'Nádia Baptista - Neuropsicologia e Performance',
    'image':
      'https://res.cloudinary.com/dleir1jqn/image/upload/v1767350948/NadiaBaptista-site/og-image.webp',
    '@id': 'https://nadiabaptista.pt',
    'url': 'https://nadiabaptista.pt',
    'telephone': '+351 999 999 999',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Rua Cooperativa as 7 bicas',
      'addressLocality': 'Senhora da Hora',
      'addressRegion': 'Porto',
      'postalCode': '4460-282', // Confirma o código postal exato
      'addressCountry': 'PT',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 41.1833, // Coordenadas aproximadas da Senhora da Hora
      'longitude': -8.65,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '19:00',
      },
    ],
    'sameAs': [
      'https://www.instagram.com/nadiabaptista',
      'https://www.linkedin.com/in/nadiabaptista',
    ],
  };
}

export function navigationJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': MAIN_NAV_CONFIG.map((item, index: number) => ({
      '@type': 'SiteNavigationElement',
      'position': index + 1,
      'name': item.label[lang],
      'url': `https://nadiabaptista.pt/${lang}${item.href}`,
    })),
  };
}
