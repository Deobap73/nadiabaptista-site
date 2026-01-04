// src/lib/i18n/quickLinks.ts

import type { Lang } from '@/lib/i18n';

type QuickLinksDict = {
  exploreLabel: string;
};

const PT: QuickLinksDict = {
  exploreLabel: 'EXPLORE',
};

const EN: QuickLinksDict = {
  exploreLabel: 'EXPLORE',
};

export function getQuickLinksDict(lang: Lang): QuickLinksDict {
  return lang === 'en' ? EN : PT;
}
