import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { faqs } from '../../data/faq';
import { content } from '../../data/content';

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-paper border-b border-gold/20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Knowledge & Queries"
            title={content.faq.title}
            subtitle={content.faq.subtitle}
          />
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 50}>
                <div className="border border-gold/30 rounded-2xl bg-paper overflow-hidden transition-all hover:border-gold shadow-2xs">
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full px-6 py-4.5 sm:py-5 flex items-center justify-between gap-4 text-left font-display text-base sm:text-lg text-neem font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={clsx(
                        'w-5 h-5 text-gold flex-shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    className={clsx(
                      'transition-all duration-300 ease-in-out px-6 overflow-hidden',
                      isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
                    )}
                  >
                    <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed pt-2 border-t border-gold/15">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
