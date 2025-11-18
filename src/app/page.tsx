// src/app/page.tsx

import type { Metadata } from 'next';
import HomeEntry from '@/components/home/HomeEntry';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home · Nadia Baptista · Psychology student in Porto',
    description:
      'Homepage of Nadia Baptista, psychology student in Porto. Learn about her studies, portfolio, blog and how to get in touch.',
  };
}

export default function HomePage() {
  return <HomeEntry />;
}
