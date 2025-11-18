// src/components/home/HomeDesktop.tsx

import HomeHero from './HomeHero';
import HomeHowICanHelp from './HomeHowICanHelp';
import HomeQuickLinks from './HomeQuickLinks';
import HomeAboutHighlight from './HomeAboutHighlight';
import HomeNewsletterBanner from './HomeNewsletterBanner';

export default function HomeDesktop() {
  return (
    <main>
      <HomeHero />
      <HomeHowICanHelp />
      <HomeQuickLinks />
      <HomeAboutHighlight />
      <HomeNewsletterBanner />
    </main>
  );
}
