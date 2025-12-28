// src/components/studies/StudiesConferencesAndSeminarsClient.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import type { PublicConference } from '@/lib/studies/getConferences';

type Props = {
  items: PublicConference[];
};

function pickSafe(items: PublicConference[]) {
  return Array.isArray(items) ? items : [];
}

export default function StudiesConferencesAndSeminarsClient({ items }: Props) {
  const safe = useMemo(() => pickSafe(items), [items]);

  const recent = safe[0];
  const image2 = safe[1];
  const image4 = safe[2];
  const image3 = safe[3];

  if (!recent) {
    return (
      <section className='studies_conferences' aria-labelledby='studies_conferences_heading'>
        <div className='studies_conferences__container site-container site-container--wide'>
          <div className='studies_conferences__grid'>
            <header className='studies_conferences__intro'>
              <h2 id='studies_conferences_heading' className='studies_conferences__title'>
                Conferências e
                <br />
                Seminários
              </h2>

              <p className='studies_conferences__text'>Sem itens por agora.</p>
            </header>

            <div className='studies_conferences__cta'>
              <Link href='/studies/conferences' className='studies_conferences__button'>
                Ver todos
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='studies_conferences' aria-labelledby='studies_conferences_heading'>
      <div className='studies_conferences__container site-container site-container--wide'>
        <div className='studies_conferences__grid'>
          <header className='studies_conferences__intro'>
            <h2 id='studies_conferences_heading' className='studies_conferences__title'>
              Conferências e
              <br />
              Seminários
            </h2>

            <p className='studies_conferences__text'>
              Participar em eventos académicos ajuda me a manter contacto com novas perspetivas e
              práticas na psicologia
            </p>
          </header>

          <Link
            href={`/studies/conferences/${recent.slug}`}
            className='studies_conferences__card studies_conferences__card_recent'
            aria-label={recent.title}>
            {recent.imageUrl ? (
              <Image
                src={recent.imageUrl}
                alt=''
                fill
                sizes='(min-width: 1024px) 360px, 92vw'
                className='studies_conferences__image'
              />
            ) : null}
          </Link>

          {image2 ? (
            <Link
              href={`/studies/conferences/${image2.slug}`}
              className='studies_conferences__card studies_conferences__card_2'
              aria-label={image2.title}>
              {image2.imageUrl ? (
                <Image
                  src={image2.imageUrl}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 360px, 92vw'
                  className='studies_conferences__image'
                />
              ) : null}
            </Link>
          ) : null}

          {image3 ? (
            <Link
              href={`/studies/conferences/${image3.slug}`}
              className='studies_conferences__card studies_conferences__card_3'
              aria-label={image3.title}>
              {image3.imageUrl ? (
                <Image
                  src={image3.imageUrl}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 360px, 92vw'
                  className='studies_conferences__image'
                />
              ) : null}
            </Link>
          ) : null}

          {image4 ? (
            <Link
              href={`/studies/conferences/${image4.slug}`}
              className='studies_conferences__card studies_conferences__card_4'
              aria-label={image4.title}>
              {image4.imageUrl ? (
                <Image
                  src={image4.imageUrl}
                  alt=''
                  fill
                  sizes='(min-width: 1024px) 360px, 92vw'
                  className='studies_conferences__image'
                />
              ) : null}
            </Link>
          ) : null}

          <div className='studies_conferences__cta'>
            <Link href='/studies/conferences' className='studies_conferences__button'>
              Ver todos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
