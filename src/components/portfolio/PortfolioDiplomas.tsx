// src/components/portfolio/PortfolioDiplomas.tsx

import { getDiplomas } from '@/lib/portfolio/getDiplomas';
import PortfolioDiplomasClient from '@/components/portfolio/PortfolioDiplomasClient';

export default async function PortfolioDiplomas() {
  const items = await getDiplomas();
  return <PortfolioDiplomasClient items={items} />;
}
