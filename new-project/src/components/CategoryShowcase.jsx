import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "../data/catalog";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryShowcase({ onSelectCategory }) {
  // Filter out the "all" category for the 4 classical feature panels
  const featureCategories = categories.filter((c) => c.id !== "all");

  const [hoveredIdx, setHoveredIdx] = useState(0); // Default first panel active or expands on hover
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState(0);

  const sectionRef = useRef(null);
  const dividerRef = useRef(null);
  const headingRef = useRef(null);
  const panelsRef = useRef(null);

  const handleSelect = (categoryId) => {
    if (onSelectCategory) {
      onSelectCategory(categoryId);
    }
    const target = document.getElementById("catalog") || document.getElementById("formulations");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* =========================================================================
     GSAP SCROLL ANIMATIONS: Lotus Divider Draw & SplitText Line Mask Reveal
     ========================================================================= */
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Lotus/Diamond SVG Divider: Draws itself on scroll
      if (dividerRef.current) {
        const paths = dividerRef.current.querySelectorAll(".lotus-path");
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
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          } catch {
            // fallback if getTotalLength not supported in test env
          }
        });
      }

      // 2. Section Heading SplitText Line Mask Reveal
      if (headingRef.current) {
        gsap.from(".split-line-mask", {
          y: "115%",
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // 3. Desktop Panels Entrance: Staggered reveal
      if (panelsRef.current) {
        gsap.from(".category-panel-desktop", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panelsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="formulations"
      aria-label="Ayurvedic Formulations by Category"
      style={{
        position: "relative",
        zIndex: 20,
        backgroundColor: "#F4EFE3", // Point 3: Ivory Background
        color: "#0b2a1d",           // Point 3: Deep Green Text
        padding: "6rem 0 7rem",
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* ===================================================================
            POINT 5: THIN GOLD LOTUS/DIAMOND SVG DIVIDER THAT DRAWS ON SCROLL
            =================================================================== */}
        <div
          ref={dividerRef}
          className="w-full flex justify-center items-center mb-16"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 720 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-3xl h-10"
            style={{ overflow: "visible" }}
          >
            {/* Left Hairline */}
            <path
              className="lotus-path"
              d="M 10 20 L 320 20"
              stroke="#b8924a"
              strokeWidth="1"
              strokeOpacity="0.4"
            />

            {/* Center Sacred Lotus / Diamond Motif */}
            {/* Outer Diamond */}
            <path
              className="lotus-path"
              d="M 360 8 L 372 20 L 360 32 L 348 20 Z"
              stroke="#b8924a"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
            {/* Inner Diamond */}
            <path
              className="lotus-path"
              d="M 360 13 L 366 20 L 360 27 L 354 20 Z"
              stroke="#b8924a"
              strokeWidth="0.8"
              strokeOpacity="0.6"
            />
            {/* Left Lotus Petal Flourish */}
            <path
              className="lotus-path"
              d="M 348 20 C 336 12 336 28 348 20"
              stroke="#b8924a"
              strokeWidth="1"
              strokeOpacity="0.7"
            />
            {/* Right Lotus Petal Flourish */}
            <path
              className="lotus-path"
              d="M 372 20 C 384 12 384 28 372 20"
              stroke="#b8924a"
              strokeWidth="1"
              strokeOpacity="0.7"
            />

            {/* Right Hairline */}
            <path
              className="lotus-path"
              d="M 400 20 L 710 20"
              stroke="#b8924a"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </svg>
        </div>

        {/* ===================================================================
            POINT 3: LEFT-ALIGNED EYEBROW "02 ——— FORMULATIONS"
            =================================================================== */}
        <div className="flex items-center gap-3 mb-6" style={{ letterSpacing: "0.2em" }}>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#b8924a",
              textTransform: "uppercase",
              fontVariant: "all-small-caps",
              letterSpacing: "0.2em",
            }}
          >
            02
          </span>
          <span
            style={{
              width: "44px",
              height: "1px",
              backgroundColor: "rgba(184, 146, 74, 0.4)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              color: "#b8924a",
              textTransform: "uppercase",
              fontVariant: "all-small-caps",
              letterSpacing: "0.2em",
            }}
          >
            FORMULATIONS
          </span>
        </div>

        {/* ===================================================================
            POINT 3: ASYMMETRIC HEADER LAYOUT
            Heading large on left with Mask Line Reveal; Paragraph aligned to baseline on right
            =================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2
            ref={headingRef}
            style={{
              fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
              fontWeight: 400,
              fontSize: "clamp(44px, 5vw, 80px)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              color: "#0b2a1d",
            }}
          >
            <span className="block overflow-hidden">
              <span className="split-line-mask inline-block">Formulations</span>
            </span>
            <span className="block overflow-hidden">
              <span className="split-line-mask inline-block">by Category</span>
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: 1.65,
              color: "rgba(11, 42, 29, 0.72)",
              maxWidth: "430px",
              marginBottom: "0.4rem",
            }}
          >
            Four classical Ayurvedic delivery formats developed for targeted physiological
            absorption and sustained vitality. Prepared according to authentic Charaka Samhita pharmacopoeia.
          </p>
        </div>

        {/* ===================================================================
            POINT 4: DESKTOP FOUR VERTICAL EXPANDING PANELS
            Default each 1fr; Hovered expands to 3fr (0.7s power3.inOut), others dim.
            Hairline borders only; no rounded boxes, no drop shadows.
            =================================================================== */}
        <div
          ref={panelsRef}
          className="hidden lg:flex w-full"
          style={{
            height: "620px",
            border: "1px solid rgba(184, 146, 74, 0.3)",
            backgroundColor: "#F4EFE3",
            position: "relative",
          }}
          onMouseLeave={() => setHoveredIdx(0)}
        >
          {featureCategories.map((cat, idx) => {
            const isExpanded = hoveredIdx === idx;
            const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
            const numeral = `0${idx + 1}`;
            const imageSrc = `/assets/cat-${idx + 1}.jpg`;

            return (
              <div
                key={cat.id}
                className="category-panel-desktop"
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => handleSelect(cat.id)}
                style={{
                  flex: isExpanded ? "3 1 0%" : "1 1 0%",
                  transition: "flex 0.7s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.5s ease, background-color 0.5s ease",
                  borderRight:
                    idx < featureCategories.length - 1
                      ? "1px solid rgba(184, 146, 74, 0.25)"
                      : "none",
                  opacity: isDimmed ? 0.45 : 1,
                  backgroundColor: isExpanded
                    ? "rgba(255, 255, 255, 0.5)"
                    : "transparent",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: isExpanded ? "2.5rem 2.5rem" : "2.5rem 1.25rem",
                }}
              >
                {/* Panel Top: Numeral 01-04 */}
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                      fontSize: "clamp(2.2rem, 3.2vw, 3.4rem)",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: "#b8924a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {numeral}
                  </span>

                  {isExpanded && (
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(11, 42, 29, 0.55)",
                        border: "1px solid rgba(184, 146, 74, 0.3)",
                        padding: "0.25rem 0.6rem",
                      }}
                    >
                      {cat.count} {cat.count > 1 ? "Formulations" : "Formulation"}
                    </span>
                  )}
                </div>

                {/* Middle Content: Name (Vertical when collapsed, Horizontal when expanded) + Image */}
                <div className="flex-1 flex flex-col justify-center items-center my-4 overflow-hidden relative">
                  {!isExpanded ? (
                    /* Collapsed: Elegant Vertical Text */
                    <div
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                        fontSize: "clamp(1.5rem, 1.9vw, 1.9rem)",
                        fontWeight: 400,
                        letterSpacing: "0.06em",
                        color: "#0b2a1d",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        margin: "auto 0",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {cat.name}
                    </div>
                  ) : (
                    /* Expanded: Horizontal Title + Scaled Product Image + 2-Line Description */
                    <div className="w-full flex flex-col items-start justify-center h-full">
                      <h3
                        style={{
                          fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                          fontSize: "clamp(2rem, 2.6vw, 2.75rem)",
                          fontWeight: 400,
                          lineHeight: 1.15,
                          color: "#0b2a1d",
                          letterSpacing: "-0.01em",
                          marginBottom: "1rem",
                        }}
                      >
                        {cat.name}
                      </h3>

                      {/* Product Image: Slow scale 1.1 to 1 on expand */}
                      <div
                        style={{
                          width: "100%",
                          height: "230px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          margin: "0.5rem 0 1.25rem",
                        }}
                      >
                        <img
                          src={imageSrc}
                          alt={cat.name}
                          onError={(e) => {
                            if (cat.featuredImage) {
                              e.currentTarget.src = cat.featuredImage;
                            }
                          }}
                          style={{
                            maxHeight: "100%",
                            maxWidth: "85%",
                            objectFit: "contain",
                            transform: isExpanded ? "scale(1)" : "scale(1.1)",
                            transition: "transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)",
                          }}
                        />
                      </div>

                      {/* 2-line Description */}
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 400,
                          fontSize: "13.5px",
                          lineHeight: 1.55,
                          color: "rgba(11, 42, 29, 0.75)",
                          maxHeight: "3.1em",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {cat.desc || cat.tagline}
                      </p>
                    </div>
                  )}
                </div>

                {/* Panel Bottom: "View range →" Link with Animated Underline */}
                <div className="w-full pt-3" style={{ borderTop: isExpanded ? "1px solid rgba(184, 146, 74, 0.2)" : "none" }}>
                  {isExpanded ? (
                    <div
                      className="category-view-link inline-flex items-center gap-2"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#0b2a1d",
                        position: "relative",
                        paddingBottom: "3px",
                      }}
                    >
                      <span>View range</span>
                      <span
                        className="cat-arrow"
                        style={{
                          color: "#b8924a",
                          display: "inline-block",
                          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        →
                      </span>

                      {/* 1px Underline Draw */}
                      <span
                        className="cat-underline"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "1px",
                          backgroundColor: "#b8924a",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-center" style={{ color: "#b8924a", fontSize: "14px" }}>
                      +
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================================
            POINT 4 (MOBILE): VERTICAL ACCORDION
            =================================================================== */}
        <div
          className="lg:hidden flex flex-col w-full"
          style={{
            border: "1px solid rgba(184, 146, 74, 0.3)",
            backgroundColor: "#F4EFE3",
          }}
        >
          {featureCategories.map((cat, idx) => {
            const isOpen = mobileExpandedIdx === idx;
            const numeral = `0${idx + 1}`;
            const imageSrc = `/assets/cat-${idx + 1}.jpg`;

            return (
              <div
                key={cat.id}
                style={{
                  borderBottom:
                    idx < featureCategories.length - 1
                      ? "1px solid rgba(184, 146, 74, 0.25)"
                      : "none",
                  overflow: "hidden",
                }}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setMobileExpandedIdx(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  style={{
                    backgroundColor: isOpen ? "rgba(255, 255, 255, 0.5)" : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      style={{
                        fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                        fontSize: "1.8rem",
                        fontWeight: 400,
                        color: "#b8924a",
                        lineHeight: 1,
                      }}
                    >
                      {numeral}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                        fontSize: "1.35rem",
                        fontWeight: 400,
                        color: "#0b2a1d",
                        lineHeight: 1.2,
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "18px",
                      color: "#b8924a",
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div
                    className="p-6 pt-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        height: "190px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0.5rem 0 1rem",
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt={cat.name}
                        onError={(e) => {
                          if (cat.featuredImage) {
                            e.currentTarget.src = cat.featuredImage;
                          }
                        }}
                        style={{
                          maxHeight: "100%",
                          maxWidth: "80%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "13.5px",
                        lineHeight: 1.55,
                        color: "rgba(11, 42, 29, 0.75)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {cat.desc || cat.tagline}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleSelect(cat.id)}
                      className="category-view-link inline-flex items-center gap-2"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#0b2a1d",
                        position: "relative",
                        paddingBottom: "3px",
                      }}
                    >
                      <span>View range</span>
                      <span style={{ color: "#b8924a" }}>→</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SCOPED STYLES: Underline Draw, Arrow Nudge, Hover Transitions
          ===================================================================== */}
      <style>{`
        .category-view-link:hover .cat-underline {
          transform: scaleX(1) !important;
        }

        .category-view-link:hover .cat-arrow {
          transform: translateX(6px) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .category-panel-desktop {
            transition: none !important;
          }
          .split-line-mask {
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
