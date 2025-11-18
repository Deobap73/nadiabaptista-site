// src/lib/blog/mockPosts.ts

import type { BlogPost } from '../../types/blog';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'studying-psychology-with-care-for-mental-health',
    title: 'Studying psychology with care for mental health',
    excerpt:
      'Some first reflections about what it means to study psychology while also taking care of your own mental health.',
    publishedAt: '2025-01-15',
    readingTimeMinutes: 5,
    tags: ['studies', 'student-life', 'mental-health'],
    featured: true,
    heroImageUrl:
      'https://res.cloudinary.com/your-cloud-name/image/upload/v1700000000/nadia-blog-1.jpg',
  },
  {
    id: '2',
    slug: 'young-adults-anxiety-and-life-transitions',
    title: 'Young adults, anxiety and life transitions',
    excerpt:
      'Notes and ideas that come up when reading and listening about the way young adults face change, choices and uncertainty.',
    publishedAt: '2025-02-02',
    readingTimeMinutes: 7,
    tags: ['young-adults', 'anxiety', 'transitions'],
    featured: false,
    heroImageUrl:
      'https://res.cloudinary.com/your-cloud-name/image/upload/v1700000000/nadia-blog-2.jpg',
  },
  {
    id: '3',
    slug: 'why-listening-without-rush-matters',
    title: 'Why listening without rush matters',
    excerpt:
      'A simple text about the importance of giving time and space to the story of each person, in life and later in clinical work.',
    publishedAt: '2025-03-10',
    readingTimeMinutes: 4,
    tags: ['listening', 'empathy', 'practice'],
    featured: false,
    heroImageUrl:
      'https://res.cloudinary.com/your-cloud-name/image/upload/v1700000000/nadia-blog-3.jpg',
  },
];
