import SplitText from "../bits/SplitText";
import ArrowLink from "../ui/ArrowLink";
import HerbWheel from "../ui/HerbWheel";
import { gsap, prefersReducedMotion, scrollToHash, useGsap } from "../../lib/motion";
import { images } from "../../data/products";

const notes = ["100% Ayurvedic", "Herbal & vegetarian", "Made by Charak Ayurveda"];

export default function Hero() {
  const scope = useGsap((el) => {
    if (prefersReducedMotion()) return;
    const intro = gsap.timeline({ paused: true });
    intro
      .from("[data-hero-wheel]", { scale: 0.8, opacity: 0, rotate: -25, duration: 2.2, ease: "expo.out" })
      .from("[data-hero-fade]", { y: 24, opacity: 0, stagger: 0.1, duration: 1.2 }, 0.5);
    const play = () => intro.play();
    if (document.documentElement.dataset.ready) play();
    else window.addEventListener("charak:ready", play, { once: true });

    // Scroll-out: the wheel drifts up and grows while the copy fades.
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 } })
      .to("[data-hero-wheel]", { yPercent: -12, scale: 1.08, ease: "none" }, 0)
      .to("[data-hero-copy]", { yPercent: -30, opacity: 0, ease: "none" }, 0);
  });

  return (
    <section ref={scope} id="top" className="relative isolate overflow-hidden bg-ink pt-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-20"
        style={{ backgroundImage: `url(${images.garden})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/90 to-ink" />

      <div className="shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-0">
        <div data-hero-copy className="relative z-20 lg:col-span-6 xl:col-span-5">
          <p data-hero-fade className="label flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold" />
            Inspired by the Charaka Samhita
          </p>
          <SplitText
            as="h1"
            trigger="ready"
            stagger={0.12}
            delay={0.15}
            className="display mt-6 text-[clamp(2.9rem,5.4vw,5.6rem)] leading-[1] text-ivory"
          >
            The wisdom of
            <br />
            Ayurveda, <em className="gold-text font-normal">carried</em>
            <br />
            <em className="gold-text font-normal">forward.</em>
          </SplitText>
          <p data-hero-fade className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/70">
            Proprietary Ayurvedic formulations from Charak Ayurveda — presented with the care of a classical text.
          </p>
          <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-6">
            <ArrowLink href="#collection">Explore the range</ArrowLink>
            <a
              href="#professionals"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#professionals");
              }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory/70 underline decoration-gold/50 underline-offset-8 transition-colors hover:text-gold"
            >
              For professionals
            </a>
          </div>
          <ul data-hero-fade className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory/10 pt-6">
            {notes.map((n) => (
              <li key={n} className="flex items-center gap-2 text-xs text-ivory/55">
                <span className="h-1 w-1 rotate-45 bg-gold" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <div data-hero-wheel className="mx-auto w-full max-w-[min(620px,82vh)]">
            <HerbWheel />
          </div>
        </div>
      </div>
    </section>
  );
}
