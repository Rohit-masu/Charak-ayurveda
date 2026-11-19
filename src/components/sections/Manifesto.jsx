import ScrollReveal from "../bits/ScrollReveal";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { products } from "../../data/products";

const pack = products[0];

// The pack facts that used to sit here as three pillars now live in the "Why choose" grid (WhyChoose.jsx).
export default function Manifesto() {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      "[data-float-pack]",
      { yPercent: 25, rotate: -4 },
      { yPercent: -25, rotate: 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-ivory py-28 text-charcoal sm:py-40">
      <div className="shell grid grid-cols-12 gap-y-16">
        <div className="col-span-12 flex items-center justify-between lg:col-span-12">
          <p className="label text-bronze-dark">Chapter 01 — The Name</p>
          <p className="font-deva text-lg text-bronze-dark">चरक संहिता</p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <ScrollReveal
            className="font-display text-[clamp(2rem,3.9vw,4rem)] font-light leading-[1.08] tracking-[-0.015em]"
            accent={["Charaka", "Samhita", "care"]}
            accentClassName="italic text-bronze-dark"
            text="Our name comes from the Charaka Samhita, one of the foundational texts of Ayurveda. We carry its spirit into a focused range of proprietary formulations — and present each one with the care a classic deserves."
          />
        </div>

        <div className="relative col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div data-float-pack className="absolute right-0 top-0 w-[78%] overflow-hidden arch border border-sandstone bg-sand shadow-[0_40px_70px_-40px_rgba(30,28,26,0.45)]">
            <img src={pack.images.light} alt="" width="1024" height="1024" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
