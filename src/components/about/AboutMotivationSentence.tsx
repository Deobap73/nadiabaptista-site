// src/components/about/AboutMotivationSentence.tsx

import type { Lang } from '@/lib/i18n';
import { aboutCopy } from '@/lib/i18n/about';

type Props = {
  lang: Lang;
};

export default function AboutMotivationSentence({ lang }: Props) {
  const t = aboutCopy[lang];

  return (
    <section
      className='about_motivation__container site_container'
      aria-labelledby='aboutMotivationHeading'>
      <p id='aboutMotivationHeading' className='about_motivation__text'>
        {t.motivation.text}
      </p>
    </section>
  );
}
