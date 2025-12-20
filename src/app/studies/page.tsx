// src/app/studies/page.tsx

import StudiesQuickLinks from '@/components/studies/StudiesQuickLinks';
import StudiesHero from '../../components/studies/StudiesHero';

export default function StudiesPage() {
  return (
    <main>
      <StudiesHero />
      <StudiesQuickLinks />
    </main>
  );
}
