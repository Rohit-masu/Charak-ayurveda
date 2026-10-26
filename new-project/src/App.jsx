import React, { useState } from "react";
import BotanicalCanvas from "./components/BotanicalCanvas";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AttributesStrip from "./components/AttributesStrip";
import CategoryShowcase from "./components/CategoryShowcase";
import ProductCatalog from "./components/ProductCatalog";
import ProductModal from "./components/ProductModal";
import DoshaQuiz from "./components/DoshaQuiz";
import ExtractionJourney from "./components/ExtractionJourney";
import IngredientSynergyMatrix from "./components/IngredientSynergyMatrix";
import RegimenPlanner from "./components/RegimenPlanner";
import EditorialStory from "./components/EditorialStory";
import BotanicalExplorer from "./components/BotanicalExplorer";
import PractitionerB2B from "./components/PractitionerB2B";
import EnquirySection from "./components/EnquirySection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import QuickEnquiryModal from "./components/QuickEnquiryModal";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialType, setEnquiryInitialType] = useState("Doctor / Clinical Practice");

  const handleOpenEnquiry = (type = "Doctor / Clinical Practice") => {
    setEnquiryInitialType(type);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#051610] text-[#faf8f2] relative">
      {/* Ambient Floating Golden Pollen / Spores Canvas */}
      <BotanicalCanvas />

      {/* Top Notification Bar */}
      <AnnouncementBar onOpenEnquiry={handleOpenEnquiry} />

      {/* Sticky Glass Navbar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Page Content */}
      <main id="main-content" style={{ position: "relative", zIndex: 10 }}>
        {/* Asymmetrical Editorial Hero with Interactive Product Stage Switcher */}
        <Hero onSelectProduct={setSelectedProduct} />

        {/* Prestige 4-Column Attribute Ribbon */}
        <AttributesStrip />

        {/* Editorial Category Mosaic */}
        <CategoryShowcase onSelectCategory={(catId) => setActiveCategory(catId)} />

        {/* Product Showcase & Catalog */}
        <ProductCatalog
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectProduct={setSelectedProduct}
        />

        {/* Interactive Ayurvedic Constitution / Dosha Diagnostic Tool */}
        <DoshaQuiz onOpenEnquiry={handleOpenEnquiry} />

        {/* 4-Stage Sacred Extraction Timeline */}
        <ExtractionJourney />

        {/* Biochemical Botanical Synergy & Active Matrix */}
        <IngredientSynergyMatrix onSelectProduct={setSelectedProduct} />

        {/* 24-Hour Dinacharya Regimen Planner */}
        <RegimenPlanner onOpenEnquiry={handleOpenEnquiry} />

        {/* Brand Story & Philosophy ("Rooted in Tradition. Presented for Today.") */}
        <EditorialStory />

        {/* Foundational Botanicals Pharmacopoeia */}
        <BotanicalExplorer />

        {/* Dual Gateways for Doctors and Trade Distributors */}
        <PractitionerB2B onOpenEnquiry={handleOpenEnquiry} />

        {/* Official Desk, Interactive Form & Google Map */}
        <EnquirySection key={enquiryInitialType} defaultType={enquiryInitialType} />

        {/* Keyboard-Accessible FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Luxury Brand Footer */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

      {/* Product Formulation Dossier Modal with Pack Variant Switcher */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenEnquiry={handleOpenEnquiry}
        />
      )}

      {/* Global Quick Enquiry Modal */}
      <QuickEnquiryModal
        key={enquiryModalOpen ? enquiryInitialType : "closed"}
        isOpen={enquiryModalOpen}
        initialType={enquiryInitialType}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </div>
  );
}
