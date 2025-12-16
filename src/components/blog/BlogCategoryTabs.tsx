// src\components\blog\BlogCategoryTabs.tsx

type BlogCategoryTabsProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function BlogCategoryTabs({ categories, active, onChange }: BlogCategoryTabsProps) {
  return (
    <nav className='blog_categories' aria-label='Categorias do blog'>
      <ul className='blog_categories__list'>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              type='button'
              className={`blog_categories__item ${
                active === cat ? 'blog_categories__item--active' : ''
              }`}
              onClick={() => onChange(cat)}>
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
