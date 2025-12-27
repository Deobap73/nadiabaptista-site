// src/lib/auth/useMe.ts
'use client';

import { useEffect, useState } from 'react';

export type MeState = {
  isAuthenticated: boolean;
  role: 'admin' | null;
};

const INITIAL: MeState = { isAuthenticated: false, role: null };

export function useMe() {
  const [me, setMe] = useState<MeState>(INITIAL);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch('/api/auth/me', { method: 'GET', credentials: 'include' });
      const data = (await res.json()) as MeState;
      setMe(data);
    } catch {
      setMe(INITIAL);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void load();

    function onAuthChanged() {
      void load();
    }

    window.addEventListener('nb_auth_changed', onAuthChanged as EventListener);
    return () => window.removeEventListener('nb_auth_changed', onAuthChanged as EventListener);
  }, []);

  return { me, isLoading, reload: load };
}
