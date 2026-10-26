import React from 'react';
import clsx from 'clsx';
import { categories } from '../../data/products';

export function CategoryTabs({ activeCategory = 'all', onSelectCategory }) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 mb-10"
      role="tablist"
      aria-label="Filter products by category"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={clsx(
              'px-4 sm:px-5 py-2 text-sm sm:text-base font-body font-medium rounded-[3px] transition-all duration-200 border',
              isActive
                ? 'bg-forest text-paper border-forest shadow-sm'
                : 'bg-paper text-ink/80 border-gold/40 hover:border-gold hover:text-forest'
            )}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
