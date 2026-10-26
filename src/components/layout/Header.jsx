import React, { useState } from 'react';
import { Menu, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { useScrolled } from '../../hooks/useScrolled';
import { content } from '../../data/content';
import { config } from '../../data/config';
import { getGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function Header() {
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
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
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

            {/* Optional Doctor Login Portal */}
            {config.showDoctorLogin && config.doctorLoginUrl && (
              <a
                href={config.doctorLoginUrl}
                className="font-body text-xs lg:text-sm font-semibold tracking-wide text-gold-soft hover:text-paper transition-colors py-1 px-2.5 rounded-[2px] border border-gold/40"
              >
                Doctor / MR Portal
              </a>
            )}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="dark-primary"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-4 py-2"
            >
              <MessageCircle className="w-4 h-4 text-neem" />
              <span>{content.header.whatsappCta}</span>
            </Button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 rounded-[3px] text-gold-soft hover:text-paper hover:bg-forest/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
