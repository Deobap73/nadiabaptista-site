// src/lib/studies/getAcademicProjects.ts

import { prisma } from '@/lib/prisma';

export type PublicAcademicProject = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  sortOrder: number;
  imageUrl: string | null;
  updatedAt: Date;
};

export async function getAcademicProjects(): Promise<PublicAcademicProject[]> {
  const items = await prisma.academicProject.findMany({
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      content: true,
      sortOrder: true,
      imageUrl: true,
      updatedAt: true,
    },
  });

  return items;
}

export async function getAcademicProjectBySlug(
  slug: string
): Promise<PublicAcademicProject | null> {
  const item = await prisma.academicProject.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      content: true,
      sortOrder: true,
      imageUrl: true,
      updatedAt: true,
    },
  });

  return item;
}
