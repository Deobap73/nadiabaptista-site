// src/content/studies/areas.ts
import { studiesImages } from '@/lib/images';

export const STUDY_AREA_SLUGS = [
  'psicologia-do-desporto',
  'psicologia-clinica',
  'neuropsicologia',
] as const;

export type StudyAreaSlug = (typeof STUDY_AREA_SLUGS)[number];

export const STUDY_AREAS: Record<StudyAreaSlug, { imageSrc: string }> = {
  'psicologia-do-desporto': { imageSrc: studiesImages.areasOfInterest_1 },
  'psicologia-clinica': { imageSrc: studiesImages.areasOfInterest_2 },
  neuropsicologia: { imageSrc: studiesImages.areasOfInterest_3 },
};
