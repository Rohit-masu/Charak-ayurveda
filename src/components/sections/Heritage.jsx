import SplitText from "../bits/SplitText";
import Crest from "../ui/Crest";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { images } from "../../data/products";

// Statements about the name and the range only. Nothing here describes packaging or materials,
// because real pack details are not confirmed yet.
const craft = [
  { k: "The text", v: "The Charaka Samhita, one of the classical texts of Ayurveda." },
  { k: "The name", v: "Charak Ayurveda carries that name, and its crest, into a modern range." },
  { k: "The range", v: "Rati Shakti for men and for women, with more formulations to follow." },
];

export default function Heritage() {
  const ref = useGsap(() => {
    if (prefersReducedMotion()) return;
    gsap
      .timeline({
        scrollTrigger: { trigger: "[data-reveal]", start: "top top", end: "+=120%", pin: true, scrub: 1 },
      })
      .fromTo(
        "[data-reveal-img]",
        { clipPath: "inset(22% 26% 22% 26% round 400px 400px 24px 24px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "none" }
      )
      .fromTo("[data-reveal-img] img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0)
      .fromTo("[data-reveal-copy]", { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: "none" }, 0.45)
      .fromTo("[data-reveal-title]", { letterSpacing: "0.5em" }, { letterSpacing: "0.02em", ease: "none" }, 0);

    gsap.fromTo(
      "[data-craft-img]",
      { yPercent: -8, scale: 1.15 },
      { yPercent: 8, scale: 1.15, ease: "none", scrollTrigger: { trigger: "[data-craft]", start: "top bottom", end: "bottom top", scrub: true } }
    );
    gsap.from("[data-craft-item]", {
      x: -40,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: "[data-craft]", start: "top 70%", once: true },
    });
  });

  return (
    <section ref={ref} id="heritage" className="relative bg-charcoal text-ivory">
      <div data-reveal className="relative h-[100svh] overflow-hidden">
        <p
          data-reveal-title
          aria-hidden="true"
          className="absolute inset-x-0 top-[12%] z-0 text-center font-display text-[11vw] font-light leading-none text-ivory/[0.06]"
        >
          HERITAGE
        </p>
        <div data-reveal-img className="absolute inset-0 overflow-hidden">
          <img
            src={images.manuscript}
            alt="A palm-leaf manuscript beside a bronze mortar on a stone table"
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: "65% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/5" />
        </div>
        <div data-reveal-copy className="shell absolute inset-x-0 bottom-0 z-10 pb-16 sm:pb-24">
          <p className="label text-bronze-light">Chapter 04 — Heritage</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.8rem,6vw,6.5rem)] lg:col-span-7">
              Rooted in a <em className="accent-text font-normal">living</em> tradition.
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-ivory/80 lg:col-span-4 lg:col-start-9">
              The Charaka Samhita is one of the principal classical texts of Ayurveda, traditionally attributed to the physician
              Charaka. Charak Ayurveda takes its name, and its crest, from that tradition.
            </p>
          </div>
        </div>
      </div>

      <div data-craft className="relative overflow-hidden py-28 sm:py-40">
        <div className="shell grid items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden arch border border-bronze/25">
              <img
                data-craft-img
                src={images.craft}
                alt="Dried herbs on a bronze apothecary scale beside amber jars"
                width="1600"
                height="2000"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Crest className="h-14 w-14 text-bronze" />
            <SplitText className="display mt-8 text-[clamp(2.6rem,4.6vw,4.8rem)]">
              A classic, <em className="accent-text font-normal">carried forward.</em>
            </SplitText>
            <dl className="mt-12 space-y-0 border-t border-ivory/10">
              {craft.map((c, i) => (
                <div key={c.k} data-craft-item className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ivory/10 py-6">
                  <dt className="font-display text-2xl italic text-bronze">0{i + 1}</dt>
                  <dd>
                    <span className="block font-display text-2xl text-ivory">{c.k}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ivory/65">{c.v}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
