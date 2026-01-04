// src/app/[lang]/about/page.tsx

import AboutHero from '@/components/about/AboutHero';
import AboutMotivationSentence from '@/components/about/AboutMotivationSentence';
import AboutMyStory from '@/components/about/AboutMyStory';

type Lang = 'pt' | 'en';

type Props = {
  params: Promise<{
    lang: Lang;
  }>;
};

function safeLang(v: string): Lang {
  return v === 'en' ? 'en' : 'pt';
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const finalLang = safeLang(lang);

  return (
    <>
      <AboutHero lang={finalLang} />
      <AboutMotivationSentence lang={finalLang} />
      <AboutMyStory lang={finalLang} />
    </>
  );
}
