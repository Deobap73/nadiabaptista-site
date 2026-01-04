// src/app/admin/blog/new/page.tsx

import AdminPostEditor from '@/components/admin/AdminPostEditor';

export default function AdminBlogNewPage() {
  return (
    <div className='admin_page'>
      <h1 className='admin_page__title'>Novo artigo</h1>
      <AdminPostEditor mode='create' />
    </div>
  );
}
