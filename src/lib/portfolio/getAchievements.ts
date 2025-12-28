// src/lib/portfolio/getAchievements.ts

import { getBaseUrl } from '@/lib/http/getBaseUrl';

export type PublicAchievement = {
  id: string;
  title: string;
  dateLabel: string | null;
  description: string | null;
  sortOrder: number;
  imageUrl: string | null;
};

export async function getAchievements(): Promise<PublicAchievement[]> {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}/api/achievements`, {
      next: { revalidate: 0 },
    });

    const data = (await res.json()) as { ok: boolean; items?: PublicAchievement[] };

    if (!res.ok || !data.ok || !data.items) return [];
    return data.items;
  } catch {
    return [];
  }
}
