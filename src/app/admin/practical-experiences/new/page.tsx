// src/app/admin/practical-experiences/new/page.

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

export default function AdminPracticalExperiencesNewPage() {
  return (
    <AdminEntityForm
      heading='Create Practical Experience'
      apiBase='/api/admin/practical-experiences'
      backHref='/admin/practical-experiences'
      mode='create'
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'slug', label: 'Slug', type: 'text', required: true },
        { name: 'summary', label: 'Summary', type: 'textarea' },
        { name: 'content', label: 'Content', type: 'textarea' },
        { name: 'sortOrder', label: 'sortOrder', type: 'number' },
      ]}
    />
  );
}
