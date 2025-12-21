// src/lib/studies/conferencesAndSeminars.ts
import { studiesImages } from '@/lib/images';

export type StudiesConferenceKind = 'conference' | 'seminar';

export type StudiesConferenceItem = {
  slug: string;
  kind: StudiesConferenceKind;
  label: string;
  subtitle: string;
  dateText: string;
  cityText: string;
  imageSrc: string;
  imageAlt: string;
};

export const STUDIES_CONFERENCES: StudiesConferenceItem[] = [
  {
    slug: 'psicologia_do_desporto',
    kind: 'conference',
    label: 'Psicologia do Desporto',
    subtitle: 'Congresso Internacional',
    dateText: '25 a 27 Outubro 2024',
    cityText: 'Lisboa, Portugal',
    imageSrc: studiesImages.conferences_1,
    imageAlt: 'Cartaz do congresso Psicologia do Desporto',
  },
  {
    slug: 'neurociencia_e_psicologia',
    kind: 'seminar',
    label: 'Neurociencia e Psicologia',
    subtitle: 'Seminario Internacional',
    dateText: '10 a 12 Novembro 2024',
    cityText: 'Coimbra, Portugal',
    imageSrc: studiesImages.seminars_1,
    imageAlt: 'Cartaz do seminario Neurociencia e Psicologia',
  },
  {
    slug: 'psicologia_da_educacao',
    kind: 'seminar',
    label: 'Psicologia da Educacao',
    subtitle: 'Seminario de',
    dateText: '10 a 12 Outubro 2024',
    cityText: 'Coimbra, Portugal',
    imageSrc: studiesImages.seminars_2,
    imageAlt: 'Cartaz do seminario Psicologia da Educacao',
  },
  {
    slug: 'desenvolvimento_infantil',
    kind: 'conference',
    label: 'Desenvolvimento Infantil',
    subtitle: 'Congresso Internacional de',
    dateText: '25 a 27 Outubro 2024',
    cityText: 'Lisboa, Portugal',
    imageSrc: studiesImages.conferences_2,
    imageAlt: 'Cartaz do congresso Desenvolvimento Infantil',
  },
];

export function getStudiesConferenceBySlug(slug: string) {
  return STUDIES_CONFERENCES.find((item) => item.slug === slug);
}
