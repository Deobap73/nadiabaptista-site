// src/components/layout/HeaderClientSlots.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import BrainNavMenu from './BrainNavMenu';
import AdminShortcut from './AdminShortcut';
import LoginModal from '../auth/LoginModal';
import { useMe } from '@/lib/auth/useMe';

type Props = {
  lang: 'pt' | 'en';
};

function stripLangPrefix(pathname: string): string {
  if (pathname.startsWith('/en')) return pathname.slice(3) || '/';
  if (pathname.startsWith('/pt')) return pathname.slice(3) || '/';
  return pathname;
}

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

export default function HeaderClientSlots({ lang }: Props) {
  const pathname = usePathname() || '/';
  const cleanPath = stripLangPrefix(pathname);

  const align = useMemo(() => getBrainMenuAlign(cleanPath), [cleanPath]);
  const opposite = align === 'left' ? 'right' : 'left';

  const { me } = useMe();
  const isAdmin = Boolean(me.isAuthenticated && me.role === 'admin');

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginModalKey, setLoginModalKey] = useState(0);
  const [hideMenus, setHideMenus] = useState(() => hasLandingMobileBodyClass());

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    function sync() {
      setHideMenus(body.classList.contains('is-landing-mobile'));
    }

    sync();

    const observer = new MutationObserver(sync);
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
        lang={lang}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={handleLoggedIn}
      />
    );
  }

  return (
    <>
      <div className='site-header__slot site-header__slot--left'>
        {align === 'left' ? <BrainNavMenu align='left' lang={lang} /> : null}
        {isAdmin && opposite === 'left' ? <AdminShortcut lang={lang} /> : null}
      </div>

      <div className='site-header__slot site-header__slot--right'>
        {align === 'right' ? <BrainNavMenu align='right' lang={lang} /> : null}
        {isAdmin && opposite === 'right' ? <AdminShortcut lang={lang} /> : null}
      </div>

      <LoginModal
        key={loginModalKey}
        lang={lang}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={handleLoggedIn}
      />
    </>
  );
}
