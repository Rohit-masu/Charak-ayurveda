import React from "react";
import { BookOpen, Leaf, Compass, Stethoscope } from "lucide-react";

export default function AttributesStrip() {
  const attributes = [
    {
      icon: BookOpen,
      title: "Classical Lineage",
      subtitle: "Rooted in Charaka Samhita scriptures",
    },
    {
      icon: Leaf,
      title: "Botanical Integrity",
      subtitle: "Purified Himalayan herbs & zero synthetic fillers",
    },
    {
      icon: Compass,
      title: "Disciplined Assays",
      subtitle: "Standardized batch testing in Haridwar",
    },
    {
      icon: Stethoscope,
      title: "Practitioner Network",
      subtitle: "Dedicated clinical supply for BAMS doctors",
    },
  ];

  return (
    <section
      aria-label="Brand Attributes"
      style={{
        background: "#051610",
        borderTop: "1px solid rgba(203, 168, 100, 0.22)",
        borderBottom: "1px solid rgba(203, 168, 100, 0.22)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {attributes.map((attr, index) => {
            const Icon = attr.icon;
            return (
              <div
                key={attr.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0.5rem 0.75rem",
                  borderRight:
                    index < attributes.length - 1
                      ? "1px solid rgba(203, 168, 100, 0.12)"
                      : "none",
                }}
                className="attribute-item"
              >
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "8px",
                    background: "rgba(22, 64, 48, 0.5)",
                    border: "1px solid var(--border-gold-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-sans-body)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#faf7f0",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {attr.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-light-muted)",
                      lineHeight: 1.35,
                    }}
                  >
                    {attr.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .attribute-item {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
}
