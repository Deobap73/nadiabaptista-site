// src/components/home/HomeQuickLinks.tsx
import { homeImages } from '@/lib/images';
import QuickLinksSection, { type QuickLinkItem } from '../shared/QuickLinksSection';

const QUICK_LINKS: QuickLinkItem[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    href: '/portfolio',
    imageSrc: homeImages.portfolioDesktop,
    alt: 'Retrato profissional da psicóloga, em preto e branco',
  },
  {
    id: 'studies',
    label: 'Studies',
    href: '/studies',
    imageSrc: homeImages.studiesDesktop,
    alt: 'Psicóloga sentada à secretária com documentos de estudo',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    imageSrc: homeImages.blogDesktop,
    alt: 'Psicóloga a sorrir enquanto escreve no portátil',
  },
];

export default function HomeQuickLinks() {
  return (
    <QuickLinksSection
      titleId='home-quick-links-title'
      title='Recursos úteis'
      items={QUICK_LINKS}
    />
  );
}
