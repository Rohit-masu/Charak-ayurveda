import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, ChevronDown, Sparkles } from "lucide-react";

const NAV_MENU = [
  {
    label: "Philosophy",
    href: "#manifesto",
    tagline: "Classical Wisdom & Heritage",
    items: [
      { title: "Five Millennia Tradition", desc: "Charaka Samhita classical foundations", href: "#manifesto" },
      { title: "Haridwar Foothills Lineage", desc: "High-altitude Himalayan harvest heritage", href: "#heritage" },
      { title: "Classical Sneha Kalpana", desc: "Ancient lipid and decoction canons", href: "#extraction-journey" },
      { title: "BAMS Practitioner Standard", desc: "Formulated for certified clinical prescribing", href: "#practitioners" },
    ],
    featured: {
      badge: "Editorial",
      title: "The Art of Ayurveda",
      desc: "Rooted in pristine nature, crafted with uncompromising classical purpose.",
      cta: "Explore Heritage",
      href: "#heritage",
    },
  },
  {
    label: "Formulations",
    href: "#formulations",
    tagline: "Classical Pharmacopoeia",
    items: [
      { title: "Restorative Capsules", desc: "Standardized herbal extracts in pure vegetarian capsules", href: "#formulations" },
      { title: "Medicated Oils", desc: "Traditional Sneha Kalpana lipid extraction for targeted delivery", href: "#formulations" },
      { title: "Classical Majun", desc: "Slow-cooked confections with authentic Kashmiri Saffron", href: "#formulations" },
      { title: "Comprehensive Regimens", desc: "90-capsule cellular vitality and rejuvenation protocols", href: "#formulations" },
    ],
    featured: {
      badge: "Flagship",
      title: "Rati Shakti Maharaja",
      desc: "Our supreme 90-capsule formulation calibrated for cellular vitality.",
      cta: "View Formulations",
      href: "#formulations",
    },
  },
  {
    label: "Botanicals",
    href: "#botanicals",
    tagline: "Himalayan Herbal Monographs",
    items: [
      { title: "Purified Himalayan Shilajit", desc: "High-altitude mineral pitch with 60%+ Fulvic fractions", href: "#botanicals" },
      { title: "Standardized Ashwagandha", desc: "Concentrated withanolides for adrenal and nervous vitality", href: "#botanicals" },
      { title: "Kashmiri Mongra Saffron", desc: "Hand-picked pure stigma crocin and safranal actives", href: "#botanicals" },
      { title: "Synergy & Active Matrix", desc: "Biochemical pharmacokinetic interactions and pathways", href: "#synergy-matrix" },
    ],
    featured: {
      badge: "Pharmacopoeia",
      title: "Botanical Explorer",
      desc: "Explore verified botanical monographs and active phytochemical fractions.",
      cta: "Explore Botanicals",
      href: "#botanicals",
    },
  },
  {
    label: "Quality",
    href: "#extraction-journey",
    tagline: "Laboratory Certified Standards",
    items: [
      { title: "4-Stage Sacred Extraction", desc: "From wild harvesting to ultrasonic bio-purification", href: "#extraction-journey" },
      { title: "NABL Heavy-Metal Testing", desc: "Zero lead, cadmium, arsenic or mercury contamination", href: "#manifesto" },
      { title: "Constitutional Dosha Diagnostic", desc: "Personalized Prakriti & Vikriti Ayurvedic analysis", href: "#dosha-quiz" },
      { title: "Circadian Dinacharya Regimen", desc: "24-hour diurnal chronobiology wellness planner", href: "#regimen-planner" },
    ],
    featured: {
      badge: "Clinical Assay",
      title: "Batch Verification",
      desc: "Every batch is independently certified for phytochemical potency.",
      cta: "View Protocols",
      href: "#extraction-journey",
    },
  },
  {
    label: "Contact",
    href: "#contact",
    tagline: "Official Desks & Practice",
    items: [
      { title: "Doctor & Clinic Desk", desc: "Direct dispensary supplies for BAMS practitioners", type: "Doctor / Clinical Practice" },
      { title: "Trade & Distribution", desc: "Wholesale pharmacy network partnerships", type: "Trade / Distribution" },
      { title: "Haridwar Formulation Desk", desc: "Manufacturing and botanical sourcing enquiries", type: "General Enquiry" },
      { title: "Clinical FAQ & Dossier", desc: "Formulation protocols, dosages and laboratory safety", href: "#faq" },
    ],
    featured: {
      badge: "Practitioner Desk",
      title: "Direct Consultation",
      desc: "Connect directly with our Ayurvedic formulation team.",
      cta: "Open Enquiry Desk",
      action: "enquiry",
    },
  },
];

