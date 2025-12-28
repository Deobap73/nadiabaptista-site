// src/components/admin/content/AdminEntityList.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type ListItem = {
  id: string;
  title: string;
  sortOrder: number;
  updatedAt?: string;
};

type ApiListResponse = {
  ok: boolean;
  items?: ListItem[];
  error?: string;
};

type Props = {
  heading: string;
  apiBase: string;
  createHref: string;
  editHrefBase: string;
};

export default function AdminEntityList({ heading, apiBase, createHref, editHrefBase }: Props) {
  const [items, setItems] = useState<ListItem[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [items]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setErrorMessage('');

      try {
        const res = await fetch(apiBase, { method: 'GET' });
        const data = (await res.json()) as ApiListResponse;

        if (!res.ok || !data.ok || !data.items) {
          setStatus('error');
          setErrorMessage(data.error || 'Failed to load items.');
          return;
        }

        if (cancelled) return;
        setItems(data.items);
        setStatus('idle');
      } catch {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage('Failed to load items.');
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Delete this item?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        window.alert(data.error || 'Failed to delete.');
        return;
      }

      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch {
      window.alert('Failed to delete.');
    }
  }

  return (
    <section className='admin_blog'>
      <div className='admin_page'>
        <h1 className='admin_page__title'>{heading}</h1>
      </div>

      <div className='admin_blog__toolbar'>
        <Link className='admin_blog__button' href={createHref}>
          Create
        </Link>
      </div>

      {status === 'error' ? <p className='admin_blog__hint'>{errorMessage}</p> : null}

      {status === 'loading' ? <p className='admin_blog__hint'>Loading...</p> : null}

      {status === 'idle' && sorted.length === 0 ? (
        <p className='admin_blog__hint'>No items yet.</p>
      ) : null}

      {sorted.length > 0 ? (
        <div className='admin_blog__list'>
          {sorted.map((item) => (
            <div key={item.id} className='admin_blog__row'>
              <div>
                <p className='admin_blog__row_title'>{item.title}</p>
                <p className='admin_blog__row_meta'>sortOrder: {item.sortOrder}</p>
              </div>

              <div className='admin_blog__row_actions'>
                <Link className='admin_blog__link' href={`${editHrefBase}/${item.id}/edit`}>
                  Edit
                </Link>

                <button
                  className='admin_post__danger'
                  type='button'
                  onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
