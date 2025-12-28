// src/app/api/admin/shared/requireAdminApi.ts

import { cookies } from 'next/headers';

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  const role = store.get('nb_role')?.value ?? '';
  return role === 'admin';
}
