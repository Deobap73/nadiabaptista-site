// src/components/portfolio/PortfolioDiplomas.tsx

import { getDiplomas } from '@/lib/portfolio/getDiplomas';
import type { PublicDiploma } from '@/lib/portfolio/getDiplomas';
import PortfolioDiplomasClient from '@/components/portfolio/PortfolioDiplomasClient';
import type { Lang } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default async function PortfolioDiplomas({ lang }: Props) {
  // English: Explicit typing with PublicDiploma[] to avoid 'any'
  let items: PublicDiploma[] = [];

  try {
    const fetchedItems = await getDiplomas();
    if (fetchedItems) {
      items = fetchedItems;
    }
  } catch (error) {
    // English: Server-side error logging to keep the UI from crashing
    console.error('Error fetching diplomas:', error);
  }

  // English: Return JSX outside the try/catch block as per React best practices
  return <PortfolioDiplomasClient lang={lang} items={items} />;
}
