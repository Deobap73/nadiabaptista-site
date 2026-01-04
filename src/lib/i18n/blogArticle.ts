// src/lib/i18n/blogArticle.ts

import type { Lang } from './types';

type BlogArticleDict = {
  backToBlog: string;
  published: string;
  updated: string;
};

const PT: BlogArticleDict = {
  backToBlog: 'Voltar ao blog',
  published: 'Publicado',
  updated: 'Atualizado',
};

const EN: BlogArticleDict = {
  backToBlog: 'Back to blog',
  published: 'Published',
  updated: 'Updated',
};

export function getBlogArticleDict(lang: Lang): BlogArticleDict {
  return lang === 'en' ? EN : PT;
}
