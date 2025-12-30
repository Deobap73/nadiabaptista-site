// src/app/api/admin/shared/requireAdminApi.ts

import { requireAdmin } from '@/lib/auth/requireAdmin';

export async function isAdminRequest() {
  const session = await requireAdmin();
  return Boolean(session);
}
