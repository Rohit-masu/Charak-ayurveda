import React from 'react';
import { FileText, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { PaisleyPatternOverlay, NeemSprig } from '../ui/Ornament';
import { Reveal } from '../ui/Reveal';
import { content } from '../../data/content';
import { config } from '../../data/config';
import { getDoctorWhatsAppUrl } from '../../lib/whatsapp';

export function ForDoctors() {
  const data = content.forDoctors;
  const doctorWhatsAppUrl = getDoctorWhatsAppUrl();

  return (
    <section id="doctors" className="relative bg-neem text-paper py-20 sm:py-28 border-b border-gold/30 overflow-hidden">
      <PaisleyPatternOverlay className="opacity-[0.04]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-3">
                <NeemSprig className="w-4 h-4 text-gold-soft" />
                <span className="font-body text-xs sm:text-sm font-semibold tracking-widest text-gold-soft uppercase">
                  Institutional Channel
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl text-paper font-normal leading-[1.15] mb-5">
                {data.title}
              </h2>

              <p className="font-body text-base sm:text-lg text-paper/85 leading-relaxed mb-8">
                {data.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  variant="dark-primary"
                  href={data.primaryCta.href}
                  className="px-6 py-3 text-base"
                >
                  {data.primaryCta.text}
                </Button>

                {config.catalogPdf && (
                  <Button
                    variant="dark-secondary"
                    href={config.catalogPdf}
                    download="charak-ayurveda-catalog.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 text-sm inline-flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-gold-soft" />
                    <span>Download catalog (PDF)</span>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3 Steps (7 cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5">
              {data.steps.map((step, idx) => (
                <Reveal key={idx} delay={idx * 120}>
                  <div className="bg-forest/50 border border-gold/30 rounded-[3px] p-6 flex items-start gap-5 hover:border-gold-soft transition-colors">
                    <div className="w-10 h-10 rounded-full border border-gold-soft/60 flex items-center justify-center flex-shrink-0 text-gold-soft font-display text-lg font-semibold bg-neem">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-paper font-medium mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-paper/80 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
