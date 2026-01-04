// src\app\[lang]\admin\layout.tsx

import type { ReactNode } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import type { Lang } from '@/lib/i18n';
import { normalizeLang } from '@/lib/i18n';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function AdminLayout({ children, params }: Props) {
  const { lang } = await params;
  const safeLang = normalizeLang(lang) as Lang;

  await requireAdmin({ lang: safeLang });

  return (
    <section className='admin_layout'>
      <AdminShell>{children}</AdminShell>
    </section>
  );
}
