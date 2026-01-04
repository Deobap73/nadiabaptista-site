// src/components/studies/StudiesQuickLinks.tsx
import type { Lang } from '@/lib/i18n';
import { getStudiesDict } from '@/lib/i18n';
import { studiesImages } from '@/lib/images';
import QuickLinksSection from '../shared/QuickLinksSection';

type Props = {
  lang: Lang;
};

export default function StudiesQuickLinks({ lang }: Props) {
  const dict = getStudiesDict(lang);
  const base = `/${lang}`;

  const items = [
    {
      id: 'psicologia-do-desporto',
      label: dict.quickLinks.items.sport.label,
      href: `${base}/studies/areas/psicologia-do-desporto`,
      imageSrc: studiesImages.areasOfInterest_1,
      alt: dict.quickLinks.items.sport.alt,
    },
    {
      id: 'neuropsicologia',
      label: dict.quickLinks.items.neuro.label,
      href: `${base}/studies/areas/neuropsicologia`,
      imageSrc: studiesImages.areasOfInterest_3,
      alt: dict.quickLinks.items.neuro.alt,
    },
    {
      id: 'psicologia-clinica',
      label: dict.quickLinks.items.clinical.label,
      href: `${base}/studies/areas/psicologia-clinica`,
      imageSrc: studiesImages.areasOfInterest_2,
      alt: dict.quickLinks.items.clinical.alt,
    },
  ];

  return (
    <QuickLinksSection
      lang={lang}
      titleId='studies-quick-links-title'
      title={dict.quickLinks.title}
      exploreLabel={dict.quickLinks.explore}
      items={items}
    />
  );
}
