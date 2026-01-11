// src/components/admin/AdminPostEditor.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import type { BlogCategory, BlogLang, BlogPostAdmin, PostStatus, RichTextDoc } from '@/types/blog';

import FileUpload from '@/components/form/FileUpload';
import RichTextEditor from '@/components/editor/RichTextEditor';
import RichTextRenderer from '@/components/editor/RichTextRenderer';

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

type TranslationState = {
  title: string;
  excerpt: string;
  content: RichTextDoc;
};

type FormState = {
  slug: string;
  status: PostStatus;
  categoryId: string;
  coverImageUrl: string;
  coverImagePublicId: string;

  translations: Record<BlogLang, TranslationState>;
};

const EMPTY_DOC: RichTextDoc = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

const INITIAL_FORM: FormState = {
  slug: '',
  status: 'DRAFT',
  categoryId: '',
  coverImageUrl: '',
  coverImagePublicId: '',
  translations: {
    pt: { title: '', excerpt: '', content: EMPTY_DOC },
    en: { title: '', excerpt: '', content: EMPTY_DOC },
  },
};

function normalizeSlug(value: string): string {
  const hyphenChar = String.fromCharCode(45);
  const hyphenPlus = new RegExp(`${hyphenChar}+`, 'g');
  const trimHyphens = new RegExp(`^${hyphenChar}+|${hyphenChar}+$`, 'g');
  const spaces = /\s+/g;
  const nonAllowed = /[^a-z0-9\s]/g;

  const cleaned = (value || '')
    .trim()
    .toLowerCase()
    .replace(spaces, ' ')
    .replace(nonAllowed, '')
    .replace(spaces, ' ')
    .trim()
    .replace(spaces, hyphenChar)
    .replace(hyphenPlus, hyphenChar)
    .replace(trimHyphens, '');

  return cleaned;
}

function safeStatus(value: string): PostStatus {
  return value === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
}

function isDocLike(value: unknown): value is RichTextDoc {
  return (
    Boolean(value) && typeof value === 'object' && (value as { type?: unknown }).type === 'doc'
  );
}

