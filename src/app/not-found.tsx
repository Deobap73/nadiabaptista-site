// src/app/not-found.tsx

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className='pageContainer notFoundPage'>
      <section className='notFoundSection'>
        <p className='notFoundKicker'>Page not found</p>

        <h1 className='notFoundTitle'>This page does not exist</h1>

        <p className='notFoundText'>
          Sometimes a link changes or a page is not ready yet. You can go back to the homepage and
          continue exploring the path that Nadia is building as a psychology student.
        </p>

        <Link href='/' className='notFoundButton'>
          Go back home
        </Link>
      </section>
    </main>
  );
}
