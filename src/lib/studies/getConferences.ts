// src/lib/studies/getConferences.ts

import { prisma } from '@/lib/prisma';

export type PublicConference = {
  id: string;
  title: string;
  slug: string;
  dateLabel: string | null;
  location: string | null;
  content: string | null;
  imageUrl: string | null;
  imagePublicId: string | null;
  sortOrder: number;
  updatedAt: Date;
};

export async function getConferences(): Promise<PublicConference[]> {
  const items = await prisma.conferenceSeminar.findMany({
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      title: true,
      slug: true,
      dateLabel: true,
      location: true,
      content: true,
      imageUrl: true,
      imagePublicId: true,
      sortOrder: true,
      updatedAt: true,
    },
  });

  return items;
}

export async function getConferenceBySlug(slug: string): Promise<PublicConference | null> {
  const item = await prisma.conferenceSeminar.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      dateLabel: true,
      location: true,
      content: true,
      imageUrl: true,
      imagePublicId: true,
      sortOrder: true,
      updatedAt: true,
    },
  });

  return item ?? null;
}
