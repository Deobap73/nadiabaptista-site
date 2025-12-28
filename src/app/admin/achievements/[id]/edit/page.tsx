// src/app/admin/achievements/[id]/edit/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

type Props = { params: { id: string } };

export default function AdminAchievementsEditPage({ params }: Props) {
  return (
    <AdminEntityForm
      heading='Edit Achievement'
      apiBase='/api/admin/achievements'
      backHref='/admin/achievements'
      mode='edit'
      id={params.id}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'dateLabel', label: 'Date label', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'sortOrder', label: 'sortOrder', type: 'number' },
      ]}
    />
  );
}
