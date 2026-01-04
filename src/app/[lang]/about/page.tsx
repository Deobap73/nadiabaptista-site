// src/app/[lang]/about/page.tsx

import AboutHero from '@/components/about/AboutHero';
import AboutMotivationSentence from '@/components/about/AboutMotivationSentence';
import AboutMyStorie from '@/components/about/AboutMyStorie';

type Lang = 'pt' | 'en';

type Props = {
  params: {
    lang: Lang;
  };
};

function safeLang(v: string): Lang {
  return v === 'en' ? 'en' : 'pt';
}

export default function AboutPage({ params }: Props) {
  const lang = safeLang(params.lang);

  return (
    <>
      <AboutHero lang={lang} />
      <AboutMotivationSentence lang={lang} />
      <AboutMyStorie lang={lang} />
    </>
  );
}
