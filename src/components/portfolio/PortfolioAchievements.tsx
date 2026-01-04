// src/components/portfolio/PortfolioAchievements.tsx

import { getAchievements } from '@/lib/portfolio/getAchievements';
import type { PublicAchievement } from '@/lib/portfolio/getAchievements';
import PortfolioAchievementsClient from '@/components/portfolio/PortfolioAchievementsClient';
import type { Lang } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default async function PortfolioAchievements({ lang }: Props) {
  // English: Initialize with an empty array and correct type to avoid 'any'
  let items: PublicAchievement[] = [];

  try {
    // English: Data fetching from the library
    const fetchedItems = await getAchievements();
    if (fetchedItems) {
      items = fetchedItems;
    }
  } catch (error) {
    // English: Log error on the server side without disrupting the JSX flow
    console.error('Error fetching achievements:', error);
  }

  // English: Render the client component outside the try/catch block
  return <PortfolioAchievementsClient lang={lang} items={items} />;
}
