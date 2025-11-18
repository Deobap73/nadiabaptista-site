// src/lib/blog/mockPosts.ts

import type { BlogPost } from '../../types/blog';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'studying-psychology-with-care-for-mental-health',
    title: 'Studying psychology with care for mental health',
    excerpt:
      'Some first reflections about what it means to study psychology while also taking care of your own mental health.',
    content: [
      'Studying psychology often means spending many hours reading about pain, conflict and complex life stories. At the same time, students also carry their own doubts, worries and personal history.',
      'This text is not a manual and does not try to give quick solutions. It is only a small reflection about how it can be important to look at your own limits while you learn to look at the lives of other people.',
      'Taking breaks, having good support from friends, family or professionals and keeping some spaces that are not about study can help to keep a more balanced rhythm.',
      'Later, in clinical work, this awareness can become a resource. It reminds us that those who listen also need care, and that looking after yourself is not selfish. It is part of the work.',
    ].join('\n\n'),
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
    content: [
      'Many young adults face important decisions in a short period of time. Moving to a new city, starting university, choosing a field of work or dealing with financial pressure can create a mix of hope and anxiety.',
      'In this stage it is common to feel that you need to decide everything at once. When the future feels open but also heavy, anxiety can appear as constant tension, racing thoughts or difficulty to rest.',
      'Psychology does not erase uncertainty, but it can help to give names to what is happening. Sometimes this means recognising patterns of pressure, family expectations or social messages that make everything feel urgent.',
      'Slowing down, breaking choices into smaller steps and having spaces where you can speak honestly about fear and doubt are simple but important parts of this process.',
    ].join('\n\n'),
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
    content: [
      'In many conversations people feel that they need to be quick and clear from the first sentence. There is little time, many tasks and a constant feeling that everything should be efficient.',
      'Listening without rush goes in the opposite direction. It means accepting that a story needs time to appear, that some parts are not clear yet and that silence can also carry meaning.',
      'For future clinical work this is more than a soft skill. It is part of how a safe space is built. When someone notices that they are not being pushed to be perfect or fast, they can begin to explore parts of their experience that are more fragile.',
      'Learning to listen in this way starts long before the first session in a clinic. It can begin in daily life, in friendships and in how we talk to ourselves when things do not go as planned.',
    ].join('\n\n'),
    publishedAt: '2025-03-10',
    readingTimeMinutes: 4,
    tags: ['listening', 'empathy', 'practice'],
    featured: false,
    heroImageUrl:
      'https://res.cloudinary.com/your-cloud-name/image/upload/v1700000000/nadia-blog-3.jpg',
  },
];
