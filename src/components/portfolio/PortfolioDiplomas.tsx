// src/components/portfolio/PortfolioDiplomas.tsx

import { getDiplomas } from '@/lib/portfolio/getDiplomas';
import PortfolioDiplomasClient from '@/components/portfolio/PortfolioDiplomasClient';
import type { Lang } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default async function PortfolioDiplomas({ lang }: Props) {
  const items = await getDiplomas();
  return <PortfolioDiplomasClient lang={lang} items={items} />;
}
