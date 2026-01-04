// src/components/studies/StudiesProjectsInvestigation.tsx

import type { Lang } from '@/lib/i18n';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import StudiesProjectsInvestigationClient from './StudiesProjectsInvestigationClient';

type Props = {
  lang: Lang;
};

export default async function StudiesProjectsInvestigation({ lang }: Props) {
  const items = await getAcademicProjects();
  return <StudiesProjectsInvestigationClient lang={lang} items={items} />;
}
