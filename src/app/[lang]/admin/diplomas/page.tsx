// src\app\[lang]\admin\diplomas\page.tsx

import AdminEntityList from '@/components/admin/content/AdminEntityList';

export default function AdminDiplomasPage() {
  return (
    <AdminEntityList
      heading='Diplomas'
      apiBase='/api/admin/diplomas'
      createHref='/admin/diplomas/new'
      editHrefBase='/admin/diplomas'
    />
  );
}
