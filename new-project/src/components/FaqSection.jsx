import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "../data/catalog";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      style={{
        padding: "6rem 0",
        background: "linear-gradient(180deg, #071c14 0%, #0a251b 50%, #061911 100%)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <HelpCircle size={12} />
            <span>CLINICAL & TRADE INQUIRIES</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Frequently Answered Questions
          </h2>

          <p
            style={{
              fontSize: "1.02rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Clear, verified facts regarding our Ayurvedic formulation standards,
            vegetarian compliance, and practitioner evaluation pathways.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={faq.question}
                style={{
                  background: isOpen
                    ? "rgba(18, 51, 38, 0.6)"
                    : "rgba(18, 51, 38, 0.25)",
                  border: isOpen
                    ? "1px solid var(--border-gold-strong)"
                    : "1px solid rgba(203, 168, 100, 0.2)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "all 250ms ease",
                }}
              >
                <button
                  id={headerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.35rem 1.6rem",
                    textAlign: "left",
                    color: isOpen ? "var(--accent-gold-light)" : "#faf8f2",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-sans-body)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "1rem",
                  }}
                >
                  <span>{faq.question}</span>
                  <div
                    style={{
                      width: "1.8rem",
                      height: "1.8rem",
                      borderRadius: "50%",
                      background: isOpen
                        ? "rgba(203, 168, 100, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold-light)",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 250ms ease",
                    }}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    style={{
                      padding: "0 1.6rem 1.5rem",
                      color: "var(--text-light-secondary)",
                      fontSize: "0.94rem",
                      lineHeight: 1.65,
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      paddingTop: "1rem",
                    }}
                    className="animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
