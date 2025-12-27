// src/app/admin/blog/[id]/edit/page.tsx

import AdminPostEditor from '@/components/admin/AdminPostEditor';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className='admin_page'>
      <h1 className='admin_page__title'>Editar artigo</h1>
      <AdminPostEditor mode='edit' id={id} />
    </div>
  );
}
