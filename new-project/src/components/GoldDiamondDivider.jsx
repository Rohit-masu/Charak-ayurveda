import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GoldDiamondDivider({ className = "", light = false }) {
  const dividerRef = useRef(null);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (dividerRef.current) {
        const paths = dividerRef.current.querySelectorAll(".diamond-divider-path");
        paths.forEach((path) => {
          try {
            const len = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: len,
              strokeDashoffset: len,
            });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: dividerRef.current,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            });
          } catch {
            // fallback
          }
        });
      }
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  const strokeColor = light ? "#b8924a" : "#cba864";

  return (
    <div
      ref={dividerRef}
      className={`w-full flex justify-center items-center py-7 ${className}`}
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    >
      <svg
        viewBox="0 0 900 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl h-9 px-4"
        style={{ overflow: "visible" }}
      >
        {/* Left Hairline */}
        <path
          className="diamond-divider-path"
          d="M 20 22 L 390 22"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.32"
        />

        {/* Left Flanking Botanical Leaf Sprout */}
        <path
          className="diamond-divider-path"
          d="M 405 22 C 405 22 415 16 422 22 C 415 28 405 22 405 22 Z"
          stroke={strokeColor}
          strokeWidth="0.9"
          strokeOpacity="0.75"
        />

        {/* Center Sacred Diamond Geometry */}
        {/* Outer Faceted Diamond */}
        <path
          className="diamond-divider-path"
          d="M 450 7 L 464 22 L 450 37 L 436 22 Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />

        {/* Inner Jewel Diamond */}
        <path
          className="diamond-divider-path"
          d="M 450 13 L 458 22 L 450 31 L 442 22 Z"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeOpacity="0.65"
          fill="rgba(203, 168, 100, 0.12)"
        />

        {/* Right Flanking Botanical Leaf Sprout */}
        <path
          className="diamond-divider-path"
          d="M 495 22 C 495 22 485 16 478 22 C 485 28 495 22 495 22 Z"
          stroke={strokeColor}
          strokeWidth="0.9"
          strokeOpacity="0.75"
        />

        {/* Right Hairline */}
        <path
          className="diamond-divider-path"
          d="M 510 22 L 880 22"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.32"
        />
      </svg>
    </div>
  );
}
