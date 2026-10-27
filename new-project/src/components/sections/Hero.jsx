import { useEffect, useRef } from "react";
import SplitText from "../bits/SplitText";
import CircularText from "../bits/CircularText";
import ArrowLink from "../ui/ArrowLink";
import Crest from "../ui/Crest";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { images } from "../../data/products";
import { site } from "../../data/site";

export default function Hero() {
  const stage = useRef(null);

  const scope = useGsap((el) => {
    if (prefersReducedMotion()) return;
    const intro = gsap.timeline({ paused: true });
    intro
      .from("[data-hero-product]", { y: 120, opacity: 0, scale: 0.92, duration: 2, ease: "expo.out" })
      .from("[data-hero-arch]", { scaleY: 0, transformOrigin: "bottom", duration: 1.8, ease: "expo.inOut" }, 0)
      .from("[data-hero-fade]", { y: 24, opacity: 0, stagger: 0.1, duration: 1.2 }, 0.5);
    const play = () => intro.play();
    if (document.documentElement.dataset.ready) play();
    else window.addEventListener("charak:ready", play, { once: true });

    // Scroll-out: product rises and blooms while the copy drifts away.
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 } })
      .to("[data-hero-product]", { yPercent: -18, scale: 1.12, ease: "none" }, 0)
      .to("[data-hero-copy]", { yPercent: -40, opacity: 0, ease: "none" }, 0)
      .to("[data-hero-aura]", { scale: 1.6, opacity: 0.2, ease: "none" }, 0);
  });

  // Pointer parallax on the product stage.
  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const layers = [...el.querySelectorAll("[data-depth]")].map((node) => ({
      x: gsap.quickTo(node, "x", { duration: 1.4, ease: "power3.out" }),
      y: gsap.quickTo(node, "y", { duration: 1.4, ease: "power3.out" }),
      d: Number(node.dataset.depth),
    }));
    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(nx * l.d);
        l.y(ny * l.d);
      });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section ref={scope} id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink pt-24">
      {/* atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-25"
        style={{ backgroundImage: `url(${images.garden})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/85 to-ink" />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap font-deva text-[34vw] leading-none text-ivory/[0.035]"
      >
        चरक
      </p>

      <div className="shell relative grid min-h-[calc(100svh-6rem)] grid-cols-12 items-center gap-y-10 pb-16">
        {/* product stage */}
        <div
          ref={stage}
          className="relative col-span-12 row-start-2 mx-auto w-full max-w-[640px] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:max-w-none lg:translate-x-[6%] lg:scale-110"
        >
          <div
            data-hero-aura
            data-depth="-14"
            aria-hidden="true"
            className="absolute left-[2.5%] top-1/2 -mt-[47.5%] aspect-square w-[95%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,164,92,0.32) 0%, rgba(201,164,92,0.08) 40%, transparent 68%)" }}
          />
          <div
            data-hero-arch
            data-depth="10"
            aria-hidden="true"
            className="absolute left-[19%] top-[-6%] h-[100%] w-[62%] rounded-t-full border border-b-0 border-gold/30"
            style={{ maskImage: "linear-gradient(to bottom, #000 55%, transparent)" }}
          >
            <span className="absolute inset-3 bottom-0 rounded-t-full border border-b-0 border-gold/10" />
          </div>
          <div data-depth="26" className="relative z-10">
            <img
              data-hero-product
              src={images.lineupGreen}
              alt="Rati Shakti capsule bottles in 15, 30, 60 and 90 capsule sizes"
              width="1400"
              height="981"
              fetchpriority="high"
              className="w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
          <div data-hero-fade className="absolute -top-2 right-[4%] z-20 text-gold lg:right-[10%] lg:top-[-4%]">
            <CircularText text={`${site.brand} · ${site.sanskrit} · Ayurveda · `} size={128}>
              <Crest className="h-12 w-12" />
            </CircularText>
          </div>
        </div>

        {/* copy */}
        <div data-hero-copy className="relative z-20 col-span-12 row-start-1 lg:col-span-7 lg:col-start-1">
          <p data-hero-fade className="label mb-8 flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold" />
            Inspired by the Charaka Samhita
          </p>
          <SplitText
            as="h1"
            trigger="ready"
            stagger={0.12}
            delay={0.15}
            className="display text-[clamp(3.4rem,9.2vw,9.5rem)] text-ivory"
          >
            The wisdom
            <br />
            of Ayurveda, <em className="gold-text font-normal">carried</em>
            <br />
            <em className="gold-text font-normal">forward.</em>
          </SplitText>
          <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end">
            <p data-hero-fade className="max-w-sm text-[15px] leading-relaxed text-ivory/70">
              Proprietary Ayurvedic formulations from Charak Ayurveda — presented with the care of a classical text.
            </p>
            <div data-hero-fade className="flex flex-wrap items-center gap-4">
              <ArrowLink href="#collection">Explore the range</ArrowLink>
            </div>
          </div>
        </div>
      </div>

      <div data-hero-fade className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="label text-[9px] text-ivory/50">Scroll</span>
        <span className="block h-12 w-px overflow-hidden bg-ivory/10">
          <span className="block h-full w-full animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
    </section>
  );
}
