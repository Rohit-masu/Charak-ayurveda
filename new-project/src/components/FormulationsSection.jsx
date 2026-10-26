import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products } from "../data/catalog";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_META = {
  capsules: {
    botanicals: "Shilajit, Ashwagandha, Gokshura",
    target: "Cellular Rasayana & Vitality",
    dosha: "Vata • Pitta Harmonizing",
  },
  oils: {
    botanicals: "Pure Clove, Jaiphal, Sesame Taila",
    target: "Sneha Kalpana Lipid Delivery",
    dosha: "Vata Pacifying • Topical",
  },
  majun: {
    botanicals: "Kashmiri Saffron, Swarna Bhasma, Tonic Roots",
    target: "Classical Avaleha Confection",
    dosha: "Tridoshic Rejuvenation",
  },
  regimens: {
    botanicals: "Synergistic 90-Day Classical Protocol",
    target: "Tri-Pillar Mind-Body Equilibrium",
    dosha: "Tridosha Balance",
  },
};

export default function FormulationsSection({ onSelectProduct }) {
  // 4 classical categories (excluding 'all')
  const featureCategories = categories.filter((c) => c.id !== "all");

  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState(0);

  const sectionRef = useRef(null);
  const archSvgRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const shadowRef = useRef(null);
  const auraRef = useRef(null);

  const activeCat = featureCategories[activeIdx] || featureCategories[0];

  const handleOpenProduct = (cat) => {
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
        gsap.set(imageRef.current, { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.fromTo(
          imageRef.current,
          { y: 22, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
        );
      }
    }

    if (shadowRef.current && !isReduced) {
      gsap.fromTo(
        shadowRef.current,
        { scale: 0.85, opacity: 0.35 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }
      );
    }

    if (auraRef.current && !isReduced) {
      gsap.fromTo(
        auraRef.current,
        { scale: 0.75, opacity: 0.2 },
        { scale: 1, opacity: 0.8, duration: 0.9, ease: "power2.out" }
      );
    }
  }, [activeIdx]);

  /* =========================================================================
     4. INTERACTIVE 3D PERSPECTIVE TILT ON ARCHWAY STAGE (Smooth GSAP QuickTo)
     ========================================================================= */
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) return;

    const stage = stageRef.current;
    const img = imageRef.current;
    const shadow = shadowRef.current;
    if (!stage || !img || !shadow) return;

    const tiltX = gsap.quickTo(img, "rotateX", { duration: 0.45, ease: "power2.out" });
    const tiltY = gsap.quickTo(img, "rotateY", { duration: 0.45, ease: "power2.out" });
    const imgZ = gsap.quickTo(img, "z", { duration: 0.45, ease: "power2.out" });
    const shadowX = gsap.quickTo(shadow, "x", { duration: 0.45, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      tiltX(-y * 18); // tilt up/down
      tiltY(x * 22);  // tilt left/right
      imgZ(24);
      shadowX(-x * 20);
    };

    const handleMouseLeave = () => {
      tiltX(0);
      tiltY(0);
      imgZ(0);
      shadowX(0);
    };

    stage.addEventListener("mousemove", handleMouseMove);
    stage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      stage.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="formulations"
      aria-label="Classical Formulations by Category"
      style={{
        position: "relative",
        zIndex: 20,
        backgroundColor: "#F4EFE3",
        color: "#0b2a1d",
        padding: "6rem 0 7rem",
        overflow: "hidden",
        transition: "background-color 0.4s ease",
      }}
    >
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        {/* ===================================================================
            SECTION HEADER: Clean Editorial Hierarchy (Inspired by Dribbble "Our New Products")
            =================================================================== */}
        <div style={{ marginBottom: "4.5rem", maxWidth: "860px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#b8924a",
            }}
          >
            <span style={{ width: "24px", height: "1px", backgroundColor: "#b8924a" }} />
            <span>02 — THE AYURVEDIC PHARMACOPOEIA</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
              fontSize: "clamp(38px, 4.8vw, 62px)",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#0b2a1d",
              marginBottom: "1rem",
            }}
          >
            Classical Formulations
          </h2>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "15px",
              lineHeight: 1.65,
              color: "rgba(11, 42, 29, 0.72)",
              maxWidth: "680px",
            }}
          >
            Rooted in classical Sneha Kalpana and Avaleha protocols, calibrated with standardized botanical fractions for peak cellular assimilation.
          </p>
        </div>

        {/* ===================================================================
            MAIN 2-COLUMN LAYOUT (Desktop) & ACCORDION (Mobile)
            =================================================================== */}
        <div
          className="formulations-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "4rem",
            alignItems: "flex-start",
          }}
        >
          {/* =================================================================
              LEFT COLUMN: 4 HUGE CATEGORY ROWS (Desktop)
              ================================================================= */}
          <div className="formulations-desktop-list" style={{ display: "flex", flexDirection: "column" }}>
            {featureCategories.map((cat, idx) => {
              const isActive = activeIdx === idx;
              const meta = CATEGORY_META[cat.id] || CATEGORY_META.capsules;
              const numStr = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => handleOpenProduct(cat)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIdx(idx);
                      handleOpenProduct(cat);
                    }
                  }}
                  className="formulation-cat-row group"
                  style={{
                    position: "relative",
                    padding: "2.4rem 1.5rem 2.4rem 1.8rem",
                    borderBottom: "1px solid rgba(184, 146, 74, 0.22)",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    borderRadius: "12px",
                    backgroundColor: isActive ? "rgba(184, 146, 74, 0.06)" : "transparent",
                  }}
                >
                  {/* Left Active Gold Hairline Indicator */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: "3px",
                      borderRadius: "2px",
                      backgroundColor: "#b8924a",
                      transform: isActive ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: "center",
                      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  {/* Numeral and Title */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.4rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                        fontSize: "1.35rem",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        color: isActive ? "#b8924a" : "rgba(11, 42, 29, 0.4)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {numStr}
                    </span>

                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                          fontSize: "clamp(32px, 3.8vw, 48px)",
                          fontWeight: 400,
                          lineHeight: 1.15,
                          letterSpacing: "-0.015em",
                          color: isActive ? "#0b2a1d" : "rgba(11, 42, 29, 0.45)",
                          transition: "color 0.3s ease, transform 0.3s ease",
                          transform: isActive ? "translateX(4px)" : "translateX(0)",
                        }}
                      >
                        {cat.name}
                      </h3>

                      {/* Expanded Subtext & Botanical Meta */}
                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight: isActive ? "120px" : "0px",
                          opacity: isActive ? 1 : 0,
                          transition: "max-height 0.4s ease, opacity 0.35s ease, margin-top 0.35s ease",
                          marginTop: isActive ? "0.65rem" : "0px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "13.5px",
                            lineHeight: 1.55,
                            color: "rgba(11, 42, 29, 0.75)",
                            marginBottom: "0.45rem",
                          }}
                        >
                          {cat.tagline}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.85rem",
                            flexWrap: "wrap",
                            fontSize: "11.5px",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            color: "#b8924a",
                            fontFamily: "'Manrope', sans-serif",
                          }}
                        >
                          <span>{meta.botanicals}</span>
                          <span>•</span>
                          <span style={{ color: "rgba(11, 42, 29, 0.6)" }}>{meta.dosha}</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Glyph */}
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "1.2rem",
                        color: "#b8924a",
                        transform: isActive ? "translateX(6px)" : "translateX(0)",
                        opacity: isActive ? 1 : 0.25,
                        transition: "all 0.3s ease",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================================
              MOBILE ACCORDION LIST (<1024px)
              ================================================================= */}
          <div className="formulations-mobile-list" style={{ display: "none", flexDirection: "column", gap: "1rem" }}>
            {featureCategories.map((cat, idx) => {
              const isExpanded = mobileExpandedIdx === idx;
              const numStr = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={cat.id}
                  style={{
                    border: "1px solid rgba(184, 146, 74, 0.3)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    backgroundColor: isExpanded ? "#FAF6EE" : "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setMobileExpandedIdx(isExpanded ? -1 : idx)}
                    style={{
                      width: "100%",
                      padding: "1.4rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.85rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                          fontSize: "1.1rem",
                          color: "#b8924a",
                        }}
                      >
                        {numStr}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                          fontSize: "1.5rem",
                          color: "#0b2a1d",
                        }}
                      >
                        {cat.name}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        color: "#b8924a",
                        transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      →
                    </span>
                  </button>

                  {isExpanded && (
                    <div style={{ padding: "0 1.25rem 1.6rem" }}>
                      <div
                        style={{
                          height: "240px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1rem",
                          position: "relative",
                        }}
                      >
                        <img
                          src={`/assets/cat-${idx + 1}.png`}
                          alt={cat.name}
                          onError={(e) => {
                            if (cat.featuredImage) e.currentTarget.src = cat.featuredImage;
                          }}
                          style={{ maxHeight: "100%", maxWidth: "80%", objectFit: "contain" }}
                        />
                      </div>
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "13.5px",
                          lineHeight: 1.6,
                          color: "rgba(11, 42, 29, 0.8)",
                          marginBottom: "1.2rem",
                        }}
                      >
                        {cat.desc || cat.tagline}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenProduct(cat)}
                        className="btn-primary"
                        style={{ width: "100%", fontSize: "0.88rem" }}
                      >
                        <span>Explore {cat.name}</span>
                        <span>→</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* =================================================================
              RIGHT COLUMN: STICKY 3D JHAROKHA ARCHWAY STAGE (Desktop)
              ================================================================= */}
          <div
            className="formulations-desktop-stage"
            style={{
              position: "sticky",
              top: "120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              ref={stageRef}
              onClick={() => handleOpenProduct(activeCat)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenProduct(activeCat);
                }
              }}
              aria-label={`View ${activeCat.name} formulation details`}
              style={{
                position: "relative",
                width: "380px",
                height: "530px",
                borderRadius: "190px 190px 20px 20px",
                backgroundColor: "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(184, 146, 74, 0.35)",
                boxShadow: "0 20px 50px -15px rgba(11, 42, 29, 0.15), 0 0 25px rgba(184, 146, 74, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem 1.5rem",
                cursor: "pointer",
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Inner Antique-Gold Outline Offset 8px */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "8px",
                  borderRadius: "182px 182px 14px 14px",
                  border: "1px solid rgba(184, 146, 74, 0.22)",
                  pointerEvents: "none",
                }}
              />

              {/* Decorative SVG Arch Lines */}
              <svg
                ref={archSvgRef}
                viewBox="0 0 380 530"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <path
                  className="arch-outline-path"
                  d="M 20 510 L 20 190 C 20 96 96 20 190 20 C 284 20 360 96 360 190 L 360 510"
                  stroke="#b8924a"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
                <circle cx="190" cy="20" r="3" fill="#b8924a" fillOpacity="0.8" />
              </svg>

              {/* Radiant Botanical Aura behind Bottle */}
              <div
                ref={auraRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "38%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(184, 146, 74, 0.18) 0%, rgba(244, 239, 227, 0) 70%)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />

              {/* 3D Product Stage Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "360px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  ref={imageRef}
                  style={{
                    width: "100%",
                    height: "320px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                    willChange: "transform, opacity",
                  }}
                >
                  <img
                    src={`/assets/cat-${activeIdx + 1}.png`}
                    alt={activeCat.name}
                    onError={(e) => {
                      if (activeCat.featuredImage) {
                        e.currentTarget.src = activeCat.featuredImage;
                      }
                    }}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "82%",
                      objectFit: "contain",
                      display: "block",
                      filter: "drop-shadow(0 14px 24px rgba(11, 42, 29, 0.15))",
                    }}
                  />
                </div>

                {/* Elliptical CSS Contact Shadow */}
                <div
                  ref={shadowRef}
                  style={{
                    width: "200px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse at center, rgba(11, 42, 29, 0.38) 0%, rgba(11, 42, 29, 0) 72%)",
                    filter: "blur(5px)",
                    marginTop: "-14px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Under the Stage: Description & View Range Link */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "1.4rem",
                  maxWidth: "340px",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    color: "rgba(11, 42, 29, 0.78)",
                    maxHeight: "3.2em",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    marginBottom: "1.1rem",
                  }}
                >
                  {activeCat.desc || activeCat.tagline}
                </p>

                <div
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
                  }}
                >
                  <span>Explore Formulation</span>
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
                </div>
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
