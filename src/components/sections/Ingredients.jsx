import React from 'react';
import { Leaf } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { content } from '../../data/content';

export function Ingredients() {
  const data = content.ingredients;

  if (!data?.items || data.items.length === 0) return null;

  return (
    <section id="ingredients" className="py-20 sm:py-28 bg-mist border-b border-gold/20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Classical Pharmacopoeia"
            title={data.title}
            subtitle={data.subtitle}
          />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {data.items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 70}>
              <div className="bg-paper p-5 sm:p-6 rounded-[3px] border border-gold/30 hover:border-gold transition-all duration-300 shadow-sm flex flex-col justify-between h-full group hover:-translate-y-1.5 hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-lg sm:text-xl text-neem font-medium group-hover:text-forest transition-colors">
                    {item.name}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-mist/60 group-hover:bg-forest/10 flex items-center justify-center transition-colors">
                    <Leaf className="w-3.5 h-3.5 text-gold/70 group-hover:text-gold group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
                  </div>
                </div>
                <p className="font-body text-xs sm:text-sm text-ink/70 leading-normal">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
