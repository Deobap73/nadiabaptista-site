// src/components/home/HomeMobile.tsx

import HomeHero from './HomeHero';
import HomeHowICanHelp from './HomeHowICanHelp';
import HomeQuickLinks from './HomeQuickLinks';
import HomeAboutHighlight from './HomeAboutHighlight';
import HomeNewsletterBanner from './HomeNewsletterBanner';

export default function HomeMobile() {
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
