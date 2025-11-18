// src/app/blog/page.tsx

import type { Metadata } from 'next';
import BlogList from '../../components/blog/BlogList';
import { mockPosts } from '../../lib/blog/mockPosts';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog · Nadia Baptista · Psychology student in Porto',
    description:
      'Blog with notes and reflections written by Nadia Baptista during her psychology studies. A calm space for questions, readings and thoughts.',
  };
}

export default function BlogPage() {
  return (
    <main className='pageContainer'>
      <BlogList posts={mockPosts} />
    </main>
  );
}
