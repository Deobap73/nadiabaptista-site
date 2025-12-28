// src/lib/portfolio/getDiplomas.ts

import { prisma } from '@/lib/prisma';

export type PublicDiploma = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  sortOrder: number;
};

export async function getDiplomas(): Promise<PublicDiploma[]> {
  try {
    const rows = await prisma.diploma.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
      },
    });

    return rows.map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description ?? '',
      imageUrl: d.imageUrl ?? null,
      sortOrder: d.sortOrder,
    }));
  } catch {
    return [];
  }
}
