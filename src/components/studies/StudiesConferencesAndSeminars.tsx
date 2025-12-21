// src/components/studies/StudiesConferencesAndSeminars.tsx
import Image from 'next/image';
import Link from 'next/link';
import { STUDIES_CONFERENCES } from '@/lib/studies/conferencesAndSeminars';

export default function StudiesConferencesAndSeminars() {
  const recent = STUDIES_CONFERENCES[0];
  const image2 = STUDIES_CONFERENCES[1];
  const image4 = STUDIES_CONFERENCES[2];
  const image3 = STUDIES_CONFERENCES[3];

  return (
    <section className='studies_conferences' aria-labelledby='studies_conferences_heading'>
      <div className='studies_conferences__container site-container site-container--wide'>
        <div className='studies_conferences__grid'>
          <header className='studies_conferences__intro'>
            <h2 id='studies_conferences_heading' className='studies_conferences__title'>
              Conferencias e<br />
              Seminarios
            </h2>

            <p className='studies_conferences__text'>
              Participar em eventos academicos ajuda me a manter contacto com novas perspetivas e
              praticas na psicologia
            </p>
          </header>

          <Link
            href={`/studies/conferences/${recent.slug}`}
            className='studies_conferences__card studies_conferences__card_recent'
            aria-label={recent.label}>
            <Image
              src={recent.imageSrc}
              alt={recent.imageAlt}
              fill
              sizes='(min-width: 1024px) 360px, 92vw'
              className='studies_conferences__image'
            />
          </Link>

          <Link
            href={`/studies/conferences/${image2.slug}`}
            className='studies_conferences__card studies_conferences__card_2'
            aria-label={image2.label}>
            <Image
              src={image2.imageSrc}
              alt={image2.imageAlt}
              fill
              sizes='(min-width: 1024px) 360px, 92vw'
              className='studies_conferences__image'
            />
          </Link>

          <Link
            href={`/studies/conferences/${image3.slug}`}
            className='studies_conferences__card studies_conferences__card_3'
            aria-label={image3.label}>
            <Image
              src={image3.imageSrc}
              alt={image3.imageAlt}
              fill
              sizes='(min-width: 1024px) 360px, 92vw'
              className='studies_conferences__image'
            />
          </Link>

          <Link
            href={`/studies/conferences/${image4.slug}`}
            className='studies_conferences__card studies_conferences__card_4'
            aria-label={image4.label}>
            <Image
              src={image4.imageSrc}
              alt={image4.imageAlt}
              fill
              sizes='(min-width: 1024px) 360px, 92vw'
              className='studies_conferences__image'
            />
          </Link>

          <div className='studies_conferences__cta'>
            <Link href='/studies/conferences' className='studies_conferences__button'>
              Ver Todos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
