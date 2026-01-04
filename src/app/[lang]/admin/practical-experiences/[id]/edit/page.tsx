// src/app/admin/practical-experiences/[id]/edit/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

type Props = { params: { id: string } };

export default function AdminPracticalExperiencesEditPage({ params }: Props) {
  return (
    <AdminEntityForm
      heading='Edit Practical Experience'
      apiBase='/api/admin/practical-experiences'
      backHref='/admin/practical-experiences'
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
