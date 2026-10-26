import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: "Five", isGold: false },
  { text: "thousand", isGold: false },
  { text: "years", isGold: false },
  { text: "of", isGold: false },
  { text: "classical", isGold: true },
  { text: "wisdom,", isGold: true },
  { text: "refined", isGold: false },
  { text: "by", isGold: false },
  { text: "modern", isGold: false },
  { text: "science.", isGold: false },
];

const PILLARS = [
  {
    target: 5000,
    suffix: "+",
    unit: "Years",
    title: "Classical Tradition",
    description: "Charaka Samhita authentic polyherbal formulations",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    target: 100,
    suffix: "%",
    unit: "Origin",
    title: "Haridwar Foothills",
    description: "Pristine Himalayan hydrology and wild botanical harvest",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M4.14 15h15.72" />
      </svg>
    ),
  },
  {
    target: 100,
    suffix: "%",
    unit: "Tested",
    title: "NABL Certified Purity",
    description: "Zero heavy metals, HPLC verified botanical actives",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    target: 450,
    suffix: "+",
    unit: "Clinics",
    title: "BAMS Practitioner Supply",
    description: "Trusted nationwide by licensed Ayurvedic doctors",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
];

export default function ManifestoSection() {
  const sectionRef = useRef(null);
  const sentenceRef = useRef(null);
  const plinthRef = useRef(null);
  const leftLeafRef = useRef(null);
  const rightLeafRef = useRef(null);
  const tapeRef = useRef(null);
  const tapeTrackRef = useRef(null);
  const numRefs = useRef([]);
  const [hoveredPillar, setHoveredPillar] = useState(null);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      numRefs.current.forEach((el, i) => {
        if (el) el.textContent = `${PILLARS[i].target}${PILLARS[i].suffix}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Sentence Word-by-Word Scroll Reveal (Ivory 20% to Full Ivory / Gold)
      if (sentenceRef.current) {
        const wordEls = sentenceRef.current.querySelectorAll(".manifesto-word");
        const wordTl = gsap.timeline({
          scrollTrigger: {
            trigger: sentenceRef.current,
            start: "top 85%",
            end: "bottom 48%",
            scrub: 0.6,
          },
        });

        wordEls.forEach((el, idx) => {
          const isGold = el.getAttribute("data-gold") === "true";
          wordTl.to(
            el,
            {
              color: isGold ? "#cba864" : "#faf8f2",
              opacity: 1,
              ease: "power1.inOut",
              duration: 1,
            },
            idx * 0.26
          );
        });
      }

      // 2. Floating Plinth Elevation & Entrance
      if (plinthRef.current) {
        gsap.fromTo(
          plinthRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: plinthRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 0. Yellow Tape Scroll Parallax (Accelerates on scroll)
      if (tapeTrackRef.current) {
        gsap.to(tapeTrackRef.current, {
          x: "-=300",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 0.8,
          },
        });
      }

      // 3. Parallax on Flanking Botanical Silhouettes
      if (leftLeafRef.current) {
        gsap.to(leftLeafRef.current, {
          y: -45,
          rotation: 4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (rightLeafRef.current) {
        gsap.to(rightLeafRef.current, {
          y: -60,
          rotation: -5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // 4. Numbers Counting Up on Enter
      if (plinthRef.current) {
        PILLARS.forEach((pillar, idx) => {
          const targetEl = numRefs.current[idx];
          if (!targetEl) return;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: pillar.target,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: plinthRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              targetEl.textContent = `${Math.round(counter.val)}${pillar.suffix}`;
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      aria-label="Charak Ayurveda Classical Wisdom Manifesto"
      style={{
        position: "relative",
        zIndex: 20,
        backgroundColor: "#06150f",
        padding: "0 0 5.5rem",
        overflow: "hidden",
      }}
    >
      {/* ===================================================================
          YELLOW LUXURY APOTHECARY TAPE / INFINITE SCROLL MARQUEE
          Fills the lower transition space between the Hero and Manifesto
          =================================================================== */}
      <div
        ref={tapeRef}
        aria-label="Ayurvedic Certification Ticker Tape"
        style={{
          width: "100%",
          height: "46px",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(90deg, #cba864 0%, #dfbe75 25%, #f3d790 50%, #dfbe75 75%, #cba864 100%)",
          borderTop: "1px solid rgba(6, 21, 15, 0.5)",
          borderBottom: "1px solid rgba(6, 21, 15, 0.5)",
          boxShadow: "0 6px 25px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          cursor: "default",
          marginBottom: "5rem",
          position: "relative",
          zIndex: 30,
        }}
      >
        {/* Left Authentic Apothecary Seal Badge */}
        <div
          style={{
            padding: "0 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.55rem",
            backgroundColor: "#06150f",
            color: "#cba864",
            height: "100%",
            flexShrink: 0,
            borderRight: "2px solid #06150f",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#e2be73",
              boxShadow: "0 0 8px #e2be73",
            }}
          />
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#f4efe3",
            }}
          >
            CHARAK · CERTIFIED
          </span>
        </div>

        {/* Infinite Marquee Ticker Track with Seamless Loop */}
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={tapeTrackRef}
            className="infinite-tape-track"
            style={{
              display: "inline-flex",
              alignItems: "center",
              willChange: "transform",
            }}
          >
            {[0, 1].map((copyIdx) => (
              <div
                key={copyIdx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {[0, 1, 2, 3].map((k) => (
                  <span
                    key={k}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#06150f",
                      padding: "0 1.75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <span>Classical Formulations</span>
                    <span style={{ opacity: 0.6, fontSize: "10px" }}>◈</span>
                    <span>Heavy-Metal Tested</span>
                    <span style={{ opacity: 0.6, fontSize: "10px" }}>◈</span>
                    <span>Haridwar Botanical Heritage</span>
                    <span style={{ opacity: 0.6, fontSize: "10px" }}>◈</span>
                    <span>Charaka Samhita</span>
                    <span style={{ opacity: 0.6, fontSize: "10px" }}>◈</span>
                    <span>Standardized Extraction</span>
                    <span style={{ opacity: 0.6, fontSize: "10px" }}>◈</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Ambient Radial Golden Aura */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(203, 168, 100, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Flanking Botanical Leaf 1 (Left) — Inspired by Reference Leaf Silhouettes */}
      <div
        ref={leftLeafRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "38%",
          left: "-25px",
          width: "160px",
          height: "220px",
          opacity: 0.18,
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path
            d="M50 135 C50 135 15 105 10 70 C5 35 30 10 50 5 C70 10 95 35 90 70 C85 105 50 135 50 135 Z"
            stroke="#cba864"
            strokeWidth="1.5"
            fill="rgba(203, 168, 100, 0.05)"
          />
          <path d="M50 135 L50 10" stroke="#cba864" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M50 105 Q30 85 20 75" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M50 105 Q70 85 80 75" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M50 75 Q30 55 25 45" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M50 75 Q70 55 75 45" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>
      </div>

      {/* Flanking Botanical Leaf 2 (Right) */}
      <div
        ref={rightLeafRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "42%",
          right: "-25px",
          width: "180px",
          height: "240px",
          opacity: 0.16,
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path
            d="M50 5 C50 5 15 35 10 70 C5 105 30 130 50 135 C70 130 95 105 90 70 C85 35 50 5 50 5 Z"
            stroke="#cba864"
            strokeWidth="1.5"
            fill="rgba(203, 168, 100, 0.05)"
          />
          <path d="M50 5 L50 130" stroke="#cba864" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M50 35 Q30 55 20 65" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M50 35 Q70 55 80 65" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M50 65 Q30 85 25 95" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
          <path d="M50 65 Q70 85 75 95" stroke="#cba864" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>
      </div>

      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 10 }}>
        {/* ===================================================================
            LARGE SENTENCE: WORD-BY-WORD SCRUB REVEAL (Cormorant Garamond)
            Words scrub from Ivory 20% to full ivory; "classical wisdom" ends in gold.
            =================================================================== */}
        <div style={{ maxWidth: "1080px", textAlign: "left", marginBottom: "4.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.2rem",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(203, 168, 100, 0.85)",
            }}
          >
            <span style={{ width: "24px", height: "1px", backgroundColor: "#cba864" }} />
            <span>01 — Classical Wisdom & Clinical Standards</span>
          </div>

          <h2
            ref={sentenceRef}
            style={{
              fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
              fontSize: "clamp(34px, 4.4vw, 62px)",
              fontWeight: 400,
              lineHeight: 1.18,
              letterSpacing: "-0.015em",
              wordBreak: "normal",
              overflowWrap: "break-word",
            }}
          >
            {WORDS.map((item, i) => (
              <span
                key={i}
                data-gold={item.isGold}
                className="manifesto-word"
                style={{
                  display: "inline-block",
                  color: "rgba(244, 239, 227, 0.2)",
                  marginRight: "0.26em",
                  willChange: "color, opacity",
                }}
              >
                {item.text}
              </span>
            ))}
          </h2>
        </div>

        {/* ===================================================================
            THE FLOATING OVERLAP PLINTH (Inspired by Dribbble Reference Card)
            Elevated glass plinth card with 4 interactive clinical pillars
            =================================================================== */}
        <div
          ref={plinthRef}
          className="manifesto-plinth-card"
          style={{
            position: "relative",
            borderRadius: "20px",
            backgroundColor: "rgba(8, 25, 18, 0.88)",
            border: "1px solid rgba(203, 168, 100, 0.28)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55), 0 0 30px rgba(203, 168, 100, 0.08)",
            overflow: "hidden",
            padding: "2.8rem 2.4rem",
          }}
        >
          {/* Subtle Corner Gold Accents */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "48px",
              height: "48px",
              borderTop: "2px solid rgba(203, 168, 100, 0.45)",
              borderLeft: "2px solid rgba(203, 168, 100, 0.45)",
              borderTopLeftRadius: "20px",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "48px",
              height: "48px",
              borderBottom: "2px solid rgba(203, 168, 100, 0.45)",
              borderRight: "2px solid rgba(203, 168, 100, 0.45)",
              borderBottomRightRadius: "20px",
              pointerEvents: "none",
            }}
          />

          {/* Plinth Card Header Strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(203, 168, 100, 0.16)",
              paddingBottom: "1.4rem",
              marginBottom: "2.2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(203, 168, 100, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#cba864",
                  background: "rgba(203, 168, 100, 0.08)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m12 6 3 6-3 6-3-6 3-6Z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "#faf8f2",
                  }}
                >
                  Sacred Apothecary Benchmark
                </div>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "12px",
                    color: "rgba(244, 239, 227, 0.55)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Laboratory certified botanical purity & high-altitude harvesting standards
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#cba864",
                padding: "0.35rem 0.85rem",
                borderRadius: "9999px",
                border: "1px solid rgba(203, 168, 100, 0.3)",
                background: "rgba(203, 168, 100, 0.08)",
              }}
            >
              Certified Pharmacopoeia
            </div>
          </div>

          {/* 4 Interactive Clinical Pillars Grid */}
          <div
            className="manifesto-pillars-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            {PILLARS.map((pillar, idx) => {
              const isHovered = hoveredPillar === idx;
              return (
                <div
                  key={pillar.title}
                  onMouseEnter={() => setHoveredPillar(idx)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  className="manifesto-pillar-item"
                  style={{
                    padding: "1.8rem 1.4rem",
                    borderRadius: "14px",
                    backgroundColor: isHovered
                      ? "rgba(203, 168, 100, 0.09)"
                      : "rgba(255, 255, 255, 0.025)",
                    border: isHovered
                      ? "1px solid rgba(203, 168, 100, 0.5)"
                      : "1px solid rgba(203, 168, 100, 0.14)",
                    transition: "all 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: isHovered
                      ? "0 12px 28px rgba(0, 0, 0, 0.35), 0 0 20px rgba(203, 168, 100, 0.15)"
                      : "none",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Top Icon Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        backgroundColor: isHovered
                          ? "rgba(203, 168, 100, 0.22)"
                          : "rgba(203, 168, 100, 0.1)",
                        border: "1px solid rgba(203, 168, 100, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isHovered ? "#f3dc9f" : "#cba864",
                        transition: "all 0.3s ease",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {pillar.icon}
                    </div>

                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(203, 168, 100, 0.65)",
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Count-Up Large Numeral */}
                  <div
                    ref={(el) => (numRefs.current[idx] = el)}
                    style={{
                      fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                      fontSize: "clamp(2.4rem, 3.2vw, 3.2rem)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: isHovered ? "#f3dc9f" : "#cba864",
                      marginBottom: "0.6rem",
                      transition: "color 0.3s ease",
                    }}
                  >
                    0{pillar.suffix}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: 1.35,
                        color: "#faf8f2",
                        marginBottom: "0.45rem",
                      }}
                    >
                      {pillar.title}
                    </div>

                    <div
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: "12.5px",
                        lineHeight: 1.5,
                        color: "rgba(244, 239, 227, 0.65)",
                      }}
                    >
                      {pillar.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes infiniteTapeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .infinite-tape-track {
          animation: infiniteTapeScroll 28s linear infinite;
        }

        .infinite-tape-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 1024px) {
          .manifesto-pillars-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 640px) {
          .manifesto-pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .manifesto-plinth-card {
            padding: 1.8rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
