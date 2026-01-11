// src/app/api/post/[slug]/reactions/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { normalizeSlug } from '@/lib/blog/postMapper';
import { getOrSetVoterId, hashVoterId } from '@/lib/reactions/reactionCookie';
import type { Prisma } from '@prisma/client';

export const runtime = 'nodejs';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const ALLOWED_EMOJIS = ['👍', '❤️', '👏', '🤔', '😮'] as const;
type AllowedEmoji = (typeof ALLOWED_EMOJIS)[number];

function isAllowedEmoji(value: unknown): value is AllowedEmoji {
  return typeof value === 'string' && (ALLOWED_EMOJIS as readonly string[]).includes(value);
}

async function findPublishedPostIdBySlug(slug: string): Promise<string | null> {
  const post = await prisma.post.findFirst({
    where: { slug, status: 'PUBLISHED' },
    select: { id: true },
  });

  return post ? post.id : null;
}

async function buildPayload(postId: string, voterHash: string) {
  const rows: Array<{ emoji: string; count: number }> = await prisma.postReaction.findMany({
    where: { postId },
    select: { emoji: true, count: true },
  });

  const votes: Array<{ emoji: string }> = await prisma.postReactionVote.findMany({
    where: { postId, voterHash },
    select: { emoji: true },
  });

  const counts: Record<string, number> = {};
  for (const e of ALLOWED_EMOJIS) counts[e] = 0;

  for (const r of rows) {
    if (isAllowedEmoji(r.emoji)) counts[r.emoji] = r.count;
  }

  const selected: AllowedEmoji[] = votes
    .map((v: { emoji: string }) => v.emoji)
    .filter((emoji: string): emoji is AllowedEmoji => isAllowedEmoji(emoji));

  return {
    ok: true,
    emojis: ALLOWED_EMOJIS,
    counts,
    selected,
  };
}

export async function GET(req: Request, { params }: RouteProps) {
  try {
    const tempRes = NextResponse.json({ ok: true });

    const voterId = getOrSetVoterId(req, tempRes);
    const voterHash = hashVoterId(voterId);

    const { slug } = await params;
    const target = normalizeSlug(slug);

    const postId = await findPublishedPostIdBySlug(target);
    if (!postId) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    const payload = await buildPayload(postId, voterHash);
    return NextResponse.json(payload, { headers: tempRes.headers });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: RouteProps) {
  try {
    const tempRes = NextResponse.json({ ok: true });

    const voterId = getOrSetVoterId(req, tempRes);
    const voterHash = hashVoterId(voterId);

    const { slug } = await params;
    const target = normalizeSlug(slug);

    const postId = await findPublishedPostIdBySlug(target);
    if (!postId) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    }

    const body = (await req.json()) as { emoji?: unknown };
    if (!isAllowedEmoji(body.emoji)) {
      return NextResponse.json({ ok: false, error: 'Invalid emoji' }, { status: 400 });
    }

    const emoji: AllowedEmoji = body.emoji;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const existing = await tx.postReactionVote.findUnique({
        where: { postId_emoji_voterHash: { postId, emoji, voterHash } },
        select: { id: true },
      });

      if (existing) {
        await tx.postReactionVote.delete({
          where: { postId_emoji_voterHash: { postId, emoji, voterHash } },
        });

        const updated = await tx.postReaction.update({
          where: { postId_emoji: { postId, emoji } },
          data: { count: { decrement: 1 } },
          select: { count: true },
        });

        if (updated.count < 0) {
          await tx.postReaction.update({
            where: { postId_emoji: { postId, emoji } },
            data: { count: 0 },
          });
        }

        return;
      }

      await tx.postReactionVote.create({
        data: { postId, emoji, voterHash },
      });

      await tx.postReaction.upsert({
        where: { postId_emoji: { postId, emoji } },
        create: { postId, emoji, count: 1 },
        update: { count: { increment: 1 } },
      });
    });

    const payload = await buildPayload(postId, voterHash);
    return NextResponse.json(payload, { headers: tempRes.headers });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
