// src/lib/studies/getPracticalExperiences.ts

import { prisma } from '@/lib/prisma';

export type PublicPracticalExperience = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  sortOrder: number;
  updatedAt: Date;
};

export async function getPracticalExperiences(): Promise<PublicPracticalExperience[]> {
  try {
    const items = await prisma.practicalExperience.findMany({
      orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        content: true,
        imageUrl: true,
        imagePublicId: true,
        sortOrder: true,
        updatedAt: true,
      },
    });

    return items;
  } catch {
    return [];
  }
}

export async function getPracticalExperienceBySlug(
  slug: string
): Promise<PublicPracticalExperience | null> {
  try {
    const item = await prisma.practicalExperience.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        content: true,
        imageUrl: true,
        imagePublicId: true,
        sortOrder: true,
        updatedAt: true,
      },
    });

    return item ?? null;
  } catch {
    return null;
  }
}
