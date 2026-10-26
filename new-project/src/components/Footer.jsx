import React from "react";
import { ArrowUp, ShieldCheck } from "lucide-react";
import { contactDetails, brandAssets } from "../data/catalog";

export default function Footer({ onOpenEnquiry }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#04120d",
        color: "#faf8f2",
        borderTop: "1px solid rgba(203, 168, 100, 0.25)",
        paddingTop: "5rem",
        paddingBottom: "2.5rem",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Main Footer Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            marginBottom: "4rem",
          }}
          className="footer-grid"
        >
          {/* Brand & Credo Column */}
          <div style={{ maxWidth: "380px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.2rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #1a4d38 0%, #0c2b1f 100%)",
                  border: "1.5px solid var(--accent-gold-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#dfbe78",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dfbe78"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L15 8L21 9L16.5 13.5L18 20L12 16.5L6 20L7.5 13.5L3 9L9 8L12 2Z" />
                  <circle cx="12" cy="12" r="3" stroke="#dfbe78" strokeWidth="1.2" />
                </svg>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-serif-accent)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: "#faf7f0",
                    display: "block",
                    lineHeight: 1.1,
                  }}
                >
                  CHARAK <span style={{ color: "var(--accent-gold-light)", fontWeight: 500 }}>AYURVEDA</span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans-body)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    color: "var(--accent-gold-primary)",
                    textTransform: "uppercase",
                  }}
                >
                  {brandAssets.sanskritMotto}
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-light-muted)",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
              }}
            >
              Rooted in the Charaka Samhita. Crafting classical Ayurvedic formulations
              with authentic botanicals, traditional lipid extractions, and disciplined
              manufacturing standards in Haridwar, Uttarakhand.
            </p>

            <div className="gold-badge" style={{ fontSize: "0.68rem" }}>
              <ShieldCheck size={12} />
              <span>Ayurvedic Classical Standards</span>
            </div>
          </div>

          {/* Formulations Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif-accent)",
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                color: "var(--accent-gold-primary)",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
              }}
            >
              Formulations
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <a href="#formulations" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Rati Shakti Maharaja Kit
                </a>
              </li>
              <li>
                <a href="#formulations" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Rati Shakti Vitality Capsules
                </a>
              </li>
              <li>
                <a href="#formulations" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Rati Shakti Ayurvedic Massage Oil
                </a>
              </li>
              <li>
                <a href="#formulations" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Rati Shakti Classical Majun
                </a>
              </li>
              <li>
                <a href="#categories" style={{ color: "var(--accent-gold-light)", fontSize: "0.84rem" }}>
                  View All Categories →
                </a>
              </li>
            </ul>
          </div>

          {/* Gateways Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif-accent)",
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                color: "var(--accent-gold-primary)",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
              }}
            >
              Gateways & Care
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <button
                  onClick={() => onOpenEnquiry("Doctor / Clinical Practice")}
                  style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem", padding: 0, textAlign: "left" }}
                >
                  Doctor Sample Dossiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenEnquiry("Distributor / Trade Enquiry")}
                  style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem", padding: 0, textAlign: "left" }}
                >
                  Distribution Partnerships
                </button>
              </li>
              <li>
                <a href="#heritage" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Philosophy & Heritage
                </a>
              </li>
              <li>
                <a href="#botanicals" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Botanical Pharmacopoeia
                </a>
              </li>
              <li>
                <a href="#faq" style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                  Clinical FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Official Location */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif-accent)",
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                color: "var(--accent-gold-primary)",
                textTransform: "uppercase",
                marginBottom: "1.4rem",
              }}
            >
              Facility Desk
            </h4>
            <p style={{ color: "var(--text-light-secondary)", fontSize: "0.86rem", lineHeight: 1.5, marginBottom: "0.8rem" }}>
              {contactDetails.addressLine1}<br />
              {contactDetails.addressLine2}
            </p>
            <p style={{ fontSize: "0.86rem", marginBottom: "0.4rem" }}>
              <a href={`tel:${contactDetails.phoneRaw}`} style={{ color: "var(--accent-gold-light)" }}>
                {contactDetails.phoneDisplay}
              </a>
            </p>
            <p style={{ fontSize: "0.86rem", marginBottom: "1.2rem" }}>
              <a href={`mailto:${contactDetails.email}`} style={{ color: "var(--accent-gold-light)" }}>
                {contactDetails.email}
              </a>
            </p>
            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8rem",
                borderRadius: "6px",
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Regulatory & Medical Disclaimer Strip */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            fontSize: "0.78rem",
            color: "var(--text-light-muted)",
            lineHeight: 1.6,
          }}
        >
          <p style={{ marginBottom: "0.8rem" }}>
            <strong style={{ color: "var(--accent-gold-light)" }}>Statutory Advisory:</strong> All products
            described herein are proprietary Ayurvedic medicines. To be consumed or applied in accordance with
            authentic classical guidelines or as directed by an Ayurvedic physician. Statements regarding botanical
            actions are rooted in classical Dravyaguna pharmacopoeia texts and have not been evaluated as allopathic
            claims. Individual results may vary. Keep out of reach of children.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              paddingTop: "1.2rem",
            }}
          >
            <span>
              © 2026 Charak Ayurveda. All Rights Reserved.
            </span>
            <span style={{ color: "var(--accent-gold-primary)", fontSize: "0.74rem" }}>
              चरकसंहिता परम् प्रमाणम् • Haridwar, Uttarakhand
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .footer-grid {
            grid-template-columns: 1.6fr 1fr 1fr 1.2fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
