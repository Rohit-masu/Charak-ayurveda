import React from 'react';
import clsx from 'clsx';
import { useReveal } from '../../hooks/useReveal';

export function Reveal({
  children,
  className = '',
  delay = 0,
  threshold = 0.12,
  as: Component = 'div',
  direction = 'up',
  ...props
}) {
  const [ref, isVisible] = useReveal(threshold);

  const directionClasses = {
    up: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
    down: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-7',
    left: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-7',
    right: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-7',
    fade: isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'
  };

  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined
      }}
      className={clsx(
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
        directionClasses[direction] || directionClasses.up,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
