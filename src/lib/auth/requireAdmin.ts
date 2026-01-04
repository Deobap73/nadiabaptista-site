// src/lib/auth/requireAdmin.ts

import { redirect } from 'next/navigation';
import type { Lang } from '@/lib/i18n';
import { withLangPrefix } from '@/lib/i18n';
import { verifySession } from './session';

type RequireAdminInput = {
  lang: Lang;
};

export async function requireAdmin(input: RequireAdminInput): Promise<void> {
  const session = await verifySession();

  if (!session) {
    redirect(`${withLangPrefix(input.lang, '/')}?open_login=1`);
  }

  if (session.role !== 'ADMIN') {
    redirect(`${withLangPrefix(input.lang, '/')}?open_login=1`);
  }
}

export async function requireAdminOrRedirect(input: RequireAdminInput): Promise<void> {
  await requireAdmin(input);
}
