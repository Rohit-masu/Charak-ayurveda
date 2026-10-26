import React from 'react';
import clsx from 'clsx';

export function Field({
  label,
  id,
  error,
  required = false,
  helpText,
  children,
  className = ''
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="font-body text-sm font-medium text-neem flex items-center justify-between">
          <span>
            {label} {required && <span className="text-gold-soft ml-0.5">*</span>}
          </span>
        </label>
      )}

      {children}

      {helpText && !error && (
        <span className="font-body text-xs text-ink/60">{helpText}</span>
      )}

      {error && (
        <span id={`${id}-error`} className="font-body text-xs text-red-600 font-medium" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
