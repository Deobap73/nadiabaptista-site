// src/components/home/HomeQuickLinks.tsx

import { homeImages } from '@/lib/images';
import QuickLinksSection, { type QuickLinkItem } from '@/components/shared/QuickLinksSection';
import type { Lang } from '@/lib/i18n';
import { getHomeDict, withLangPrefix } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeQuickLinks({ lang }: Props) {
  const dict = getHomeDict(lang);

  const items: QuickLinkItem[] = [
    {
      id: 'portfolio',
      label: dict.quickLinks.items.portfolio.label,
      href: withLangPrefix(lang, '/portfolio'),
      imageSrc: homeImages.portfolioDesktop,
      alt: dict.quickLinks.items.portfolio.alt,
    },
    {
      id: 'studies',
      label: dict.quickLinks.items.studies.label,
      href: withLangPrefix(lang, '/studies'),
      imageSrc: homeImages.studiesDesktop,
      alt: dict.quickLinks.items.studies.alt,
    },
    {
      id: 'blog',
      label: dict.quickLinks.items.blog.label,
      href: withLangPrefix(lang, '/blog'),
      imageSrc: homeImages.blogDesktop,
      alt: dict.quickLinks.items.blog.alt,
    },
  ];

  return (
    <QuickLinksSection
      lang={lang}
      titleId='home-quick-links-title'
      title={dict.quickLinks.title}
      exploreLabel={dict.quickLinks.explore}
      items={items}
    />
  );
}
