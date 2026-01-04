// src\app\admin\[[...path]]\page.tsx

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function normalizeCookieLang(v: string | null): 'pt' | 'en' {
  const s = (v || '').trim().toLowerCase();
  if (s.startsWith('en')) return 'en';
  return 'pt';
}

type PageProps = {
  params: Promise<{ path?: string[] }>;
};

export default async function AdminRootRedirect({ params }: PageProps) {
  const { path } = await params;

  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('nb_lang')?.value || null;
  const lang = normalizeCookieLang(cookieLang);

  const rest = Array.isArray(path) && path.length ? `/${path.join('/')}` : '';
  redirect(`/${lang}/admin${rest}`);
}
