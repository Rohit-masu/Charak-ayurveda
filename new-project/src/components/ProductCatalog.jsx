import React from "react";
import { Eye, MessageCircle, Sparkles } from "lucide-react";
import { products, categories, contactDetails } from "../data/catalog";

export default function ProductCatalog({
  activeCategory,
  onSelectCategory,
  onSelectProduct,
}) {
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section
      id="formulations"
      style={{
        padding: "6rem 0",
        background: "#071c14",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Sparkles size={12} />
            <span>AUTHENTIC APOTHECARY RANGE</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            The Ayurvedic Formulations
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Formulated under strict supervision in Haridwar, adhering to classical
            Charaka Samhita protocols with standardized extracts and verified botanical integrity.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div
          role="tablist"
          aria-label="Product categories"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "3.5rem",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: "0.55rem 1.25rem",
                  borderRadius: "9999px",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-sans-body)",
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  background: isActive
                    ? "linear-gradient(135deg, #dfbe78 0%, #cba864 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#071c14" : "var(--text-light-secondary)",
                  border: isActive
                    ? "1px solid var(--accent-gold-light)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? "0 4px 14px rgba(203, 168, 100, 0.25)" : "none",
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.2rem",
          }}
        >
          {filteredProducts.map((prod) => {
            const whatsappMsg = `Hello Charak Ayurveda, I would like to enquire about ${prod.name} (${prod.packSummary}).`;
            const waUrl = `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(
              whatsappMsg
            )}`;

            return (
              <div
                key={prod.id}
                style={{
                  background: "linear-gradient(180deg, rgba(16, 46, 34, 0.6) 0%, rgba(9, 28, 20, 0.9) 100%)",
                  border: "1px solid rgba(203, 168, 100, 0.2)",
                  borderRadius: "14px",
                  padding: "2rem 1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="product-card"
              >
                {/* Top Format Pill & Badge */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.2rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-serif-accent)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--accent-gold-light)",
                        background: "rgba(203, 168, 100, 0.12)",
                        border: "1px solid rgba(203, 168, 100, 0.25)",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "9999px",
                        fontWeight: 600,
                      }}
                    >
                      {prod.badge}
                    </span>

                    <span
                      style={{
                        fontSize: "0.74rem",
                        color: "var(--text-light-muted)",
                      }}
                    >
                      {prod.packSummary}
                    </span>
                  </div>

                  {/* Product Photograph Stage */}
                  <div
                    style={{
                      height: "240px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "1rem 0 1.5rem",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => onSelectProduct(prod)}
                  >
                    {/* Glowing Backstage */}
                    <div
                      style={{
                        position: "absolute",
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(203, 168, 100, 0.15) 0%, transparent 70%)",
                        zIndex: 0,
                      }}
                    />

                    <img
                      src={prod.heroImage}
                      alt={prod.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "85%",
                        objectFit: "contain",
                        position: "relative",
                        zIndex: 1,
                        filter: "drop-shadow(0 15px 25px rgba(0, 0, 0, 0.55))",
                        transition: "transform 350ms ease",
                      }}
                      className="product-photo"
                    />
                  </div>

                  {/* Title & Headline */}
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      color: "#faf8f2",
                      marginBottom: "0.5rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {prod.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--text-light-muted)",
                      lineHeight: 1.55,
                      marginBottom: "1.2rem",
                    }}
                  >
                    {prod.headline}
                  </p>

                  {/* Key Botanical Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.8rem",
                    }}
                  >
                    {prod.keyHerbs.slice(0, 3).map((herb) => (
                      <span
                        key={herb.name}
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-light-secondary)",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "4px",
                        }}
                      >
                        {herb.name}
                      </span>
                    ))}
                    {prod.keyHerbs.length > 3 && (
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--accent-gold-primary)",
                          padding: "0.2rem 0.3rem",
                        }}
                      >
                        +{prod.keyHerbs.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.65rem",
                    paddingTop: "1.2rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="btn-secondary"
                    style={{
                      padding: "0.6rem 0.5rem",
                      fontSize: "0.82rem",
                      borderRadius: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <Eye size={14} />
                    <span>Inspect</span>
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      padding: "0.6rem 0.5rem",
                      fontSize: "0.82rem",
                      borderRadius: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <MessageCircle size={14} />
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-8px);
          border-color: rgba(203, 168, 100, 0.55);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }
        .product-card:hover .product-photo {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
