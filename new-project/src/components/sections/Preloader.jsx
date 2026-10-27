import { useLayoutEffect, useRef, useState } from "react";
import Crest from "../ui/Crest";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { site } from "../../data/site";

function markReady() {
  document.documentElement.dataset.ready = "true";
  window.lenis?.start();
  window.dispatchEvent(new Event("charak:ready"));
}

export default function Preloader() {
  const root = useRef(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      markReady();
      setDone(true);
      return undefined;
    }
    window.lenis?.stop();
    const ctx = gsap.context(() => {
      const paths = root.current.querySelectorAll("[data-draw]");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap
        .timeline({ onComplete: () => setDone(true) })
        .to(paths, { strokeDashoffset: 0, duration: 1.6, stagger: 0.04, ease: "power2.inOut" })
        .from("[data-pre-word] span", { yPercent: 120, stagger: 0.035, duration: 1 }, "-=0.9")
        .from("[data-pre-line]", { scaleX: 0, duration: 1.1, ease: "power3.inOut" }, "<")
        .to("[data-pre-inner]", { opacity: 0, y: -30, duration: 0.6, ease: "power2.in" }, "+=0.35")
        .add(markReady)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut" }, "<");
    }, root);
    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      style={{ clipPath: "inset(0 0 0 0)" }}
      aria-hidden="true"
    >
      <div data-pre-inner className="flex flex-col items-center text-gold">
        <Crest className="h-24 w-24 sm:h-28 sm:w-28" />
        <p data-pre-word className="mt-8 flex overflow-hidden font-display text-3xl font-light tracking-[0.3em] text-ivory sm:text-4xl">
          {site.brand.toUpperCase().split("").map((c, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {c}
            </span>
          ))}
        </p>
        <span data-pre-line className="hairline mt-6 block w-56" />
        <p className="mt-5 font-deva text-lg text-gold/80">{site.sanskrit}</p>
      </div>
    </div>
  );
}
