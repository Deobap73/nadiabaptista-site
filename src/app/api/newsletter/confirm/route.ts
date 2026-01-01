// src/app/api/newsletter/confirm/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sha256Hex } from '@/lib/newsletter/tokens';
import { getPublicSiteUrl, joinUrl } from '@/lib/newsletter/siteUrl';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = (url.searchParams.get('token') || '').trim();

    if (!token) {
      return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=invalid'));
    }

    const hash = sha256Hex(token);

    const sub = await prisma.subscriber.findFirst({
      where: {
        confirmTokenHash: hash,
        status: 'PENDING',
      },
      select: { id: true, confirmExpiresAt: true },
    });

    if (!sub) {
      return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=invalid'));
    }

    if (!sub.confirmExpiresAt || sub.confirmExpiresAt.getTime() < Date.now()) {
      return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=expired'));
    }

    await prisma.subscriber.update({
      where: { id: sub.id },
      data: {
        status: 'ACTIVE',
        confirmedAt: new Date(),
        confirmTokenHash: null,
        confirmExpiresAt: null,
      },
    });

    return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=confirmed'));
  } catch {
    return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=error'));
  }
}
