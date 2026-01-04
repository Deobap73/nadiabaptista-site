// src/components/studies/StudiesConferencesAndSeminars.tsx

import type { Lang } from '@/lib/i18n';
import { getConferences } from '@/lib/studies/getConferences';
import type { PublicConference } from '@/lib/studies/getConferences';
import StudiesConferencesAndSeminarsClient from './StudiesConferencesAndSeminarsClient';

type Props = {
  lang: Lang;
};

export default async function StudiesConferencesAndSeminars({ lang }: Props) {
  // Strict typing for conference items
  let items: PublicConference[] = [];

  try {
    const fetchedItems = await getConferences();
    if (fetchedItems) {
      items = fetchedItems;
    }
  } catch (error) {
    // Server-side error logging
    console.error('Error fetching conferences:', error);
  }

  // Consistent return outside try/catch block
  return <StudiesConferencesAndSeminarsClient lang={lang} items={items} />;
}
