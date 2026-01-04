// src/app/[lang]/studies/page.tsx

import type { Lang } from '@/lib/i18n';
import StudiesHero from '@/components/studies/StudiesHero';
import StudiesQuickLinks from '@/components/studies/StudiesQuickLinks';
import StudiesProjectsInvestigation from '@/components/studies/StudiesProjectsInvestigation';
import StudiesInternshipsAndVolunteering from '@/components/studies/StudiesInternshipsAndVolunteering';
import StudiesConferencesAndSeminars from '@/components/studies/StudiesConferencesAndSeminars';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

function safeLang(v: string): Lang {
  return v === 'en' ? 'en' : 'pt';
}

export default async function StudiesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = safeLang(lang);

  return (
    <main>
      <StudiesHero lang={locale} />
      <StudiesQuickLinks lang={locale} />
      <StudiesProjectsInvestigation lang={locale} />
      <StudiesInternshipsAndVolunteering lang={locale} />
      <StudiesConferencesAndSeminars lang={locale} />
    </main>
  );
}
