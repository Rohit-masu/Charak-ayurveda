import React from 'react';
import clsx from 'clsx';
import { GoldDivider } from './Ornament';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  dark = false,
  className = ''
}) {
  return (
    <div
      className={clsx(
        'max-w-3xl mb-12 md:mb-16',
        centered ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            'font-body text-xs sm:text-sm font-medium tracking-wide mb-2',
            dark ? 'text-gold-soft' : 'text-gold'
          )}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={clsx(
          'font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-normal leading-[1.15] tracking-tight',
          dark ? 'text-paper' : 'text-neem'
        )}
      >
        {title}
      </h2>

      <GoldDivider
        light={dark}
        className={clsx('my-4', centered ? 'mx-auto' : 'ml-0')}
      />

      {subtitle && (
        <p
          className={clsx(
            'font-body text-base sm:text-lg leading-relaxed max-w-2xl',
            centered ? 'mx-auto' : '',
            dark ? 'text-paper/80' : 'text-ink/80'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
