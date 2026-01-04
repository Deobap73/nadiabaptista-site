import type { Lang } from './index';

type ServicesDict = {
  kicker: string;
  title: string;
  intro: string;
  meta: {
    title: string;
    description: string;
  };
};

const PT: ServicesDict = {
  kicker: 'Serviços futuros',
  title: 'Os serviços clínicos serão adicionados mais tarde',
  intro:
    'Esta página está reservada para o momento em que a Nádia concluir a sua formação e estiver pronta para oferecer serviços clínicos de forma responsável. Até lá, permanece inativa.',
  meta: {
    title: 'Serviços futuros · Nádia Baptista',
    description:
      'Página reservada para futuros serviços de Psicologia após a conclusão da formação académica e profissional.',
  },
};

const EN: ServicesDict = {
  kicker: 'Future services',
  title: 'Clinical services will be added later',
  intro:
    'This page is reserved for the moment when Nadia completes her training and is ready to offer clinical services in a responsible way. Until then, it remains inactive.',
  meta: {
    title: 'Future services · Nadia Baptista',
    description:
      'Placeholder page for future psychology services after academic training and professional registration.',
  },
};

export function getServicesDict(lang: Lang): ServicesDict {
  return lang === 'en' ? EN : PT;
}
