// src/components/home/HomeHowICanHelp.tsx

import type { Lang } from '@/lib/i18n';
import { getHomeDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeHowICanHelp({ lang }: Props) {
  const dict = getHomeDict(lang);

  return (
    <section className='home-how-help' aria-labelledby='home-how-help-title'>
      <div className='home-how-help__container site-container'>
        <header className='home-how-help__header'>
          <h2 id='home-how-help-title' className='home-how-help__title'>
            {dict.howHelp.title}
          </h2>
          <p className='home-how-help__intro'>{dict.howHelp.intro}</p>
        </header>

        <div className='home-how-help__cards'>
          {dict.howHelp.cards.map((card) => (
            <article key={card.title} className='home-how-help__card'>
              <h3 className='home-how-help__card-title'>{card.title}</h3>
              <p className='home-how-help__card-text'>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
