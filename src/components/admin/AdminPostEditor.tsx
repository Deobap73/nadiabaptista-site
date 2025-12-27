// src/components/admin/AdminPostEditor.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogCategory, BlogPostAdmin, PostStatus } from '@/types/blog';
import FileUpload from '@/components/form/FileUpload';

type Mode = 'create' | 'edit';

type Props = { mode: 'create' } | { mode: 'edit'; id: string };

type ApiCategoriesResponse = {
  ok: boolean;
  categories: BlogCategory[];
};

type ApiAdminPostsResponse = {
  ok: boolean;
  posts?: BlogPostAdmin[];
};

type ApiPostResponse = {
  ok: boolean;
  post?: BlogPostAdmin;
  error?: string;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  categoryId: string;
  coverImageUrl: string;
  coverImagePublicId: string;
};

const INITIAL_FORM: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  status: 'DRAFT',
  categoryId: '',
  coverImageUrl: '',
  coverImagePublicId: '',
};

function normalizeSlug(value: string): string {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-+/g, '-')
    .replace(/^\-+|\-+$/g, '');
}

function safeStatus(value: string): PostStatus {
  return value === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
}

export default function AdminPostEditor(props: Props) {
  const mode: Mode = props.mode;

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [ui, setUi] = useState<'loading' | 'ready' | 'saving' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  const isEdit = props.mode === 'edit';
  const postId = props.mode === 'edit' ? props.id : '';

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setUi('loading');
      setMessage('');

      try {
        const catsRes = await fetch('/api/categories', { cache: 'no-store' });
        const catsJson = (await catsRes.json()) as ApiCategoriesResponse;

        if (!cancelled && catsJson.ok) setCategories(catsJson.categories);

        if (!isEdit) {
          if (!cancelled) setUi('ready');
          return;
        }

        const postsRes = await fetch('/api/admin/posts', { cache: 'no-store' });
        const postsJson = (await postsRes.json()) as ApiAdminPostsResponse;

        const target =
          postsJson.ok && postsJson.posts ? postsJson.posts.find((p) => p.id === postId) : null;

        if (!cancelled && target) {
          setForm({
            title: target.title,
            slug: target.slug,
            excerpt: target.excerpt || '',
            content: target.content,
            status: target.status,
            categoryId: target.category ? target.category.id : '',
            coverImageUrl: target.coverImageUrl || '',
            coverImagePublicId: '',
          });
          setUi('ready');
          return;
        }

        if (!cancelled) {
          setUi('error');
          setMessage('Não foi possível carregar o artigo.');
        }
      } catch {
        if (!cancelled) {
          setUi('error');
          setMessage('Erro ao carregar.');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [isEdit, postId]);

  const selectedCategory = useMemo(() => {
    return categories.find((c) => c.id === form.categoryId) || null;
  }, [categories, form.categoryId]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function autoSlugFromTitleIfEmpty(nextTitle: string) {
    if (isEdit) return;
    if (form.slug.trim()) return;
    updateField('slug', normalizeSlug(nextTitle));
  }

  async function handleSave() {
    setUi('saving');
    setMessage('');

    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim() || null,
        content: form.content,
        status: form.status,
        categoryId: form.categoryId || null,
        coverImageUrl: form.coverImageUrl || null,
        coverImagePublicId: form.coverImagePublicId || null,
      };

      if (!payload.title || !payload.slug || !payload.content.trim()) {
        setUi('ready');
        setMessage('Preenche title, slug e content.');
        return;
      }

      if (mode === 'create') {
        const res = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const json = (await res.json()) as ApiPostResponse;

        if (!res.ok || !json.ok) {
          setUi('ready');
          setMessage(json.error || 'Erro ao criar.');
          return;
        }

        setUi('ready');
        setMessage('Criado com sucesso.');
        return;
      }

      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as ApiPostResponse;

      if (!res.ok || !json.ok) {
        setUi('ready');
        setMessage(json.error || 'Erro ao guardar.');
        return;
      }

      setUi('ready');
      setMessage('Guardado com sucesso.');
    } catch {
      setUi('ready');
      setMessage('Erro ao guardar.');
    }
  }

  async function handleDelete() {
    if (!isEdit) return;

    setUi('saving');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
      const json = (await res.json()) as { ok: boolean };

      if (!res.ok || !json.ok) {
        setUi('ready');
        setMessage('Erro ao apagar.');
        return;
      }

      setUi('ready');
      setMessage('Apagado.');
    } catch {
      setUi('ready');
      setMessage('Erro ao apagar.');
    }
  }

  if (ui === 'loading') {
    return <p className='admin_post__hint'>A carregar</p>;
  }

  if (ui === 'error') {
    return (
      <div className='admin_post'>
        <p className='admin_post__hint'>{message || 'Erro.'}</p>
        <Link className='admin_post__back' href='/admin/blog'>
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className='admin_post'>
      <div className='admin_post__toolbar'>
        <Link className='admin_post__back' href='/admin/blog'>
          Voltar
        </Link>

        <div className='admin_post__toolbar_actions'>
          {isEdit ? (
            <button
              type='button'
              className='admin_post__danger'
              onClick={handleDelete}
              disabled={ui === 'saving'}>
              Apagar
            </button>
          ) : null}

          <button
            type='button'
            className='admin_post__button'
            onClick={handleSave}
            disabled={ui === 'saving'}>
            {ui === 'saving' ? 'A guardar' : 'Guardar'}
          </button>
        </div>
      </div>

      {message ? <p className='admin_post__message'>{message}</p> : null}

      <div className='admin_post__grid'>
        <div className='admin_post__form'>
          <label className='admin_post__field'>
            <span className='admin_post__label'>Title</span>
            <input
              className='admin_post__input'
              value={form.title}
              onChange={(e) => {
                updateField('title', e.target.value);
                autoSlugFromTitleIfEmpty(e.target.value);
              }}
            />
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>Slug</span>
            <input
              className='admin_post__input'
              value={form.slug}
              onChange={(e) => updateField('slug', normalizeSlug(e.target.value))}
            />
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>Excerpt</span>
            <textarea
              className='admin_post__textarea'
              rows={3}
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
            />
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>Category</span>
            <select
              className='admin_post__input'
              value={form.categoryId}
              onChange={(e) => updateField('categoryId', e.target.value)}>
              <option value=''>Sem categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>Status</span>
            <select
              className='admin_post__input'
              value={form.status}
              onChange={(e) => updateField('status', safeStatus(e.target.value))}>
              <option value='DRAFT'>Draft</option>
              <option value='PUBLISHED'>Published</option>
            </select>
          </label>

          <FileUpload
            label='Cover image'
            context='blog_article'
            valueUrl={form.coverImageUrl || ''}
            disabled={ui === 'saving'}
            hint='Vai para a pasta blog article no Cloudinary.'
            onUploaded={({ url, publicId }) => {
              updateField('coverImageUrl', url);
              updateField('coverImagePublicId', publicId);
            }}
            onRemove={() => {
              updateField('coverImageUrl', '');
              updateField('coverImagePublicId', '');
            }}
          />

          <label className='admin_post__field'>
            <span className='admin_post__label'>Content</span>
            <textarea
              className='admin_post__textarea'
              rows={14}
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
            />
          </label>
        </div>

        <div className='admin_post__preview'>
          <p className='admin_post__preview_title'>Preview</p>

          <div className='admin_post__preview_card'>
            <p className='admin_post__preview_heading'>{form.title || 'Sem title'}</p>

            <p className='admin_post__preview_meta'>
              {form.status}
              {selectedCategory ? `, ${selectedCategory.name}` : ''}
            </p>

            <p className='admin_post__preview_excerpt'>{form.excerpt || 'Sem excerpt'}</p>

            <div className='admin_post__preview_body'>
              {form.content
                .trim()
                .split(/\n\s*\n/g)
                .slice(0, 4)
                .map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
