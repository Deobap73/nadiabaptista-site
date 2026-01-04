// src/components/studies/StudiesInternshipsAndVolunteering.tsx

import type { Lang } from '@/lib/i18n';
import { getPracticalExperiences } from '@/lib/studies/getPracticalExperiences';
import type { PublicPracticalExperience } from '@/lib/studies/getPracticalExperiences';
import StudiesInternshipsAndVolunteeringClient from './StudiesInternshipsAndVolunteeringClient';

type Props = {
  lang: Lang;
};

export default async function StudiesInternshipsAndVolunteering({ lang }: Props) {
  // Define strict type for items and initialize as empty array
  let items: PublicPracticalExperience[] = [];

  try {
    const fetchedItems = await getPracticalExperiences();
    if (fetchedItems) {
      items = fetchedItems;
    }
  } catch (error) {
    // Log the error for server-side debugging without breaking the UI
    console.error('Error fetching practical experiences:', error);
  }

  // Return JSX outside of try/catch to follow React best practices
  return <StudiesInternshipsAndVolunteeringClient lang={lang} items={items} />;
}
