// src/app/services/page.tsx

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Future services · Nádia Baptista',
    description:
      'Placeholder page for future psychology services that Nádia may offer after completing her academic training and professional registration.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function ServicesPage() {
  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='servicesTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>Future services</p>
          <h1 id='servicesTitle' className='pageTitle'>
            Clinical services will be added later
          </h1>
          <p className='pageIntro'>
            This page is reserved for the moment when Nadia completes her training and is ready to
            offer clinical services in a responsible way. For now, it remains inactive.
          </p>
        </header>
      </section>
    </main>
  );
}
