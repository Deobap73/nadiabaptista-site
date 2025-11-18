// src/app/blog/page.tsx

import BlogList from '../../components/blog/BlogList';
import { mockPosts } from '../../lib/blog/mockPosts';

export default function BlogPage() {
  return (
    <main className='pageContainer'>
      <BlogList posts={mockPosts} />
    </main>
  );
}
