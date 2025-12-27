// src/components/blog/BlogCategoryTabs.tsx

import type { BlogCategory } from '@/types/blog';

type Props = {
  categories: BlogCategory[];
  active: string;
  onChange: (categorySlug: string) => void;
};

export default function BlogCategoryTabs({ categories, active, onChange }: Props) {
  return (
    <nav className='blog_categories' aria-label='Categorias do blog'>
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
