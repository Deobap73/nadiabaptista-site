// src/components/studies/StudiesProjectsInvestigation.tsx

import type { Lang } from '@/lib/i18n';
import { getAcademicProjects } from '@/lib/studies/getAcademicProjects';
import type { PublicAcademicProject } from '@/lib/studies/getAcademicProjects';
import StudiesProjectsInvestigationClient from './StudiesProjectsInvestigationClient';

type Props = {
  lang: Lang;
};

export default async function StudiesProjectsInvestigation({ lang }: Props) {
  // 1. Inicializamos com o tipo correto importado do teu helper de dados
  let items: PublicAcademicProject[] = [];

  try {
    // 2. A função getAcademicProjects já deve retornar PublicAcademicProject[]
    const fetchedItems = await getAcademicProjects();

    if (fetchedItems) {
      items = fetchedItems;
    }
  } catch (error) {
    // 3. Log de erro silencioso para não quebrar a UI
    console.error('Error fetching academic projects:', error);
  }

  // 4. Agora o 'items' é garantidamente do tipo esperado pelo componente Client
  return <StudiesProjectsInvestigationClient lang={lang} items={items} />;
}
