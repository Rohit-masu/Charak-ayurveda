import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AttributesStrip() {
  const stripRef = useRef(null);

  const items = [
    {
      num: "01",
      title: "Classical Lineage",
      desc: "Rooted in authentic Charaka Samhita scriptures and Vedic pharmacology.",
    },
    {
      num: "02",
      title: "Botanical Integrity",
      desc: "Wild-harvested Himalayan herbs with zero synthetic excipients or binders.",
    },
    {
      num: "03",
      title: "Disciplined Assays",
      desc: "Standardized batch testing with NABL heavy-metal and purity validation.",
    },
    {
      num: "04",
      title: "Clinical Practice",
      desc: "Dedicated clinical supply network formulated for certified BAMS doctors.",
    },
  ];

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".trust-col", {
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: "power2.out",
      });
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stripRef}
      id="trust-strip"
      aria-label="Brand Trust Indicators"
      style={{
        position: "relative",
        zIndex: 20,
        backgroundColor: "#06150f",
        borderTop: "1px solid rgba(201, 164, 92, 0.25)",
        borderBottom: "1px solid rgba(201, 164, 92, 0.25)",
        padding: "3.5rem 0",
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={item.num}
              className="trust-col group relative flex flex-col justify-start"
              style={{
                padding: "1rem 1.75rem",
                borderRight:
                  idx < items.length - 1
                    ? "1px solid rgba(201, 164, 92, 0.25)"
                    : "none",
                transition: "opacity 0.3s ease",
              }}
            >
              {/* Large Cormorant Numeral with Hover Underline Draw */}
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  alignSelf: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                    fontSize: "clamp(2.4rem, 3.2vw, 3.4rem)",
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "rgba(201, 164, 92, 0.6)",
                    display: "block",
                  }}
                >
                  {item.num}
                </span>

                {/* 1px Gold Line Draws Left-to-Right on Column Hover */}
                <span
                  className="numeral-draw-line"
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: 0,
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#c9a45c",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              {/* Title in Ivory (Manrope 500, 15px) - Turns Gold on Hover */}
              <h3
                className="trust-title"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  lineHeight: 1.35,
                  color: "#faf8f2",
                  marginBottom: "0.45rem",
                  transition: "color 0.3s ease",
                }}
              >
                {item.title}
              </h3>

              {/* Description in Ivory 60% (13px, Max 2 Lines) */}
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: "rgba(250, 248, 242, 0.6)",
                  maxHeight: "3em",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Hover Effects: Title turns gold, 1px line draws under numeral */
        .trust-col:hover .trust-title {
          color: #c9a45c !important;
        }

        .trust-col:hover .numeral-draw-line {
          transform: scaleX(1) !important;
        }

        @media (max-width: 768px) {
          .trust-col {
            border-right: none !important;
            border-bottom: 1px solid rgba(201, 164, 92, 0.2) !important;
            padding: 1.75rem 0.5rem !important;
          }
          .trust-col:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
