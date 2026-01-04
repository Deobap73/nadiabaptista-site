// src/lib/i18n/common.ts

import type { Lang } from './types';

type CommonDict = {
  back: string;
  minutesShort: string;
  categoryAria: string;
};

const PT: CommonDict = {
  back: 'Voltar atrás',
  minutesShort: 'min',
  categoryAria: 'Categoria',
};

const EN: CommonDict = {
  back: 'Go back',
  minutesShort: 'min',
  categoryAria: 'Category',
};

export function getCommonDict(lang: Lang): CommonDict {
  return lang === 'en' ? EN : PT;
}
