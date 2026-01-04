// src/components/studies/StudiesInternshipsAndVolunteering.tsx

import type { Lang } from '@/lib/i18n';
import { getPracticalExperiences } from '@/lib/studies/getPracticalExperiences';
import StudiesInternshipsAndVolunteeringClient from './StudiesInternshipsAndVolunteeringClient';

type Props = {
  lang: Lang;
};

export default async function StudiesInternshipsAndVolunteering({ lang }: Props) {
  const items = await getPracticalExperiences();
  return <StudiesInternshipsAndVolunteeringClient lang={lang} items={items} />;
}
