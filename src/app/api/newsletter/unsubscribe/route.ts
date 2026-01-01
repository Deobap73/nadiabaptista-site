// src/app/api/newsletter/unsubscribe/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPublicSiteUrl, joinUrl } from '@/lib/newsletter/siteUrl';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = (url.searchParams.get('token') || '').trim();

    if (!token) {
      return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=invalid'));
    }

    const sub = await prisma.subscriber.findFirst({
      where: { unsubTokenHash: token },
      select: { id: true },
    });

    if (!sub) {
      return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=invalid'));
    }

    await prisma.subscriber.update({
      where: { id: sub.id },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
      },
    });

    return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=unsubscribed'));
  } catch {
    return NextResponse.redirect(joinUrl(getPublicSiteUrl(), '/?newsletter=error'));
  }
}
