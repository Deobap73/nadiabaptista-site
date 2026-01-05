// src/app/manifest.ts

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nádia Baptista',
    short_name: 'Nádia',
    description:
      'Estudante na UFP Porto. Neuropsicologia e Psicologia do Desporto no Porto. Investigação, literacia em saúde mental e performance cognitiva.',
    start_url: '/pt',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6986a7',
    lang: 'pt-PT',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/maskable-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
