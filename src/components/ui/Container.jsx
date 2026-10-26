import React from 'react';
import clsx from 'clsx';

export function Container({ children, className = '', ...props }) {
  return (
    <div className={clsx('max-w-7xl mx-auto px-5 sm:px-8 w-full', className)} {...props}>
      {children}
    </div>
  );
}
