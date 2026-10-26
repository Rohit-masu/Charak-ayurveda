import React from "react";
import { Stethoscope, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { b2bPortals } from "../data/catalog";

export default function PractitionerB2B({ onOpenEnquiry }) {
  return (
    <section
      id="practitioners"
      style={{
        padding: "6.5rem 0",
        background: "linear-gradient(180deg, #071c14 0%, #0d2b1f 50%, #061912 100%)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Stethoscope size={12} />
            <span>PROFESSIONAL & TRADE PARTNERSHIPS</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Clinical & Distribution Gateways
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Dedicated institutional channels providing verified batch documentation,
            physician sample evaluation kits, and structured regional distribution.
          </p>
        </div>

        {/* Dual Pathways Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {b2bPortals.map((portal) => {
            const isDoctor = portal.id === "doctors";
            const Icon = isDoctor ? Stethoscope : Building2;

            return (
              <div
                key={portal.id}
                style={{
                  background: isDoctor
                    ? "radial-gradient(ellipse at top left, #143d2c 0%, #092419 100%)"
                    : "radial-gradient(ellipse at top right, #1a4231 0%, #0a261a 100%)",
                  border: "1px solid var(--border-gold-subtle)",
                  borderRadius: "16px",
                  padding: "2.8rem 2.2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                  transition: "all 300ms ease",
                }}
                className="portal-card"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "3.2rem",
                        height: "3.2rem",
                        borderRadius: "10px",
                        background: "rgba(203, 168, 100, 0.15)",
                        border: "1px solid var(--border-gold-strong)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-gold-light)",
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <span className="gold-badge">{portal.badge}</span>
                  </div>

                  <span
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      color: "var(--accent-gold-primary)",
                      fontFamily: "var(--font-serif-accent)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {portal.role}
                  </span>

                  <h3
                    style={{
                      fontSize: "1.65rem",
                      color: "#faf8f2",
                      marginBottom: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {portal.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.94rem",
                      color: "var(--text-light-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1.8rem",
                    }}
                  >
                    {portal.description}
                  </p>

                  {/* Bullet Benefits */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      marginBottom: "2.2rem",
                    }}
                  >
                    {portal.benefits.map((b) => (
                      <div
                        key={b}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.65rem",
                          fontSize: "0.88rem",
                          color: "var(--text-light-secondary)",
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color="#dfbe78"
                          style={{ flexShrink: 0, marginTop: "0.15rem" }}
                        />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onOpenEnquiry(portal.enquiryType)}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>{portal.ctaText}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .portal-card:hover {
          transform: translateY(-6px);
          border-color: rgba(203, 168, 100, 0.6);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </section>
  );
}
