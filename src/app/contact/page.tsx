// src/app/contact/page.tsx

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact · Nadia Baptista · Psychology student in Porto',
    description:
      'Contact page for Nadia Baptista, psychology student in Porto. Get in touch in an academic or professional context.',
  };
}

export default function ContactPage() {
  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='contactTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>Contact</p>
          <h1 id='contactTitle' className='pageTitle'>
            Get in touch with Nadia
          </h1>
          <p className='pageIntro'>
            This space is for academic contact, collaboration invitations or future professional
            opportunities. Later it can also support clinical contact when practice begins.
          </p>
        </header>

        {/* Aqui encaixa o teu formulário de contacto atual ou futuro */}
        <section className='pageBlock'>
          <div className='pageBlockHeader'>
            <h2 className='pageBlockTitle'>Contact form</h2>
            <p className='pageBlockText'>
              A simple contact form can be added or improved here, connected to the email API route.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
