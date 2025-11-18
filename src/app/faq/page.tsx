// src/app/faq/page.tsx

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Future FAQ · Nadia Baptista',
    description:
      "Placeholder page for future frequently asked questions about Nadia's clinical work, approach and practical details.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function FaqPage() {
  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='faqTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>FAQ</p>
          <h1 id='faqTitle' className='pageTitle'>
            Frequently asked questions – for later
          </h1>
          <p className='pageIntro'>
            In the future, this space can collect the most common questions about Nadia&apos;s way
            of working, fees, scheduling and practical details. For now, it stays in the background.
          </p>
        </header>
      </section>
    </main>
  );
}
