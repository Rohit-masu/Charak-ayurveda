import React, { useState } from "react";
import { Mountain, Flame, Sparkles, CheckCircle2, Clock, Thermometer, Shield } from "lucide-react";

export default function ExtractionJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      step: "01",
      name: "Wild Sourcing & Shodhana",
      sanskrit: "शोधन संस्कार • Purifying the Mineral & Botanical Essence",
      summary:
        "Raw Himalayan Shilajit exudates and wild adaptogenic roots are gathered at high altitudes. They undergo classical multi-stage Shodhana (purification) in Triphala decoctions to extract fulvic mineral fractions while completely neutralizing impurities.",
      duration: "7 Days Triphala Shodhana",
      temperature: "Ambient Sunlight Evaporation",
      standard: "100% Raw Heavy Metal Clearance",
      icon: Mountain,
      detail:
        "Unlike industrial high-heat boiling, classical Shodhana honors the seasonal cycles, allowing organic fulvic acids and trace minerals to remain bio-active without thermal degradation.",
    },
    {
      step: "02",
      name: "Sneha Kalpana Lipid Infusion",
      sanskrit: "स्नेह कल्पना • Classical Medicated Oil Cooking",
      summary:
        "To formulate our Ayurvedic Massage Oil, decoctions of Withania somnifera and mineral resins are simmered in cold-pressed base oils for 72 consecutive hours until all water vapor evaporates, transferring full phyto-actives into the lipid matrix.",
      duration: "72 Continuous Hours",
      temperature: "Mridu Agni (Gentle Sub-Boil)",
      standard: "Paka Siddhi Lakshana Verified",
      icon: Flame,
      detail:
        "The end of the decoction is marked by the classical test: the herbal paste forms a supple wick without crackling in fire, indicating total moisture elimination and optimal dermal absorption.",
    },
    {
      step: "03",
      name: "Artisanal Avaleha Confection",
      sanskrit: "अवलेह पाक • Saffron & Honey Preserves",
      summary:
        "Our Rati Shakti Majun is prepared by slowly reducing concentrated herbal extracts with pure Kashmir saffron stigmas (Crocus sativus) and organic honey into a velvety medicinal paste that delivers sustained cellular assimilation.",
      duration: "Classical Copper Vessel Cooking",
      temperature: "Controlled Low Heat",
      standard: "Grade-A GI Kashmir Saffron",
      icon: Sparkles,
      detail:
        "Majun delivery bypasses harsh gastric degradation, coating mucosal linings to promote sustained release and long-lasting vitality throughout the day.",
    },
    {
      step: "04",
      name: "Standardized Haridwar Assays",
      sanskrit: "मानकीकरण • Modern Analytical Discipline",
      summary:
        "Every completed batch produced at our Haridwar facility is subjected to HPLC fingerprinting, active marker assays, microbial counts, and heavy metal testing before entering the physician distribution chain.",
      duration: "Every Production Lot",
      temperature: "Climate Controlled Storage",
      standard: "Analytical Certificate of Analysis",
      icon: Shield,
      detail:
        "Bridging classical sanctity with medical transparency: BAMS physicians receive verified batch documentation ensuring consistent therapeutic outcomes.",
    },
  ];

  const current = stages[activeStep];
  const Icon = current.icon;

  return (
    <section
      id="extraction-journey"
      style={{
        padding: "6.5rem 0",
        background: "#05150f",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 4rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Flame size={12} />
            <span>THE SACRED PROTOCOL</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            From Himalayan Peaks to Sacred Formulations
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Explore the four classical pharmaceutical stages that transform raw botanicals
            into standardized Ayurvedic medicines.
          </p>
        </div>

        {/* Stepper Navigation Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {stages.map((st, idx) => {
            const isActive = activeStep === idx;
            const StepIcon = st.icon;

            return (
              <button
                key={st.step}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: "1.4rem 1.25rem",
                  borderRadius: "12px",
                  background: isActive
                    ? "linear-gradient(180deg, rgba(203, 168, 100, 0.18) 0%, rgba(14, 45, 32, 0.85) 100%)"
                    : "rgba(14, 45, 32, 0.35)",
                  border: isActive
                    ? "1px solid var(--accent-gold-primary)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 250ms ease",
                  boxShadow: isActive ? "0 8px 24px rgba(203, 168, 100, 0.2)" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif-accent)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.14em",
                      color: isActive ? "var(--accent-gold-light)" : "var(--accent-gold-primary)",
                      fontWeight: 600,
                    }}
                  >
                    PHASE {st.step}
                  </span>

                  <StepIcon size={18} color={isActive ? "#dfbe78" : "#8fa597"} />
                </div>

                <strong
                  style={{
                    fontSize: "0.98rem",
                    color: isActive ? "#ffffff" : "var(--text-light-secondary)",
                    display: "block",
                    lineHeight: 1.3,
                  }}
                >
                  {st.name}
                </strong>
              </button>
            );
          })}
        </div>

        {/* Stage Detailed Display Card */}
        <div
          style={{
            background: "linear-gradient(165deg, rgba(16, 50, 36, 0.75) 0%, rgba(7, 26, 18, 0.95) 100%)",
            border: "1px solid var(--border-gold-strong)",
            borderRadius: "16px",
            padding: "3rem 2.6rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          }}
          className="animate-fade-in"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="journey-grid"
          >
            {/* Left Content */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-serif-accent)",
                    letterSpacing: "0.14em",
                    color: "var(--accent-gold-primary)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  STAGE {current.step} OF 04
                </span>
                <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>•</span>
                <span style={{ fontSize: "0.85rem", color: "var(--accent-gold-light)", fontStyle: "italic" }}>
                  {current.sanskrit}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: "#faf8f2",
                  marginBottom: "1.2rem",
                  lineHeight: 1.2,
                }}
              >
                {current.name}
              </h3>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-light-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.8rem",
                }}
              >
                {current.summary}
              </p>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-light-muted)",
                  lineHeight: 1.65,
                  padding: "1rem 1.2rem",
                  background: "rgba(0, 0, 0, 0.25)",
                  borderLeft: "3px solid var(--accent-gold-primary)",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                {current.detail}
              </p>
            </div>

            {/* Right Parameters Card */}
            <div
              style={{
                background: "rgba(7, 24, 17, 0.8)",
                border: "1px solid rgba(203, 168, 100, 0.25)",
                borderRadius: "14px",
                padding: "2.2rem 1.8rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "2.8rem",
                    height: "2.8rem",
                    borderRadius: "10px",
                    background: "rgba(203, 168, 100, 0.15)",
                    border: "1px solid var(--border-gold-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-light)",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-gold-primary)", textTransform: "uppercase" }}>
                    Classical Method
                  </span>
                  <strong style={{ display: "block", color: "#faf8f2", fontSize: "1.05rem" }}>
                    {current.name}
                  </strong>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Clock size={16} color="#dfbe78" />
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "var(--text-light-muted)", display: "block" }}>
                      Extraction Timeline:
                    </span>
                    <strong style={{ fontSize: "0.88rem", color: "#faf8f2" }}>
                      {current.duration}
                    </strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Thermometer size={16} color="#dfbe78" />
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "var(--text-light-muted)", display: "block" }}>
                      Decoction Temperature:
                    </span>
                    <strong style={{ fontSize: "0.88rem", color: "#faf8f2" }}>
                      {current.temperature}
                    </strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircle2 size={16} color="#25D366" />
                  <div>
                    <span style={{ fontSize: "0.74rem", color: "var(--text-light-muted)", display: "block" }}>
                      Verification Assay:
                    </span>
                    <strong style={{ fontSize: "0.88rem", color: "#faf8f2" }}>
                      {current.standard}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .journey-grid {
            grid-template-columns: 1.35fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
