// src/components/studies/StudiesConferencesAndSeminars.tsx

import { getConferences } from '@/lib/studies/getConferences';
import StudiesConferencesAndSeminarsClient from './StudiesConferencesAndSeminarsClient';

export default async function StudiesConferencesAndSeminars() {
  const items = await getConferences();
  return <StudiesConferencesAndSeminarsClient items={items} />;
}
