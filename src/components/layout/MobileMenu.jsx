import React, { useEffect, useRef } from 'react';
import { X, MessageCircle, Lock, Stethoscope } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { content } from '../../data/content';
import { config } from '../../data/config';
import { getGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function MobileMenu({ isOpen, onClose, onOpenLogin }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = content.header.nav;
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neem/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        ref={menuRef}
        className={clsx(
          'fixed inset-y-0 right-0 w-full max-w-xs bg-paper border-l border-gold/40 shadow-2xl',
          'flex flex-col p-6 z-10 transition-transform duration-300 ease-out'
        )}
      >
        <div className="flex items-center justify-between pb-6 border-b border-gold/20">
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 rounded-full text-ink/70 hover:text-forest transition-colors focus:outline-none focus:ring-2 focus:ring-gold-soft"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col py-6 space-y-4 flex-1">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="font-display text-lg text-neem hover:text-forest transition-colors py-1.5 border-b border-gold/10"
            >
              {item.label}
            </a>
          ))}

          {/* Dedicated Doctor / MR Portal in Menu */}
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenLogin) onOpenLogin('doctor');
            }}
            className="w-full text-left font-display text-lg text-forest hover:text-gold transition-colors py-2 border-b border-gold/10 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-gold" />
              <span>Doctor / MR Login</span>
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-mist text-forest border border-gold/30">Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenLogin) onOpenLogin('admin');
            }}
            className="w-full text-left font-display text-base text-ink/70 hover:text-forest transition-colors py-1.5 flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-gold/70" />
            <span>Admin Portal</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-gold/20 flex flex-col gap-3">
          <Button
            variant="primary"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{content.header.whatsappCta}</span>
          </Button>

          {config.phone && (
            <a
              href={`tel:${config.phone.replace(/[^\d+]/g, '')}`}
              className="font-body text-xs text-center text-ink/70 hover:text-forest"
            >
              Call: {config.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
