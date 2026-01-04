// src/components/layout/BrainNavMenu.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Toast from '../ui/Toast';
import { useMe } from '@/lib/auth/useMe';
import type { Lang } from '@/lib/i18n';
import { MAIN_NAV_CONFIG } from '@/config/navigation';

type BrainNavMenuProps = {
  align?: 'left' | 'right';
  lang: Lang;
};

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  icon: string;
  x: number;
  y: number;
  delayMs: number;
  action?: 'login' | 'logout' | 'lang';
};

type CSSVars = CSSProperties & {
  '--delay'?: string;
  '--x'?: string;
  '--y'?: string;
};

type GeometryNode = MenuItem & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type Geometry = {
  width: number;
  height: number;
  cx: number;
  cy: number;
  nodes: GeometryNode[];
};

const ICON_OFFSETS: Record<string, { x: number; y: number }> = {
  blog: { x: 0, y: 10 },
  about: { x: 0, y: 10 },
  projects: { x: 0, y: 5 },
  studies: { x: 0, y: 5 },
  contact: { x: -5, y: 12 },
  login: { x: -2, y: 11 },
  logout: { x: -2, y: 11 },
  lang: { x: 0, y: 6 },
};

function cssDelay(delayMs: number): CSSVars {
  return { '--delay': `${delayMs}ms` };
}

function cssNodePosition(x: number, y: number, delayMs: number, id: string): CSSVars {
  const offset = ICON_OFFSETS[id] || { x: 0, y: 0 };
  return {
    '--x': `${x + (offset.x || 0)}px`,
    '--y': `${y + (offset.y || 0)}px`,
    '--delay': `${delayMs}ms`,
  };
}

function buildGeometry(items: MenuItem[]): Geometry {
  const width = 420;
  const height = 260;
  const cx = 230;
  const cy = 70;
  const centerR = 32;

  const nodes: GeometryNode[] = items.map((n) => {
    const dx = n.x - cx;
    const dy = n.y - cy;
    const len = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    const ux = dx / len;
    const uy = dy / len;

    const x1 = cx + ux * centerR;
    const y1 = cy + uy * centerR;
    const endPad = n.id === 'lang' ? 16 : 40;
    const x2 = n.x - ux * endPad;
    const y2 = n.y - uy * endPad;

    return { ...n, x1, y1, x2, y2 };
  });

  return { width, height, cx, cy, nodes };
}

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}

