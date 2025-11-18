// src/app/about/page.tsx

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About · Nadia Baptista · Psychology student in Porto',
    description:
      'Learn more about who Nadia Baptista is as a person and as a psychology student in Porto, and how she sees her future clinical work.',
  };
}

export default function AboutPage() {
  return (
    <main className='pageContainer'>
      <section className='pageSection' aria-labelledby='aboutTitle'>
        <header className='pageHeader'>
          <p className='pageKicker'>About</p>
          <h1 id='aboutTitle' className='pageTitle'>
            Who is Nadia Baptista
          </h1>
          <p className='pageIntro'>
            This page offers a calm and clear view of Nadia as a person and as a psychology student.
            It can grow over time with more details about her path and what is important to her
            work.
          </p>
        </header>

        <section className='pageBlock'>
          <div className='pageBlockHeader'>
            <h2 className='pageBlockTitle'>A path that is still forming</h2>
            <p className='pageBlockText'>
              Nadia is studying psychology in Porto. For now, her focus is on learning, reading,
              listening and understanding how people live and feel. Later, this base will support
              her work in clinical practice.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
