// src/components/studies/StudiesConferencesAndSeminars.tsx

import type { Lang } from '@/lib/i18n';
import { getConferences } from '@/lib/studies/getConferences';
import StudiesConferencesAndSeminarsClient from './StudiesConferencesAndSeminarsClient';

type Props = {
  lang: Lang;
};

export default async function StudiesConferencesAndSeminars({ lang }: Props) {
  const items = await getConferences();
  return <StudiesConferencesAndSeminarsClient lang={lang} items={items} />;
}
