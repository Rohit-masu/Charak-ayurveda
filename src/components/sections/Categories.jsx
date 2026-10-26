import React from 'react';
import { Pill, Droplets, Sparkles, Package, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { content } from '../../data/content';

export function Categories({ onSelectCategory }) {
  const categoryTiles = [
    {
      id: "capsules",
      name: "Capsules",
      desc: "Vegetarian capsules with concentrated herbal extracts for daily vitality.",
      icon: Pill
    },
    {
      id: "massage-oil",
      name: "Massage Oil",
      desc: "Traditional therapeutic herbal oils for external application and vigor.",
      icon: Droplets
    },
    {
      id: "majun",
      name: "Majun",
      desc: "Classic Ayurvedic confection combining purified herbs and mineral pitch.",
      icon: Sparkles
    },
    {
      id: "supplements",
      name: "Supplements",
      desc: "Comprehensive multi-herb regimens and Maharaja therapeutic kits.",
      icon: Package
    }
  ];

  const handleTileClick = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-24 bg-paper border-b border-gold/15">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Therapeutic Formats"
            title={content.categories.title}
            subtitle={content.categories.subtitle}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryTiles.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.id} delay={idx * 120}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleTileClick(cat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleTileClick(cat.id);
                    }
                  }}
                  className="group relative bg-mist/60 hover:bg-mist p-6 sm:p-7 rounded-[3px] border border-gold/30 hover:border-gold transition-all duration-300 cursor-pointer flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-[3px] bg-paper border border-gold/40 flex items-center justify-center text-forest group-hover:border-gold group-hover:bg-forest group-hover:text-gold-soft transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 mb-5 shadow-sm">
                    <Icon className="w-6 h-6 transition-transform duration-300" />
                  </div>

                  <h3 className="font-display text-xl text-neem font-medium group-hover:text-forest transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="font-body text-sm text-ink/75 leading-relaxed flex-1">
                    {cat.desc}
                  </p>

                  <div className="pt-4 mt-4 border-t border-gold/20 flex items-center justify-between">
                    <span className="font-body text-xs font-semibold text-forest group-hover:text-gold transition-colors inline-flex items-center gap-1.5">
                      <span>Browse Category</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
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
