import React from "react";
import { ArrowRight, Layers } from "lucide-react";
import { categories } from "../data/catalog";

export default function CategoryShowcase({ onSelectCategory }) {
  // Filter out the "all" category for the editorial feature grid
  const featureCategories = categories.filter((c) => c.id !== "all");

  const handleExplore = (categoryId) => {
    onSelectCategory(categoryId);
    const target = document.getElementById("formulations");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="categories"
      style={{
        padding: "6rem 0",
        background: "linear-gradient(180deg, #071c14 0%, #0d281e 50%, #071c14 100%)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto 4rem",
          }}
        >
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Layers size={12} />
            <span>THERAPEUTIC CLASSIFICATION</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              color: "#faf8f2",
              marginBottom: "1.2rem",
              lineHeight: 1.2,
            }}
          >
            Formulations by Category
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Four classical Ayurvedic delivery formats developed for targeted physiological
            absorption and sustained vitality.
          </p>
        </div>

        {/* Editorial Category Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {featureCategories.map((cat, idx) => (
            <div
              key={cat.id}
              style={{
                background: "rgba(18, 51, 38, 0.45)",
                border: "1px solid rgba(203, 168, 100, 0.22)",
                borderRadius: "12px",
                padding: "2rem 1.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(10px)",
                transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
              className="category-card"
              onClick={() => handleExplore(cat.id)}
            >
              {/* Subtle Ambient Back-Glow */}
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  right: "-20%",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(203, 168, 100, 0.12) 0%, transparent 70%)",
                  filter: "blur(30px)",
                  pointerEvents: "none",
                }}
              />

              {/* Top Meta */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif-accent)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.14em",
                      color: "var(--accent-gold-primary)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Format 0{idx + 1}
                  </span>

                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-light-muted)",
                      background: "rgba(255, 255, 255, 0.06)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                    }}
                  >
                    {cat.count} {cat.count > 1 ? "Formulations" : "Formulation"}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.45rem",
                    color: "#faf8f2",
                    marginBottom: "0.6rem",
                  }}
                >
                  {cat.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-light-muted)",
                    lineHeight: 1.55,
                    marginBottom: "1.8rem",
                  }}
                >
                  {cat.tagline}
                </p>
              </div>

              {/* Product Visual Preview */}
              <div
                style={{
                  height: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1rem 0 1.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(22, 64, 48, 0.8) 0%, transparent 70%)",
                    zIndex: 0,
                  }}
                />
                <img
                  src={cat.featuredImage}
                  alt={cat.name}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "80%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 12px 20px rgba(0, 0, 0, 0.5))",
                    transition: "transform 350ms ease",
                  }}
                  className="cat-thumb"
                />
              </div>

              {/* Action Link */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "1.2rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    color: "var(--accent-gold-light)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  Explore Formulations <ArrowRight size={14} className="cat-arrow" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-card:hover {
          transform: translateY(-6px);
          border-color: rgba(203, 168, 100, 0.55);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
        }
        .category-card:hover .cat-thumb {
          transform: scale(1.08);
        }
        .category-card:hover .cat-arrow {
          transform: translateX(4px);
        }
        .cat-arrow {
          transition: transform 200ms ease;
        }
      `}</style>
    </section>
  );
}
