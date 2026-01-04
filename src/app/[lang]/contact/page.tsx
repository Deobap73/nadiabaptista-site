// src/app/[lang]/contact/page.tsx

import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactHero from '@/components/contact/ContactHero';
import type { Lang } from '@/lib/i18n';

type Props = {
  params: { lang: Lang };
};

export default function ContactPage({ params }: Props) {
  const lang = params.lang;

  return (
    <>
      <ContactHero lang={lang} />
      <ContactFormSection lang={lang} />
    </>
  );
}