export default function Navbar({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(null);

  const closeTimeoutRef = useRef(null);
  const headerRef = useRef(null);

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

  // Grace timer on mouse enter/leave so the dropdown doesn't flicker or close prematurely
  const handleNavMouseEnter = (index) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenuIndex(index);
  };

  const handleNavMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenuIndex(null);
    }, 180);
  };

  const handleItemClick = (item) => {
    setActiveMenuIndex(null);
    setMobileMenuOpen(false);

    if (item.type && onOpenEnquiry) {
      onOpenEnquiry(item.type);
      return;
    }

    if (item.action === "enquiry" && onOpenEnquiry) {
      onOpenEnquiry("General Enquiry");
      return;
    }

    if (item.href) {
      const targetEl = document.querySelector(item.href);
      if (targetEl) {
        if (window.lenis) {
          window.lenis.scrollTo(targetEl, { offset: -90 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const activeMenu = activeMenuIndex !== null ? NAV_MENU[activeMenuIndex] : null;

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        onMouseLeave={handleNavMouseLeave}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          backgroundColor: scrolled || activeMenuIndex !== null ? "rgba(6, 21, 15, 0.92)" : "rgba(6, 21, 15, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: activeMenuIndex !== null
            ? "1px solid rgba(201, 164, 92, 0.28)"
            : "1px solid rgba(201, 164, 92, 0.12)",
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
        className="navbar-header"
      >
        {/* Main Navbar Top Row */}
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: scrolled ? "72px" : "88px",
            transition: "height 320ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Brand Identity with Monogram Seal */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (window.lenis) window.lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="#c9a45c" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2" />
                <path
                  d="M20 11C18.2 9.2 14.8 9.2 13 11C11.2 12.8 11.2 16.2 13 18C14.8 19.8 17.5 19.8 19.5 18.5"
                  stroke="#c9a45c"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path d="M16 8L16 23" stroke="#c9a45c" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
                <circle cx="16" cy="8" r="1.5" fill="#c9a45c" />
                <path d="M12 18C13.5 16 16 14 19 14.5" stroke="#c9a45c" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>

            {/* Typography Wordmark */}
            <span
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "1.32rem",
                fontWeight: 400,
                letterSpacing: "0.14em",
                color: "#f4efe3",
                lineHeight: 1,
              }}
            >
              CHARAK <span style={{ color: "#c9a45c", fontWeight: 300 }}>AYURVEDA</span>
            </span>
          </a>

          {/* Desktop Navigation Links with Hover Dropdown Triggers */}
          <nav
            aria-label="Primary Navigation"
            style={{
              display: "none",
              alignItems: "center",
              gap: "2.5rem",
              height: "100%",
            }}
            className="desktop-nav"
          >
            {NAV_MENU.map((menu, idx) => {
              const isHovered = activeMenuIndex === idx;
              return (
                <div
                  key={menu.label}
                  onMouseEnter={() => handleNavMouseEnter(idx)}
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <a
                    href={menu.href}
                    onClick={(e) => {
                      if (menu.href) {
                        e.preventDefault();
                        handleItemClick({ href: menu.href });
                      }
                    }}
                    style={{
                      position: "relative",
                      fontFamily: "var(--font-sans-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: isHovered ? "#c9a45c" : "#f4efe3",
                      textDecoration: "none",
                      padding: "0.6rem 0",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      opacity: activeMenuIndex !== null && !isHovered ? 0.45 : 1,
                      transition: "opacity 220ms ease, color 220ms ease",
                      cursor: "pointer",
                    }}
                    className="nav-link-item"
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      size={11}
                      style={{
                        transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
                        opacity: isHovered ? 1 : 0.5,
                      }}
                    />

                    {/* Gold Underline draws left-to-right */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "18px",
                        left: 0,
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#c9a45c",
                        transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </a>
                </div>
              );
            })}
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
                padding: "0.6rem 1.6rem",
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

        {/* ===================================================================
            DESKTOP HOVER DROPDOWN MENU SHELF
            Slides and fades gracefully down directly under the navbar
            =================================================================== */}
        <div
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleNavMouseLeave}
          style={{
            width: "100%",
            backgroundColor: "rgba(6, 21, 15, 0.96)",
            borderTop: "1px solid rgba(201, 164, 92, 0.16)",
            borderBottom: "1px solid rgba(201, 164, 92, 0.25)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            boxShadow: "0 28px 60px -15px rgba(0, 0, 0, 0.75), 0 0 30px rgba(201, 164, 92, 0.08)",
            maxHeight: activeMenu ? "480px" : "0px",
            opacity: activeMenu ? 1 : 0,
            overflow: "hidden",
            pointerEvents: activeMenu ? "auto" : "none",
            transition: "max-height 340ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease",
          }}
          className="desktop-dropdown-shelf"
        >
          {activeMenu && (
            <div
              className="container"
              style={{
                maxWidth: "1240px",
                margin: "0 auto",
                padding: "2.2rem 2rem 2.6rem",
                display: "grid",
                gridTemplateColumns: "1.45fr 0.85fr",
                gap: "3.5rem",
                alignItems: "stretch",
              }}
            >
              {/* Left Column: 4 Minimal Curated List Items */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "1.2rem",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(201, 164, 92, 0.75)",
                  }}
                >
                  <span style={{ width: "16px", height: "1px", backgroundColor: "#c9a45c" }} />
                  <span>{activeMenu.tagline}</span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "1.2rem",
                  }}
                >
                  {activeMenu.items.map((item, i) => (
                    <div
                      key={item.title}
                      onClick={() => handleItemClick(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleItemClick(item);
                        }
                      }}
                      className="dropdown-list-card group"
                      style={{
                        padding: "1rem 1.15rem",
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(201, 164, 92, 0.12)",
                        cursor: "pointer",
                        transition: "all 240ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.35rem",
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                            fontSize: "1.15rem",
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                            color: "#f4efe3",
                            transition: "color 200ms ease, transform 200ms ease",
                          }}
                          className="group-hover:text-[#c9a45c] group-hover:translate-x-1"
                        >
                          {item.title}
                        </h4>

                        <span
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: "11px",
                            color: "rgba(201, 164, 92, 0.5)",
                          }}
                        >
                          0{i + 1}
                        </span>
                      </div>

                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "12px",
                          lineHeight: 1.45,
                          color: "rgba(244, 239, 227, 0.6)",
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Editorial Highlight Card */}
              <div
                style={{
                  padding: "1.6rem 1.75rem",
                  borderRadius: "14px",
                  backgroundColor: "rgba(201, 164, 92, 0.06)",
                  border: "1px solid rgba(201, 164, 92, 0.22)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background ambient gold glint */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-20%",
                    right: "-20%",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(201, 164, 92, 0.2) 0%, transparent 70%)",
                    filter: "blur(25px)",
                    pointerEvents: "none",
                  }}
                />

                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(201, 164, 92, 0.14)",
                      border: "1px solid rgba(201, 164, 92, 0.3)",
                      color: "#c9a45c",
                      fontSize: "10.5px",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontFamily: "'Manrope', sans-serif",
                      marginBottom: "1rem",
                    }}
                  >
                    <Sparkles size={11} />
                    <span>{activeMenu.featured.badge}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif-display, 'Cormorant Garamond', serif)",
                      fontSize: "1.45rem",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      color: "#f4efe3",
                      marginBottom: "0.55rem",
                    }}
                  >
                    {activeMenu.featured.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "12.5px",
                      lineHeight: 1.55,
                      color: "rgba(244, 239, 227, 0.7)",
                      marginBottom: "1.4rem",
                    }}
                  >
                    {activeMenu.featured.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleItemClick(activeMenu.featured)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#c9a45c",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 200ms ease",
                  }}
                  className="hover:text-[#f3dc9f] group"
                >
                  <span>{activeMenu.featured.cta}</span>
                  <span
                    style={{
                      display: "inline-block",
                      transition: "transform 250ms ease",
                    }}
                    className="group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          )}
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

      {/* ===================================================================
          FULLSCREEN MOBILE OVERLAY MENU WITH ACCORDION LIST
          =================================================================== */}
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
            overflowY: "auto",
          }}
        >
          {/* Header row in mobile overlay */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
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

          {/* Accordion List in Mobile Overlay */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
            {NAV_MENU.map((menu, i) => {
              const isExpanded = mobileExpandedIndex === i;
              return (
                <div
                  key={menu.label}
                  style={{
                    borderBottom: "1px solid rgba(201, 164, 92, 0.15)",
                    paddingBottom: "1rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setMobileExpandedIndex(isExpanded ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                      color: "#f4efe3",
                      background: "none",
                      border: "none",
                      padding: "0.4rem 0",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif-display)",
                        fontSize: "1.75rem",
                        fontWeight: 400,
                        letterSpacing: "0.04em",
                        color: isExpanded ? "#c9a45c" : "#f4efe3",
                      }}
                    >
                      {menu.label}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "#c9a45c",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 250ms ease",
                      }}
                    />
                  </button>

                  {isExpanded && (
                    <div style={{ padding: "0.8rem 0 0.5rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                      {menu.items.map((subItem) => (
                        <div
                          key={subItem.title}
                          onClick={() => handleItemClick(subItem)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-serif-display)",
                              fontSize: "1.15rem",
                              color: "#f4efe3",
                            }}
                          >
                            {subItem.title}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: "11.5px",
                              color: "rgba(244, 239, 227, 0.6)",
                            }}
                          >
                            {subItem.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA in Mobile Overlay */}
          <div style={{ marginTop: "2rem" }}>
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

        .dropdown-list-card:hover {
          background-color: rgba(201, 164, 92, 0.08) !important;
          border-color: rgba(201, 164, 92, 0.35) !important;
          transform: translateY(-2px) !important;
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
      `}</style>
    </>
  );
}
