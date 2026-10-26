import React, { useState } from 'react';
import clsx from 'clsx';
import { getImageUrl } from '../../lib/images';
import { OpenBook } from './Ornament';

export function ProductStage({
  filename,
  alt = 'Product image',
  transparent = true,
  aspectRatio = 'aspect-[3/4]',
  className = '',
  imgClassName = '',
  arched = true
}) {
  const [hasError, setHasError] = useState(false);
  const src = filename ? getImageUrl(filename) : null;

  return (
    <div
      className={clsx(
        'relative w-full overflow-hidden flex items-center justify-center p-6 sm:p-8',
        'bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#E8F0EA_100%)]',
        'shadow-stage border border-gold/25 transition-all duration-300',
        arched ? 'rounded-t-[999px] rounded-b-2xl' : 'rounded-2xl',
        aspectRatio,
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={clsx(
            'w-full h-full object-contain max-h-[85%] transition-transform duration-300 group-hover:scale-105',
            !transparent && 'mix-blend-multiply',
            imgClassName
          )}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6 select-none">
          <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-3 text-gold/80">
            <OpenBook className="w-6 h-6" />
          </div>
          <span className="font-display text-xs tracking-wider text-forest/70 uppercase font-semibold">
            Image Coming Soon
          </span>
          <span className="font-body text-xs text-ink/50 mt-1">
            Authentic batch photography in progress
          </span>
        </div>
      )}

      {/* Subtle soft grounding shadow under product */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-neem/10 rounded-[100%] blur-sm pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
