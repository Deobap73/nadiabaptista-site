// src/components/studies/StudiesInternshipsAndVolunteering.tsx

import { getPracticalExperiences } from '@/lib/studies/getPracticalExperiences';
import StudiesInternshipsAndVolunteeringClient from './StudiesInternshipsAndVolunteeringClient';

export default async function StudiesInternshipsAndVolunteering() {
  const items = await getPracticalExperiences();
  return <StudiesInternshipsAndVolunteeringClient items={items} />;
}
