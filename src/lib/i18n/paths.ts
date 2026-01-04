// src/lib/i18n/paths.ts

import type { Lang } from './types';

export function withLangPrefix(lang: Lang, href: string): string {
  const clean = href.startsWith('/') ? href : `/${href}`;
  const alreadyPrefixed = clean === `/${lang}` || clean.startsWith(`/${lang}/`);
  if (alreadyPrefixed) return clean;
  return `/${lang}${clean}`;
}
