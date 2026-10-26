import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroPoster from "../assets/hero-poster.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onSelectProduct: _onSelectProduct } = {}) {
  const heroWrapperRef = useRef(null);
  const heroPinRef = useRef(null);
  const bgMediaRef = useRef(null);
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const marqueeRef = useRef(null);
  const watermarkRef = useRef(null);
  const canvasRef = useRef(null);
  const spotlightRef = useRef(null);
  const curtainRef = useRef(null);
  const curtainSealRef = useRef(null);
  const transitionWipeRef = useRef(null);
  const rightVineRef = useRef(null);
  const leftVineRef = useRef(null);
  const botanicalGroupRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const brushSwashRef = useRef(null);

  const [videoFailed, setVideoFailed] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return true;
  });

  // Mouse & Lerp State
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  /* =========================================================================
     1. GSAP LOAD REVEAL, PINNING & SCROLLTRIGGER
     ========================================================================= */
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      return;
    }

    const ctx = gsap.context(() => {
      // Page-load curtain: 1.2s sequence
      const curtainTl = gsap.timeline({
        onComplete: () => setCurtainVisible(false),
      });

      if (curtainSealRef.current) {
        try {
          const sealLength = curtainSealRef.current.getTotalLength();
          gsap.set(curtainSealRef.current, {
            strokeDasharray: sealLength,
            strokeDashoffset: sealLength,
          });
          curtainTl.to(curtainSealRef.current, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        } catch {
          // Fallback if headless SVG measurement is unsupported
        }
      }

      curtainTl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "+=0.2"
      );

      // Headline Line Mask SplitText Reveal
      curtainTl.from(
        ".hero-split-line",
        {
          yPercent: 110,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // 5. SVG: Gold brush swash under "Purpose." draws in 1.1s after headline reveal
      if (brushSwashRef.current) {
        try {
          const swashLen = brushSwashRef.current.getTotalLength();
          gsap.set(brushSwashRef.current, {
            strokeDasharray: swashLen,
            strokeDashoffset: swashLen,
          });
          curtainTl.to(
            brushSwashRef.current,
            {
              strokeDashoffset: 0,
              duration: 1.1,
              ease: "power2.out",
            },
            "+=0.1" // 1.1s after headline reveal
          );
        } catch {
          // ignore
        }
      }

      // Subtext, Eyebrow & CTAs entrance
      curtainTl.from(
        [subtextRef.current, ctaGroupRef.current, marqueeRef.current],
        {
          opacity: 0,
          y: 20,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // 1. TRUST STRIP: Fade-up stagger on load
      curtainTl.from(
        ".trust-strip-item",
        {
          opacity: 0,
          y: 16,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 5. SVG: Vine draws itself on load with stroke-dashoffset (2.5s power2.inOut),
      // then leaves fade in one by one (0.15s stagger)
      if (rightVineRef.current) {
        try {
          const vineLength = rightVineRef.current.getTotalLength();
          gsap.set(rightVineRef.current, {
            strokeDasharray: vineLength,
            strokeDashoffset: vineLength,
          });
          curtainTl.to(
            rightVineRef.current,
            {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.inOut",
            },
            "-=0.5"
          );
        } catch {
          // ignore
        }
      }

      curtainTl.from(
        ".botanical-leaf",
        {
          opacity: 0,
          scale: 0.4,
          transformOrigin: "center center",
          duration: 0.65,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Scroll-driven Pinning: Pin hero for 100vh scroll distance with pinSpacing false
      // so the next section seamlessly slides/overlaps over the pinned hero
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "+=100%",
          pin: heroPinRef.current,
          pinSpacing: false,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Slowly scale background video 1 to 1.15
      scrollTl.to(
        bgMediaRef.current,
        {
          scale: 1.15,
          ease: "none",
        },
        0
      );

      // Headline lifts and fades out
      scrollTl.to(
        headlineRef.current,
        {
          y: -80,
          opacity: 0,
          ease: "power2.in",
        },
        0.1
      );

      // Subtext and CTAs drift
      scrollTl.to(
        [subtextRef.current, ctaGroupRef.current],
        {
          y: -50,
          opacity: 0,
          ease: "power2.in",
        },
        0.15
      );

      // Vertical Gold Line Wipe transitions to next section
      scrollTl.fromTo(
        transitionWipeRef.current,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, ease: "power2.inOut" },
        0.65
      );
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  /* =========================================================================
     2. 25 SLOW GOLD DUST PARTICLES (CANVAS)
     ========================================================================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.8,
      speedY: Math.random() * 0.35 + 0.1,
      driftX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.driftX;
        p.opacity += Math.sin(p.y * p.pulse) * 0.005;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 164, 92, ${Math.max(0.1, Math.min(0.65, p.opacity))})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(201, 164, 92, 0.4)";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* =========================================================================
     3. CURSOR-FOLLOW GOLD SPOTLIGHT (LERP 0.08), VINE 1.5DEG SWAY & MAGNETIC BUTTON
     ========================================================================= */
  useEffect(() => {
    let animId;
    const m = mouseRef.current;

    // 5. SVG: Vine sways 1.5deg following the mouse (GSAP quickTo)
    const vineSway = rightVineRef.current
      ? gsap.quickTo(rightVineRef.current, "rotation", { duration: 1.2, ease: "power2.out" })
      : null;

    // 4. BUTTONS: Primary magnetic within 60px radius
    const btnMagneticX = primaryBtnRef.current
      ? gsap.quickTo(primaryBtnRef.current, "x", { duration: 0.35, ease: "power2.out" })
      : null;
    const btnMagneticY = primaryBtnRef.current
      ? gsap.quickTo(primaryBtnRef.current, "y", { duration: 0.35, ease: "power2.out" })
      : null;

    const handleMouseMove = (e) => {
      m.targetX = e.clientX;
      m.targetY = e.clientY;
      m.active = true;

      // Parallax on watermark text
      if (watermarkRef.current) {
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 30;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(watermarkRef.current, {
          x: xOffset,
          y: yOffset,
          duration: 1.2,
          ease: "power2.out",
        });
      }

      // Vine sways max 1.5deg following mouse
      if (vineSway) {
        const normX = (e.clientX / window.innerWidth) - 0.5;
        vineSway(normX * 3); // -1.5deg to +1.5deg
      }

      // 4. BUTTONS: Primary magnetic within 60px radius
      if (primaryBtnRef.current && btnMagneticX && btnMagneticY) {
        const rect = primaryBtnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 60) {
          const moveX = (e.clientX - centerX) * 0.35;
          const moveY = (e.clientY - centerY) * 0.35;
          btnMagneticX(moveX);
          btnMagneticY(moveY);
        } else {
          btnMagneticX(0);
          btnMagneticY(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const updateSpotlight = () => {
      m.x += (m.targetX - m.x) * 0.08;
      m.y += (m.targetY - m.y) * 0.08;

      if (spotlightRef.current && m.active) {
        spotlightRef.current.style.background = `radial-gradient(circle 420px at ${m.x}px ${m.y}px, rgba(201, 164, 92, 0.22) 0%, rgba(6, 21, 15, 0) 70%)`;
      }

      animId = requestAnimationFrame(updateSpotlight);
    };

    updateSpotlight();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={heroWrapperRef}
      id="hero-wrapper"
      style={{ position: "relative", minHeight: "100vh", backgroundColor: "#06150f" }}
    >
      {/* =====================================================================
          PAGE LOAD CURTAIN (1.2s Sequence: Dark Green + Monogram Seal)
          ===================================================================== */}
      {curtainVisible && (
        <div
          ref={curtainRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#06150f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "0 auto 1.25rem" }}
            >
              <circle cx="32" cy="32" r="28" stroke="#c9a45c" strokeWidth="1" opacity="0.4" />
              <path
                ref={curtainSealRef}
                d="M38 22C34.5 18.5 28 18.5 24.5 22C21 25.5 21 32 24.5 35.5C28 39 33.5 39 37 36.5 M32 16L32 46 M24 35C27 31 32 27 38 28"
                stroke="#c9a45c"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                fontSize: "1.2rem",
                letterSpacing: "0.22em",
                color: "#c9a45c",
                textTransform: "uppercase",
              }}
            >
              CHARAK AYURVEDA
            </span>
          </div>
        </div>
      )}

      {/* =====================================================================
          PINNED HERO CONTAINER (100vh)
          ===================================================================== */}
      <section
        ref={heroPinRef}
        id="hero"
        aria-label="Charak Ayurveda Introduction"
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#06150f",
        }}
      >
        {/* ===================================================================
            BACKGROUND: Full-Bleed Video + Poster + Gradient + Film Grain
            =================================================================== */}
        <div
          ref={bgMediaRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 1,
            willChange: "transform",
          }}
        >
          {/* Base Poster Fallback */}
          <img
            src={heroPoster}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 35%",
              opacity: 0.4,
              filter: "saturate(0.85) brightness(0.85)",
            }}
          />

          {/* Looping Ambient Video */}
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster={heroPoster}
              onError={() => setVideoFailed(true)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
                opacity: 0.46,
                mixBlendMode: "screen",
              }}
            >
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
          )}

          {/* Deep Green Gradient Overlays */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(6, 21, 15, 0.93) 0%, rgba(6, 21, 15, 0.74) 45%, rgba(11, 42, 29, 0.6) 75%, rgba(6, 21, 15, 0.94) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(6, 21, 15, 0.6) 0%, transparent 35%, rgba(6, 21, 15, 0.96) 100%)",
            }}
          />

          {/* Film Grain Texture at 3% Opacity */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.03,
              pointerEvents: "none",
              mixBlendMode: "overlay",
            }}
          >
            <filter id="heroFilmGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#heroFilmGrain)" />
          </svg>

          {/* Cursor-Follow Gold Radial Light (Lerp 0.08) */}
          <div
            ref={spotlightRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* ===================================================================
            25 SLOW GOLD DUST PARTICLES (CANVAS)
            =================================================================== */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* ===================================================================
            GIANT OUTLINE WATERMARK TEXT (1px Stroke, 6% Opacity, Mouse Parallax)
            =================================================================== */}
        <div
          ref={watermarkRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "16%",
            left: "-2%",
            fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
            fontSize: "clamp(6.5rem, 16vw, 16rem)",
            fontWeight: 400,
            lineHeight: 0.85,
            letterSpacing: "0.08em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(201, 164, 92, 0.35)",
            opacity: 0.06,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 2,
            willChange: "transform",
          }}
        >
          AYURVEDA
        </div>

        {/* ===================================================================
            5. BOTANICAL VINES: Draws with stroke-dashoffset + 1.5deg Mouse Sway
            =================================================================== */}
        <div
          ref={botanicalGroupRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 3,
            opacity: 0.55,
            transition: "transform 250ms ease-out",
          }}
        >
          {/* Right Botanical Vine (Primary with Leaf Blooms) */}
          <div
            style={{
              position: "absolute",
              right: "-2%",
              bottom: "4%",
              width: "clamp(280px, 36vw, 520px)",
              height: "clamp(460px, 72vh, 800px)",
              transformOrigin: "bottom center",
            }}
          >
            <svg viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              {/* Main Stem: Draws with stroke-dashoffset (2.5s power2.inOut) */}
              <path
                ref={rightVineRef}
                d="M 160 780 C 180 620, 210 460, 260 320 C 290 230, 340 140, 390 60"
                stroke="#c9a45c"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              {/* Leaves fade in one by one (0.15s stagger) */}
              <path className="botanical-leaf" d="M 215 540 C 170 510, 130 520, 90 565 C 135 570, 175 560, 215 540 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
              <path className="botanical-leaf" d="M 235 480 C 285 450, 335 460, 380 495 C 335 505, 285 495, 235 480 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
              <path className="botanical-leaf" d="M 255 380 C 205 345, 160 350, 115 390 C 160 400, 205 390, 255 380 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
              <path className="botanical-leaf" d="M 285 300 C 340 265, 395 270, 440 310 C 390 320, 340 310, 285 300 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
              <path className="botanical-leaf" d="M 315 210 C 265 175, 225 180, 185 215 C 225 225, 270 218, 315 210 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
              <path className="botanical-leaf" d="M 350 140 C 400 110, 445 115, 480 150 C 440 160, 395 150, 350 140 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
              <path className="botanical-leaf" d="M 390 60 C 380 20, 400 10, 410 25 C 415 40, 405 55, 390 60 Z" stroke="#c9a45c" strokeWidth="1" fill="rgba(201,164,92,0.06)" />
            </svg>
          </div>

          {/* Left Botanical Vine (Corner Accent) */}
          <div
            style={{
              position: "absolute",
              left: "-3%",
              bottom: "-4%",
              width: "clamp(220px, 26vw, 360px)",
              height: "clamp(340px, 48vh, 520px)",
              transform: "scaleX(-1)",
            }}
          >
            <svg viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <path
                ref={leftVineRef}
                d="M 160 780 C 180 620, 210 460, 260 320 C 290 230, 340 140, 390 60"
                stroke="#c9a45c"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path className="botanical-leaf" d="M 215 540 C 170 510, 130 520, 90 565 C 135 570, 175 560, 215 540 Z" stroke="#c9a45c" strokeWidth="0.9" fill="rgba(201,164,92,0.04)" />
              <path className="botanical-leaf" d="M 235 480 C 285 450, 335 460, 380 495 C 335 505, 285 495, 235 480 Z" stroke="#c9a45c" strokeWidth="0.9" fill="rgba(201,164,92,0.04)" />
              <path className="botanical-leaf" d="M 255 380 C 205 345, 160 350, 115 390 C 160 400, 205 390, 255 380 Z" stroke="#c9a45c" strokeWidth="0.9" fill="rgba(201,164,92,0.04)" />
            </svg>
          </div>
        </div>

        {/* ===================================================================
            EDITORIAL CONTENT
            =================================================================== */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            paddingTop: "calc(96px + 4vh)",
            paddingBottom: "4rem",
          }}
        >
          <div style={{ maxWidth: "760px" }}>
            {/* 5. SVG: Eyebrow dot has soft pulsing glow (2.4s) */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#c9a45c",
                  display: "inline-block",
                  boxShadow: "0 0 12px rgba(201, 164, 92, 0.85)",
                  animation: "eyebrowPulse 2.4s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  color: "#c9a45c",
                  textTransform: "uppercase",
                }}
              >
                THE ART OF AYURVEDA
              </span>
            </div>

            {/* 2. FONTS: Headline stays Cormorant Garamond 400, italic line uses Cormorant Garamond italic 400 */}
            <h1
              ref={headlineRef}
              id="hero-headline"
              style={{
                fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                fontSize: "clamp(54px, 6.5vw, 104px)",
                lineHeight: 1.02,
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "#f4efe3",
                marginBottom: "1.35rem",
              }}
            >
              {/* Line 1: Cormorant Garamond 400 */}
              <span style={{ display: "block", overflow: "hidden" }}>
                <span className="hero-split-line" style={{ display: "block" }}>
                  Rooted in Nature.
                </span>
              </span>

              {/* Line 2: Cormorant Garamond italic 400 with Liquid Gold Shimmer + Brush Swash */}
              <span style={{ display: "block", overflow: "hidden", marginTop: "0.2rem" }}>
                <span
                  className="hero-split-line hero-shimmer-text"
                  style={{
                    position: "relative",
                    display: "inline-block",
                    fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#c9a45c",
                  }}
                >
                  Crafted with Purpose.

                  {/* 5. SVG: Gold brush-stroke swash under "Purpose." that draws in 1.1s after headline reveal */}
                  <svg
                    viewBox="0 0 240 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: "38%",
                      width: "62%",
                      height: "18px",
                      overflow: "visible",
                      pointerEvents: "none",
                    }}
                  >
                    <path
                      ref={brushSwashRef}
                      d="M 5 12 C 45 4, 120 16, 230 8 C 180 15, 110 18, 20 14"
                      stroke="#dfbe78"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.9"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* 2. FONTS: Body/subtext Manrope 300-400, 18px, line-height 1.7, ivory 75%, max-width 560px */}
            <p
              ref={subtextRef}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "rgba(250, 247, 238, 0.75)",
                fontWeight: 300,
                maxWidth: "560px",
                marginBottom: "1.75rem",
              }}
            >
              A timeless approach to Ayurvedic wellness.
            </p>

            {/* 1. TRUST STRIP: No bordered box, no background, thin 1.25px gold icons, 13px ivory 75% text, 24px tall vertical lines, fade-up stagger on load */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {/* Item 1: Leaf Icon + Wild-Harvested Himalayan Botanicals */}
              <div
                className="trust-strip-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a45c"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(250, 247, 238, 0.75)",
                  }}
                >
                  Wild-Harvested Himalayan Botanicals
                </span>
              </div>

              {/* 1px Vertical Line (24px tall, gold 30%) */}
              <span
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "rgba(201, 164, 92, 0.3)",
                }}
                className="hidden sm:inline-block"
              />

              {/* Item 2: Scroll/Book Icon + Charaka Samhita Formulations */}
              <div
                className="trust-strip-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a45c"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10" />
                  <path d="M6 10h10" />
                  <path d="M6 14h6" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(250, 247, 238, 0.75)",
                  }}
                >
                  Charaka Samhita Formulations
                </span>
              </div>

              {/* 1px Vertical Line (24px tall, gold 30%) */}
              <span
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "rgba(201, 164, 92, 0.3)",
                }}
                className="hidden md:inline-block"
              />

              {/* Item 3: Shield Icon + NABL Tested, Heavy-Metal Safe */}
              <div
                className="trust-strip-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a45c"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(250, 247, 238, 0.75)",
                  }}
                >
                  NABL Tested, Heavy-Metal Safe
                </span>
              </div>
            </div>

            {/* 4. BUTTONS: Both 56px tall, 2px radius. Primary magnetic within 60px radius. Secondary arrow moves 8px */}
            <nav
              ref={ctaGroupRef}
              aria-label="Hero primary navigation"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "2.25rem",
              }}
            >
              {/* Primary CTA: 56px tall, 2px radius, magnetic within 60px radius, hover = fill becomes dark green, text & border gold */}
              <a
                ref={primaryBtnRef}
                href="#formulations"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "56px",
                  padding: "0 2.4rem",
                  borderRadius: "2px",
                  border: "1px solid #c9a45c",
                  backgroundColor: "#c9a45c",
                  color: "#06150f",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                  transition: "color 300ms ease, border-color 300ms ease, background-color 300ms ease",
                }}
                className="hero-primary-cta group"
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#06150f",
                    opacity: 0,
                    transition: "opacity 300ms ease",
                    zIndex: 0,
                  }}
                  className="btn-dark-hover"
                />
                <span style={{ position: "relative", zIndex: 1 }} className="btn-label">
                  DISCOVER CHARAK
                </span>
              </a>

              {/* Secondary CTA: 56px tall, 2px radius, underline draws left to right, arrow moves 8px right on hover */}
              <a
                href="#heritage"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  height: "56px",
                  gap: "0.6rem",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(250, 247, 238, 0.75)",
                  textDecoration: "none",
                  padding: "0 0.2rem",
                  borderRadius: "2px",
                  transition: "color 250ms ease",
                }}
                className="hero-secondary-link group"
              >
                <span>Explore our philosophy</span>
                <span
                  style={{
                    color: "#c9a45c",
                    display: "inline-block",
                    transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="secondary-arrow"
                >
                  →
                </span>

                {/* Animated Underline */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: 0,
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#c9a45c",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="secondary-underline"
                />
              </a>
            </nav>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM: 1px Vertical Gold Line (40px tall, loop) + Thin Marquee Ticker
            =================================================================== */}
        <div
          ref={marqueeRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid rgba(201, 164, 92, 0.14)",
            backgroundColor: "rgba(6, 21, 15, 0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            height: "44px",
            overflow: "hidden",
          }}
        >
          {/* 5. SVG: Replaced "SCROLL" box with a 1px vertical gold line (40px tall) that animates top to bottom in a loop */}
          <div
            style={{
              padding: "0 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid rgba(201, 164, 92, 0.15)",
              height: "100%",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "1px",
                height: "40px",
                backgroundColor: "rgba(201, 164, 92, 0.25)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "16px",
                  backgroundColor: "#c9a45c",
                  animation: "verticalLine40 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Thin Marquee Ticker */}
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              display: "flex",
              width: "100%",
            }}
          >
            <div className="marquee-track" style={{ display: "inline-flex", animation: "marqueeScroll 35s linear infinite" }}>
              {[0, 1, 2, 3].map((k) => (
                <span
                  key={k}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(250, 247, 238, 0.65)",
                    padding: "0 1.75rem",
                  }}
                >
                  Classical Formulations <span style={{ color: "#c9a45c" }}>·</span> Heavy-Metal Tested <span style={{ color: "#c9a45c" }}>·</span> Haridwar Botanical Heritage <span style={{ color: "#c9a45c" }}>·</span> Charaka Samhita <span style={{ color: "#c9a45c" }}>·</span> Standardized Extraction <span style={{ color: "#c9a45c" }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================================
            VERTICAL GOLD LINE WIPE TRANSITION TO NEXT SECTION
            =================================================================== */}
        <div
          ref={transitionWipeRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#06150f",
            borderBottom: "2px solid #c9a45c",
            zIndex: 30,
            pointerEvents: "none",
            transform: "scaleY(0)",
          }}
        />
      </section>

      {/* =====================================================================
          SCOPED AESTHETIC KEYFRAMES & HOVER STYLES
          ===================================================================== */}
      <style>{`
        /* Animated Gold Gradient Shimmer (6s Loop) */
        .hero-shimmer-text {
          background: linear-gradient(
            90deg,
            #c9a45c 0%,
            #f4efe3 25%,
            #c9a45c 50%,
            #f4efe3 75%,
            #c9a45c 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldTextShimmer 6s linear infinite;
        }

        @keyframes goldTextShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* 5. SVG: Eyebrow dot soft pulsing glow (2.4s) */
        @keyframes eyebrowPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 10px rgba(201, 164, 92, 0.7); }
          50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 18px rgba(201, 164, 92, 1); }
        }

        /* 5. SVG: 1px vertical line 40px animation */
        @keyframes verticalLine40 {
          0% { transform: translateY(-100%); opacity: 0; }
          40% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(260%); opacity: 0; }
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* 4. BUTTONS: Primary hover = fill becomes dark green, text & border gold */
        .hero-primary-cta:hover {
          color: #c9a45c !important;
          border-color: #c9a45c !important;
        }

        .hero-primary-cta:hover .btn-dark-hover {
          opacity: 1 !important;
        }

        /* 4. BUTTONS: Secondary underline draws left-to-right, arrow moves 8px */
        .hero-secondary-link:hover .secondary-underline {
          transform: scaleX(1) !important;
        }

        .hero-secondary-link:hover .secondary-arrow {
          transform: translateX(8px) !important;
        }

        .hero-secondary-link:hover {
          color: #dfbe78 !important;
        }

        @media (max-width: 640px) {
          .hero-primary-cta {
            width: 100% !important;
            text-align: center !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-shimmer-text {
            animation: none !important;
            -webkit-text-fill-color: #c9a45c !important;
          }
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
