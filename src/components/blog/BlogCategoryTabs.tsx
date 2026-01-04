// src/components/blog/BlogCategoryTabs.tsx

import type { BlogCategory } from '@/types/blog';
import type { Lang } from '@/lib/i18n';
import { getBlogDict } from '@/lib/i18n';

type Props = {
  lang: Lang;
  categories: BlogCategory[];
  active: string;
  onChange: (categorySlug: string) => void;
};

export default function BlogCategoryTabs({ lang, categories, active, onChange }: Props) {
  const dict = getBlogDict(lang);

  return (
    <nav className='blog_categories' aria-label={dict.list.ariaLabel}>
      <ul className='blog_categories__list'>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type='button'
              className={`blog_categories__item ${
                active === cat.slug ? 'blog_categories__item--active' : ''
              }`}
              onClick={() => onChange(cat.slug)}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
