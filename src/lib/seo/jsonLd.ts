// src/lib/seo/jsonLd.ts

export function toJsonLd(data: unknown): string {
  return JSON.stringify(data);
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nadia Baptista',
    url: 'https://nadiabaptista.pt',
    inLanguage: 'pt-PT',
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nadia Baptista',
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
      name: 'Nadia Baptista',
      jobTitle: 'Estudante de Psicologia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nadia Baptista',
    },
    inLanguage: 'pt-PT',
  };
}
