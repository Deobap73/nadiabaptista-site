// src\components\studies\StudiesQuickLinks.tsx

import QuickLinksSection, { type QuickLinkItem } from '@/components/shared/QuickLinksSection';

const STUDIES_LINKS: QuickLinkItem[] = [
  {
    id: 'psicologiaDoDesporto',
    label: 'Psicologia do desporto',
    href: '/contact',
    imageSrc: 'https://res.cloudinary.com/.../some-image.webp',
    alt: 'Imagem de contacto',
  },
  {
    id: 'about',
    label: 'Sobre',
    href: '/about',
    imageSrc: 'https://res.cloudinary.com/.../about.webp',
    alt: 'Imagem sobre a Nadia',
  },
];

export default function ExamplePageSection() {
  return (
    <QuickLinksSection titleId='other-links' title='Areas de interesse' items={STUDIES_LINKS} />
  );
}
