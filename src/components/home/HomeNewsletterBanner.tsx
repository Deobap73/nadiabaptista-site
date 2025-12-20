// src/components/home/HomeNewsletterBanner.tsx
import NewsletterBanner from '../shared/NewsletterBanner';

export default function HomeNewsletterBanner() {
  return (
    <NewsletterBanner
      headingId='home-newsletter-heading'
      heading='Nutra a Sua Mente'
      description='Receba insights exclusivos e ferramentas práticas para o seu bem estar diretamente da futura Psicóloga Nádia. Sem ruído, apenas conteúdo valioso.'
      buttonLabel='Subscreve (Newsletter)'
      fields={[
        {
          id: 'newsletter-first-name',
          type: 'text',
          autoComplete: 'given-name',
          placeholder: 'Primeiro Nome',
        },
        {
          id: 'newsletter-last-name',
          type: 'text',
          autoComplete: 'family-name',
          placeholder: 'Último Nome',
        },
        {
          id: 'newsletter-email',
          type: 'email',
          autoComplete: 'email',
          placeholder: 'Email',
          modifier: 'email',
        },
        {
          id: 'newsletter-button',
          type: 'text',
          placeholder: '',
          modifier: 'button',
        },
      ]}
    />
  );
}
