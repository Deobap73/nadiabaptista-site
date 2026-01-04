// src/components/layout/AdminShortcut.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Lang } from '@/lib/i18n';
import { withLangPrefix } from '@/lib/i18n';

type MeResponse = {
  isAuthenticated: boolean;
  role: 'admin' | null;
};

type Props = {
  lang: Lang;
};

export default function AdminShortcut({ lang }: Props) {
  const router = useRouter();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET' });
        const data = (await res.json()) as MeResponse;

        if (!isMounted) return;

        setCanAccess(Boolean(data.isAuthenticated && data.role === 'admin'));
      } catch {
        if (!isMounted) return;
        setCanAccess(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleClick() {
    router.push(withLangPrefix(lang, '/admin'));
  }

  if (!canAccess) return null;

  return (
    <button
      type='button'
      className='admin_shortcut'
      onClick={handleClick}
      aria-label='Open admin'
    />
  );
}
