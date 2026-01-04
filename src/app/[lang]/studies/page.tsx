// src/app/[lang]/studies/page.tsx

import type { Metadata } from 'next';
import type { Lang } from '@/lib/i18n';
import StudiesHero from '@/components/studies/StudiesHero';
import StudiesQuickLinks from '@/components/studies/StudiesQuickLinks';
import StudiesProjectsInvestigation from '@/components/studies/StudiesProjectsInvestigation';
import StudiesInternshipsAndVolunteering from '@/components/studies/StudiesInternshipsAndVolunteering';
import StudiesConferencesAndSeminars from '@/components/studies/StudiesConferencesAndSeminars';

// Interface rigorosa para os Props da Página
interface PageProps {
  params: Promise<{ lang: Lang }>;
}

/**
 * Função utilitária para garantir que o idioma é válido.
 * Como o Next.js lida com as rotas, o lang virá do middleware,
 * mas esta verificação protege o componente.
 */
function getValidLang(v: string): Lang {
  return v === 'en' ? 'en' : 'pt';
}

// 1. Gerador de Metadata para SEO Dinâmico (Fundamental para esta página)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  return {
    title: isEn
      ? 'Academic Background & Research | Nádia Baptista'
      : 'Percurso Académico e Investigação | Nádia Baptista',
    description: isEn
      ? 'Explore the academic journey, research projects, and specialized training of Nádia Baptista in Neuropsychology.'
      : 'Explore o percurso académico, projetos de investigação e formação especializada de Nádia Baptista em Neuropsicologia.',
    alternates: {
      canonical: `https://nadiabaptista.pt/${lang}/studies`,
      languages: {
        'pt-PT': 'https://nadiabaptista.pt/pt/studies',
        'en-US': 'https://nadiabaptista.pt/en/studies',
      },
    },
  };
}

export default async function StudiesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLang(lang);

  return (
    <main id='main-content'>
      {/* A estrutura segue uma ordem de relevância académica.
        Dica: Garanta que cada componente abaixo utilize 
        IDs correspondentes aos links em 'StudiesQuickLinks'.
      */}
      <StudiesHero lang={locale} />

      <StudiesQuickLinks lang={locale} />

      <div className='studies-sections-wrapper'>
        <section id='investigation'>
          <StudiesProjectsInvestigation lang={locale} />
        </section>

        <section id='internships'>
          <StudiesInternshipsAndVolunteering lang={locale} />
        </section>

        <section id='conferences'>
          <StudiesConferencesAndSeminars lang={locale} />
        </section>
      </div>
    </main>
  );
}
