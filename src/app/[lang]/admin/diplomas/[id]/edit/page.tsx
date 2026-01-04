// src/app/admin/diplomas/[id]/edit/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

type Props = { params: { id: string } };

export default function AdminDiplomasEditPage({ params }: Props) {
  return (
    <AdminEntityForm
      heading='Edit Diploma'
      apiBase='/api/admin/diplomas'
      backHref='/admin/diplomas'
      mode='edit'
      id={params.id}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'issuer', label: 'Issuer', type: 'text' },
        { name: 'dateLabel', label: 'Date label', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'sortOrder', label: 'sortOrder', type: 'number' },
      ]}
    />
  );
}
