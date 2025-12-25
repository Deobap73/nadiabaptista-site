// src/app/api/admin/bootstrap/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing ${name} in environment variables.`);
  }
  return value.trim();
}

export async function POST() {
  try {
    const adminEmail = requireEnv('ADMIN_EMAIL').toLowerCase();
    const adminPassword = requireEnv('ADMIN_PASSWORD');

    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true, email: true },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { ok: false, message: 'Admin already exists.', admin: existingAdmin },
        { status: 409 }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email: adminEmail },
      select: { id: true },
    });

    if (existingEmail) {
      return NextResponse.json({ ok: false, message: 'Email already in use.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        role: 'ADMIN',
        passwordHash,
      },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, admin });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, message, where: 'bootstrap' }, { status: 500 });
  }
}
