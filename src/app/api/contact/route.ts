// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendContactEmail } from '@/lib/email/sendContactEmail';

export const runtime = 'nodejs';

const BodySchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional(),
  email: z.string().trim().max(160).pipe(z.string().email()),
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
        phone: phone && phone.length > 0 ? phone : null,
        email,
        message,
        status: 'PENDING',
      },
      select: { id: true, createdAt: true },
    });

    try {
      const result = await sendContactEmail({
        name,
        phone: phone && phone.length > 0 ? phone : undefined,
        email,
        message,
        createdAtIso: created.createdAt.toISOString(),
        messageId: created.id,
      });

      console.log('Contact email sent via Resend', {
        contactMessageId: created.id,
        resendResult: result,
      });

      await prisma.contactMessage.update({
        where: { id: created.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
          sendError: null,
        },
      });

      return NextResponse.json({
        ok: true,
        resend: result,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Email error';

      console.error('Contact email failed', {
        contactMessageId: created.id,
        error: msg,
      });

      await prisma.contactMessage.update({
        where: { id: created.id },
        data: {
          status: 'FAILED',
          sendError: msg,
        },
      });

      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to send email',
          details: process.env.NODE_ENV !== 'production' ? msg : undefined,
        },
        { status: 502 }
      );
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server error';
    console.error('Contact route failed', msg);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
