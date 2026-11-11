import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

// Gold dot + trailing ring; the ring swells over anything clickable.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return undefined;
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    window.addEventListener("pointermove", () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 }), { once: true });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.15 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.15 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e) => {
      const hot = e.target.closest("a, button, label, [data-row]");
      gsap.to(ring.current, { scale: hot ? 1.9 : 1, duration: 0.5, ease: "expo.out" });
      gsap.to(dot.current, { scale: hot ? 0 : 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <span ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-gold opacity-0" />
      <span
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 rounded-full border border-gold/60 opacity-0 mix-blend-difference"
      />
    </>
  );
}
