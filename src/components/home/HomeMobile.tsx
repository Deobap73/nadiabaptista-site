// src/components/home/HomeMobile.tsx

import HomeHero from './HomeHero';
import HomeHowICanHelp from './HomeHowICanHelp';
import HomeQuickLinks from './HomeQuickLinks';
import HomeAboutHighlight from './HomeAboutHighlight';
import HomeNewsletterBanner from './HomeNewsletterBanner';
import type { Lang } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeMobile({ lang }: Props) {
  return (
    <main>
      <HomeHero lang={lang} />
      <HomeHowICanHelp lang={lang} />
      <HomeQuickLinks lang={lang} />
      <HomeAboutHighlight lang={lang} />
      <HomeNewsletterBanner lang={lang} />
    </main>
  );
}
