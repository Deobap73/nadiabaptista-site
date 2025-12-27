// src/components/layout/HeaderAuthControls.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/auth/LoginModal';

type MeResponse = {
  isAuthenticated: boolean;
  role: 'admin' | 'user' | null;
};

export default function HeaderAuthControls() {
  const router = useRouter();

  const [me, setMe] = useState<MeResponse>({ isAuthenticated: false, role: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [loginModalKey, setLoginModalKey] = useState(0);

  async function loadMe() {
    try {
      const res = await fetch('/api/auth/me', { method: 'GET' });
      const data = (await res.json()) as MeResponse;
      setMe(data);
    } catch {
      setMe({ isAuthenticated: false, role: null });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadMe();

    function onAuthChanged() {
      void loadMe();
    }

    window.addEventListener('nb_auth_changed', onAuthChanged as EventListener);
    return () => window.removeEventListener('nb_auth_changed', onAuthChanged as EventListener);
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.dispatchEvent(new CustomEvent('nb_auth_changed'));
    } finally {
      setMe({ isAuthenticated: false, role: null });
      router.refresh();
    }
  }

  function handleLoggedIn(role: 'admin' | 'user') {
    setMe({ isAuthenticated: true, role });
    window.dispatchEvent(new CustomEvent('nb_auth_changed'));
    router.refresh();
  }

  function handleOpenLogin() {
    setLoginModalKey((v) => v + 1);
    setIsModalOpen(true);
  }

  return (
    <div className='header_auth'>
      {me.isAuthenticated && me.role === 'admin' ? (
        <Link className='header_auth__link' href='/admin'>
          Admin
        </Link>
      ) : null}

      {isLoading ? null : me.isAuthenticated ? (
        <button className='header_auth__button' type='button' onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className='header_auth__button' type='button' onClick={handleOpenLogin}>
          Login
        </button>
      )}

      <LoginModal
        key={loginModalKey}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoggedIn={handleLoggedIn}
      />
    </div>
  );
}
