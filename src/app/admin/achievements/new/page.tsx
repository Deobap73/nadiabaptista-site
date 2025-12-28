// src/app/admin/achievements/new/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

export default function AdminAchievementsNewPage() {
  return (
    <AdminEntityForm
      heading='Create Achievement'
      apiBase='/api/admin/achievements'
      backHref='/admin/achievements'
      mode='create'
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'dateLabel', label: 'Date label', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'sortOrder', label: 'sortOrder', type: 'number' },
      ]}
    />
  );
}
