// src/app/[lang]/studies/areas/[slug]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import type { Lang } from '@/lib/i18n';
import { getStudiesAreasDict } from '@/lib/i18n';
import { STUDY_AREAS, STUDY_AREA_SLUGS } from '@/content/studies/areas';

type PageProps = {
  params: Promise<{ lang: Lang; slug: string }>;
};

export default async function StudiesAreaPage({ params }: PageProps) {
  const { lang, slug } = await params;

  if (!Object.prototype.hasOwnProperty.call(STUDY_AREAS, slug)) notFound();

  const typedSlug = slug as keyof typeof STUDY_AREAS;

  const areaMedia = STUDY_AREAS[typedSlug];
  const dict = getStudiesAreasDict(lang);
  const areaText = dict[typedSlug];

  if (!areaMedia || !areaText) notFound();

  return (
    <section className='studies-area' aria-labelledby='studies-area-heading'>
      <div className='studies-area__container site-container site-container--wide'>
        <header className='studies-area__header'>
          <h1 id='studies-area-heading' className='studies-area__title'>
            {areaText.title}
          </h1>
        </header>

        <BackButton lang={lang} />

        <div className='studies-area__grid'>
          <div className='studies-area__media'>
            <Image
              src={areaMedia.imageSrc}
              alt={areaText.imageAlt}
              width={980}
              height={640}
              className='studies-area__image'
              sizes='(min-width: 1024px) 980px, 100vw'
              priority
            />
          </div>

          <div className='studies-area__content'>
            <p className='studies-area__text'>{areaText.body}</p>
          </div>
        </div>

        <BackButton lang={lang} />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const langs: Lang[] = ['pt', 'en'];

  return langs.flatMap((lang) => {
    return STUDY_AREA_SLUGS.map((slug) => ({ lang, slug }));
  });
}
