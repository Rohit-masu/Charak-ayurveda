import React, { useState, useEffect } from "react";
import { X, Check, MessageCircle, FileText } from "lucide-react";
import { contactDetails } from "../data/catalog";

export default function ProductModal({ product, onClose, onOpenEnquiry }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const whatsappMessage = `Hello Charak Ayurveda, I would like to enquire about: ${product.name} (${currentVariant.label}). Please provide product details and dispensing/distribution terms.`;
  const whatsappUrl = `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(3, 15, 10, 0.85)",
        backdropFilter: "blur(12px)",
      }}
      className="animate-fade-in"
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(165deg, #0e2a1f 0%, #071c14 100%)",
          border: "1px solid var(--border-gold-strong)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "880px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
          color: "#faf8f2",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        className="animate-modal-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product details"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 10,
            width: "2.4rem",
            height: "2.4rem",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(203, 168, 100, 0.3)",
            color: "var(--accent-gold-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(203, 168, 100, 0.25)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            padding: "2.5rem 2.2rem",
          }}
          className="modal-grid"
        >
          {/* Left Column: Product Visual & Variants */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(circle, rgba(22, 64, 48, 0.6) 0%, rgba(7, 28, 20, 0.4) 100%)",
              borderRadius: "12px",
              padding: "2rem 1.5rem",
              border: "1px solid rgba(203, 168, 100, 0.2)",
            }}
          >
            {/* Active Image Render */}
            <div
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
              }}
            >
              <img
                src={currentVariant.file}
                alt={currentVariant.label}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6))",
                }}
              />
            </div>

            {/* Pack Variants Selector (if more than 1) */}
            {product.variants.length > 1 && (
              <div style={{ width: "100%" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif-accent)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    color: "var(--accent-gold-primary)",
                    textTransform: "uppercase",
                    marginBottom: "0.6rem",
                    textAlign: "center",
                  }}
                >
                  Available Formats & Pack Sizes
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  {product.variants.map((v, i) => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariantIndex(i)}
                      style={{
                        padding: "0.55rem 0.85rem",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        textAlign: "left",
                        background:
                          selectedVariantIndex === i
                            ? "rgba(203, 168, 100, 0.18)"
                            : "rgba(255, 255, 255, 0.04)",
                        border:
                          selectedVariantIndex === i
                            ? "1px solid var(--accent-gold-primary)"
                            : "1px solid rgba(255, 255, 255, 0.06)",
                        color:
                          selectedVariantIndex === i
                            ? "var(--accent-gold-light)"
                            : "var(--text-light-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 200ms ease",
                      }}
                    >
                      <span style={{ fontWeight: selectedVariantIndex === i ? 600 : 400 }}>
                        {v.label}
                      </span>
                      {selectedVariantIndex === i && <Check size={14} color="#dfbe78" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Clinical Dossier */}
          <div>
            {/* Badge & Title */}
            <div style={{ marginBottom: "0.8rem" }}>
              <span className="gold-badge">{product.badge}</span>
            </div>

            <h2
              id="modal-title"
              style={{
                fontSize: "clamp(1.7rem, 2.5vw, 2.2rem)",
                color: "#faf8f2",
                marginBottom: "0.5rem",
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--accent-gold-light)",
                fontWeight: 500,
                marginBottom: "1.4rem",
              }}
            >
              {product.headline}
            </p>

            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--text-light-secondary)",
                lineHeight: 1.65,
                marginBottom: "1.8rem",
              }}
            >
              {product.overview}
            </p>

            {/* Active Ayurvedic Botanicals */}
            <div style={{ marginBottom: "1.8rem" }}>
              <h4
                style={{
                  fontFamily: "var(--font-serif-accent)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.14em",
                  color: "var(--accent-gold-primary)",
                  textTransform: "uppercase",
                  marginBottom: "0.8rem",
                }}
              >
                Key Active Botanicals & Minerals
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {product.keyHerbs.map((herb) => (
                  <div
                    key={herb.name}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "6px",
                      padding: "0.6rem 0.85rem",
                      fontSize: "0.84rem",
                    }}
                  >
                    <strong style={{ color: "#faf8f2" }}>{herb.name}: </strong>
                    <span style={{ color: "var(--text-light-muted)" }}>{herb.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosage & Storage Protocol */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
                padding: "1rem 1.2rem",
                background: "rgba(18, 51, 38, 0.4)",
                border: "1px solid rgba(203, 168, 100, 0.18)",
                borderRadius: "8px",
                marginBottom: "2rem",
              }}
            >
              <div>
                <strong style={{ color: "var(--accent-gold-light)", fontSize: "0.82rem", display: "block" }}>
                  Dosage & Administration Protocol:
                </strong>
                <span style={{ color: "var(--text-light-secondary)", fontSize: "0.84rem" }}>
                  {product.dosage}
                </span>
              </div>

              <div>
                <strong style={{ color: "var(--accent-gold-light)", fontSize: "0.82rem", display: "block" }}>
                  Storage Recommendations:
                </strong>
                <span style={{ color: "var(--text-light-secondary)", fontSize: "0.84rem" }}>
                  {product.storage}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: 1, minWidth: "200px" }}
              >
                <MessageCircle size={16} />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry(
                    `Practitioner Enquiry for ${product.name} (${currentVariant.label})`
                  );
                }}
                className="btn-secondary"
                style={{ flex: 1, minWidth: "200px" }}
              >
                <FileText size={16} />
                <span>Submit Clinical Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr 1.35fr !important;
          }
        }
      `}</style>
    </div>
  );
}
