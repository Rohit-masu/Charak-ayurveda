import React, { useState } from "react";
import { Dna, Eye } from "lucide-react";
import { botanicals, products } from "../data/catalog";

export default function IngredientSynergyMatrix({ onSelectProduct }) {
  const [selectedHerbIndex, setSelectedHerbIndex] = useState(0);

  const herbMatrixData = [
    {
      ...botanicals[0], // Shilajit
      actives: "Fulvic Acid (min 50%), Humic Minerals, Dibenzo-alpha-pyrones",
      targetDhatu: "Majja & Shukra Dhatu (Nerve & Deep Vitality)",
      clinicalRole:
        "Acts as a classical Yogavahi (cellular carrier), transporting co-extracted phyto-nutrients directly across cell membranes to enhance mitochondrial ATP synthesis.",
      connectedProductIds: ["rati-shakti-maharaja", "rati-shakti-capsules", "rati-shakti-oil", "rati-shakti-majun"],
    },
    {
      ...botanicals[1], // Ashwagandha
      actives: "Standardized Withanolides & Withaferin-A (>2.5%)",
      targetDhatu: "Mamsa & Majja Dhatu (Muscle & Nervous System)",
      clinicalRole:
        "Supreme adaptogenic botanical modulating the HPA axis to stabilize cortisol levels, combat nervous exhaustion, and preserve physical endurance under clinical demand.",
      connectedProductIds: ["rati-shakti-maharaja", "rati-shakti-capsules", "rati-shakti-oil", "rati-shakti-majun"],
    },
    {
      ...botanicals[2], // Kashmiri Kesar
      actives: "Crocin, Safranal, Picrocrocin (Grade-A GI Kashmir)",
      targetDhatu: "Rasa & Rakta Dhatu (Micro-Circulation & Sensory Vitality)",
      clinicalRole:
        "High-altitude saffron stigmas stimulate peripheral capillary perfusion, imparting radiant sensory warmth and nourishing deep Ojas.",
      connectedProductIds: ["rati-shakti-majun"],
    },
    {
      ...botanicals[3], // Safed Musli
      actives: "Natural Furostanol Saponins (>30%) & Polysaccharides",
      targetDhatu: "Shukra Dhatu (Reproductive & Sustained Fortitude)",
      clinicalRole:
        "Celebrated in Dravyaguna texts as a premier Balya & Rasayana root, replenishing cellular energy reserves and physical stamina.",
      connectedProductIds: ["rati-shakti-maharaja", "rati-shakti-capsules", "rati-shakti-majun"],
    },
    {
      ...botanicals[4], // Kaunch Beej
      actives: "Natural L-DOPA (3,4-dihydroxyphenylalanine)",
      targetDhatu: "Majja Dhatu (Motor & Neuro-Muscular Tone)",
      clinicalRole:
        "Provides bio-available dopamine precursors to support neuromuscular coordination, mental clarity, and youthful vigor.",
      connectedProductIds: ["rati-shakti-maharaja", "rati-shakti-capsules"],
    },
    {
      ...botanicals[5], // Gokshura
      actives: "Steroidal Saponins (Protodioscin min 40%)",
      targetDhatu: "Mutravaha Srotas & Shukra Dhatu",
      clinicalRole:
        "Pitta-pacifying tonic maintaining healthy kidney and urinary tract tone while enhancing endogenous metabolic vigor.",
      connectedProductIds: ["rati-shakti-maharaja", "rati-shakti-capsules"],
    },
  ];

  const currentHerb = herbMatrixData[selectedHerbIndex];
  const matchingProducts = products.filter((p) =>
    currentHerb.connectedProductIds.includes(p.id)
  );

  return (
    <section
      id="botanical-matrix"
      style={{
        padding: "6.5rem 0",
        background: "#071c14",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Dna size={12} />
            <span>BIOCHEMICAL PHYTO-SYNERGY</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            The Botanical Synergy Matrix
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Select any foundational botanical to reveal its bio-active assay markers,
            targeted bodily tissue (Dhatu), and formulation deployments.
          </p>
        </div>

        {/* Herb Selector Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.65rem",
            marginBottom: "3.5rem",
          }}
        >
          {herbMatrixData.map((herb, idx) => {
            const isSelected = selectedHerbIndex === idx;
            return (
              <button
                key={herb.name}
                onClick={() => setSelectedHerbIndex(idx)}
                style={{
                  padding: "0.6rem 1.35rem",
                  borderRadius: "9999px",
                  fontSize: "0.88rem",
                  fontFamily: "var(--font-sans-body)",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  background: isSelected
                    ? "linear-gradient(135deg, #dfbe78 0%, #cba864 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isSelected ? "#071c14" : "var(--text-light-secondary)",
                  border: isSelected
                    ? "1px solid var(--accent-gold-light)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isSelected ? "0 4px 14px rgba(203, 168, 100, 0.3)" : "none",
                }}
              >
                {herb.name}
              </button>
            );
          })}
        </div>

        {/* Matrix Display Card */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(16, 48, 35, 0.75) 0%, rgba(8, 26, 18, 0.95) 100%)",
            border: "1px solid var(--border-gold-strong)",
            borderRadius: "18px",
            padding: "3rem 2.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          }}
          className="animate-fade-in"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
            className="matrix-grid"
          >
            {/* Left Column: Botanical Profile */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                <span className="gold-badge" style={{ fontSize: "0.7rem" }}>
                  {currentHerb.badge}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--accent-gold-light)", fontStyle: "italic" }}>
                  {currentHerb.sanskrit}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "2.2rem",
                  color: "#faf8f2",
                  marginBottom: "0.3rem",
                  lineHeight: 1.15,
                }}
              >
                {currentHerb.name}
              </h3>

              <span
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  color: "var(--accent-gold-primary)",
                  fontFamily: "var(--font-sans-body)",
                  marginBottom: "1.4rem",
                }}
              >
                {currentHerb.botanicalName}
              </span>

              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-light-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "1.6rem",
                }}
              >
                {currentHerb.description}
              </p>

              {/* Bio-chemical Assay Box */}
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(203, 168, 100, 0.22)",
                  borderRadius: "10px",
                  padding: "1.2rem 1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <strong style={{ fontSize: "0.78rem", color: "var(--accent-gold-primary)", textTransform: "uppercase", display: "block" }}>
                    Standardized Active Phytochemicals:
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "#faf8f2" }}>
                    {currentHerb.actives}
                  </span>
                </div>

                <div>
                  <strong style={{ fontSize: "0.78rem", color: "var(--accent-gold-primary)", textTransform: "uppercase", display: "block" }}>
                    Targeted Physiological Dhatu:
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "var(--accent-gold-light)" }}>
                    {currentHerb.targetDhatu}
                  </span>
                </div>

                <div>
                  <strong style={{ fontSize: "0.78rem", color: "var(--accent-gold-primary)", textTransform: "uppercase", display: "block" }}>
                    Clinical Dravyaguna Mechanics:
                  </strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-light-secondary)" }}>
                    {currentHerb.clinicalRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Formulations Deploying this Herb */}
            <div
              style={{
                background: "rgba(7, 24, 17, 0.8)",
                border: "1px solid rgba(203, 168, 100, 0.25)",
                borderRadius: "14px",
                padding: "2.2rem 1.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif-accent)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    color: "var(--accent-gold-primary)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                  }}
                >
                  SYNERGISTIC FORMULATION HARNESS
                </span>

                <h4 style={{ fontSize: "1.35rem", color: "#faf8f2", marginBottom: "1.2rem" }}>
                  Medicines Powered by {currentHerb.name}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {matchingProducts.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px",
                        padding: "1rem 1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <img
                          src={p.heroImage}
                          alt={p.name}
                          style={{
                            width: "3rem",
                            height: "3rem",
                            objectFit: "contain",
                            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
                          }}
                        />
                        <div>
                          <strong style={{ fontSize: "0.95rem", color: "#faf8f2", display: "block" }}>
                            {p.name}
                          </strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-light-muted)" }}>
                            {p.packSummary}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProduct(p)}
                        className="btn-secondary"
                        style={{
                          padding: "0.45rem 0.85rem",
                          fontSize: "0.76rem",
                          borderRadius: "6px",
                          gap: "0.35rem",
                        }}
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: "1.8rem",
                  paddingTop: "1.2rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.82rem", color: "var(--text-light-muted)" }}>
                  Verified laboratory extraction profile
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--accent-gold-light)", fontWeight: 600 }}>
                  100% Herbal Integrity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .matrix-grid {
            grid-template-columns: 1.25fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
