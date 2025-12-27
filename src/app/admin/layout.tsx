// src/app/admin/layout.tsx
import type { ReactNode } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { requireAdminOrRedirect } from '@/lib/auth/requireAdmin';

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  await requireAdminOrRedirect();

  return (
    <section className='admin_layout'>
      <AdminShell>{children}</AdminShell>
    </section>
  );
}
