import React from 'react';
import clsx from 'clsx';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const baseClasses = clsx(
    'inline-flex items-center justify-center font-body font-medium transition-all duration-200',
    'rounded-[3px] select-none text-center',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:ring-offset-2',
    'min-h-[44px] px-6 py-2.5 text-base',
    disabled && 'opacity-60 cursor-not-allowed pointer-events-none'
  );

  const variantClasses = {
    primary:
      'bg-forest text-paper hover:bg-forest/90 border border-forest active:scale-[0.99] shadow-sm',
    secondary:
      'bg-transparent text-forest border border-gold hover:bg-gold/10 active:scale-[0.99]',
    'dark-primary':
      'bg-gold-soft text-neem font-semibold hover:bg-gold-soft/90 border border-gold-soft active:scale-[0.99] shadow-sm',
    'dark-secondary':
      'bg-transparent text-gold-soft border border-gold-soft/60 hover:border-gold-soft hover:bg-gold-soft/10 active:scale-[0.99]',
    ghost:
      'bg-transparent text-ink hover:text-forest hover:bg-mist/50 border border-transparent'
  };

  const combinedClasses = clsx(baseClasses, variantClasses[variant] || variantClasses.primary, className);

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
