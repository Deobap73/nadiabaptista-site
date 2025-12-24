// src/components/layout/AdminShortcut.tsx

'use client';

import { useRouter } from 'next/navigation';

export default function AdminShortcut() {
  const router = useRouter();

  function handleClick() {
    router.push('/admin');
  }

  return (
    <button
      type='button'
      className='admin_shortcut'
      onClick={handleClick}
      aria-hidden='true'
      tabIndex={-1}
    />
  );
}
