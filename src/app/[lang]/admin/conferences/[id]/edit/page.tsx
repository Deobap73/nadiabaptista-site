// src/app/admin/conferences/[id]/edit/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

type Props = { params: { id: string } };

export default function AdminConferencesEditPage({ params }: Props) {
  return (
    <AdminEntityForm
      heading='Edit Conference, Seminar'
      apiBase='/api/admin/conferences'
      backHref='/admin/conferences'
      mode='edit'
      id={params.id}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text', required: true },
        { name: 'dateLabel', label: 'Date label', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'content', label: 'Content', type: 'textarea' },
        { name: 'sortOrder', label: 'sortOrder', type: 'number' },
      ]}
    />
  );
}
