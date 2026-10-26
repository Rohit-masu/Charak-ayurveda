import React from 'react';
import clsx from 'clsx';

export function PackSwitcher({ packs = [], selectedIndex = 0, onSelect }) {
  if (!packs || packs.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2 my-4" role="radiogroup" aria-label="Select pack size">
      {packs.map((pack, index) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            key={pack.file || index}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(index)}
            className={clsx(
              'px-3.5 py-1.5 rounded-[3px] text-xs sm:text-sm font-medium transition-all duration-200 border',
              isSelected
                ? 'bg-forest text-paper border-forest shadow-sm'
                : 'bg-paper text-ink/80 border-gold/40 hover:border-gold hover:text-forest'
            )}
          >
            {pack.label}
          </button>
        );
      })}
    </div>
  );
}
