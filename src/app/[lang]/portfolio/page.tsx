// src/app/[lang]/portfolio/page.tsx

import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioContainer from '@/components/portfolio/PortfolioContainer';
import PortfolioDiplomas from '@/components/portfolio/PortfolioDiplomas';
import PortfolioAchievements from '@/components/portfolio/PortfolioAchievements';
import type { Lang } from '@/lib/i18n';
import { getPortfolioItems } from '@/lib/i18n/portfolioItems';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

function safeLang(v: string): Lang {
  return v === 'en' ? 'en' : 'pt';
}

export default async function PortfolioPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = safeLang(lang);

  const items = getPortfolioItems(locale);

  return (
    <>
      <PortfolioHero lang={locale} />
      <PortfolioContainer items={items} />
      <PortfolioAchievements lang={locale} />
      <PortfolioDiplomas lang={locale} />
    </>
  );
}
