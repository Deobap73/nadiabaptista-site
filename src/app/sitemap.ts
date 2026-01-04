// src/app/sitemap.ts

import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import { getConferences } from '@/lib/studies/getConferences';
import { getPracticalExperiences } from '@/lib/studies/getPracticalExperiences';

import { STUDY_PROJECTS } from '@/lib/studies/projects';
import { STUDY_AREA_SLUGS } from '@/content/studies/areas';

const site = 'https://nadiabaptista.pt';
const locales = ['pt', 'en'] as const;

export const runtime = 'nodejs';

type Locale = (typeof locales)[number];

type SlugItem = {
  slug: string;
  updatedAt?: Date | string | null;
};

function toDate(v: Date | string | null | undefined): Date {
  if (!v) return new Date();
  if (v instanceof Date) return v;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return new Date();
  return d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', 'about', 'portfolio', 'blog', 'contact', 'services', 'studies'];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((lang: Locale) =>
    staticPages.map((page: string) => ({
      url: `${site}/${lang}${page ? `/${page}` : ''}`,
      changeFrequency: page === '' || page === 'blog' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
    });

    blogRoutes = locales.flatMap((lang: Locale) =>
      posts.map((p: { slug: string; updatedAt: Date | null; publishedAt: Date | null }) => ({
        url: `${site}/${lang}/blog/${p.slug}`,
        lastModified: toDate(p.updatedAt || p.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    );
  } catch (error) {
    console.error('Sitemap Blog Error:', error);
  }

  let studiesRoutes: MetadataRoute.Sitemap = [];

  try {
    const academicProjectsUnknown = (await getAcademicProjects()) as unknown;
    const conferencesUnknown = (await getConferences()) as unknown;
    const practicalUnknown = (await getPracticalExperiences()) as unknown;

    const academicProjects = (
      Array.isArray(academicProjectsUnknown) ? academicProjectsUnknown : []
    ) as SlugItem[];

    const conferences = (Array.isArray(conferencesUnknown) ? conferencesUnknown : []) as SlugItem[];

    const practicalExperiences = (
      Array.isArray(practicalUnknown) ? practicalUnknown : []
    ) as SlugItem[];

    const academicProjectRoutes: MetadataRoute.Sitemap = locales.flatMap((lang: Locale) =>
      academicProjects.map((item: SlugItem) => ({
        url: `${site}/${lang}/studies/academic-projects/${item.slug}`,
        lastModified: toDate(item.updatedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      }))
    );

    const conferenceRoutes: MetadataRoute.Sitemap = locales.flatMap((lang: Locale) =>
      conferences.map((item: SlugItem) => ({
        url: `${site}/${lang}/studies/conferences/${item.slug}`,
        lastModified: toDate(item.updatedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      }))
    );

    const practicalExperienceRoutes: MetadataRoute.Sitemap = locales.flatMap((lang: Locale) =>
      practicalExperiences.map((item: SlugItem) => ({
        url: `${site}/${lang}/studies/practical-experiences/${item.slug}`,
        lastModified: toDate(item.updatedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
      }))
    );

    const projectsRoutes: MetadataRoute.Sitemap = locales.flatMap((lang: Locale) =>
      STUDY_PROJECTS.map((item: { slug: string }) => ({
        url: `${site}/${lang}/studies/projects/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
      }))
    );

    const areasRoutes: MetadataRoute.Sitemap = locales.flatMap((lang: Locale) =>
      STUDY_AREA_SLUGS.map((slug: string) => ({
        url: `${site}/${lang}/studies/areas/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
      }))
    );

    studiesRoutes = [
      ...academicProjectRoutes,
      ...conferenceRoutes,
      ...practicalExperienceRoutes,
      ...projectsRoutes,
      ...areasRoutes,
    ];
  } catch (error) {
    console.error('Sitemap Studies Error:', error);
  }

  return [...staticRoutes, ...blogRoutes, ...studiesRoutes];
}
