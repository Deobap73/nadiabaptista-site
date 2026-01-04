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

// English: Helper to remove language prefix for route logic
function stripLangPrefix(pathname: string): string {
  if (pathname.startsWith('/en')) return pathname.slice(3) || '/';
  if (pathname.startsWith('/pt')) return pathname.slice(3) || '/';
  return pathname;
}

// English: Determines menu position based on the current section
function getBrainMenuAlign(pathname: string): 'left' | 'right' {
  const leftRoutes = ['/studies', '/portfolio', '/blog'];
  const matchLeft = leftRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  return matchLeft ? 'left' : 'right';
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
  const [hideMenus, setHideMenus] = useState(false);

  useEffect(() => {
    // English: Sync menu visibility with body class (used for landing pages)
    const sync = () => setHideMenus(document.body.classList.contains('is-landing-mobile'));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // English: Global listener for opening the login modal from any component
    const openLogin = () => {
      setLoginModalKey((v) => v + 1);
      setIsLoginOpen(true);
    };

    window.addEventListener('nb_open_login_modal', openLogin);
    return () => window.removeEventListener('nb_open_login_modal', openLogin);
  }, []);

  if (hideMenus) {
    return (
      <LoginModal
        key={loginModalKey}
        lang={lang}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={() => setIsLoginOpen(false)}
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
        onLoggedIn={() => setIsLoginOpen(false)}
      />
    </>
  );
}
