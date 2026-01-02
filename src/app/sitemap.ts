// src\app\sitemap.ts

import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const site = 'https://nadiabaptista.pt';

export const runtime = 'nodejs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${site}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site}/portfolio`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site}/studies`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${site}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    });

    blogRoutes = posts.map((p) => ({
      url: `${site}/blog/${p.slug}`,
      lastModified: p.updatedAt || p.publishedAt || undefined,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch {
    blogRoutes = [];
  }

  return [...staticRoutes, ...blogRoutes];
}
