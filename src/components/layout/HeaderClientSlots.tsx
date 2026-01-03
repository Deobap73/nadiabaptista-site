// src/components/layout/HeaderClientSlots.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import BrainNavMenu from './BrainNavMenu';
import AdminShortcut from './AdminShortcut';
import LoginModal from '../auth/LoginModal';
import { useMe } from '@/lib/auth/useMe';

function getBrainMenuAlign(pathname: string): 'left' | 'right' {
  const leftRoutes = ['/studies', '/portfolio', '/blog'];

  const matchLeft = leftRoutes.some((route) => {
    if (pathname === route) return true;
    if (pathname.startsWith(`${route}/`)) return true;
    return false;
  });

  return matchLeft ? 'left' : 'right';
}

function hasLandingMobileBodyClass(): boolean {
  if (typeof document === 'undefined') return false;
  return document.body.classList.contains('is-landing-mobile');
}

export default function HeaderClientSlots() {
  const pathname = usePathname() || '/';

  const align = useMemo(() => getBrainMenuAlign(pathname), [pathname]);
  const opposite = align === 'left' ? 'right' : 'left';

  const { me } = useMe();
  const isAdmin = Boolean(me.isAuthenticated && me.role === 'admin');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginModalKey, setLoginModalKey] = useState(0);

  const [hideMenus, setHideMenus] = useState(false);

  useEffect(() => {
    setHideMenus(hasLandingMobileBodyClass());
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    function sync() {
      setHideMenus(body.classList.contains('is-landing-mobile'));
    }

    sync();

    const observer = new MutationObserver(() => sync());
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

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

  if (hideMenus) {
    return (
      <LoginModal
        key={loginModalKey}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={handleLoggedIn}
      />
    );
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