function stripLangPrefix(pathname: string): string {
  if (pathname === '/pt' || pathname === '/en') return '/';
  if (pathname.startsWith('/pt/') || pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname;
}

function isActiveRoute(pathname: string, href: string) {
  const cleanPath = stripLangPrefix(pathname);
  const cleanHref = stripLangPrefix(href);
  if (cleanHref === '/') return cleanPath === '/';
  return cleanPath === cleanHref || cleanPath.startsWith(`${cleanHref}/`);
}

function switchLangPath(pathname: string, nextLang: Lang): string {
  const currentClean = stripLangPrefix(pathname);
  return `/${nextLang}${currentClean === '/' ? '' : currentClean}`;
}

export default function BrainNavMenu({ align = 'right', lang }: BrainNavMenuProps) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const panelId = useId();

  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const rootRef = useRef<HTMLDivElement | null>(null);

  const { me } = useMe();
  const isAuthenticated = me.isAuthenticated;

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
    writeCookie('nb_lang', lang);
  }, [lang]);

  const menuItems: MenuItem[] = useMemo(() => {
    const nextLang: Lang = lang === 'pt' ? 'en' : 'pt';

    const langItem: MenuItem = {
      id: 'lang',
      label: '',
      icon: lang === 'pt' ? '/nav/PT.svg' : '/nav/EN.svg',
      x: 230,
      y: 14,
      delayMs: 0,
      action: 'lang',
      href: switchLangPath(pathname, nextLang),
    };

    const baseItems: MenuItem[] = MAIN_NAV_CONFIG.map((item) => ({
      id: item.id,
      label: item.label[lang],
      href: `/${lang}${item.href}`,
      icon: item.icon,
      x: item.coords.x,
      y: item.coords.y,
      delayMs: item.coords.delayMs,
    }));

    const authItem: MenuItem = {
      id: isAuthenticated ? 'logout' : 'login',
      label: isAuthenticated ? 'LOGOUT' : 'LOGIN',
      icon: isAuthenticated ? '/nav/LogOut.svg' : '/nav/LogIn.svg',
      x: 334,
      y: 56,
      delayMs: 290,
      action: isAuthenticated ? 'logout' : 'login',
    };

    return [langItem, ...baseItems, authItem];
  }, [isAuthenticated, lang, pathname]);

  const geometry = useMemo(() => buildGeometry(menuItems), [menuItems]);

  const closeAll = () => {
    setIsDesktopOpen(false);
    setIsMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.dispatchEvent(new CustomEvent('nb_auth_changed'));
      setToastMessage(lang === 'pt' ? 'Sessão terminada.' : 'Session ended.');
      setToastOpen(true);
    } finally {
      closeAll();
    }
  };

  const handleToggleLang = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextLang: Lang = lang === 'pt' ? 'en' : 'pt';
    const nextPath = switchLangPath(pathname, nextLang);

    writeCookie('nb_lang', nextLang);
    router.push(nextPath);
    setToastMessage(nextLang === 'pt' ? 'Idioma PT ativo.' : 'EN language active.');
    setToastOpen(true);
    closeAll();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (rootRef.current && !rootRef.current.contains(target)) closeAll();
    };

    if (isDesktopOpen || isMobileOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('pointerdown', onPointerDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isDesktopOpen, isMobileOpen]);

  return (
    <nav ref={rootRef} aria-label='Main Navigation'>
      <div
        className={`brain_menu brain_menu--${align} brain_menu--desktop`}
        data-open={isDesktopOpen ? 'true' : 'false'}
        onMouseEnter={() => setIsDesktopOpen(true)}
        onMouseLeave={() => setIsDesktopOpen(false)}>
        <button
          type='button'
          className='brain_menu__button'
          onClick={() => setIsDesktopOpen(!isDesktopOpen)}
          aria-expanded={isDesktopOpen}
          aria-controls={isDesktopOpen ? panelId : undefined}
          aria-label={lang === 'pt' ? 'Abrir menu' : 'Open menu'}>
          <span className='brain_menu__brain' aria-hidden='true'>
            <Image src='/nav/Brain.svg' alt='' width={44} height={44} />
          </span>
        </button>

        {isDesktopOpen ? (
          <div id={panelId} className='brain_menu__popover'>
            <div className='brain_menu__radial' aria-hidden='true'>
              <svg className='brain_menu__svg' viewBox={`0 0 ${geometry.width} ${geometry.height}`}>
                {geometry.nodes.map((n) => (
                  <line
                    key={`l_${n.id}`}
                    x1={n.x1}
                    y1={n.y1}
                    x2={n.x2}
                    y2={n.y2}
                    className='brain_menu__line'
                    style={cssDelay(n.delayMs)}
                  />
                ))}
              </svg>

              {geometry.nodes.map((n) => {
                const active = isActiveRoute(pathname, n.href || '');
                const commonProps = {
                  className: `brain_menu__node ${active ? 'brain_menu__node--active' : ''}`,
                  style: cssNodePosition(n.x, n.y, n.delayMs, n.id),
                  tabIndex: 0 as const,
                };

                if (n.action === 'lang') {
                  return (
                    <Link
                      key={n.id}
                      {...commonProps}
                      href={n.href || '#'}
                      onClick={handleToggleLang}>
                      <span className='brain_menu__node_icon'>
                        <Image src={n.icon} alt='' width={22} height={22} />
                      </span>
                      <span className='brain_menu__node_label'>{n.label}</span>
                    </Link>
                  );
                }

                if (n.action === 'login' || n.action === 'logout') {
                  return (
                    <button
                      key={n.id}
                      {...commonProps}
                      type='button'
                      onClick={() =>
                        n.action === 'login'
                          ? window.dispatchEvent(new CustomEvent('nb_open_login_modal'))
                          : void handleLogout()
                      }>
                      <span className='brain_menu__node_icon'>
                        <Image src={n.icon} alt='' width={22} height={22} />
                      </span>
                      <span className='brain_menu__node_label'>{n.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={n.id}
                    {...commonProps}
                    href={n.href || '#'}
                    onClick={() => setIsDesktopOpen(false)}>
                    <span className='brain_menu__node_icon'>
                      <Image src={n.icon} alt='' width={22} height={22} />
                    </span>
                    <span className='brain_menu__node_label'>{n.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className='brain_menu--mobile'>
        <button
          type='button'
          className={`brain_menu__mobile_toggle brain_menu__mobile_toggle--${align}`}
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-expanded={isMobileOpen}
          aria-label={lang === 'pt' ? 'Abrir menu' : 'Open menu'}>
          <Image src='/nav/Brain.svg' alt='Menu' width={44} height={44} />
        </button>

        {isMobileOpen ? (
          <>
            <div
              className='brain_menu__mobile_overlay open'
              onClick={() => setIsMobileOpen(false)}
            />

            <aside
              className={`brain_menu__mobile_drawer brain_menu__mobile_drawer--${align}`}
              data-open='true'>
              <nav className='brain_menu__mobile_nav open'>
                <ul className='brain_menu__mobile_list'>
                  {menuItems.map((item) => (
                    <li key={item.id} className='brain_menu__mobile_item'>
                      {item.action === 'lang' ? (
                        <Link
                          href={item.href || '#'}
                          className='brain_menu__mobile_link'
                          onClick={handleToggleLang}>
                          <Image src={item.icon} alt='' width={24} height={24} />
                        </Link>
                      ) : item.action === 'login' || item.action === 'logout' ? (
                        <button
                          type='button'
                          className='brain_menu__mobile_link'
                          onClick={() =>
                            item.action === 'login'
                              ? window.dispatchEvent(new CustomEvent('nb_open_login_modal'))
                              : void handleLogout()
                          }>
                          <Image src={item.icon} alt='' width={24} height={24} />
                        </button>
                      ) : (
                        <Link
                          href={item.href || '#'}
                          className={`brain_menu__mobile_link ${
                            isActiveRoute(pathname, item.href || '')
                              ? 'brain_menu__mobile_link--active'
                              : ''
                          }`}
                          onClick={() => setIsMobileOpen(false)}>
                          <Image src={item.icon} alt='' width={24} height={24} />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </>
        ) : null}
      </div>

      <Toast isOpen={toastOpen} message={toastMessage} onClose={() => setToastOpen(false)} />
    </nav>
  );
}
