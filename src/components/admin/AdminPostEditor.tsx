// src/components/admin/AdminPostEditor.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { BlogCategory, BlogPostAdmin, PostStatus, RichTextDoc } from '@/types/blog';
import FileUpload from '@/components/form/FileUpload';
import RichTextEditor from '@/components/editor/RichTextEditor';
import RichTextRenderer from '@/components/editor/RichTextRenderer';

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
  content: RichTextDoc | null;
  status: PostStatus;
  categoryId: string;
  coverImageUrl: string;
  coverImagePublicId: string;
};

const EMPTY_DOC: RichTextDoc = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

const INITIAL_FORM: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: null,
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

function isDocLike(value: unknown): value is RichTextDoc {
  if (!value) return false;
  if (typeof value !== 'object') return false;

  try {
    const raw = JSON.stringify(value);
    return raw.includes('"type"') && raw.includes('"doc"');
  } catch {
    return false;
  }
}

function docHasAnyText(doc: RichTextDoc | null): boolean {
  if (!doc) return false;

  try {
    const raw = JSON.stringify(doc);
    if (!raw.includes('"text"')) return false;

    const textMatches = raw.match(/"text"\s*:\s*"(.*?)"/g) || [];
    const joined = textMatches
      .join(' ')
      .replace(/"text"\s*:\s*"/g, '')
      .replace(/"/g, '')
      .trim();

    return joined.length > 0;
  } catch {
    return false;
  }
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
          if (!cancelled) {
            setForm((prev) => ({ ...prev, content: prev.content || EMPTY_DOC }));
            setUi('ready');
          }
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
            content: isDocLike(target.content) ? target.content : EMPTY_DOC,
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
          setMessage(
            'Não foi possível carregar o artigo. (Explicação: Ocorreu um erro ao tentar carregar o artigo para edição)'
          );
        }
      } catch {
        if (!cancelled) {
          setUi('error');
          setMessage(
            'Erro ao carregar. (Explicação: Ocorreu uma falha de rede ou servidor ao tentar carregar os dados)'
          );
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

      if (!payload.title || !payload.slug) {
        setUi('ready');
        setMessage(
          'Preenche o título e o slug. (Explicação: Ambos os campos são obrigatórios para criar ou editar um artigo)'
        );
        return;
      }

      if (!payload.content || !docHasAnyText(payload.content)) {
        setUi('ready');
        setMessage(
          'Escreve conteúdo no editor. (Explicação: O artigo precisa de ter conteúdo textual para ser guardado)'
        );
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
          setMessage(
            json.error ||
              'Erro ao criar. (Explicação: O servidor não conseguiu processar o pedido de criação)'
          );
          return;
        }

        setUi('ready');
        setMessage(
          'Artigo criado com sucesso. (Explicação: O novo artigo foi guardado na base de dados)'
        );
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
        setMessage(
          json.error ||
            'Erro ao guardar. (Explicação: O servidor não conseguiu processar a atualização do artigo)'
        );
        return;
      }

      setUi('ready');
      setMessage(
        'Artigo guardado com sucesso. (Explicação: As alterações foram salvas na base de dados)'
      );
    } catch {
      setUi('ready');
      setMessage(
        'Erro ao guardar. (Explicação: Ocorreu uma falha de rede ou servidor ao tentar guardar)'
      );
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
        setMessage(
          'Erro ao apagar. (Explicação: O servidor não conseguiu processar o pedido de eliminação)'
        );
        return;
      }

      setUi('ready');
      setMessage(
        'Artigo apagado. (Explicação: O artigo foi removido permanentemente da base de dados)'
      );
    } catch {
      setUi('ready');
      setMessage(
        'Erro ao apagar. (Explicação: Ocorreu uma falha de rede ou servidor ao tentar eliminar o artigo)'
      );
    }
  }

  if (ui === 'loading') {
    return (
      <p className='admin_post__hint'>
        A carregar... (Explicação: A carregar dados do artigo e categorias)
      </p>
    );
  }

  if (ui === 'error') {
    return (
      <div className='admin_post'>
        <p className='admin_post__hint'>
          {message || 'Erro. (Explicação: Ocorreu um erro desconhecido)'}
        </p>
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
          ← Voltar à lista de artigos (Explicação: Regressar à página de gestão de artigos)
        </Link>

        <div className='admin_post__toolbar_actions'>
          {isEdit ? (
            <button
              type='button'
              className='admin_post__danger'
              onClick={handleDelete}
              disabled={ui === 'saving'}>
              Apagar artigo (Explicação: Eliminar permanentemente este artigo)
            </button>
          ) : null}

          <button
            type='button'
            className='admin_post__button'
            onClick={handleSave}
            disabled={ui === 'saving'}>
            {ui === 'saving'
              ? 'A guardar... (Explicação: A processar e guardar as alterações)'
              : 'Guardar artigo (Explicação: Salvar todas as alterações feitas)'}
          </button>
        </div>
      </div>

      {message ? <p className='admin_post__message'>{message}</p> : null}

      <div className='admin_post__grid'>
        <div className='admin_post__form'>
          <label className='admin_post__field'>
            <span className='admin_post__label'>
              Título (Explicação: Título principal do artigo, visível aos leitores)
            </span>
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
            <span className='admin_post__label'>
              Slug (Explicação: Identificador único para URL, gerado automaticamente a partir do
              título)
            </span>
            <input
              className='admin_post__input'
              value={form.slug}
              onChange={(e) => updateField('slug', normalizeSlug(e.target.value))}
            />
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>
              Excerto (Explicação: Breve descrição do artigo, mostrada em listagens)
            </span>
            <textarea
              className='admin_post__textarea'
              rows={3}
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
            />
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>
              Categoria (Explicação: Grupo temático ao qual pertence o artigo)
            </span>
            <select
              className='admin_post__input'
              value={form.categoryId}
              onChange={(e) => updateField('categoryId', e.target.value)}>
              <option value=''>
                Sem categoria (Explicação: Artigo não associado a nenhuma categoria)
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className='admin_post__field'>
            <span className='admin_post__label'>
              Estado (Explicação: Visibilidade do artigo para os leitores)
            </span>
            <select
              className='admin_post__input'
              value={form.status}
              onChange={(e) => updateField('status', safeStatus(e.target.value))}>
              <option value='DRAFT'>
                Rascunho (Explicação: Artigo visível apenas na área de administração)
              </option>
              <option value='PUBLISHED'>
                Publicado (Explicação: Artigo visível publicamente no blog)
              </option>
            </select>
          </label>

          <FileUpload
            label='Imagem de capa (Explicação: Imagem principal que representa o artigo)'
            context='blog_article'
            valueUrl={form.coverImageUrl || ''}
            disabled={ui === 'saving'}
            hint='Vai para a pasta blog_article no Cloudinary. (Explicação: As imagens são armazenadas no serviço Cloudinary)'
            onUploaded={({ url, publicId }) => {
              updateField('coverImageUrl', url);
              updateField('coverImagePublicId', publicId);
            }}
            onRemove={() => {
              updateField('coverImageUrl', '');
              updateField('coverImagePublicId', '');
            }}
          />

          <div className='admin_post__field'>
            <span className='admin_post__label'>
              Conteúdo (Explicação: Corpo principal do artigo com formatação rica)
            </span>

            <RichTextEditor
              value={form.content || EMPTY_DOC}
              disabled={ui === 'saving'}
              onChange={(next) => updateField('content', next)}
            />
          </div>
        </div>

        <div className='admin_post__preview'>
          <p className='admin_post__preview_title'>
            Pré-visualização (Explicação: Como o artigo aparecerá aos leitores)
          </p>

          <div className='admin_post__preview_card'>
            <p className='admin_post__preview_heading'>
              {form.title || 'Sem título (Explicação: Título ainda não definido)'}
            </p>

            <p className='admin_post__preview_meta'>
              {form.status === 'DRAFT' ? 'Rascunho' : 'Publicado'}
              {selectedCategory ? `, ${selectedCategory.name}` : ''}
              (Explicação: Estado e categoria do artigo)
            </p>

            <p className='admin_post__preview_excerpt'>
              {form.excerpt || 'Sem excerto (Explicação: Descrição curta não definida)'}
            </p>

            <div className='admin_post__preview_body'>
              <RichTextRenderer content={form.content || EMPTY_DOC} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
