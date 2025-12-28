// src/components/studies/StudiesProjectsInvestigation.tsx

import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import StudiesProjectsInvestigationClient from './StudiesProjectsInvestigationClient';

export default async function StudiesProjectsInvestigation() {
  const items = await getAcademicProjects();
  return <StudiesProjectsInvestigationClient items={items} />;
}
