// src/app/admin/achievements/page.tsx

import AdminEntityList from '@/components/admin/content/AdminEntityList';

export default function AdminAchievementsPage() {
  return (
    <AdminEntityList
      heading='Achievements'
      apiBase='/api/admin/achievements'
      createHref='/admin/achievements/new'
      editHrefBase='/admin/achievements'
    />
  );
}
