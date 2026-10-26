import React, { useState } from 'react';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { FloatingWhatsApp } from '../components/layout/FloatingWhatsApp';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { Categories } from '../components/sections/Categories';
import { Products } from '../components/sections/Products';
import { About } from '../components/sections/About';
import { Ingredients } from '../components/sections/Ingredients';
import { ForDoctors } from '../components/sections/ForDoctors';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';

export function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-body selection:bg-gold-soft selection:text-neem">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header />

      <main className="flex-1">
        {/* 3. Hero */}
        <Hero />

        {/* 4. Trust Strip */}
        <TrustStrip />

        {/* 5. Categories */}
        <Categories onSelectCategory={setActiveCategory} />

        {/* 6. Products */}
        <Products
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 7. About & Heritage */}
        <About />

        {/* 8. Key Ingredients */}
        <Ingredients />

        {/* 9. For Doctors, Chemists & Distributors */}
        <ForDoctors />

        {/* 10. Frequently Asked Questions */}
        <Faq />

        {/* 11. Contact & Enquiry Form */}
        <Contact />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Mobile-only Floating WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
