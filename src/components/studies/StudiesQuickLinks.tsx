// src\components\studies\StudiesQuickLinks.tsx

import { studiesImages } from '@/lib/images';
import QuickLinksSection from '../shared/QuickLinksSection';
const STUDIES_LINKS = [
  {
    id: 'psicologia-do-desporto',
    label: 'Psicologia do Desporto',
    href: '/studies/areas/psicologia-do-desporto',
    imageSrc: studiesImages.areasOfInterest_1,
    alt: 'Atleta em contexto desportivo',
  },
  {
    id: 'neuropsicologia',
    label: 'Neuropsicologia',
    href: '/studies/areas/neuropsicologia',
    imageSrc: studiesImages.areasOfInterest_3,
    alt: 'Representação visual do cérebro',
  },
  {
    id: 'psicologia-clinica',
    label: 'Psicologia Clínica',
    href: '/studies/areas/psicologia-clinica',
    imageSrc: studiesImages.areasOfInterest_2,
    alt: 'Contexto clínico',
  },
];

export default function StudiesQuickLinks() {
  return (
    <QuickLinksSection
      titleId='studies-quick-links-title'
      title='Áreas de interesse'
      exploreLabel='EXPLORE'
      items={STUDIES_LINKS}
    />
  );
}
