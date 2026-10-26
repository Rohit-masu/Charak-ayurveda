import React from 'react';
import clsx from 'clsx';
import { useReveal } from '../../hooks/useReveal';

export function Reveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
  as: Component = 'div',
  ...props
}) {
  const [ref, isVisible] = useReveal(threshold);

  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined
      }}
      className={clsx(
        'transition-all duration-700 ease-out will-change-transform',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
