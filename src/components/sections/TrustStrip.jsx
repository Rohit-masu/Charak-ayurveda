import React from 'react';
import { Leaf, ShieldCheck, Award, HeartPulse } from 'lucide-react';
import { Container } from '../ui/Container';

export function TrustStrip() {
  const items = [
    {
      icon: Leaf,
      title: "100% Ayurvedic",
      desc: "Formulated strictly per classical texts"
    },
    {
      icon: ShieldCheck,
      title: "Vegetarian Capsules",
      desc: "Natural plant-based shell formulation"
    },
    {
      icon: Award,
      title: "Charak Ayurveda",
      desc: "Proprietary quality & purity standards"
    },
    {
      icon: HeartPulse,
      title: "Authentic Botanicals",
      desc: "Tested herbs & verified raw extracts"
    }
  ];

  return (
    <section className="bg-paper py-8 sm:py-10 border-b border-gold/20" aria-label="Trust highlights">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-12 h-12 rounded-2xl bg-mist border border-gold/30 flex items-center justify-center flex-shrink-0 text-forest group-hover:border-gold group-hover:scale-105 transition-all shadow-2xs">
                  <Icon className="w-5 h-5 text-current" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm sm:text-base text-neem font-semibold">
                    {item.title}
                  </span>
                  <span className="font-body text-xs text-ink/70">
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
