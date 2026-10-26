import React, { useState } from 'react';
import { Menu, MessageCircle, Stethoscope, Lock } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { useScrolled } from '../../hooks/useScrolled';
import { content } from '../../data/content';
import { getGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function Header({ onOpenLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScrolled(20);
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'bg-neem/95 backdrop-blur-md border-b border-gold/30 shadow-md py-3 text-paper'
            : 'bg-neem border-b border-gold/15 py-4 sm:py-5 text-paper'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo dark={true} showTagline={!scrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {content.header.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-sm lg:text-[15px] font-medium tracking-wide text-paper/90 hover:text-gold-soft transition-colors py-1 relative group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-soft transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs: Doctor/MR Portal + WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Doctor / MR Portal Login Trigger */}
            <button
              type="button"
              onClick={() => onOpenLogin && onOpenLogin('doctor')}
              className="inline-flex items-center gap-2 text-xs lg:text-sm font-semibold text-gold-soft hover:text-paper py-2 px-4 rounded-full border border-gold-soft/50 hover:border-gold-soft hover:bg-forest/50 transition-all duration-250 shadow-2xs"
            >
              <Stethoscope className="w-3.5 h-3.5 text-gold-soft" />
              <span>Doctor / MR Portal</span>
            </button>

            {/* WhatsApp CTA */}
            <Button
              variant="dark-primary"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs lg:text-sm px-4 py-2"
            >
              <MessageCircle className="w-4 h-4 text-neem" />
              <span>{content.header.whatsappCta}</span>
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenLogin && onOpenLogin('doctor')}
              aria-label="Doctor and MR Login"
              className="p-2 rounded-full text-gold-soft hover:text-paper border border-gold/40 hover:bg-forest/40 transition-colors"
            >
              <Stethoscope className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-full text-gold-soft hover:text-paper hover:bg-forest/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenLogin={onOpenLogin}
      />
    </>
  );
}
