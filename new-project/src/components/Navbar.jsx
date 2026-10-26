import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = winHeight > 0 ? Math.min(1, Math.max(0, scrollY / winHeight)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Philosophy", href: "#heritage" },
    { label: "Formulations", href: "#formulations" },
    { label: "Botanicals", href: "#botanicals" },
    { label: "Quality", href: "#extraction-journey" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: scrolled ? "72px" : "96px",
          backgroundColor: scrolled ? "rgba(6, 21, 15, 0.65)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: "1px solid rgba(201, 164, 92, 0.12)",
          transition: "height 350ms cubic-bezier(0.16, 1, 0.3, 1), background-color 350ms ease, backdrop-filter 350ms ease",
        }}
        className="flex items-center"
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Brand Identity with Monogram Seal */}
          <a
            href="#"
            aria-label="Charak Ayurveda Home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.85rem",
              textDecoration: "none",
            }}
            className="group"
          >
            {/* Small Gold SVG Monogram Seal */}
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                border: "1px solid #c9a45c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(201, 164, 92, 0.08)",
                boxShadow: "0 0 14px rgba(201, 164, 92, 0.2)",
                transition: "transform 400ms ease, box-shadow 400ms ease",
              }}
              className="group-hover:scale-105"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Classical Ayurvedic Botanical Monogram: Interlocking C & A Leaf Crest */}
                <circle cx="16" cy="16" r="14" stroke="#c9a45c" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />
                <path
                  d="M20 11C18.2 9.2 14.8 9.2 13 11C11.2 12.8 11.2 16.2 13 18C14.8 19.8 17.5 19.8 19.5 18.5"
                  stroke="#c9a45c"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 8L16 23"
                  stroke="#c9a45c"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <circle cx="16" cy="8" r="1.5" fill="#c9a45c" />
                <path
                  d="M12 18C13.5 16 16 14 19 14.5"
                  stroke="#c9a45c"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Typography Wordmark */}
            <span
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "1.35rem",
                fontWeight: 400,
                letterSpacing: "0.14em",
                color: "#f4efe3",
                lineHeight: 1,
              }}
            >
              CHARAK <span style={{ color: "#c9a45c", fontWeight: 300 }}>AYURVEDA</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            style={{
              display: "none",
              alignItems: "center",
              gap: "2.75rem",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  fontFamily: "var(--font-sans-body)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#f4efe3",
                  textDecoration: "none",
                  padding: "0.5rem 0",
                  opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 1,
                  transition: "opacity 240ms ease, color 240ms ease",
                }}
                className="hover:text-[#c9a45c] group"
              >
                <span>{link.label}</span>
                {/* Gold Underline draws left-to-right */}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#c9a45c",
                    transform: hoveredIndex === idx ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Desktop Action: Gold "Enquire" CTA */}
          <div
            style={{
              display: "none",
              alignItems: "center",
            }}
            className="desktop-actions"
          >
            <button
              onClick={() => {
                if (onOpenEnquiry) onOpenEnquiry("General Enquiry");
              }}
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "0.62rem 1.65rem",
                borderRadius: "2px",
                border: "1px solid #c9a45c",
                backgroundColor: "transparent",
                color: "#c9a45c",
                fontFamily: "var(--font-sans-body)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                transition: "color 350ms ease, border-color 350ms ease",
              }}
              className="navbar-enquire-btn group"
            >
              {/* Sweeping Gold Background */}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#c9a45c",
                  transform: "translateX(-101%)",
                  transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                  zIndex: 0,
                }}
                className="cta-sweep-bg"
              />

              <span style={{ position: "relative", zIndex: 1 }} className="btn-text">
                Enquire
              </span>

              <ArrowUpRight
                size={13}
                style={{
                  position: "relative",
                  zIndex: 1,
                  transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="cta-arrow"
              />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2px",
              background: "transparent",
              border: "1px solid rgba(201, 164, 92, 0.35)",
              color: "#c9a45c",
              cursor: "pointer",
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 1px Gold Scroll Progress Line at Bottom */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "1px",
            backgroundColor: "#c9a45c",
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left",
            transition: "transform 80ms linear",
            opacity: scrolled ? 1 : 0,
          }}
        />
      </header>

      {/* Fullscreen Mobile Overlay Menu with Masked Line-by-Line Reveal */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(6, 21, 15, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2.5rem 1.75rem 3rem",
          }}
        >
          {/* Header row in mobile overlay */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "1.25rem",
                letterSpacing: "0.14em",
                color: "#f4efe3",
              }}
            >
              CHARAK <span style={{ color: "#c9a45c" }}>AYURVEDA</span>
            </span>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: "transparent",
                border: "1px solid rgba(201, 164, 92, 0.4)",
                color: "#c9a45c",
                width: "2.5rem",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Masked Line-by-Line Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {navLinks.map((link, i) => (
              <div
                key={link.label}
                style={{
                  overflow: "hidden",
                }}
              >
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif-display)",
                    fontSize: "2.25rem",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    color: "#f4efe3",
                    textDecoration: "none",
                    animation: `mobileLinkReveal 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 80 + 100}ms forwards`,
                    transform: "translateY(100%)",
                  }}
                  className="hover:text-[#c9a45c] transition-colors"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Bottom CTA in Mobile Overlay */}
          <div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry("General Enquiry");
              }}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "2px",
                border: "1px solid #c9a45c",
                backgroundColor: "#c9a45c",
                color: "#06150f",
                fontFamily: "var(--font-sans-body)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Enquire Directly
            </button>
          </div>
        </div>
      )}

      {/* Scoped CSS for Navbar */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-actions {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }

        .navbar-enquire-btn:hover {
          color: #06150f !important;
          border-color: #c9a45c !important;
        }

        .navbar-enquire-btn:hover .cta-sweep-bg {
          transform: translateX(0) !important;
        }

        .navbar-enquire-btn:hover .cta-arrow {
          transform: translate(2px, -2px) !important;
        }

        @keyframes mobileLinkReveal {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
