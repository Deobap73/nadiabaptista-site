// src/app/admin/diplomas/new/page.tsx

import AdminEntityForm from '@/components/admin/content/AdminEntityForm';

export default function AdminDiplomasNewPage() {
  return (
    <AdminEntityForm
      heading='Create Diploma'
      apiBase='/api/admin/diplomas'
      backHref='/admin/diplomas'
      mode='create'
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
