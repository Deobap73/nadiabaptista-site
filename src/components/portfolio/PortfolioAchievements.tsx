// src/components/portfolio/PortfolioAchievements.tsx

import { getAchievements } from '@/lib/portfolio/getAchievements';
import PortfolioAchievementsClient from '@/components/portfolio/PortfolioAchievementsClient';
import type { Lang } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default async function PortfolioAchievements({ lang }: Props) {
  const items = await getAchievements();
  return <PortfolioAchievementsClient lang={lang} items={items} />;
}
