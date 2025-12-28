// src/app/admin/conferences/new/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

export default function AdminConferencesNewPage() {
  return (
    <AdminEntityForm
      heading='Create Conference, Seminar'
      apiBase='/api/admin/conferences'
      backHref='/admin/conferences'
      mode='create'
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
