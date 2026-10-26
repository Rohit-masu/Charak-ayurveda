import React from 'react';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { ProductStage } from '../ui/ProductStage';

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
        'group relative flex flex-col bg-paper rounded-2xl p-5 sm:p-6 transition-all duration-300 ease-out',
        'border border-gold/25 shadow-sm',
        isPlaceholder
          ? 'opacity-70 cursor-not-allowed select-none'
          : 'cursor-pointer hover:-translate-y-2 hover:border-gold hover:shadow-xl hover:shadow-neem/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft'
      )}
    >
      {/* Arched Stage with Transparent Product Visual */}
      <ProductStage
        filename={primaryPack ? primaryPack.file : null}
        alt={product.name}
        transparent={primaryPack ? primaryPack.transparent : true}
        aspectRatio="aspect-[4/5]"
        arched={true}
        className="mb-5 transition-all duration-300 group-hover:shadow-md"
        imgClassName="group-hover:-translate-y-2 group-hover:scale-105 duration-400 ease-out drop-shadow-md"
      />

      {/* Details */}
      <div className="flex flex-col flex-1">
        <span className="font-body text-xs uppercase tracking-wider text-gold font-semibold mb-1 group-hover:text-forest transition-colors">
          {product.category.replace('-', ' ')}
        </span>

        <h3 className="font-display text-lg sm:text-xl text-neem font-semibold group-hover:text-forest transition-colors">
          {product.name}
        </h3>

        <p className="font-body text-sm text-ink/75 line-clamp-2 mt-1 mb-4 flex-1">
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
            <span className="font-body text-xs font-semibold text-forest group-hover:text-gold transition-colors inline-flex items-center gap-1.5">
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-1" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
