// src\app\[lang]\admin\academic-projects\page.tsx

import AdminEntityList from '@/components/admin/content/AdminEntityList';

export default function AdminAcademicProjectsPage() {
  return (
    <AdminEntityList
      heading='Academic Projects'
      apiBase='/api/admin/academic-projects'
      createHref='/admin/academic-projects/new'
      editHrefBase='/admin/academic-projects'
    />
  );
}
