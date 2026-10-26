import React, { useState } from 'react';
import clsx from 'clsx';
import { config } from '../../data/config';
import { getImageUrl } from '../../lib/images';
import { OpenBook, NeemSprig } from './Ornament';

export function Logo({ dark = false, className = '', showTagline = false }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = config.logoFile ? getImageUrl(config.logoFile) : null;

  if (logoUrl && !imgError) {
    return (
      <a href="#" className={clsx('inline-flex items-center gap-3 group', className)} aria-label={config.brandName}>
        <img
          src={logoUrl}
          alt={config.brandName}
          className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      </a>
    );
  }

  // Graceful typographic fallback with brand crest
  return (
    <a
      href="#"
      className={clsx('inline-flex items-center gap-2.5 group select-none', className)}
      aria-label={config.brandName}
    >
      <div
        className={clsx(
          'w-9 h-9 rounded-[3px] border flex items-center justify-center transition-colors',
          dark
            ? 'border-gold-soft/50 bg-forest/40 text-gold-soft group-hover:border-gold-soft'
            : 'border-gold/60 bg-paper text-forest group-hover:border-forest'
        )}
      >
        <OpenBook className="w-5 h-5 text-current" />
      </div>
      <div className="flex flex-col">
        <span
          className={clsx(
            'font-display text-xl sm:text-2xl font-medium tracking-tight leading-none',
            dark ? 'text-paper group-hover:text-gold-soft' : 'text-neem group-hover:text-forest'
          )}
        >
          {config.brandName}
        </span>
        {showTagline && (
          <span
            className={clsx(
              'font-body text-[11px] tracking-wider uppercase mt-0.5',
              dark ? 'text-gold-soft/80' : 'text-gold'
            )}
          >
            {config.tagline || 'Ayurvedic Tradition'}
          </span>
        )}
      </div>
    </a>
  );
}
