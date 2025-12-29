// src/lib/blog/mockPosts.ts

import type { BlogPostMock } from '@/types/blog';

export const mockPosts: BlogPostMock[] = [
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
      'https://res.cloudinary.com/dleir1jqn/image/upload/v1757091348/posts/ooadixk6oe4cvh9pams2.webp',
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
      'https://res.cloudinary.com/dleir1jqn/image/upload/v1753185111/posts/wwe0zxrfc67u0ztlj7kh.webp',
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
      'https://res.cloudinary.com/dleir1jqn/image/upload/v1751452281/posts/tvtcix8npioybigkemxs.webp',
  },
  {
    id: '4',
    slug: 'how-to-prepare-for-a-first-therapy-session',
    title: 'How to prepare for a first therapy session',
    excerpt:
      'A calm guide for people who are curious about therapy but still unsure, what to bring, what to say, and what to expect.',
    content: [
      'A first therapy session can feel like a big step. Many people do not know what they are supposed to say, or they worry that their problem is not serious enough.',
      'There is no perfect way to start. It can help to think about what made you look for support now, and what you would like to feel different in your daily life.',
      'Some people write a few notes before the session. Others prefer to speak freely. Both are valid. If you feel stuck, you can simply say that you do not know where to begin.',
      'The first session is also a moment to understand the pace, the style of the work, and whether you feel safe. Therapy is a relationship. Feeling respected and listened to matters.',
    ].join('\n\n'),
    publishedAt: '2025-04-06',
    readingTimeMinutes: 6,
    tags: ['therapy', 'first-session', 'support'],
    featured: true,
    heroImageUrl:
      'https://res.cloudinary.com/dleir1jqn/image/upload/v1751031854/image7_jd7f94.webp',
  },
  {
    id: '5',
    slug: 'small-daily-habits-that-support-emotional-balance',
    title: 'Small daily habits that support emotional balance',
    excerpt:
      'Not big plans, just small habits that can help the nervous system slow down and make the day feel a bit more manageable.',
    content: [
      'When life feels heavy we often look for a big solution. But emotional balance is frequently built with small actions repeated with patience.',
      'A short walk without a goal, regular meals, fewer screens before sleep, and small pauses between tasks can make a real difference over time.',
      'This is not about discipline or being perfect. It is about creating small spaces where the body can breathe and the mind can stop running for a moment.',
      'If you try one habit, keep it simple. Make it easy to repeat. In many cases, consistency matters more than intensity.',
    ].join('\n\n'),
    publishedAt: '2025-05-18',
    readingTimeMinutes: 5,
    tags: ['wellbeing', 'habits', 'daily-life'],
    featured: false,
    heroImageUrl:
      'https://res.cloudinary.com/dleir1jqn/image/upload/v1751008229/image1_qb1bez.webp',
  },
];
