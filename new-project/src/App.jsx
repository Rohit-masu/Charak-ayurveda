import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import BotanicalCanvas from "./components/BotanicalCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ManifestoSection from "./components/ManifestoSection";
import GoldDiamondDivider from "./components/GoldDiamondDivider";
import FormulationsSection from "./components/FormulationsSection";
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialType, setEnquiryInitialType] = useState("Doctor / Clinical Practice");

  // Luxury Smooth Scrolling with Lenis synchronized to GSAP ScrollTrigger
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  const handleOpenEnquiry = (type = "Doctor / Clinical Practice") => {
    setEnquiryInitialType(type);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#051610] text-[#faf8f2] relative">
      {/* Ambient Floating Golden Pollen / Spores Canvas */}
      <BotanicalCanvas />

      {/* Sticky Glass Navbar */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Page Content */}
      <main id="main-content" style={{ position: "relative", zIndex: 10 }}>
        {/* Asymmetrical Editorial Hero with Interactive Product Stage Switcher */}
        <Hero onSelectProduct={setSelectedProduct} />

        {/* STEP 2: Manifesto Section (Dark green #06150f, word scrub reveal, 4 count-up stats) */}
        <ManifestoSection />

        {/* STEP 4: Thin Gold Diamond SVG Divider that draws itself on scroll */}
        <GoldDiamondDivider />

        {/* STEP 3: Merged Formulations Section (Ivory #F4EFE3, huge list rows, sticky product stage) */}
        <FormulationsSection onSelectProduct={setSelectedProduct} />

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
