import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Feather, Eye } from "lucide-react";
import { brandAssets, products } from "../data/catalog";

export default function Hero({ onSelectProduct }) {
  // 0: Full Lineup, 1: Maharaja, 2: Capsules, 3: Oil, 4: Majun
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);

  const heroItems = [
    {
      id: "lineup",
      label: "Full Apothecary Range",
      shortTag: "Complete Lineup",
      title: "The Wisdom of Ayurveda, Carried Forward.",
      subtitle:
        "Discover Charak Ayurveda’s range of classical Ayurvedic formulations, thoughtfully presented for modern living. Crafted with wild-harvested Himalayan botanicals and disciplined manufacturing standards.",
      image: brandAssets.heroGreen,
      chip1: "Purified Himalayan Shilajit",
      chip2: "Kashmiri Saffron & Authentic Avaleha",
      productRef: null,
    },
    {
      id: "maharaja",
      label: "Maharaja Kit (90 Caps)",
      shortTag: "Flagship Regimen",
      title: "Royal Restorative Protocol for Enduring Stamina.",
      subtitle:
        "An intensive 90-capsule classical regimen formulated with high-potency Shilajit, Ashwagandha, and Safed Musli for systemic vitality and physical endurance.",
      image: products[0].heroImage,
      chip1: "90-Day Restorative Protocol",
      chip2: "100% Plant-Derived HPMC Capsules",
      productRef: products[0],
    },
    {
      id: "capsules",
      label: "Vitality Capsules (60 Caps)",
      shortTag: "Daily Adaptogen",
      title: "Daily Botanical Vitality for Mind & Body.",
      subtitle:
        "Standardized herbal extracts in pure vegetarian capsules, designed to combat fatigue, balance Vata, and sustain daily cellular stamina.",
      image: products[1].heroImage,
      chip1: "Pure Shilajit + Ashwagandha Root",
      chip2: "Batch Assayed in Haridwar",
      productRef: products[1],
    },
    {
      id: "oil",
      label: "Massage Oil (30 ml)",
      shortTag: "Medicated Taila",
      title: "Classical Medicated Oil for Tissue Nutrition.",
      subtitle:
        "Prepared through traditional 72-hour Sneha Kalpana lipid extraction, infused with warm Clove bud oil, fragrant Jaiphal, and Ashwagandha essence.",
      image: products[2].heroImage,
      chip1: "72-Hour Sneha Kalpana Decoction",
      chip2: "Clove & Jaiphal Sensory Warmth",
      productRef: products[2],
    },
    {
      id: "majun",
      label: "Classical Majun (100 gm)",
      shortTag: "Artisanal Avaleha",
      title: "Slow-Cooked Herbal Paste with Kashmiri Saffron.",
      subtitle:
        "Authentic herbal confection slow-simmered in copper vessels with certified Kashmiri Saffron stigmas and organic honey for deep Ojas nourishment.",
      image: products[3].heroImage,
      chip1: "Hand-Harvested Kashmir Kesar",
      chip2: "Apothecary Amber Jar Protection",
      productRef: products[3],
    },
  ];

  const currentHero = heroItems[selectedHeroIndex];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "3rem",
        paddingBottom: "5.5rem",
        background: "radial-gradient(ellipse at 80% 20%, rgba(22, 64, 48, 0.5) 0%, #051610 75%)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        className="glow-spot-emerald"
        style={{ top: "-10%", right: "5%", opacity: 0.8 }}
      />
      <div
        className="glow-spot-gold"
        style={{ bottom: "5%", left: "-5%", opacity: 0.5 }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Interactive Pack Switcher Pills at Top of Hero */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.55rem",
            marginBottom: "2.5rem",
            padding: "0.45rem",
            background: "rgba(10, 32, 23, 0.7)",
            borderRadius: "9999px",
            border: "1px solid rgba(203, 168, 100, 0.22)",
            maxWidth: "fit-content",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              padding: "0.3rem 0.8rem",
              fontFamily: "var(--font-serif-accent)",
              fontSize: "0.68rem",
              letterSpacing: "0.14em",
              color: "var(--accent-gold-primary)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            STAGE SHOWCASE:
          </span>

          {heroItems.map((item, idx) => {
            const isSelected = selectedHeroIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedHeroIndex(idx)}
                style={{
                  padding: "0.4rem 0.95rem",
                  borderRadius: "9999px",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-sans-body)",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  background: isSelected
                    ? "linear-gradient(135deg, #dfbe78 0%, #cba864 100%)"
                    : "transparent",
                  color: isSelected ? "#071c14" : "var(--text-light-secondary)",
                  border: isSelected
                    ? "1px solid var(--accent-gold-light)"
                    : "1px solid transparent",
                  boxShadow: isSelected ? "0 4px 14px rgba(203, 168, 100, 0.3)" : "none",
                }}
              >
                {item.shortTag}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Editorial Content */}
          <div style={{ maxWidth: "620px" }}>
            {/* Prestigious Eyebrow */}
            <div style={{ marginBottom: "1.2rem" }}>
              <div className="gold-badge">
                <Sparkles size={12} />
                <span>ROOTED IN THE CHARAKA SAMHITA</span>
              </div>
            </div>

            {/* Headline with Dynamic Fade-In Key */}
            <h1
              key={currentHero.id + "-title"}
              className="animate-fade-in"
              style={{
                fontSize: "clamp(2.3rem, 4.8vw, 3.8rem)",
                lineHeight: 1.12,
                color: "#faf8f2",
                marginBottom: "1.4rem",
                fontWeight: 600,
              }}
            >
              The Wisdom of Ayurveda,{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #dfbe78 0%, #cba864 70%, #f6dfab 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "var(--font-serif-display)",
                }}
              >
                Carried Forward.
              </span>
            </h1>

            {/* Dynamic Editorial Description */}
            <p
              key={currentHero.id + "-sub"}
              className="animate-fade-in"
              style={{
                fontSize: "clamp(1.02rem, 1.4vw, 1.16rem)",
                lineHeight: 1.65,
                color: "var(--text-light-secondary)",
                marginBottom: "2.2rem",
                fontWeight: 400,
              }}
            >
              {currentHero.subtitle}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "3rem",
              }}
            >
              <a href="#formulations" className="btn-primary">
                <span>Explore All Formulations</span>
                <ArrowRight size={16} />
              </a>

              {currentHero.productRef ? (
                <button
                  onClick={() => onSelectProduct(currentHero.productRef)}
                  className="btn-secondary"
                >
                  <Eye size={15} />
                  <span>Inspect {currentHero.shortTag}</span>
                </button>
              ) : (
                <a href="#dosha-consultation" className="btn-secondary">
                  <Sparkles size={15} />
                  <span>Dosha Assessment</span>
                </a>
              )}
            </div>

            {/* Trust Metrics Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "1.2rem",
                paddingTop: "1.8rem",
                borderTop: "1px solid rgba(203, 168, 100, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(203, 168, 100, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={16} />
                </div>
                <div style={{ fontSize: "0.82rem", lineHeight: 1.3 }}>
                  <strong style={{ color: "#faf7f0", display: "block" }}>100% Classical</strong>
                  <span style={{ color: "var(--text-light-muted)" }}>Ayurvedic Formulations</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(203, 168, 100, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                  }}
                >
                  <Feather size={16} />
                </div>
                <div style={{ fontSize: "0.82rem", lineHeight: 1.3 }}>
                  <strong style={{ color: "#faf8f2", display: "block" }}>Himalayan Botanicals</strong>
                  <span style={{ color: "var(--text-light-muted)" }}>Zero Synthetic Additives</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(203, 168, 100, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={16} />
                </div>
                <div style={{ fontSize: "0.82rem", lineHeight: 1.3 }}>
                  <strong style={{ color: "#faf8f2", display: "block" }}>Haridwar Facility</strong>
                  <span style={{ color: "var(--text-light-muted)" }}>Disciplined Batch Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Stage with Live Visual Switcher */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Illuminated Botanical Halo & Decorative Ring */}
            <div
              style={{
                position: "absolute",
                width: "min(490px, 86vw)",
                height: "min(490px, 86vw)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(22, 68, 50, 0.75) 0%, rgba(7, 28, 20, 0.2) 70%, transparent 100%)",
                border: "1px dashed rgba(203, 168, 100, 0.35)",
                boxShadow: "0 0 60px rgba(22, 68, 50, 0.6)",
                zIndex: 1,
              }}
            />

            {/* Product Image Stage */}
            <div
              key={currentHero.id + "-img"}
              className="animate-fade-in"
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: "540px",
                height: "420px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "drop-shadow(0 25px 45px rgba(0, 0, 0, 0.68))",
                transition: "transform 400ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={currentHero.image}
                alt={currentHero.label}
                style={{
                  maxHeight: "100%",
                  maxWidth: "90%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Floating Highlight Chips */}
            <div
              key={currentHero.id + "-chip1"}
              className="animate-fade-in hero-floating-chip"
              style={{
                position: "absolute",
                top: "4%",
                right: "2%",
                zIndex: 3,
                background: "rgba(10, 32, 23, 0.9)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(203, 168, 100, 0.35)",
                padding: "0.55rem 0.95rem",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#dfbe78",
                  boxShadow: "0 0 8px #dfbe78",
                }}
              />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f8f5ee" }}>
                {currentHero.chip1}
              </span>
            </div>

            <div
              key={currentHero.id + "-chip2"}
              className="animate-fade-in hero-floating-chip"
              style={{
                position: "absolute",
                bottom: "4%",
                left: "0%",
                zIndex: 3,
                background: "rgba(10, 32, 23, 0.9)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(203, 168, 100, 0.35)",
                padding: "0.55rem 0.95rem",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#25D366",
                  boxShadow: "0 0 8px #25D366",
                }}
              />
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f8f5ee" }}>
                {currentHero.chip2}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Grid Helper */}
      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .hero-floating-chip {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
