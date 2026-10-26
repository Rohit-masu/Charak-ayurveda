import React from 'react';
import { BookOpen, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { OpenBook, NeemSprig, CornerPaisley } from '../ui/Ornament';
import { Reveal } from '../ui/Reveal';
import { content } from '../../data/content';

export function About() {
  const data = content.about;

  return (
    <section id="about" className="py-20 sm:py-28 bg-paper border-b border-gold/20 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-3">
                <NeemSprig className="w-4 h-4 text-gold" />
                <span className="font-body text-xs sm:text-sm font-semibold tracking-widest text-gold uppercase">
                  {data.subtitle}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-neem font-normal leading-tight mb-6">
                {data.title}
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-4 font-body text-base sm:text-lg text-ink/80 leading-relaxed">
                <p className="font-medium text-forest text-lg sm:text-xl leading-snug">
                  {data.p1}
                </p>
                <p>{data.p2}</p>
                <p className="text-base text-ink/70">{data.p3}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gold/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[3px] bg-mist border border-gold/30 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-base text-neem font-medium">Standardized Extracts</h4>
                    <p className="font-body text-xs text-ink/70">Verified botanical potency across every single production run.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[3px] bg-mist border border-gold/30 flex items-center justify-center text-forest flex-shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-base text-neem font-medium">Doctor Partnership</h4>
                    <p className="font-body text-xs text-ink/70">Trusted clinical formulations distributed directly to practicing physicians.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: "Bound Book" Heritage Panel (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <Reveal delay={150}>
              <div className="relative w-full max-w-md bg-mist rounded-[4px] border-2 border-gold/40 p-8 sm:p-10 shadow-lg">
                <CornerPaisley className="absolute top-2 left-2 w-10 h-10 text-gold/50" />
                <CornerPaisley className="absolute bottom-2 right-2 w-10 h-10 text-gold/50 rotate-180" />

                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-paper border border-gold/40 flex items-center justify-center mx-auto mb-5 text-forest shadow-sm">
                    <OpenBook className="w-8 h-8 text-gold" />
                  </div>

                  <span className="font-display text-xs tracking-widest uppercase text-gold font-semibold block mb-2">
                    Ayurvedic Granth Heritage
                  </span>

                  <h3 className="font-display text-2xl text-neem font-medium mb-3">
                    The Science of Longevity
                  </h3>

                  <blockquote className="font-body italic text-sm text-ink/75 leading-relaxed max-w-xs mx-auto mb-4">
                    "Ayurveda teaches that vitality is maintained through balanced agni, nourished dhatus, and pure botanical rasayanas."
                  </blockquote>

                  <span className="font-body text-xs text-forest/70 uppercase tracking-wider block font-semibold">
                    — Principles of Charaka Samhita
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
