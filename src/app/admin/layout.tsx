// src\app\admin\layout.tsx

import type { ReactNode } from 'react';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  await requireAdmin();
  return <>{children}</>;
}
