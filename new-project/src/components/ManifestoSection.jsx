import React, { useEffect, useRef } from "react";
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

const STATS = [
  { target: 5000, suffix: "+", label: "Years of Tradition" },
  { target: 100, suffix: "%", label: "Haridwar Origin" },
  { target: 100, suffix: "%", label: "NABL Tested" },
  { target: 450, suffix: "+", label: "BAMS Practitioner Supply" },
];

export default function ManifestoSection() {
  const sectionRef = useRef(null);
  const sentenceRef = useRef(null);
  const statsRef = useRef(null);
  const numRefs = useRef([]);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      numRefs.current.forEach((el, i) => {
        if (el) el.textContent = `${STATS[i].target}${STATS[i].suffix}`;
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
            end: "bottom 45%",
            scrub: 0.6,
          },
        });

        wordEls.forEach((el, idx) => {
          const isGold = el.getAttribute("data-gold") === "true";
          wordTl.to(
            el,
            {
              color: isGold ? "#c9a45c" : "#faf8f2",
              opacity: 1,
              ease: "power1.inOut",
              duration: 1,
            },
            idx * 0.28
          );
        });
      }

      // 2. Numbers Counting Up on Enter
      if (statsRef.current) {
        STATS.forEach((stat, idx) => {
          const targetEl = numRefs.current[idx];
          if (!targetEl) return;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: stat.target,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              targetEl.textContent = `${Math.round(counter.val)}${stat.suffix}`;
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
      aria-label="Charak Ayurveda Manifesto"
      style={{
        position: "relative",
        zIndex: 20,
        backgroundColor: "#06150f",
        padding: "7.5rem 0 6.5rem",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 2rem" }}>
        {/* ===================================================================
            LARGE SENTENCE: WORD-BY-WORD SCRUB REVEAL (Cormorant Garamond)
            Words scrub from Ivory 20% to full ivory; "classical wisdom" ends in gold.
            =================================================================== */}
        <div style={{ maxWidth: "1050px", textAlign: "left", marginBottom: "5.5rem" }}>
          <h2
            ref={sentenceRef}
            style={{
              fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
              fontSize: "clamp(34px, 4.5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.16,
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
            FOUR STATS IN A ROW (Separated by 1px gold 25% hairlines, count up, no boxes)
            =================================================================== */}
        <div
          ref={statsRef}
          className="manifesto-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            borderTop: "1px solid rgba(201, 164, 92, 0.25)",
            borderBottom: "1px solid rgba(201, 164, 92, 0.25)",
            width: "100%",
          }}
        >
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className="manifesto-stat-col"
              style={{
                padding: "2.6rem 2rem",
                borderRight:
                  idx < STATS.length - 1
                    ? "1px solid rgba(201, 164, 92, 0.25)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {/* Count-Up Large Numeral */}
              <div
                ref={(el) => (numRefs.current[idx] = el)}
                style={{
                  fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                  fontSize: "clamp(2.6rem, 3.8vw, 3.8rem)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "rgba(201, 164, 92, 0.85)",
                  marginBottom: "0.75rem",
                }}
              >
                0{stat.suffix}
              </div>

              {/* Stat Description Label */}
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: 1.45,
                  color: "rgba(244, 239, 227, 0.7)",
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .manifesto-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .manifesto-stat-col:nth-child(2) {
            border-right: none !important;
          }
          .manifesto-stat-col:nth-child(1),
          .manifesto-stat-col:nth-child(2) {
            border-bottom: 1px solid rgba(201, 164, 92, 0.25);
          }
        }

        @media (max-width: 640px) {
          .manifesto-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .manifesto-stat-col {
            border-right: none !important;
            border-bottom: 1px solid rgba(201, 164, 92, 0.25) !important;
            padding: 2rem 1rem !important;
          }
          .manifesto-stat-col:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
