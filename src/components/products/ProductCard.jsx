import React from 'react';
import clsx from 'clsx';
import { ProductStage } from '../ui/ProductStage';
import { Button } from '../ui/Button';

export function ProductCard({ product, onSelect }) {
  const isPlaceholder = product.status === 'placeholder';
  const primaryPack = product.packs && product.packs[0];

  const handleCardClick = () => {
    if (!isPlaceholder && onSelect) {
      onSelect(product);
    }
  };

  const handleKeyDown = (e) => {
    if (!isPlaceholder && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect(product);
    }
  };

  return (
    <div
      tabIndex={isPlaceholder ? -1 : 0}
      role={isPlaceholder ? 'article' : 'button'}
      aria-label={isPlaceholder ? `${product.name} (Coming soon)` : `View details for ${product.name}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'group relative flex flex-col bg-paper rounded-[4px] p-5 sm:p-6 transition-all duration-250',
        'border border-gold/25',
        isPlaceholder
          ? 'opacity-70 cursor-not-allowed select-none'
          : 'cursor-pointer hover:-translate-y-1 hover:border-gold hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft'
      )}
    >
      {/* Arched Stage with Product Visual */}
      <ProductStage
        filename={primaryPack ? primaryPack.file : null}
        alt={product.name}
        transparent={primaryPack ? primaryPack.transparent : false}
        aspectRatio="aspect-[4/5]"
        arched={true}
        className="mb-5 transition-transform duration-300 group-hover:scale-[1.02]"
      />

      {/* Details */}
      <div className="flex flex-col flex-1">
        <span className="font-body text-xs uppercase tracking-wider text-gold font-semibold mb-1">
          {product.category.replace('-', ' ')}
        </span>

        <h3 className="font-display text-xl sm:text-2xl text-neem font-medium group-hover:text-forest transition-colors">
          {product.name}
        </h3>

        <p className="font-body text-sm text-ink/75 line-clamp-2 mt-1.5 mb-4 flex-1">
          {product.line || (isPlaceholder ? 'Authentic formulation in development.' : '')}
        </p>

        {/* Action Button */}
        {isPlaceholder ? (
          <span className="inline-block text-xs font-medium text-ink/50 py-2 border-t border-gold/15">
            Image & details coming soon
          </span>
        ) : (
          <div className="pt-3 border-t border-gold/20 flex items-center justify-between">
            <span className="font-body text-xs text-forest/70 font-medium">
              {product.packs ? `${product.packs.length} ${product.packs.length === 1 ? 'pack' : 'packs'} available` : ''}
            </span>
            <span className="font-body text-xs font-semibold text-forest group-hover:text-gold transition-colors inline-flex items-center gap-1">
              View details &rarr;
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
