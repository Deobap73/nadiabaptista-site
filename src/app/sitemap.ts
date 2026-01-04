// src\app\sitemap.ts

import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const site = 'https://nadiabaptista.pt';
const locales = ['pt', 'en'];

export const runtime = 'nodejs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Definição das Rotas Estáticas com suporte a Idiomas
  const staticPages = ['', 'about', 'portfolio', 'blog', 'contact', 'services', 'studies'];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    staticPages.map((page) => ({
      url: `${site}/${lang}${page ? `/${page}` : ''}`,
      changeFrequency: page === 'blog' || page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  // 2. Definição das Rotas Dinâmicas (Blog)
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
    });

    blogRoutes = locales.flatMap((lang) =>
      posts.map((p) => ({
        url: `${site}/${lang}/blog/${p.slug}`,
        lastModified: p.updatedAt || p.publishedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    );
  } catch (error) {
    console.error('Sitemap Blog Error:', error);
  }

  // 3. TODO: Se tiveres áreas de estudo dinâmicas (studies/areas/[slug]),
  // deves replicar a lógica acima para essas entidades.

  return [...staticRoutes, ...blogRoutes];
}
