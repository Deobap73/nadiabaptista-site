// src/components/blog/BlogReactions.tsx

'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Lang } from '@/lib/i18n';

type ApiPayload = {
  ok: boolean;
  emojis: string[];
  counts: Record<string, number>;
  selected: string[];
};

type Props = {
  slug: string;
  lang: Lang;
};

function safeNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

export default function BlogReactions({ slug, lang }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [emojis, setEmojis] = useState<string[]>(['👍', '❤️', '👏', '🤔', '😮']);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [isBusy, setIsBusy] = useState(false);

  const title = useMemo(() => (lang === 'en' ? 'Reactions' : 'Reações'), [lang]);

  async function load() {
    try {
      const res = await fetch(`/api/post/${encodeURIComponent(slug)}/reactions`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      const data = (await res.json()) as ApiPayload;

      if (data && data.ok) {
        setEmojis(Array.isArray(data.emojis) ? data.emojis : emojis);
        setCounts(typeof data.counts === 'object' && data.counts ? data.counts : {});
        setSelected(Array.isArray(data.selected) ? data.selected : []);
      }
    } catch {
      // keep defaults
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleReaction(emoji: string) {
    if (isBusy) return;

    setIsBusy(true);

    try {
      const res = await fetch(`/api/post/${encodeURIComponent(slug)}/reactions`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji }),
      });

      const data = (await res.json()) as ApiPayload;

      if (data && data.ok) {
        setCounts(typeof data.counts === 'object' && data.counts ? data.counts : {});
        setSelected(Array.isArray(data.selected) ? data.selected : []);
        setEmojis(Array.isArray(data.emojis) ? data.emojis : emojis);
      }
    } catch {
      // ignore
    } finally {
      setIsBusy(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <section className='blog_reactions' aria-label={title}>
      <div className='blog_reactions__header'>
        <h2 className='blog_reactions__title'>{title}</h2>
      </div>

      <div className='blog_reactions__list' aria-busy={isLoading || isBusy}>
        {emojis.map((emoji) => {
          const isActive = selected.includes(emoji);
          const count = safeNumber(counts[emoji]);

          return (
            <button
              key={emoji}
              type='button'
              className={`blog_reactions__item${isActive ? ' blog_reactions__item--active' : ''}`}
              onClick={() => void toggleReaction(emoji)}
              disabled={isBusy}
              aria-pressed={isActive}>
              <span className='blog_reactions__emoji' aria-hidden='true'>
                {emoji}
              </span>
              <span className='blog_reactions__count'>{count}</span>
            </button>
          );
        })}
      </div>

      <p className='blog_reactions__hint'>
        {lang === 'en'
          ? 'Tap an emoji to react. Tap again to remove.'
          : 'Clica num emoji para reagir. Clica novamente para remover.'}
      </p>
    </section>
  );
}
