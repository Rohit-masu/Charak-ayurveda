import React from "react";
import { Feather, Check } from "lucide-react";
import { brandStory, brandAssets } from "../data/catalog";

export default function EditorialStory() {
  return (
    <section
      id="heritage"
      style={{
        padding: "6.5rem 0",
        background: "linear-gradient(180deg, #071c14 0%, #0d281e 50%, #081e15 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        className="glow-spot-gold"
        style={{ top: "25%", left: "-10%", opacity: 0.35 }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Left Visual Column */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Visual Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "480px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(203, 168, 100, 0.35)",
                background: "radial-gradient(circle at center, #13392a 0%, #071c14 100%)",
                padding: "2.5rem 1.5rem",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.65)",
              }}
            >
              <img
                src={brandAssets.heroBlack}
                alt="Charak Ayurveda Classical Apothecary Lineup"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6))",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Classical Sanskrit Quote Card */}
              <div
                style={{
                  background: "rgba(7, 24, 17, 0.88)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(203, 168, 100, 0.25)",
                  borderRadius: "10px",
                  padding: "1.2rem 1.4rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif-display)",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    color: "var(--accent-gold-light)",
                    lineHeight: 1.45,
                    marginBottom: "0.5rem",
                  }}
                >
                  {brandStory.quote}
                </p>
                <span
                  style={{
                    fontSize: "0.76rem",
                    fontFamily: "var(--font-serif-accent)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-light-muted)",
                    display: "block",
                  }}
                >
                  {brandStory.quoteSource}
                </span>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div style={{ maxWidth: "620px" }}>
            <div className="gold-badge" style={{ marginBottom: "1.2rem" }}>
              <Feather size={12} />
              <span>PHILOSOPHY & MANUFACTURING</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                color: "#faf8f2",
                marginBottom: "1.5rem",
                lineHeight: 1.15,
              }}
            >
              {brandStory.heading}
            </h2>

            <p
              style={{
                fontSize: "1.12rem",
                color: "var(--accent-gold-light)",
                lineHeight: 1.6,
                marginBottom: "1.4rem",
                fontWeight: 500,
              }}
            >
              {brandStory.leadText}
            </p>

            <p
              style={{
                fontSize: "0.96rem",
                color: "var(--text-light-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.2rem",
              }}
            >
              {brandStory.body1}
            </p>

            <p
              style={{
                fontSize: "0.96rem",
                color: "var(--text-light-secondary)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              {brandStory.body2}
            </p>

            {/* Credential Checkpoints */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(203, 168, 100, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    borderRadius: "50%",
                    background: "rgba(203, 168, 100, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                    marginTop: "0.2rem",
                  }}
                >
                  <Check size={12} />
                </div>
                <div>
                  <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                    Authentic Pharmaceutical Processes
                  </strong>
                  <span style={{ color: "var(--text-light-muted)", fontSize: "0.84rem" }}>
                    Sneha Kalpana (lipid decoctions) & artisanal Avaleha confections.
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    borderRadius: "50%",
                    background: "rgba(203, 168, 100, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                    marginTop: "0.2rem",
                  }}
                >
                  <Check size={12} />
                </div>
                <div>
                  <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                    Standardized Himalayan Sourcing
                  </strong>
                  <span style={{ color: "var(--text-light-muted)", fontSize: "0.84rem" }}>
                    Certified high-altitude Shilajit and organic adaptogenic roots.
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    borderRadius: "50%",
                    background: "rgba(203, 168, 100, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                    marginTop: "0.2rem",
                  }}
                >
                  <Check size={12} />
                </div>
                <div>
                  <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                    Haridwar Manufacturing Hub
                  </strong>
                  <span style={{ color: "var(--text-light-muted)", fontSize: "0.84rem" }}>
                    Stringent batch documentation and clinical assay verification.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .story-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
