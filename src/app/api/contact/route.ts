// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendContactEmail } from '@/lib/email/sendContactEmail';

export const runtime = 'nodejs';

const BodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
    }

    const { name, phone, email, message } = parsed.data;

    const created = await prisma.contactMessage.create({
      data: {
        name,
        phone: phone || null,
        email,
        message,
        status: 'PENDING',
      },
      select: { id: true, createdAt: true },
    });

    try {
      await sendContactEmail({
        name,
        phone: phone || undefined,
        email,
        message,
        createdAtIso: created.createdAt.toISOString(),
        messageId: created.id,
      });

      await prisma.contactMessage.update({
        where: { id: created.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
          sendError: null,
        },
      });

      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Email error';

      await prisma.contactMessage.update({
        where: { id: created.id },
        data: {
          status: 'FAILED',
          sendError: msg,
        },
      });

      return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
