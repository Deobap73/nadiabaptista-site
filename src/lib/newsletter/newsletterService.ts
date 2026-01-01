// src/lib/newsletter/newsletterService.ts

import { prisma } from '@/lib/prisma';

import { getPublicSiteUrl, joinUrl } from './siteUrl';
import { sendNewsletterEventEmail } from '@/lib/email/sendNewsletterEventEmail';

export type NewsletterKind =
  | 'POST'
  | 'ACADEMIC_PROJECT'
  | 'ACHIEVEMENT'
  | 'CONFERENCE'
  | 'PRACTICAL_EXPERIENCE';

type CreateEventInput = {
  kind: NewsletterKind;
  entityId: string;
  title: string;
  urlPath: string;
};

function normalizeError(err: unknown): string {
  if (!err) return 'Unknown error';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return 'Unknown error';
  }
}

export async function createNewsletterEventIfMissing(input: CreateEventInput) {
  try {
    const base = getPublicSiteUrl();
    const fullUrl = joinUrl(base, input.urlPath);

    const existing = await prisma.newsletterEvent.findUnique({
      where: { kind_entityId: { kind: input.kind, entityId: input.entityId } },
      select: { id: true },
    });

    if (existing) return { ok: true as const, eventId: existing.id, created: false as const };

    const created = await prisma.newsletterEvent.create({
      data: {
        kind: input.kind,
        entityId: input.entityId,
        title: input.title,
        url: fullUrl,
      },
      select: { id: true },
    });

    return { ok: true as const, eventId: created.id, created: true as const };
  } catch (err) {
    return { ok: false as const, error: normalizeError(err) };
  }
}

export async function deliverNewsletterEvent(eventId: string) {
  try {
    const event = await prisma.newsletterEvent.findUnique({
      where: { id: eventId },
      select: { id: true, title: true, url: true },
    });

    if (!event) return { ok: false as const, error: 'Event not found' };

    const subscribers = await prisma.subscriber.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, email: true, name: true, unsubTokenHash: true },
      orderBy: { createdAt: 'asc' },
    });

    const base = getPublicSiteUrl();

    let sent = 0;
    let failed = 0;

    for (const sub of subscribers) {
      const already = await prisma.newsletterDelivery.findUnique({
        where: { eventId_subscriberId: { eventId: event.id, subscriberId: sub.id } },
        select: { id: true },
      });

      if (already) continue;

      const unsubHash = sub.unsubTokenHash || '';
      const unsubscribeUrl = joinUrl(
        base,
        `/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubHash)}`
      );

      try {
        const result = await sendNewsletterEventEmail({
          toEmail: sub.email,
          toName: sub.name || undefined,
          title: event.title,
          url: event.url,
          unsubscribeUrl,
        });

        await prisma.newsletterDelivery.create({
          data: {
            eventId: event.id,
            subscriberId: sub.id,
            sentAt: new Date(),
            providerId: (result && typeof result.id === 'string' ? result.id : null) || null,
            error: null,
          },
        });

        sent += 1;
      } catch (err) {
        const msg = normalizeError(err);

        await prisma.newsletterDelivery.create({
          data: {
            eventId: event.id,
            subscriberId: sub.id,
            sentAt: null,
            providerId: null,
            error: msg,
          },
        });

        failed += 1;
      }
    }

    return { ok: true as const, sent, failed };
  } catch (err) {
    return { ok: false as const, error: normalizeError(err) };
  }
}
