import React, { useState } from "react";
import { Sun, Sunset, Moon, Coffee, Sparkles, Check, ArrowRight } from "lucide-react";

export default function RegimenPlanner({ onOpenEnquiry }) {
  const [selectedGoal, setSelectedGoal] = useState("vitality");

  const regimens = {
    vitality: {
      title: "Comprehensive Restorative Regimen",
      tagline: "For Sustained Physical Stamina, Nerve Vitality & Cellular Resilience",
      schedule: [
        {
          period: "Morning • Pratah Kala",
          time: "06:30 – 07:30 AM",
          icon: Sun,
          stepTitle: "1 Capsule Rati Shakti with Lukewarm Milk",
          description:
            "Take with warm cow's milk or water on an empty or light stomach. Purified Shilajit and Ashwagandha gently activate physical endurance and mental clarity for the day ahead.",
          format: "Rati Shakti Vitality Capsule",
        },
        {
          period: "Afternoon • Madhyahna",
          time: "12:30 – 01:30 PM",
          icon: Coffee,
          stepTitle: "Balanced Seasonal Nutrition",
          description:
            "Support digestive Agni with freshly prepared warm grains, ghee, and seasonal greens. Avoid cold iced water to preserve bio-availability of the morning extract.",
          format: "Dietary Guidance",
        },
        {
          period: "Dusk • Sandhya Kala",
          time: "06:30 – 07:30 PM",
          icon: Sunset,
          stepTitle: "Topical Medicated Oil Massage",
          description:
            "Apply 5–7 drops of Rati Shakti Ayurvedic Massage Oil to targeted areas using gentle rhythmic circular strokes to nourish muscular tissues and soothe local fatigue.",
          format: "Rati Shakti Massage Oil",
        },
        {
          period: "Night • Ratri Kala",
          time: "09:30 – 10:00 PM",
          icon: Moon,
          stepTitle: "Half Teaspoon Classical Majun",
          description:
            "Stir 3–5 grams of Rati Shakti Majun with warm milk 30 minutes before sleep. Kashmiri saffron and restorative roots deeply rebuild Ojas (vital vigor) during sleep cycles.",
          format: "Rati Shakti Classical Majun",
        },
      ],
    },
    physician: {
      title: "Physician Clinical Protocol",
      tagline: "Structured 60–90 Day Clinical Course for Dispensing Practitioners",
      schedule: [
        {
          period: "Diagnostic Onset",
          time: "Weeks 1 – 2",
          icon: Sun,
          stepTitle: "Initiation & Agni Stabilization",
          description:
            "Physician administers 1 capsule twice daily post-prandial. Evaluates patient tolerance and gut absorption.",
          format: "Clinical Dossier Protocol",
        },
        {
          period: "Consolidation",
          time: "Weeks 3 – 8",
          icon: Sunset,
          stepTitle: "Intensive Rasayana Phase (Maharaja Kit)",
          description:
            "Patient advances to full Maharaja 90-capsule course paired with external Sneha Kalpana massage oil for holistic systemic stimulation.",
          format: "Maharaja Kit & Oil",
        },
        {
          period: "Ojas Sustenance",
          time: "Weeks 9 – 12",
          icon: Moon,
          stepTitle: "Majun Maintenance Protocol",
          description:
            "Maintenance with slow-cooked herbal paste to sustain reproductive tissue nourishment and systemic vitality.",
          format: "Classical Majun",
        },
      ],
    },
  };

  const activeRegimen = regimens[selectedGoal];

  return (
    <section
      id="regimen-planner"
      style={{
        padding: "6.5rem 0",
        background: "linear-gradient(180deg, #051610 0%, #0c2b1e 50%, #051610 100%)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Sparkles size={12} />
            <span>DAILY DINACHARYA PROTOCOL</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            The 24-Hour Vitality Blueprint
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            In Ayurvedic science, timing (Kala) amplifies herbal efficacy. Explore how our
            formulations synergize throughout the natural diurnal cycle.
          </p>
        </div>

        {/* Goal Selector Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
        >
          <button
            onClick={() => setSelectedGoal("vitality")}
            style={{
              padding: "0.75rem 1.6rem",
              borderRadius: "9999px",
              fontSize: "0.9rem",
              fontWeight: selectedGoal === "vitality" ? 600 : 500,
              background:
                selectedGoal === "vitality"
                  ? "linear-gradient(135deg, #dfbe78 0%, #cba864 100%)"
                  : "rgba(255, 255, 255, 0.05)",
              color: selectedGoal === "vitality" ? "#071c14" : "var(--text-light-secondary)",
              border:
                selectedGoal === "vitality"
                  ? "1px solid var(--accent-gold-light)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            Holistic Daily Routine
          </button>

          <button
            onClick={() => setSelectedGoal("physician")}
            style={{
              padding: "0.75rem 1.6rem",
              borderRadius: "9999px",
              fontSize: "0.9rem",
              fontWeight: selectedGoal === "physician" ? 600 : 500,
              background:
                selectedGoal === "physician"
                  ? "linear-gradient(135deg, #dfbe78 0%, #cba864 100%)"
                  : "rgba(255, 255, 255, 0.05)",
              color: selectedGoal === "physician" ? "#071c14" : "var(--text-light-secondary)",
              border:
                selectedGoal === "physician"
                  ? "1px solid var(--accent-gold-light)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              transition: "all 200ms ease",
            }}
          >
            Physician Clinical Pathway
          </button>
        </div>

        {/* Timeline Schedule Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.8rem",
            marginBottom: "3rem",
          }}
        >
          {activeRegimen.schedule.map((item, idx) => {
            const TimeIcon = item.icon;

            return (
              <div
                key={idx}
                style={{
                  background: "linear-gradient(180deg, rgba(16, 48, 35, 0.65) 0%, rgba(8, 25, 17, 0.95) 100%)",
                  border: "1px solid rgba(203, 168, 100, 0.22)",
                  borderRadius: "14px",
                  padding: "2rem 1.6rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  transition: "all 300ms ease",
                }}
                className="regimen-card"
              >
                <div>
                  {/* Top Meta */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.2rem",
                    }}
                  >
                    <div
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "8px",
                        background: "rgba(203, 168, 100, 0.12)",
                        border: "1px solid var(--border-gold-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-gold-light)",
                      }}
                    >
                      <TimeIcon size={18} />
                    </div>

                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-light-muted)",
                        fontFamily: "var(--font-serif-accent)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.time}
                    </span>
                  </div>

                  <span
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-serif-accent)",
                      letterSpacing: "0.12em",
                      color: "var(--accent-gold-primary)",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.period}
                  </span>

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      color: "#faf8f2",
                      marginBottom: "0.8rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.stepTitle}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--text-light-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Format Badge */}
                <div
                  style={{
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Check size={13} color="#dfbe78" />
                  <span style={{ fontSize: "0.76rem", color: "var(--accent-gold-light)", fontWeight: 500 }}>
                    {item.format}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div
          style={{
            background: "radial-gradient(ellipse at center, rgba(22, 68, 50, 0.75) 0%, rgba(9, 28, 20, 0.95) 100%)",
            border: "1px solid var(--border-gold-strong)",
            borderRadius: "14px",
            padding: "2rem 2.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <h4 style={{ fontSize: "1.25rem", color: "#faf8f2", marginBottom: "0.25rem" }}>
              Require a Custom Clinical Dispensing Protocol?
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-light-muted)" }}>
              Our Ayurvedic medical liaison coordinates directly with registered clinics to structure bulk dispensing schedules.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry("Doctor / Clinical Practice")}
            className="btn-primary"
          >
            <span>Request Physician Schedule</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .regimen-card:hover {
          transform: translateY(-6px);
          border-color: rgba(203, 168, 100, 0.55);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}
