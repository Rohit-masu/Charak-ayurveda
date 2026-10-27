import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/motion";
import { enquiryTypes } from "./data/site";
import Cursor from "./components/bits/Cursor";
import Preloader from "./components/sections/Preloader";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Tapes from "./components/sections/Tapes";
import Manifesto from "./components/sections/Manifesto";
import Collection from "./components/sections/Collection";
import Botanicals from "./components/sections/Botanicals";
import Heritage from "./components/sections/Heritage";
import Professionals from "./components/sections/Professionals";
import Contact from "./components/sections/Contact";
import Faq from "./components/sections/Faq";
import Footer from "./components/sections/Footer";
import ProductDialog from "./components/sections/ProductDialog";

export default function App() {
  const [dialog, setDialog] = useState(null);
  const [enquiryType, setEnquiryType] = useState(enquiryTypes[0]);

  // Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.lenis = lenis;
    if (!document.documentElement.dataset.ready) lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  // Pinned sections measure layout; re-measure once web fonts settle.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const openProduct = useCallback((product, pack = 0) => setDialog({ product, pack }), []);
  const closeProduct = useCallback(() => setDialog(null), []);

  return (
    <>
      <a href="#collection" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink">
        Skip to the collection
      </a>
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Tapes />
        <Manifesto />
        <Collection onOpen={openProduct} />
        <Botanicals />
        <Heritage />
        <Professionals onChooseType={setEnquiryType} />
        <Contact type={enquiryType} onTypeChange={setEnquiryType} />
        <Faq />
      </main>
      <Footer onOpen={openProduct} />
      {dialog && <ProductDialog product={dialog.product} initialPack={dialog.pack} onClose={closeProduct} />}
    </>
  );
}
