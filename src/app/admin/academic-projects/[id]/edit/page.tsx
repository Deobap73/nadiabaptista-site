// src/app/admin/academic-projects/[id]/edit/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

type Props = { params: { id: string } };

export default function AdminAcademicProjectsEditPage({ params }: Props) {
  return (
    <AdminEntityForm
      heading='Edit Academic Project'
      apiBase='/api/admin/academic-projects'
      backHref='/admin/academic-projects'
      mode='edit'
      id={params.id}
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
