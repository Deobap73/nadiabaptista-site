// src/components/admin/AdminShell.tsx

import Link from 'next/link';

type AdminNavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: AdminNavItem[] = [
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Studies, Projects', href: '/admin/studies-projects' },
  { label: 'Conferences', href: '/admin/conferences' },
  { label: 'Diplomas', href: '/admin/diplomas' },
  { label: 'Achievements', href: '/admin/achievements' },
  { label: 'Messages', href: '/admin/messages' },
];

type Props = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: Props) {
  return (
    <div className='admin_shell'>
      <aside className='admin_shell__nav' aria-label='Admin navigation'>
        <div className='admin_shell__nav_inner'>
          <Link href='/admin' className='admin_shell__nav_title'>
            Admin
          </Link>

          <nav className='admin_shell__nav_links'>
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} className='admin_shell__nav_link' href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className='admin_shell__content'>{children}</main>
    </div>
  );
}
