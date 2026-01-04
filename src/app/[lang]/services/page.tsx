import type { Metadata } from 'next';
import type { Lang } from '@/lib/i18n';
import { getServicesDict } from '@/lib/i18n/services';

type PageProps = {
  params: Promise<{ lang: Lang }>;
};

function safeLang(v: string): Lang {
  return v === 'en' ? 'en' : 'pt';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = safeLang(lang);
  const dict = getServicesDict(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        'pt-PT': '/pt/services',
        en: '/en/services',
      },
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = safeLang(lang);
  const dict = getServicesDict(locale);

  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='servicesTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>{dict.kicker}</p>

          <h1 id='servicesTitle' className='pageTitle'>
            {dict.title}
          </h1>

          <p className='pageIntro'>{dict.intro}</p>
        </header>
      </section>
    </main>
  );
}
