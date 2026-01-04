// src/lib/i18n/nav.ts

import type { Lang } from './types';

type NavDict = {
  links: {
    home: string;
    about: string;
    studies: string;
    portfolio: string;
    blog: string;
    contact: string;
  };
};

const PT: NavDict = {
  links: {
    home: 'Home',
    about: 'Sobre mim',
    studies: 'Studies',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contacto',
  },
};

const EN: NavDict = {
  links: {
    home: 'Home',
    about: 'About',
    studies: 'Studies',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact',
  },
};

export function getNavDict(lang: Lang): NavDict {
  return lang === 'en' ? EN : PT;
}
