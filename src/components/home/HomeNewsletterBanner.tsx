// src/components/home/HomeNewsletterBanner.tsx

import NewsletterBanner from '../shared/NewsletterBanner';
import type { Lang } from '@/lib/i18n';
import { getHomeDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
};

export default function HomeNewsletterBanner({ lang }: Props) {
  const dict = getHomeDict(lang);

  return (
    <NewsletterBanner
      lang={lang}
      headingId='home-newsletter-heading'
      heading={dict.newsletter.heading}
      description={dict.newsletter.description}
      buttonLabel={dict.newsletter.buttonLabel}
      fields={[
        {
          id: 'newsletter-first-name',
          type: 'text',
          autoComplete: 'given-name',
          placeholder: dict.newsletter.placeholders.firstName,
        },
        {
          id: 'newsletter-last-name',
          type: 'text',
          autoComplete: 'family-name',
          placeholder: dict.newsletter.placeholders.lastName,
        },
        {
          id: 'newsletter-email',
          type: 'email',
          autoComplete: 'email',
          placeholder: dict.newsletter.placeholders.email,
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
