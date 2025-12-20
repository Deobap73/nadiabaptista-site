// src/app/studies/page.tsx

import StudiesQuickLinks from '@/components/studies/StudiesQuickLinks';
import StudiesHero from '../../components/studies/StudiesHero';
import StudiesProjectsInvestigation from '@/components/studies/StudiesProjectsInvestigation';

export default function StudiesPage() {
  return (
    <main>
      <StudiesHero />
      <StudiesQuickLinks />
      <StudiesProjectsInvestigation />
    </main>
  );
}
