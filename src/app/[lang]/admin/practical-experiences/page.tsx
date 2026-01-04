// src\app\[lang]\admin\practical-experiences\page.tsx

import AdminEntityList from '@/components/admin/content/AdminEntityList';

export default function AdminPracticalExperiencesPage() {
  return (
    <AdminEntityList
      heading='Practical Experience'
      apiBase='/api/admin/practical-experiences'
      createHref='/admin/practical-experiences/new'
      editHrefBase='/admin/practical-experiences'
    />
  );
}
