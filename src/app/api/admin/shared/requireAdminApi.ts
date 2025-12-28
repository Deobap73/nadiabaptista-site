// src/app/api/admin/shared/requireAdminApi.ts

import { cookies } from 'next/headers';

export async function isAdminRequest() {
  const cookieStore = await cookies();
  const role = cookieStore.get('nb_role')?.value || '';
  return role === 'admin';
}
