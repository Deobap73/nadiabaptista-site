// src/app/admin/layout.tsx

import type { ReactNode } from 'react';
import { requireAdmin } from '@/lib/auth/requireAdmin';

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  await requireAdmin();
  return <>{children}</>;
}
