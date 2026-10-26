import React from 'react';
import clsx from 'clsx';

export function NeemSprig({ className = 'w-6 h-6 text-gold', ...props }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Central stem */}
      <path
        d="M24 44C24 32 24 16 24 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Top terminal leaf */}
      <path
        d="M24 4C24 4 27 10 24 14C21 10 24 4 24 4Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Paired leaves */}
      <path
        d="M24 14C28 12 36 12 38 18C33 19 27 17 24 14Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M24 14C20 12 12 12 10 18C15 19 21 17 24 14Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M24 24C30 22 39 23 41 30C35 30 28 28 24 24Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M24 24C18 22 9 23 7 30C13 30 20 28 24 24Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M24 34C31 32 39 34 40 41C34 40 28 37 24 34Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M24 34C17 32 9 34 8 41C14 40 20 37 24 34Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export function OpenBook({ className = 'w-6 h-6 text-gold', ...props }) {
  return (
    <svg
      viewBox="0 0 48 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M24 10C20 6 12 6 6 8V30C12 28 20 28 24 32C28 28 36 28 42 30V8C36 6 28 6 24 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 10V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14C14 13 18 13 21 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 20C14 19 18 19 21 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M38 14C34 13 30 13 27 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M38 20C34 19 30 19 27 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function CornerPaisley({ className = 'w-10 h-10 text-gold/40', ...props }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2 2H30C45 2 58 15 58 30C58 45 46 56 32 56C18 56 12 44 18 36C24 28 34 32 30 40C28 44 22 42 22 38"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
      <path d="M2 14C8 14 14 8 14 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M2 22C14 22 22 14 22 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function GoldDivider({ className = 'my-4 text-gold/60', light = false }) {
  return (
    <div className={clsx('flex items-center justify-center space-x-3 w-full max-w-xs mx-auto', className)}>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-current opacity-50" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-current opacity-50" />
    </div>
  );
}

export function PaisleyPatternOverlay({ className = 'opacity-[0.04]' }) {
  return (
    <div
      className={clsx('absolute inset-0 pointer-events-none select-none bg-repeat', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10C26 10 32 16 32 24C32 34 22 42 12 40C6 38 4 30 8 26C12 22 18 25 16 30C15 32 12 31 12 29' fill='none' stroke='%23B8923F' stroke-width='1.2' stroke-linecap='round'/%3E%3Cpath d='M60 50C66 50 72 56 72 64C72 74 62 82 52 80C46 78 44 70 48 66C52 62 58 65 56 70C55 72 52 71 52 69' fill='none' stroke='%23B8923F' stroke-width='1.2' stroke-linecap='round'/%3E%3Ccircle cx='40' cy='20' r='1.5' fill='%23B8923F'/%3E%3Ccircle cx='20' cy='60' r='1.5' fill='%23B8923F'/%3E%3C/svg%3E")`
      }}
      aria-hidden="true"
    />
  );
}
