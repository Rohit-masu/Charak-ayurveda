import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: "expo.out", duration: 1.2 });

export { gsap, ScrollTrigger, SplitText };

// The client wants the full motion experience everywhere, so the OS "reduce motion" signal is ignored by
// default (many Windows machines send it just because "Animation effects" is off). Set this to true to
// honour it again; the matching CSS rule in index.css keys off the `reduce-motion` class set here.
const RESPECT_OS_REDUCED_MOTION = false;

export const prefersReducedMotion = () =>
  RESPECT_OS_REDUCED_MOTION &&
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion()) document.documentElement.classList.add("reduce-motion");

// Runs GSAP setup scoped to a ref and reverts everything on unmount.
export function useGsap(setup, deps = []) {
  const scope = useRef(null);
  useLayoutEffect(() => {
    if (!scope.current) return undefined;
    const ctx = gsap.context(() => setup(scope.current), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps are passed through by the caller
  }, deps);
  return scope;
}

export function scrollToHash(href) {
  const target = document.querySelector(href);
  if (!target) return;
  if (window.lenis) window.lenis.scrollTo(target, { offset: 0, duration: 1.6 });
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
