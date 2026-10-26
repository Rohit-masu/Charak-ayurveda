import React from "react";
import { Leaf } from "lucide-react";
import { botanicals } from "../data/catalog";

export default function BotanicalExplorer() {
  return (
    <section
      id="botanicals"
      style={{
        padding: "6rem 0",
        background: "#05150f",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3.5rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Leaf size={12} />
            <span>HERBAL PHARMACOPOEIA</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            The Foundational Botanicals
          </h2>

          <p
            style={{
              fontSize: "1.02rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Sourced from verified Himalayan and regional origins, each herb is standardized
            for authentic bioactive potency according to Ayurvedic Dravyaguna principles.
          </p>
        </div>

        {/* Botanical Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.85rem",
          }}
        >
          {botanicals.map((herb) => (
            <div
              key={herb.name}
              style={{
                background: "linear-gradient(180deg, rgba(17, 48, 36, 0.45) 0%, rgba(8, 26, 18, 0.75) 100%)",
                border: "1px solid rgba(203, 168, 100, 0.2)",
                borderRadius: "12px",
                padding: "2rem 1.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(10px)",
                transition: "all 300ms ease",
              }}
              className="herb-card"
            >
              <div>
                {/* Badge & Sanskrit Name */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif-accent)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      color: "var(--accent-gold-primary)",
                      textTransform: "uppercase",
                      background: "rgba(203, 168, 100, 0.1)",
                      border: "1px solid rgba(203, 168, 100, 0.25)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                    }}
                  >
                    {herb.badge}
                  </span>

                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-light-muted)",
                      fontStyle: "italic",
                    }}
                  >
                    {herb.sanskrit}
                  </span>
                </div>

                {/* Herb Name */}
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#faf8f2",
                    marginBottom: "0.3rem",
                  }}
                >
                  {herb.name}
                </h3>

                {/* Botanical Binomial */}
                <span
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    color: "var(--accent-gold-light)",
                    fontFamily: "var(--font-sans-body)",
                    marginBottom: "1rem",
                  }}
                >
                  {herb.botanicalName}
                </span>

                {/* Dravyaguna Properties */}
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.25)",
                    borderLeft: "2px solid var(--accent-gold-primary)",
                    padding: "0.45rem 0.75rem",
                    borderRadius: "0 4px 4px 0",
                    marginBottom: "1rem",
                    fontSize: "0.76rem",
                    color: "var(--accent-gold-light)",
                    fontFamily: "monospace",
                  }}
                >
                  {herb.properties}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-light-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {herb.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .herb-card:hover {
          transform: translateY(-5px);
          border-color: rgba(203, 168, 100, 0.45);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
        }
      `}</style>
    </section>
  );
}
