import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products } from "../data/catalog";

gsap.registerPlugin(ScrollTrigger);

export default function FormulationsSection({ onSelectProduct }) {
  // 4 classical categories (excluding 'all')
  const featureCategories = categories.filter((c) => c.id !== "all");

  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState(0);

  const sectionRef = useRef(null);
  const archSvgRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);

  const activeCat = featureCategories[activeIdx] || featureCategories[0];

  const handleViewRange = (cat) => {
    if (onSelectProduct) {
      const matched = products.find((p) => p.category === cat.id) || products[0];
      onSelectProduct(matched);
    }
  };

  /* =========================================================================
     1. BACKGROUND COLOR SCRUB (Green to Ivory #F4EFE3)
     2. THIN GOLD ARCH OUTLINE DRAW ON ENTER
     ========================================================================= */
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Background color scrubs from dark green to ivory as section enters
      if (sectionRef.current) {
        if (!isReduced) {
          gsap.fromTo(
            sectionRef.current,
            { backgroundColor: "#06150f" },
            {
              backgroundColor: "#F4EFE3",
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "top 35%",
                scrub: true,
              },
            }
          );
        } else {
          gsap.set(sectionRef.current, { backgroundColor: "#F4EFE3" });
        }
      }

      // Thin gold arch outline draws itself on enter
      if (archSvgRef.current && !isReduced) {
        const paths = archSvgRef.current.querySelectorAll(".arch-outline-path");
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
                trigger: archSvgRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          } catch {
            // fallback
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =========================================================================
     3. PRODUCT IMAGE CROSSFADE & RISE 20px ON CATEGORY CHANGE (0.7s power3.out)
     ========================================================================= */
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (imageRef.current) {
      if (isReduced) {
        gsap.set(imageRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          imageRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );
      }
    }

    if (shadowRef.current && !isReduced) {
      gsap.fromTo(
        shadowRef.current,
        { scale: 0.88, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }
  }, [activeIdx]);

  return (
    <section
      ref={sectionRef}
      id="formulations"
      aria-label="Ayurvedic Formulations Range"
      style={{
        position: "relative",
        zIndex: 20,
        backgroundColor: "#F4EFE3",
        color: "#0b2a1d",
        padding: "7.5rem 0 8.5rem",
        transition: "background-color 0.5s ease",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        {/* 2-Column Responsive Grid */}
        <div className="formulations-main-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.88fr", gap: "4.5rem", alignItems: "start" }}>
          {/* =================================================================
              LEFT COLUMN: 4 HUGE CORMORANT LIST ROWS (Numeral 01-04 small, name 56px)
              Hairlines between rows; Hovered turns accent gold, others dim to 35%
              ================================================================= */}
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {/* Left-Aligned Subtle Eyebrow (No pill badge) */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem", letterSpacing: "0.2em" }}>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#b8924a",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                }}
              >
                02
              </span>
              <span
                style={{
                  width: "48px",
                  height: "1px",
                  backgroundColor: "rgba(184, 146, 74, 0.45)",
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
                  letterSpacing: "0.2em",
                }}
              >
                FORMULATIONS
              </span>
            </div>

            {/* Desktop Category List */}
            <div className="formulations-desktop-list" style={{ width: "100%" }}>
              {featureCategories.map((cat, idx) => {
                const isHoveredOrActive = activeIdx === idx;
                const isDimmed = activeIdx !== null && activeIdx !== idx;
                const numeral = `0${idx + 1}`;

                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="category-list-row cursor-pointer"
                    style={{
                      padding: "2.35rem 0",
                      borderBottom: "1px solid rgba(184, 146, 74, 0.25)",
                      borderTop: idx === 0 ? "1px solid rgba(184, 146, 74, 0.25)" : "none",
                      opacity: isDimmed ? 0.35 : 1,
                      transition: "opacity 0.4s ease",
                      cursor: "pointer",
                    }}
                  >
                    {/* Small Numeral 01-04 */}
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        color: "#b8924a",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {numeral}
                    </div>

                    {/* Category Name (Huge Cormorant Garamond 56px) */}
                    <h3
                      style={{
                        fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                        fontSize: "clamp(36px, 4.2vw, 56px)",
                        lineHeight: 1.08,
                        fontWeight: 400,
                        letterSpacing: "-0.015em",
                        color: isHoveredOrActive ? "#b8924a" : "#0b2a1d",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Mobile Stacked Accordion List */}
            <div className="formulations-mobile-list" style={{ display: "none", flexDirection: "column", width: "100%", borderTop: "1px solid rgba(184, 146, 74, 0.3)", borderBottom: "1px solid rgba(184, 146, 74, 0.3)" }}>
              {featureCategories.map((cat, idx) => {
                const isOpen = mobileExpandedIdx === idx;
                const numeral = `0${idx + 1}`;

                return (
                  <div
                    key={cat.id}
                    style={{
                      borderBottom:
                        idx < featureCategories.length - 1
                          ? "1px solid rgba(184, 146, 74, 0.25)"
                          : "none",
                    }}
                  >
                    {/* Accordion Row Header */}
                    <button
                      type="button"
                      onClick={() => setMobileExpandedIdx(isOpen ? -1 : idx)}
                      style={{
                        width: "100%",
                        padding: "1.35rem 0",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            color: "#b8924a",
                            marginBottom: "0.2rem",
                          }}
                        >
                          {numeral}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                            fontSize: "1.75rem",
                            fontWeight: 400,
                            color: isOpen ? "#b8924a" : "#0b2a1d",
                            lineHeight: 1.2,
                          }}
                        >
                          {cat.name}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontSize: "20px",
                          color: "#b8924a",
                          transition: "transform 0.3s ease",
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>

                    {/* Accordion Expanded Body */}
                    {isOpen && (
                      <div style={{ paddingBottom: "2rem", paddingTop: "0.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                        <div
                          style={{
                            position: "relative",
                            width: "280px",
                            height: "320px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* Arch SVG Outline */}
                          <svg
                            viewBox="0 0 280 320"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                          >
                            <path
                              d="M 25 310 L 25 125 A 115 115 0 0 1 255 125 L 255 310"
                              stroke="#b8924a"
                              strokeWidth="1"
                              strokeOpacity="0.45"
                            />
                            <path
                              d="M 140 10 L 145 15 L 140 20 L 135 15 Z"
                              stroke="#b8924a"
                              strokeWidth="1"
                              strokeOpacity="0.6"
                            />
                          </svg>

                          <img
                            src={`/assets/cat-${idx + 1}.png`}
                            alt={cat.name}
                            onError={(e) => {
                              if (cat.featuredImage) {
                                e.currentTarget.src = cat.featuredImage;
                              }
                            }}
                            style={{
                              maxHeight: "75%",
                              maxWidth: "75%",
                              objectFit: "contain",
                              position: "relative",
                              zIndex: 2,
                            }}
                          />
                        </div>

                        {/* Elliptical Shadow */}
                        <div
                          style={{
                            width: "160px",
                            height: "14px",
                            borderRadius: "50%",
                            background: "radial-gradient(ellipse at center, rgba(11, 42, 29, 0.3) 0%, rgba(11, 42, 29, 0) 70%)",
                            filter: "blur(3px)",
                            marginTop: "-8px",
                            marginBottom: "1rem",
                          }}
                        />

                        <p
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "13.5px",
                            lineHeight: 1.55,
                            color: "rgba(11, 42, 29, 0.78)",
                            maxWidth: "320px",
                            marginBottom: "1rem",
                          }}
                        >
                          {cat.desc || cat.tagline}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleViewRange(cat)}
                          className="stage-view-link inline-flex items-center gap-2 group cursor-pointer"
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#0b2a1d",
                            position: "relative",
                            paddingBottom: "3px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
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

          {/* =================================================================
              RIGHT COLUMN: STICKY PRODUCT STAGE WITH ARCH OUTLINE & CONTACT SHADOW
              ================================================================= */}
          <div className="formulations-desktop-stage" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div
              style={{
                position: "sticky",
                top: "120px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Product Stage Container */}
              <div
                style={{
                  position: "relative",
                  width: "360px",
                  height: "450px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Thin Gold Arch Outline SVG (Draws on enter) */}
                <svg
                  ref={archSvgRef}
                  viewBox="0 0 360 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
                >
                  {/* Outer Arch */}
                  <path
                    className="arch-outline-path"
                    d="M 30 440 L 30 170 A 150 150 0 0 1 330 170 L 330 440"
                    stroke="#b8924a"
                    strokeWidth="1"
                    strokeOpacity="0.45"
                  />
                  {/* Inner Hairline Arch */}
                  <path
                    className="arch-outline-path"
                    d="M 38 440 L 38 175 A 142 142 0 0 1 322 175 L 322 440"
                    stroke="#b8924a"
                    strokeWidth="0.75"
                    strokeOpacity="0.25"
                  />
                  {/* Apex Diamond Accent */}
                  <path
                    className="arch-outline-path"
                    d="M 180 14 L 186 21 L 180 28 L 174 21 Z"
                    stroke="#b8924a"
                    strokeWidth="1"
                    strokeOpacity="0.7"
                  />
                </svg>

                {/* Transparent Product Image: Crossfades and rises 20px on category change */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    height: "280px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    ref={imageRef}
                    src={`/assets/cat-${activeIdx + 1}.png`}
                    alt={activeCat.name}
                    onError={(e) => {
                      if (activeCat.featuredImage) {
                        e.currentTarget.src = activeCat.featuredImage;
                      }
                    }}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "85%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {/* Elliptical CSS Contact Shadow */}
                <div
                  ref={shadowRef}
                  style={{
                    width: "190px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse at center, rgba(11, 42, 29, 0.35) 0%, rgba(11, 42, 29, 0) 70%)",
                    filter: "blur(4px)",
                    marginTop: "-12px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Under the Stage: 2-line Description & View Range Link with Underline Draw */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "1.25rem",
                  maxWidth: "380px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "rgba(11, 42, 29, 0.78)",
                    maxHeight: "3.2em",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    marginBottom: "1.25rem",
                  }}
                >
                  {activeCat.desc || activeCat.tagline}
                </p>

                <button
                  type="button"
                  onClick={() => handleViewRange(activeCat)}
                  className="stage-view-link inline-flex items-center gap-2 group cursor-pointer"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#0b2a1d",
                    position: "relative",
                    paddingBottom: "3px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>View range</span>
                  <span
                    className="stage-arrow"
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
                    className="stage-underline"
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SCOPED STYLES: Underline Draw, Arrow Nudge, Responsive Layouts
          ===================================================================== */}
      <style>{`
        .stage-view-link:hover .stage-underline {
          transform: scaleX(1) !important;
        }

        .stage-view-link:hover .stage-arrow {
          transform: translateX(6px) !important;
        }

        @media (max-width: 1024px) {
          .formulations-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .formulations-desktop-list,
          .formulations-desktop-stage {
            display: none !important;
          }
          .formulations-mobile-list {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
