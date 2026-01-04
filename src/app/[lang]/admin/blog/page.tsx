// src\app\[lang]\admin\blog\page.tsx

import AdminBlogManager from '@/components/admin/AdminBlogManager';

export default function AdminBlogPage() {
  return (
    <div className='admin_page'>
      <h1 className='admin_page__title'>Blog</h1>
      <AdminBlogManager />
    </div>
  );
}
