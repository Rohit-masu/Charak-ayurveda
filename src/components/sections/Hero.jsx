import React from 'react';
import { ShieldCheck, Leaf, Sparkles, Stethoscope, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { NeemSprig, PaisleyPatternOverlay } from '../ui/Ornament';
import { content } from '../../data/content';
import { getImageUrl } from '../../lib/images';

export function Hero({ onOpenLogin }) {
  const data = content.hero;
  const bottleSrc = getImageUrl('rati-shakti-bottle-60.png');
  const boxSrc = getImageUrl('rati-shakti-box-30.png');

  return (
    <section className="relative bg-neem text-paper overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-gold/30">
      {/* Subtle Paisley SVG pattern */}
      <PaisleyPatternOverlay className="opacity-[0.045]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Story & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Heritage Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <NeemSprig className="w-5 h-5 text-gold-soft" />
              <span className="font-body text-xs sm:text-sm font-semibold tracking-widest text-gold-soft uppercase">
                {data.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.12] tracking-tight text-paper mb-6">
              {data.title}
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg lg:text-xl text-paper/85 leading-relaxed max-w-2xl mb-8 font-light">
              {data.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <Button
                variant="dark-primary"
                href={data.primaryCta.href}
                className="text-base px-8 py-3.5"
              >
                {data.primaryCta.text}
              </Button>

              <Button
                variant="dark-secondary"
                href={data.secondaryCta.href}
                className="text-base px-7 py-3.5"
              >
                {data.secondaryCta.text}
              </Button>
            </div>

            {/* Quick Link for Doctor / MR Login */}
            <div className="mb-8">
              <button
                type="button"
                onClick={() => onOpenLogin && onOpenLogin('doctor')}
                className="inline-flex items-center gap-2 font-body text-xs sm:text-sm text-gold-soft hover:text-paper transition-colors group"
              >
                <Stethoscope className="w-4 h-4 text-gold-soft group-hover:scale-110 transition-transform" />
                <span className="underline underline-offset-4 font-medium">Are you a registered Doctor or MR? Access Portal</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Row */}
            <div className="pt-6 border-t border-gold/25 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {data.trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1">
                  <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold-soft bg-forest/30">
                    {idx === 0 && <Leaf className="w-3.5 h-3.5" />}
                    {idx === 1 && <ShieldCheck className="w-3.5 h-3.5" />}
                    {idx === 2 && <Sparkles className="w-3.5 h-3.5" />}
                  </div>
                  <span className="font-body text-xs sm:text-sm text-paper/90 font-medium">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Arched Gold Frame Stage (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Swaying Neem Sprig in background corner */}
            <div className="absolute -top-6 -right-2 sm:-right-4 z-20 pointer-events-none animate-sway">
              <NeemSprig className="w-16 h-16 sm:w-20 sm:h-20 text-gold-soft/70 drop-shadow-md" />
            </div>

            {/* Arched Stage Frame */}
            <div className="relative w-full max-w-md sm:max-w-lg group">
              {/* Arched Drawing Gold Hairline */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 400 500"
                fill="none"
              >
                <path
                  d="M10 490V200C10 95.066 95.066 10 200 10C304.934 10 390 95.066 390 200V490"
                  stroke="#B8923F"
                  strokeWidth="2"
                  className="animate-draw-arch"
                />
              </svg>

              {/* Inside Stage with Bottle & Box */}
              <div className="p-3 sm:p-4">
                <div className="relative w-full aspect-[4/5] rounded-t-[999px] rounded-b-3xl bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#E8F0EA_100%)] p-6 sm:p-8 flex items-center justify-center shadow-2xl border border-gold/30 overflow-hidden">
                  {/* Subtle inner radial glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

                  {/* Bottle (60) & Box (30) Product Showcase */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center gap-3 sm:gap-4 animate-hero-product">
                    {/* 60 Caps Bottle */}
                    {bottleSrc && (
                      <img
                        src={bottleSrc}
                        alt="Charak Ayurveda Rati Shakti 60 Capsules Crown Bottle"
                        className="max-h-[84%] w-auto object-contain drop-shadow-lg transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-2 cursor-pointer"
                      />
                    )}
                    {/* 30 Caps Box */}
                    {boxSrc && (
                      <img
                        src={boxSrc}
                        alt="Charak Ayurveda Rati Shakti 30 Capsules Box"
                        className="max-h-[76%] w-auto object-contain drop-shadow-md hidden xs:block transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-1.5 cursor-pointer"
                      />
                    )}
                  </div>

                  {/* Grounding shadow */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-neem/20 rounded-[100%] blur-md pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
