// src/app/studies/page.tsx

import StudiesQuickLinks from '@/components/studies/StudiesQuickLinks';
import StudiesHero from '../../components/studies/StudiesHero';
import StudiesProjectsInvestigation from '@/components/studies/StudiesProjectsInvestigation';
import StudiesInternshipsAndVolunteering from '@/components/studies/StudiesInternshipsAndVolunteering';

export default function StudiesPage() {
  return (
    <main>
      <StudiesHero />
      <StudiesQuickLinks />
      <StudiesProjectsInvestigation />
      <StudiesInternshipsAndVolunteering />
    </main>
  );
}
