// src/app/[lang]/contact/page.tsx

import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactHero from '@/components/contact/ContactHero';
import { localBusinessJsonLd } from '@/lib/seo/jsonLd';
import type { Lang } from '@/lib/i18n';

// Definimos a interface correta para os parâmetros da página
interface ContactPageProps {
  params: Promise<{
    lang: Lang;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  // Aguardamos os params de forma segura e tipada
  const { lang } = await params;

  const jsonLd = localBusinessJsonLd();

  return (
    <>
      {/* Injeção de Dados Estruturados para SEO Local */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <ContactHero lang={lang} />
        <ContactFormSection lang={lang} />
      </main>
    </>
  );
}
