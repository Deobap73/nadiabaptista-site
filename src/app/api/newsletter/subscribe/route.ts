// src/app/api/newsletter/subscribe/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidEmail, randomToken, sha256Hex } from '@/lib/newsletter/tokens';
import { getPublicSiteUrl, joinUrl } from '@/lib/newsletter/siteUrl';
import { sendNewsletterConfirmEmail } from '@/lib/email/sendNewsletterConfirmEmail';

export const runtime = 'nodejs';

type Body = {
  email?: string;
  name?: string;
};

function normalizeName(v: string | undefined): string | null {
  const s = (v || '').trim();
  if (!s) return null;
  return s.slice(0, 80);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const email = (body.email || '').trim().toLowerCase();
    const name = normalizeName(body.name);

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Email inválido.' }, { status: 400 });
    }

    const confirmRaw = randomToken();
    const confirmHash = sha256Hex(confirmRaw);

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const unsubRaw = randomToken();
    const unsubHash = sha256Hex(unsubRaw);

    const existing = await prisma.subscriber.findUnique({
      where: { email },
      select: { id: true, status: true, unsubTokenHash: true },
    });

    const subscriber = existing
      ? await prisma.subscriber.update({
          where: { email },
          data: {
            name: name ?? undefined,
            status: existing.status === 'ACTIVE' ? 'ACTIVE' : 'PENDING',
            confirmTokenHash: existing.status === 'ACTIVE' ? null : confirmHash,
            confirmExpiresAt: existing.status === 'ACTIVE' ? null : expires,
            unsubTokenHash: existing.unsubTokenHash || unsubHash,
          },
          select: { id: true, status: true, unsubTokenHash: true },
        })
      : await prisma.subscriber.create({
          data: {
            email,
            name,
            status: 'PENDING',
            confirmTokenHash: confirmHash,
            confirmExpiresAt: expires,
            unsubTokenHash: unsubHash,
          },
          select: { id: true, status: true, unsubTokenHash: true },
        });

    if (subscriber.status === 'ACTIVE') {
      return NextResponse.json({ ok: true, alreadyActive: true });
    }

    const base = getPublicSiteUrl();
    const confirmUrl = joinUrl(
      base,
      `/api/newsletter/confirm?token=${encodeURIComponent(confirmRaw)}`
    );

    const unsubToken = subscriber.unsubTokenHash || '';
    const unsubscribeUrl = joinUrl(
      base,
      `/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubToken)}`
    );

    await sendNewsletterConfirmEmail({
      toEmail: email,
      toName: name || undefined,
      confirmUrl,
      unsubscribeUrl,
    });

    return NextResponse.json({ ok: true, alreadyActive: false });
  } catch {
    return NextResponse.json({ ok: false, error: 'Falha ao subscrever.' }, { status: 500 });
  }
}
