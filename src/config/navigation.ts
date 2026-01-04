// src/config/navigation.ts
import { Lang } from '@/lib/i18n';

export interface NavItemConfig {
  id: string;
  label: Record<Lang, string>;
  href: string;
  icon: string;
  // English: Coords kept for the radial menu geometry
  coords: { x: number; y: number; delayMs: number };
}

export const MAIN_NAV_CONFIG: NavItemConfig[] = [
  {
    id: 'blog',
    label: { pt: 'BLOG', en: 'BLOG' },
    href: '/blog',
    icon: '/nav/Blog.svg',
    coords: { x: 120, y: 54, delayMs: 40 },
  },
  {
    id: 'about',
    label: { pt: 'SOBRE MIM', en: 'ABOUT' },
    href: '/about',
    icon: '/nav/AboutMe.svg',
    coords: { x: 132, y: 112, delayMs: 90 },
  },
  {
    id: 'projects',
    label: { pt: 'PROJECTOS', en: 'PROJECTS' },
    href: '/portfolio',
    icon: '/nav/Projectos.svg',
    coords: { x: 170, y: 198, delayMs: 140 },
  },
  {
    id: 'studies',
    label: { pt: 'ESTUDOS', en: 'STUDIES' },
    href: '/studies',
    icon: '/nav/Studies.svg',
    coords: { x: 260, y: 198, delayMs: 190 },
  },
  {
    id: 'contact',
    label: { pt: 'CONTACTO', en: 'CONTACT' },
    href: '/contact',
    icon: '/nav/Contact.svg',
    coords: { x: 312, y: 126, delayMs: 240 },
  },
];
