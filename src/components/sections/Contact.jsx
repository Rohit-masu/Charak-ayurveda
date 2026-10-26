import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { EnquiryForm } from '../form/EnquiryForm';
import { Reveal } from '../ui/Reveal';
import { config } from '../../data/config';
import { content } from '../../data/content';
import { getGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function Contact() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <section id="contact" className="py-20 sm:py-28 bg-mist border-b border-gold/20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Direct Desk"
            title={content.contact.title}
            subtitle={content.contact.subtitle}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Office Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <Reveal>
              <div className="bg-paper p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-md space-y-6">
                <h3 className="font-display text-xl text-neem font-semibold border-b border-gold/20 pb-3">
                  Direct Institutional Desk
                </h3>

                {config.phone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-mist border border-gold/30 flex items-center justify-center text-forest flex-shrink-0 mt-0.5 shadow-2xs">
                      <Phone className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-ink/60 uppercase tracking-wide block">
                        Telephone
                      </span>
                      <a href={`tel:${config.phone.replace(/[^\d+]/g, '')}`} className="font-body text-base text-neem font-semibold hover:text-forest">
                        {config.phone}
                      </a>
                    </div>
                  </div>
                )}

                {config.whatsappNumber && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-mist border border-gold/30 flex items-center justify-center text-forest flex-shrink-0 mt-0.5 shadow-2xs">
                      <MessageCircle className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-ink/60 uppercase tracking-wide block">
                        Instant WhatsApp
                      </span>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-body text-base text-forest font-semibold hover:text-gold flex items-center gap-1">
                        <span>Chat with Official Desk</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {config.email && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-mist border border-gold/30 flex items-center justify-center text-forest flex-shrink-0 mt-0.5 shadow-2xs">
                      <Mail className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-ink/60 uppercase tracking-wide block">
                        Clinical Enquiries
                      </span>
                      <a href={`mailto:${config.email}`} className="font-body text-base text-neem font-medium hover:text-forest">
                        {config.email}
                      </a>
                    </div>
                  </div>
                )}

                {config.address && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-mist border border-gold/30 flex items-center justify-center text-forest flex-shrink-0 mt-0.5 shadow-2xs">
                      <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-ink/60 uppercase tracking-wide block">
                        Manufacturing & Research Facility
                      </span>
                      <p className="font-body text-sm text-ink/80 leading-relaxed mb-1.5">
                        {config.address}
                      </p>
                      {config.mapsUrl && (
                        <a
                          href={config.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs text-forest underline font-semibold hover:text-gold inline-flex items-center gap-1"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {config.hours && (
                  <div className="flex items-start gap-3.5 pt-3 border-t border-gold/15">
                    <Clock className="w-4 h-4 text-gold/80 flex-shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-ink/70">
                      Operational Hours: {config.hours}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: White framed Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
