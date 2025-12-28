// src/components/portfolio/PortfolioAchievements.tsx

import { getAchievements } from '@/lib/portfolio/getAchievements';
import PortfolioAchievementsClient from '@/components/portfolio/PortfolioAchievementsClient';

export default async function PortfolioAchievements() {
  const items = await getAchievements();
  return <PortfolioAchievementsClient items={items} />;
}
