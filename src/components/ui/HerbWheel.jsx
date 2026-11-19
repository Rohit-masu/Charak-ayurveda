import { useEffect, useId, useRef } from "react";
import HerbIcon from "./HerbIcons";
import Crest from "./Crest";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { botanicals, images } from "../../data/products";
import { site } from "../../data/site";

// Hero visual: the product still in a porthole, ringed by line-drawn classical botanicals that orbit
// slowly while staying upright. The herbs are decoration only and are not named as ingredients.
export default function HerbWheel({ className = "" }) {
  const root = useRef(null);
  const id = useId().replace(/:/g, "");
  const ring = `${site.brand}  ✦  ${site.sanskrit}  ✦  चरक संहिता  ✦  Ayurveda  ✦  `.repeat(2);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.to("[data-orbit]", { rotate: 360, duration: 90, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-item]", { rotate: -360, duration: 90, ease: "none", repeat: -1 });
      gsap.to("[data-names]", { rotate: -360, duration: 140, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.fromTo("[data-porthole] img", { scale: 1.02 }, { scale: 1.1, yPercent: -2, duration: 16, ease: "sine.inOut", yoyo: true, repeat: -1 });
      el.querySelectorAll("[data-float]").forEach((dot, i) => {
        gsap.to(dot, { yPercent: i % 2 ? 60 : -60, rotate: i % 2 ? 14 : -12, duration: 3 + i * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    }, el);

    if (!window.matchMedia("(pointer: fine)").matches) return () => ctx.revert();
    const layers = [...el.querySelectorAll("[data-depth]")].map((n) => ({
      x: gsap.quickTo(n, "x", { duration: 1.4, ease: "power3.out" }),
      y: gsap.quickTo(n, "y", { duration: 1.4, ease: "power3.out" }),
      d: Number(n.dataset.depth),
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
    return () => {
      window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className={`relative aspect-square ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(179,144,95,0.22), transparent 68%)" }}
      />

      {/* rotating brand ring */}
      <div data-depth="-10" className="absolute inset-0">
        <svg data-names viewBox="0 0 200 200" className="h-full w-full text-bronze-dark/70" aria-hidden="true">
          <defs>
            <path id={id} d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
          </defs>
          <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <text className="fill-current font-deva" style={{ fontSize: "5.4px", letterSpacing: "0.1em" }}>
            <textPath href={`#${id}`} textLength="588">
              {ring}
            </textPath>
          </text>
        </svg>
      </div>

      {/* orbiting botanicals */}
      <div data-depth="14" className="absolute inset-[9%]" aria-hidden="true">
        <div data-orbit className="relative h-full w-full rounded-full border border-dashed border-bronze/35">
          {botanicals.map((b, i) => {
            const a = (i / botanicals.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <div
                key={b.name}
                className="absolute h-[15%] w-[15%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
              >
                <div
                  data-orbit-item
                  className="grid h-full w-full place-items-center rounded-full border border-bronze/40 bg-paper/90 p-[10%] text-bronze-dark shadow-[0_14px_30px_-12px_rgba(30,28,26,0.35)] backdrop-blur"
                >
                  <HerbIcon name={b.name} className="h-full w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* centre porthole */}
      <div data-depth="24" className="absolute inset-[17%]">
        <div
          data-porthole
          className="relative h-full w-full overflow-hidden rounded-full border border-bronze/60 bg-[#F1EADF] shadow-[0_40px_80px_-30px_rgba(30,28,26,0.5)]"
        >
          <img
            src={images.heroDuo}
            alt="Rati Shakti Men and Rati Shakti Women packs on a stone plinth (concept visual)"
            width="1024"
            height="1024"
            fetchpriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 62%" }}
          />
          <span className="absolute inset-[4%] rounded-full border border-bronze/30" />
        </div>
        <div className="absolute -bottom-[7%] left-1/2 grid h-[22%] w-[22%] -translate-x-1/2 place-items-center rounded-full border border-bronze/60 bg-charcoal text-bronze">
          <Crest className="h-[70%] w-[70%]" />
        </div>
      </div>

      {/* drifting diamonds */}
      {[
        "left-[2%] top-[14%] h-4 w-4",
        "right-[1%] top-[30%] h-3 w-3",
        "left-[8%] bottom-[10%] h-3 w-3",
        "right-[10%] bottom-[4%] h-5 w-5",
      ].map((pos, i) => (
        <svg key={pos} data-float data-depth={30 + i * 6} viewBox="0 0 20 20" className={`absolute ${pos} text-bronze/70`} aria-hidden="true">
          <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
