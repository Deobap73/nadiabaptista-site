// src/types/blog.ts

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // full post content
  publishedAt: string; // ISO string (YYYY-MM-DD)
  readingTimeMinutes: number;
  tags: string[];
  featured: boolean;
  heroImageUrl: string;
}
