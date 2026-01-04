// src/lib/i18n/types.ts

export type Lang = 'pt' | 'en';

export const SUPPORTED_LANGS: Lang[] = ['pt', 'en'];

export function isLang(v: string): v is Lang {
  return (SUPPORTED_LANGS as string[]).includes(v);
}

export function normalizeLang(v: string | undefined | null): Lang {
  const raw = (v || '').trim().toLowerCase();
  if (isLang(raw)) return raw;
  return 'pt';
}
