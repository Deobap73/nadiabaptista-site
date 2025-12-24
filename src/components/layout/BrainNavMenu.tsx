// src/components/layout/BrainNavMenu.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';

type BrainNavMenuProps = {
  align?: 'left' | 'right';
};

type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  x: number;
  y: number;
  delayMs: number;
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

type IconOffset = {
  x?: number;
  y?: number;
};

const MENU_ITEMS: MenuItem[] = [
  { id: 'blog', label: 'BLOG', href: '/blog', icon: '/nav/Blog.svg', x: 120, y: 54, delayMs: 40 },
  {
    id: 'about',
    label: 'SOBRE MIM',
    href: '/about',
    icon: '/nav/AboutMe.svg',
    x: 132,
    y: 112,
    delayMs: 90,
  },
  {
    id: 'projects',
    label: 'PROJECTOS',
    href: '/portfolio',
    icon: '/nav/Projectos.svg',
    x: 170,
    y: 198,
    delayMs: 140,
  },
  {
    id: 'studies',
    label: 'STUDIES',
    href: '/studies',
    icon: '/nav/Studies.svg',
    x: 260,
    y: 198,
    delayMs: 190,
  },
  {
    id: 'contact',
    label: 'Contactos',
    href: '/contact',
    icon: '/nav/Contacto.svg',
    x: 312,
    y: 126,
    delayMs: 240,
  },
  {
    id: 'login',
    label: 'LOGIN',
    href: '/login',
    icon: '/nav/LogIn.svg',
    x: 334,
    y: 56,
    delayMs: 290,
  },
];

const ICON_OFFSETS: Record<string, IconOffset> = {
  blog: { x: 0, y: 10 },
  about: { x: 0, y: 10 },
  projects: { x: 0, y: 5 },
  studies: { x: 0, y: 5 },
  contact: { x: -5, y: 12 },
  login: { x: -2, y: 11 },
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

    const x2 = n.x - ux * 20;
    const y2 = n.y - uy * 20;

    return { ...n, x1, y1, x2, y2 };
  });

  return { width, height, cx, cy, nodes };
}

function isActiveRoute(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (pathname === href) return true;
  if (pathname.startsWith(`${href}/`)) return true;
  return false;
}

export default function BrainNavMenu({ align = 'right' }: BrainNavMenuProps) {
  const pathname = usePathname() || '/';

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const panelId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function closeMenu({ focusButton }: { focusButton: boolean }) {
    setIsOpen(false);
    if (focusButton) buttonRef.current?.focus();
  }

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(min-width: 1024px)');

    function sync() {
      setIsDesktop(mq.matches);
    }

    sync();
    mq.addEventListener('change', sync);

    return () => {
      mq.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu({ focusButton: true });
    }

    function onPointerDown(e: MouseEvent | PointerEvent) {
      const root = rootRef.current;
      if (!isDesktop) return;

      if (!root) return;
      const target = e.target as Node | null;
      if (!target) return;

      if (!root.contains(target)) closeMenu({ focusButton: false });
    }

    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('pointerdown', onPointerDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen, isDesktop]);

  function handleMouseEnter() {
    if (!isDesktop) return;
    setIsOpen(true);
  }

  function handleMouseLeave() {
    if (!isDesktop) return;
    closeMenu({ focusButton: false });
  }

  function handleNodeClick() {
    closeMenu({ focusButton: false });
  }

  const geometry = buildGeometry(MENU_ITEMS);

  if (!isDesktop) {
    return (
      <>
        <button
          type='button'
          className={`brain_menu__mobile_toggle brain_menu__mobile_toggle--${align}`}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label='Abrir menu'>
          <Image src='/nav/Brain.svg' alt='Menu' width={44} height={44} />
        </button>

        {isOpen ? (
          <>
            <div className='brain_menu__mobile_overlay open' onClick={() => setIsOpen(false)} />

            <aside
              className={`brain_menu__mobile_drawer brain_menu__mobile_drawer--${align}`}
              data-open='true'>
              <nav className='brain_menu__mobile_nav open'>
                <ul className='brain_menu__mobile_list'>
                  {MENU_ITEMS.map((item) => {
                    const active = isActiveRoute(pathname, item.href);

                    return (
                      <li key={item.id} className='brain_menu__mobile_item'>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`brain_menu__mobile_link${
                            active ? ' brain_menu__mobile_link--active' : ''
                          }`}
                          aria-label={item.label}>
                          <span className='brain_menu__mobile_icon'>
                            <Image src={item.icon} alt='' width={24} height={24} />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </>
        ) : null}
      </>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`brain_menu brain_menu--${align}`}
      data-open={isOpen ? 'true' : 'false'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button
        ref={buttonRef}
        type='button'
        className='brain_menu__button'
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label='Abrir menu'>
        <span className='brain_menu__brain' aria-hidden='true'>
          <Image src='/nav/Brain.svg' alt='' width={44} height={44} />
        </span>
      </button>

      <div id={panelId} className='brain_menu__popover' role='dialog' aria-label='Menu'>
        <div className='brain_menu__radial' aria-hidden='true'>
          <svg
            className='brain_menu__svg'
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            role='presentation'>
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

          {geometry.nodes.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              className='brain_menu__node'
              style={cssNodePosition(n.x, n.y, n.delayMs, n.id)}
              tabIndex={isOpen ? 0 : -1}
              onClick={handleNodeClick}>
              <span className='brain_menu__node_icon' aria-hidden='true'>
                <Image src={n.icon} alt='' width={22} height={22} />
              </span>
              <span className='brain_menu__node_label'>{n.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
