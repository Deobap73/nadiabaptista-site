// src/components/layout/HeaderClientSlots.tsx

'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import BrainNavMenu from './BrainNavMenu';
import AdminShortcut from './AdminShortcut';
import LoginModal from '../auth/LoginModal';
import { getSessionUserFromCookieString } from '../../lib/auth/getSessionUser';

function getBrainMenuAlign(pathname: string): 'left' | 'right' {
  const leftRoutes = ['/studies', '/portfolio', '/blog'];

  const matchLeft = leftRoutes.some((route) => {
    if (pathname === route) return true;
    if (pathname.startsWith(`${route}/`)) return true;
    return false;
  });

  return matchLeft ? 'left' : 'right';
}

function subscribeCookieChanges(onStoreChange: () => void) {
  const interval = window.setInterval(() => {
    onStoreChange();
  }, 500);

  return () => window.clearInterval(interval);
}

function getCookieSnapshot() {
  return typeof document === 'undefined' ? '' : document.cookie || '';
}

export default function HeaderClientSlots() {
  const pathname = usePathname() || '/';
  const align = useMemo(() => getBrainMenuAlign(pathname), [pathname]);
  const opposite = align === 'left' ? 'right' : 'left';

  const cookieString = useSyncExternalStore(subscribeCookieChanges, getCookieSnapshot, () => '');

  const isAdmin = useMemo(() => {
    const user = getSessionUserFromCookieString(cookieString);
    return Boolean(user?.isAuthenticated && user?.role === 'admin');
  }, [cookieString]);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginModalKey, setLoginModalKey] = useState(0);

  useEffect(() => {
    function openLogin() {
      setLoginModalKey((v) => v + 1);
      setIsLoginOpen(true);
    }

    window.addEventListener('nb_open_login_modal', openLogin as EventListener);
    return () => window.removeEventListener('nb_open_login_modal', openLogin as EventListener);
  }, []);

  function handleLoggedIn() {
    setIsLoginOpen(false);
  }

  return (
    <>
      <div className='site-header__slot site-header__slot--left'>
        {align === 'left' ? <BrainNavMenu align='left' /> : null}
        {isAdmin && opposite === 'left' ? <AdminShortcut /> : null}
      </div>

      <div className='site-header__slot site-header__slot--right'>
        {align === 'right' ? <BrainNavMenu align='right' /> : null}
        {isAdmin && opposite === 'right' ? <AdminShortcut /> : null}
      </div>

      <LoginModal
        key={loginModalKey}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={handleLoggedIn}
      />
    </>
  );
}
