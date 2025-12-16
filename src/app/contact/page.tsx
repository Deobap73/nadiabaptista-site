// src/app/contact/page.tsx

import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactHero from '@/components/contact/ContactHero';

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
