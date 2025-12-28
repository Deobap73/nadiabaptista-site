// src/app/admin/academic-projects/new/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

export default function AdminAcademicProjectsNewPage() {
  return (
    <AdminEntityForm
      heading='Create Academic Project'
      apiBase='/api/admin/academic-projects'
      backHref='/admin/academic-projects'
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
