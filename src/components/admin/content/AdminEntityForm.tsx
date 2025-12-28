// src/components/admin/content/AdminEntityForm.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

type FieldType = 'text' | 'textarea' | 'number';

type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
};

type EntityData = Record<string, unknown> & {
  id?: string;
  title?: string;
  sortOrder?: number;
  imageUrl?: string | null;
  imagePublicId?: string | null;
};

type ApiOneResponse = {
  ok: boolean;
  item?: EntityData;
  error?: string;
};

type Props = {
  heading: string;
  apiBase: string;
  backHref: string;
  mode: 'create' | 'edit';
  id?: string;
  fields: FieldDef[];
};

function toStringValue(value: unknown) {
  if (value === null || value === undefined) return '';
  return String(value);
}

function toNumberValue(value: unknown) {
  if (typeof value === 'number') return value;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

async function uploadImage(file: File) {
  const body = new FormData();
  body.append('file', file);

  const res = await fetch('/api/upload', { method: 'POST', body });
  const data = (await res.json()) as {
    ok: boolean;
    url?: string;
    publicId?: string;
    error?: string;
  };

  if (!res.ok || !data.ok || !data.url || !data.publicId) {
    return { ok: false as const, error: data.error || 'Upload failed.' };
  }

  return { ok: true as const, url: data.url, publicId: data.publicId };
}

export default function AdminEntityForm({ heading, apiBase, backHref, mode, id, fields }: Props) {
  const router = useRouter();

  const initialState = useMemo(() => {
    const state: Record<string, string> = {};
    for (const f of fields) state[f.name] = '';
    state.imageUrl = '';
    state.imagePublicId = '';
    return state;
  }, [fields]);

  const [form, setForm] = useState<Record<string, string>>(initialState);

  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'error'>('idle');
  const [uploadError, setUploadError] = useState<string>('');

  useEffect(() => {
    if (mode !== 'edit' || !id) return;

    let cancelled = false;

    async function load() {
      setStatus('loading');
      setErrorMessage('');

      try {
        const res = await fetch(`${apiBase}/${id}`, { method: 'GET' });
        const data = (await res.json()) as ApiOneResponse;

        if (!res.ok || !data.ok || !data.item) {
          setStatus('error');
          setErrorMessage(data.error || 'Failed to load item.');
          return;
        }

        if (cancelled) return;

        const next: Record<string, string> = { ...initialState };

        for (const f of fields) {
          const raw = data.item[f.name];
          next[f.name] = f.type === 'number' ? String(toNumberValue(raw)) : toStringValue(raw);
        }

        next.imageUrl = toStringValue(data.item.imageUrl);
        next.imagePublicId = toStringValue(data.item.imagePublicId);

        setForm(next);
        setStatus('idle');
      } catch {
        if (cancelled) return;
        setStatus('error');
        setErrorMessage('Failed to load item.');
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [apiBase, fields, id, initialState, mode]);

  function setValue(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    setStatus('saving');
    setErrorMessage('');

    try {
      const payload: Record<string, unknown> = {};

      for (const f of fields) {
        const raw = form[f.name] ?? '';
        payload[f.name] = f.type === 'number' ? toNumberValue(raw) : raw.trim();
      }

      payload.imageUrl = form.imageUrl?.trim() || null;
      payload.imagePublicId = form.imagePublicId?.trim() || null;

      const res = await fetch(mode === 'create' ? apiBase : `${apiBase}/${id}`, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to save.');
        return;
      }

      setStatus('idle');
      router.push(backHref);
      router.refresh();
    } catch {
      setStatus('error');
      setErrorMessage('Failed to save.');
    }
  }

  async function handlePickFile(file: File | null) {
    if (!file) return;

    setUploadStatus('uploading');
    setUploadError('');

    const uploaded = await uploadImage(file);

    if (!uploaded.ok) {
      setUploadStatus('error');
      setUploadError(uploaded.error);
      return;
    }

    setUploadStatus('idle');
    setValue('imageUrl', uploaded.url);
    setValue('imagePublicId', uploaded.publicId);
  }

  return (
    <section className='admin_post'>
      <div className='admin_post__toolbar'>
        <div className='admin_post__toolbar_actions'>
          <BackButton />
          <Link className='admin_post__back' href={backHref}>
            Back
          </Link>
        </div>

        <button
          className='admin_post__button'
          type='button'
          onClick={handleSubmit}
          disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save'}
        </button>
      </div>

      <h1 className='admin_page__title'>{heading}</h1>

      {status === 'error' ? <p className='admin_post__message'>{errorMessage}</p> : null}
      {status === 'loading' ? <p className='admin_post__message'>Loading...</p> : null}

      <div className='admin_post__grid'>
        <form
          className='admin_post__form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          {fields.map((f) => (
            <div key={f.name} className='admin_post__field'>
              <label className='admin_post__label' htmlFor={f.name}>
                {f.label}
              </label>

              {f.type === 'textarea' ? (
                <textarea
                  id={f.name}
                  className='admin_post__textarea'
                  value={form[f.name] ?? ''}
                  placeholder={f.placeholder}
                  required={Boolean(f.required)}
                  rows={8}
                  onChange={(e) => setValue(f.name, e.target.value)}
                />
              ) : (
                <input
                  id={f.name}
                  className='admin_post__input'
                  value={form[f.name] ?? ''}
                  placeholder={f.placeholder}
                  required={Boolean(f.required)}
                  inputMode={f.type === 'number' ? 'numeric' : undefined}
                  onChange={(e) => setValue(f.name, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className='admin_post__field'>
            <label className='admin_post__label' htmlFor='imageUpload'>
              Image (optional)
            </label>

            <input
              id='imageUpload'
              className='admin_post__input'
              type='file'
              accept='image/*'
              onChange={(e) => handlePickFile(e.target.files?.[0] || null)}
            />

            {uploadStatus === 'uploading' ? <p className='admin_post__hint'>Uploading...</p> : null}
            {uploadStatus === 'error' ? <p className='admin_post__hint'>{uploadError}</p> : null}

            {form.imageUrl ? (
              <p className='admin_post__hint'>Image selected.</p>
            ) : (
              <p className='admin_post__hint'>No image.</p>
            )}
          </div>

          <div className='admin_post__field'>
            <label className='admin_post__label' htmlFor='imageUrl'>
              imageUrl
            </label>
            <input
              id='imageUrl'
              className='admin_post__input'
              value={form.imageUrl ?? ''}
              placeholder='Filled automatically after upload'
              onChange={(e) => setValue('imageUrl', e.target.value)}
            />
          </div>

          <div className='admin_post__field'>
            <label className='admin_post__label' htmlFor='imagePublicId'>
              imagePublicId
            </label>
            <input
              id='imagePublicId'
              className='admin_post__input'
              value={form.imagePublicId ?? ''}
              placeholder='Filled automatically after upload'
              onChange={(e) => setValue('imagePublicId', e.target.value)}
            />
          </div>
        </form>

        <div>
          <p className='admin_post__preview_title'>Preview</p>
          <div className='admin_post__preview_card'>
            <p className='admin_post__preview_heading'>{form.title || 'Untitled'}</p>
            <p className='admin_post__preview_meta'>sortOrder: {form.sortOrder || '0'}</p>
            {form.imageUrl ? (
              <div className='admin_post__preview_image'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.imageUrl} alt='' />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
