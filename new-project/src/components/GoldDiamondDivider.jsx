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
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: dividerRef.current,
                start: "top 90%",
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

  const strokeColor = light ? "#b8924a" : "#c9a45c";

  return (
    <div
      ref={dividerRef}
      className={`w-full flex justify-center items-center py-6 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl h-8 px-4"
        style={{ overflow: "visible" }}
      >
        {/* Left Hairline */}
        <path
          className="diamond-divider-path"
          d="M 20 20 L 375 20"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.35"
        />

        {/* Center Sacred Diamond Geometry */}
        {/* Outer Faceted Diamond */}
        <path
          className="diamond-divider-path"
          d="M 400 8 L 412 20 L 400 32 L 388 20 Z"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.85"
        />

        {/* Inner Jewel Diamond */}
        <path
          className="diamond-divider-path"
          d="M 400 13 L 406 20 L 400 27 L 394 20 Z"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />

        {/* Flanking Diamond Wing Points */}
        <path
          className="diamond-divider-path"
          d="M 382 20 L 385 20"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        <path
          className="diamond-divider-path"
          d="M 415 20 L 418 20"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />

        {/* Right Hairline */}
        <path
          className="diamond-divider-path"
          d="M 425 20 L 780 20"
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      </svg>
    </div>
  );
}
