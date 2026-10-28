import ScrollReveal from "../bits/ScrollReveal";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { products } from "../../data/products";

const pillars = [
  { title: "100% Ayurvedic", text: "As printed on every pack in the range." },
  { title: "Herbal & vegetarian", text: "Capsules labelled herbal, natural and vegetarian." },
  { title: "Made by Charak Ayurveda", text: "Proprietary formulations under our own name." },
];

const box = products[0].packs[1];

export default function Manifesto() {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      "[data-float-pack]",
      { yPercent: 25, rotate: -10 },
      { yPercent: -25, rotate: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.from("[data-pillar]", {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: "[data-pillars]", start: "top 85%", once: true },
    });
  });

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-ivory py-28 text-ink sm:py-40">
      <div className="shell grid grid-cols-12 gap-y-16">
        <div className="col-span-12 flex items-center justify-between lg:col-span-12">
          <p className="label text-gold-dark">Chapter 01 — The Name</p>
          <p className="font-deva text-lg text-gold-dark">चरक संहिता</p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <ScrollReveal
            className="font-display text-[clamp(2rem,3.9vw,4rem)] font-light leading-[1.08] tracking-[-0.015em]"
            accent={["Charaka", "Samhita", "care"]}
            text="Our name comes from the Charaka Samhita, one of the foundational texts of Ayurveda. We carry its spirit into a focused range of proprietary formulations — and present each one with the care a classic deserves."
          />
        </div>

        <div className="relative col-span-12 hidden lg:col-span-4 lg:col-start-9 lg:block">
          <img
            data-float-pack
            src={box.image}
            alt=""
            width="1400"
            height="855"
            loading="lazy"
            className="absolute right-[-14%] top-0 w-[114%] max-w-none drop-shadow-[0_40px_40px_rgba(6,21,15,0.25)]"
          />
        </div>

        <div data-pillars className="col-span-12 grid overflow-hidden rounded-[28px] border border-ink/10 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-pillar
              className="group border-ink/10 p-8 transition-colors duration-700 hover:bg-ink [&:not(:first-child)]:border-t sm:p-10 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
            >
              <span className="font-display text-5xl italic text-gold-dark transition-colors duration-700 group-hover:text-gold">
                0{i + 1}
              </span>
              <SplitText as="h3" className="mt-10 font-display text-3xl transition-colors duration-700 group-hover:text-ivory">
                {p.title}
              </SplitText>
              <p className="mt-3 text-sm leading-relaxed text-ink/60 transition-colors duration-700 group-hover:text-ivory/60">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
