// src/lib/blog/slug.ts

import { prisma } from '@/lib/prisma';

export function slugifyFromTitle(title: string): string {
  const raw = (title || '').trim().toLowerCase();
  if (!raw) return '';

  const noAccents = raw.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  const cleaned = noAccents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();

  return cleaned;
}

export async function ensureUniquePostSlug(baseSlug: string): Promise<string> {
  const base = (baseSlug || '').trim().toLowerCase();
  if (!base) return '';

  let candidate = base;
  let n = 2;

  while (true) {
    const exists = await prisma.post.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!exists) return candidate;

    candidate = `${base}-${n}`;
    n += 1;
  }
}
