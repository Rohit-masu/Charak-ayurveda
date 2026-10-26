import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, MapPin, Stethoscope, Lock } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Container } from '../ui/Container';
import { PaisleyPatternOverlay } from '../ui/Ornament';
import { config } from '../../data/config';
import { content } from '../../data/content';
import { getGeneralWhatsAppUrl } from '../../lib/whatsapp';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15"/>
    </svg>
  );
}

export function Footer({ onOpenLogin }) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <footer className="relative bg-neem text-paper border-t border-gold/30 pt-16 pb-12 overflow-hidden">
      <PaisleyPatternOverlay className="opacity-[0.035]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-gold/20">
          {/* Col 1: Brand & Heritage */}
          <div className="flex flex-col">
            <Logo dark={true} showTagline={true} className="mb-4" />
            <p className="font-body text-sm text-paper/75 leading-relaxed mb-6">
              Rooted in the Charaka Samhita. Crafting classical Ayurvedic proprietary formulations with authentic herbs, rigorous quality standards, and deep reverence for Indian botanical heritage.
            </p>
            <div className="flex items-center gap-3">
              {config.social.instagram && (
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold-soft hover:text-paper hover:border-gold-soft transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {config.social.facebook && (
                <a
                  href={config.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold-soft hover:text-paper hover:border-gold-soft transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {config.social.youtube && (
                <a
                  href={config.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold-soft hover:text-paper hover:border-gold-soft transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation & Portals */}
          <div>
            <h3 className="font-display text-sm tracking-wider text-gold-soft uppercase font-semibold mb-4">
              Navigation & Portals
            </h3>
            <ul className="space-y-2.5 font-body text-sm text-paper/80">
              {content.header.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-gold-soft transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-gold/60 text-xs">&#8227;</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-gold-soft transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-gold/60 text-xs">&#8227;</span>
                  <span>{content.footer.privacyLinkText}</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-gold/20">
                <button
                  type="button"
                  onClick={() => onOpenLogin && onOpenLogin('doctor')}
                  className="text-gold-soft hover:text-paper transition-colors inline-flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-gold-soft" />
                  <span>Doctor & MR Login Portal</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLogin && onOpenLogin('admin')}
                  className="text-paper/70 hover:text-gold-soft transition-colors inline-flex items-center gap-1.5 text-xs"
                >
                  <Lock className="w-3 h-3 text-gold/60" />
                  <span>Admin Panel Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h3 className="font-display text-sm tracking-wider text-gold-soft uppercase font-semibold mb-4">
              Institutional Contact
            </h3>
            <ul className="space-y-3 font-body text-sm text-paper/80">
              {config.phone && (
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <a href={`tel:${config.phone.replace(/[^\d+]/g, '')}`} className="hover:text-gold-soft transition-colors">
                    {config.phone}
                  </a>
                </li>
              )}
              {config.whatsappNumber && (
                <li className="flex items-start gap-2.5">
                  <MessageCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft transition-colors">
                    Official WhatsApp Desk
                  </a>
                </li>
              )}
              {config.email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${config.email}`} className="hover:text-gold-soft transition-colors">
                    {config.email}
                  </a>
                </li>
              )}
              {config.hours && (
                <li className="text-xs text-paper/60 pt-1">
                  Desk Hours: {config.hours}
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Registered Address & Licences */}
          <div>
            <h3 className="font-display text-sm tracking-wider text-gold-soft uppercase font-semibold mb-4">
              Registered Desk
            </h3>
            {config.address && (
              <p className="font-body text-sm text-paper/75 flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <span>{config.address}</span>
              </p>
            )}
            {config.mapsUrl && (
              <a
                href={config.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-gold-soft underline hover:text-paper inline-block mb-3"
              >
                Open in Google Maps &rarr;
              </a>
            )}
            {config.licenceNumber && (
              <p className="font-body text-xs text-gold-soft/90 border-t border-gold/20 pt-2">
                Ayush Mfg. Lic: {config.licenceNumber}
              </p>
            )}
            {config.gmpCertified && (
              <p className="font-body text-xs text-gold-soft/90">
                GMP Certified Manufacturing Facility
              </p>
            )}
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="font-body text-xs text-paper/65 max-w-3xl leading-relaxed">
            {content.footer.disclaimer}
          </p>

          <p className="font-body text-xs text-paper/60 whitespace-nowrap">
            &copy; {currentYear} {config.brandName}. {content.footer.rightsText}
          </p>
        </div>
      </Container>
    </footer>
  );
}
