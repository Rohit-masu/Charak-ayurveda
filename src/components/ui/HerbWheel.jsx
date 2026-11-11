import { useEffect, useId, useRef } from "react";
import HerbIcon from "./HerbIcons";
import Crest from "./Crest";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { botanicals, images } from "../../data/products";

// Hero visual: a herb-garden porthole ringed by the nine label botanicals,
// which orbit slowly while staying upright. Swap images.heroBotanical to change the centre photo.
export default function HerbWheel({ className = "" }) {
  const root = useRef(null);
  const id = useId().replace(/:/g, "");
  const names = botanicals.map((b) => `${b.deva} · ${b.name}`).join("  ✦  ") + "  ✦  ";

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.to("[data-orbit]", { rotate: 360, duration: 90, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-item]", { rotate: -360, duration: 90, ease: "none", repeat: -1 });
      gsap.to("[data-names]", { rotate: -360, duration: 140, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      gsap.fromTo("[data-porthole] img", { scale: 1.15 }, { scale: 1.32, xPercent: -4, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
      el.querySelectorAll("[data-float]").forEach((leaf, i) => {
        gsap.to(leaf, { yPercent: i % 2 ? 60 : -60, rotate: i % 2 ? 14 : -12, duration: 3 + i * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
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
        style={{ background: "radial-gradient(circle, rgba(201,164,92,0.28), transparent 68%)" }}
      />

      {/* rotating name ring */}
      <div data-depth="-10" className="absolute inset-0">
        <svg data-names viewBox="0 0 200 200" className="h-full w-full text-gold/55" aria-hidden="true">
          <defs>
            <path id={id} d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
          </defs>
          <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <text className="fill-current font-deva" style={{ fontSize: "5.6px", letterSpacing: "0.08em" }}>
            <textPath href={`#${id}`} textLength="588">
              {names}
            </textPath>
          </text>
        </svg>
      </div>

      {/* orbiting botanicals */}
      <div data-depth="14" className="absolute inset-[9%]">
        <div data-orbit className="relative h-full w-full rounded-full border border-dashed border-gold/25">
          {botanicals.map((b, i) => {
            const a = (i / botanicals.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <div
                key={b.name}
                className="absolute h-[17%] w-[17%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
              >
                <div
                  data-orbit-item
                  title={b.name}
                  className="grid h-full w-full place-items-center rounded-full border border-gold/30 bg-ink/85 p-[9%] text-gold shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur"
                >
                  <HerbIcon name={b.name} className="h-full w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* centre porthole */}
      <div data-depth="24" className="absolute inset-[22%]">
        <div data-porthole className="relative h-full w-full overflow-hidden rounded-full border border-gold/50 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <img
            src={images.heroBotanical}
            alt="Ayurvedic herbs growing in a garden"
            width="1376"
            height="768"
            fetchpriority="high"
            className="h-full w-full object-cover"
            style={{ objectPosition: "52% 78%" }}
          />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,transparent_45%,rgba(6,21,15,0.7))]" />
          <span className="absolute inset-[5%] rounded-full border border-gold/25" />
        </div>
        <div className="absolute -bottom-[7%] left-1/2 grid h-[24%] w-[24%] -translate-x-1/2 place-items-center rounded-full border border-gold/50 bg-ink text-gold">
          <Crest className="h-[70%] w-[70%]" />
        </div>
      </div>

      {/* drifting leaves */}
      {[
        "left-[2%] top-[14%] h-10 w-10",
        "right-[0%] top-[30%] h-8 w-8",
        "left-[8%] bottom-[10%] h-7 w-7",
        "right-[10%] bottom-[4%] h-11 w-11",
      ].map((pos, i) => (
        <svg key={pos} data-float data-depth={30 + i * 6} viewBox="0 0 24 24" className={`absolute ${pos} text-gold/70`} aria-hidden="true">
          <path d="M12 22 C 4 16, 4 6, 12 2 C 20 6, 20 16, 12 22 Z M12 22 L12 4" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
