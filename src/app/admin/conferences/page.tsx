// src/app/admin/conferences/page.tsx

import AdminEntityList from '@/components/admin/content/AdminEntityList';

export default function AdminConferencesPage() {
  return (
    <AdminEntityList
      heading='Conferences, Seminars'
      apiBase='/api/admin/conferences'
      createHref='/admin/conferences/new'
      editHrefBase='/admin/conferences'
    />
  );
}