function docHasAnyText(doc: RichTextDoc | null): boolean {
  if (!doc) return false;

  try {
    const raw = JSON.stringify(doc);
    if (!raw.includes('"text"')) return false;

    const matches = raw.match(/"text"\s*:\s*"(.*?)"/g) || [];
    const joined = matches
      .join(' ')
      .replace(/"text"\s*:\s*"/g, '')
      .replace(/"/g, '')
      .trim();

    return joined.length > 0;
  } catch {
    return false;
  }
}

function pickTranslation(post: BlogPostAdmin, lang: BlogLang): TranslationState {
  const t = post.translations?.find((x) => x.lang === lang) || null;

  return {
    title: t?.title || '',
    excerpt: t?.excerpt || '',
    content: t?.content && isDocLike(t.content) ? t.content : EMPTY_DOC,
  };
}

export default function AdminPostEditor(props: Props) {
  const isEdit = props.mode === 'edit';
  const postId = isEdit ? props.id : '';

  const [activeLang, setActiveLang] = useState<BlogLang>('pt');

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [ui, setUi] = useState<'loading' | 'ready' | 'saving' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

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
            slug: target.slug,
            status: target.status,
            categoryId: target.category ? target.category.id : '',
            coverImageUrl: target.coverImageUrl || '',
            coverImagePublicId: target.coverImagePublicId || '',
            translations: {
              pt: pickTranslation(target, 'pt'),
              en: pickTranslation(target, 'en'),
            },
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
          setMessage('Erro de rede ao carregar os dados.');
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

  const activeTranslation = form.translations[activeLang];

  function updateShared<K extends keyof Omit<FormState, 'translations'>>(
    key: K,
    value: FormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateTranslation<K extends keyof TranslationState>(
    lang: BlogLang,
    key: K,
    value: TranslationState[K]
  ) {
    setForm((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [key]: value,
        },
      },
    }));
  }

  function autoSlugFromPtTitleIfEmpty(nextTitle: string) {
    if (isEdit) return;
    if (form.slug.trim()) return;
    updateShared('slug', normalizeSlug(nextTitle));
  }

  async function handleSave() {
    setUi('saving');
    setMessage('');

    try {
      const pt = form.translations.pt;
      const en = form.translations.en;

      const ptTitle = pt.title.trim();
      const ptDoc = pt.content;

      if (!ptTitle || !form.slug.trim()) {
        setUi('ready');
        setMessage('Preenche o título PT e o slug.');
        return;
      }

      if (!ptDoc || !docHasAnyText(ptDoc)) {
        setUi('ready');
        setMessage('O conteúdo PT precisa de ter texto.');
        return;
      }

      const enTitle = en.title.trim();
      const enHasContent = docHasAnyText(en.content);

      const payload = {
        slug: form.slug.trim(),
        status: form.status,
        categoryId: form.categoryId || null,
        coverImageUrl: form.coverImageUrl || null,
        coverImagePublicId: form.coverImagePublicId || null,
        translations: {
          pt: {
            title: ptTitle,
            excerpt: pt.excerpt.trim() || null,
            content: ptDoc,
          },
          en:
            enTitle && enHasContent
              ? {
                  title: enTitle,
                  excerpt: en.excerpt.trim() || null,
                  content: en.content,
                }
              : undefined,
        },
      };

      const res = await fetch(isEdit ? `/api/admin/posts/${postId}` : '/api/admin/posts', {
        method: isEdit ? 'PUT' : 'POST',
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
      setMessage(isEdit ? 'Artigo atualizado com sucesso.' : 'Artigo criado com sucesso.');
    } catch {
      setUi('ready');
      setMessage('Erro de rede ao guardar.');
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
        setMessage('Erro ao apagar o artigo.');
        return;
      }

      setUi('ready');
      setMessage('Artigo apagado.');
    } catch {
      setUi('ready');
      setMessage('Erro de rede ao apagar.');
    }
  }

  if (ui === 'loading') {
    return <p className='admin_post__hint'>A carregar…</p>;
  }

  if (ui === 'error') {
    return (
      <div className='admin_post'>
        <p className='admin_post__hint'>{message}</p>
        <Link className='admin_post__back' href='/admin/blog'>
          Voltar à lista de artigos
        </Link>
      </div>
    );
  }

  return (
    <div className='admin_post'>
      <div className='admin_post__toolbar'>
        <Link className='admin_post__back' href='/admin/blog'>
          ← Regressar à gestão de artigos
        </Link>

        <div className='admin_post__toolbar_actions'>
          {isEdit ? (
            <button
              type='button'
              className='admin_post__danger'
              onClick={handleDelete}
              disabled={ui === 'saving'}>
              Apagar artigo
            </button>
          ) : null}

          <button
            type='button'
            className='admin_post__button'
            onClick={handleSave}
            disabled={ui === 'saving'}>
            {ui === 'saving' ? 'A guardar…' : 'Guardar artigo (Salvar todas as alterações feitas)'}
          </button>
        </div>
      </div>

      {message ? <p className='admin_post__message'>{message}</p> : null}

      <div className='admin_post__panel'>
        <div className='admin_post__tabs'>
          <button
            type='button'
            className={`admin_post__tab ${activeLang === 'pt' ? 'admin_post__tab_active' : ''}`}
            onClick={() => setActiveLang('pt')}
            disabled={ui === 'saving'}>
            PT
          </button>

          <button
            type='button'
            className={`admin_post__tab ${activeLang === 'en' ? 'admin_post__tab_active' : ''}`}
            onClick={() => setActiveLang('en')}
            disabled={ui === 'saving'}>
            EN
          </button>
        </div>

        {activeLang === 'en' ? (
          <p className='admin_post__lang_hint'>
            O PT é obrigatório. O EN pode ser criado mais tarde, no mesmo artigo.
          </p>
        ) : (
          <p className='admin_post__lang_hint'>PT é o idioma principal e é obrigatório.</p>
        )}

        <div className='admin_post__grid'>
          <div className='admin_post__form'>
            <label className='admin_post__field'>
              <span className='admin_post__label'>Título</span>
              <input
                className='admin_post__input'
                value={activeTranslation.title}
                onChange={(e) => {
                  updateTranslation(activeLang, 'title', e.target.value);
                  if (activeLang === 'pt') autoSlugFromPtTitleIfEmpty(e.target.value);
                }}
              />
            </label>

            <label className='admin_post__field'>
              <span className='admin_post__label'>Slug</span>
              <input
                className='admin_post__input'
                value={form.slug}
                onChange={(e) => updateShared('slug', normalizeSlug(e.target.value))}
              />
            </label>

            <label className='admin_post__field'>
              <span className='admin_post__label'>Descrição curta</span>
              <textarea
                className='admin_post__textarea'
                rows={3}
                value={activeTranslation.excerpt}
                onChange={(e) => updateTranslation(activeLang, 'excerpt', e.target.value)}
              />
            </label>

            <label className='admin_post__field'>
              <span className='admin_post__label'>Categoria</span>
              <select
                className='admin_post__input'
                value={form.categoryId}
                onChange={(e) => updateShared('categoryId', e.target.value)}>
                <option value=''></option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className='admin_post__field'>
              <span className='admin_post__label'>Estado</span>
              <select
                className='admin_post__input'
                value={form.status}
                onChange={(e) => updateShared('status', safeStatus(e.target.value))}>
                <option value='DRAFT'>Rascunho</option>
                <option value='PUBLISHED'>Publicado</option>
              </select>

              <p className='admin_post__select_hint'>
                {form.status === 'PUBLISHED'
                  ? 'Artigo visível publicamente no blog.'
                  : 'Artigo ainda não visível para leitores.'}
              </p>
            </label>

            <FileUpload
              label='Imagem de capa'
              context='blog_article'
              sequenceKind='post_cover'
              valueUrl={form.coverImageUrl}
              disabled={ui === 'saving'}
              onUploaded={({ url, publicId }) => {
                updateShared('coverImageUrl', url);
                updateShared('coverImagePublicId', publicId);
              }}
              onRemove={() => {
                updateShared('coverImageUrl', '');
                updateShared('coverImagePublicId', '');
              }}
            />

            <div className='admin_post__field'>
              <span className='admin_post__label'>Conteúdo</span>
              <RichTextEditor
                value={activeTranslation.content || EMPTY_DOC}
                disabled={ui === 'saving'}
                onChange={(next) => updateTranslation(activeLang, 'content', next)}
              />
            </div>
          </div>

          <div className='admin_post__preview'>
            <p className='admin_post__preview_title'>Pré visualização</p>

            <div className='admin_post__preview_card'>
              <p className='admin_post__preview_heading'>
                {activeTranslation.title || '(Título ainda não definido)'}
              </p>

              <p className='admin_post__preview_meta'>
                {form.status === 'DRAFT' ? 'Rascunho' : 'Publicado'}
                {selectedCategory ? `, ${selectedCategory.name}` : ''}
                {activeLang === 'en' ? ', EN' : ', PT'}
              </p>

              <p className='admin_post__preview_excerpt'>
                {activeTranslation.excerpt || '(Descrição curta não definida)'}
              </p>

              <div className='admin_post__preview_body'>
                <RichTextRenderer content={activeTranslation.content || EMPTY_DOC} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
