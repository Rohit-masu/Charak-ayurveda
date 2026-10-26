import React, { useState } from "react";
import { Sparkles, ArrowRight, RotateCcw, Check, MessageCircle, FileText } from "lucide-react";
import { contactDetails } from "../data/catalog";

export default function DoshaQuiz({ onOpenEnquiry }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: "constitution",
      title: "Physical Constitution & Energy Flow",
      subtitle: "Which pattern best mirrors your natural bodily rhythm?",
      options: [
        {
          label: "Light frame, fluctuates quickly, feels cold easily",
          dosha: "vata",
          desc: "Quick reflex, dynamic energy, prone to fatigue under stress",
        },
        {
          label: "Medium athletic build, warm body temperature",
          dosha: "pitta",
          desc: "Focused intensity, high metabolic rate, passionate drive",
        },
        {
          label: "Sturdy solid frame, excellent natural endurance",
          dosha: "kapha",
          desc: "Calm disposition, steady stamina, thrives on gentle stimulation",
        },
      ],
    },
    {
      id: "digestion",
      title: "Metabolic Agni & Sleep Pattern",
      subtitle: "How does your digestive vitality manifest during the day?",
      options: [
        {
          label: "Irregular appetite, light sleeper with vivid dreams",
          dosha: "vata",
          desc: "Best supported by warming oils and nourishing herbal tonics",
        },
        {
          label: "Strong regular hunger, sleeps soundly but quickly awakens",
          dosha: "pitta",
          desc: "Best supported by cooling adaptogens like Saffron & Gokshura",
        },
        {
          label: "Steady, slow digestion, heavy deep sleep",
          dosha: "kapha",
          desc: "Best supported by warming herbal pastes like authentic Majun",
        },
      ],
    },
    {
      id: "priority",
      title: "Targeted Ayurvedic Health Goal",
      subtitle: "What is your primary restorative intention today?",
      options: [
        {
          label: "Deep vitality, nervous system calm & stamina",
          dosha: "vata",
          desc: "Requires intensive Rasayana nourishment (e.g. Shilajit + Ashwagandha)",
        },
        {
          label: "Micro-circulation, local vitality & tissue strength",
          dosha: "pitta",
          desc: "Requires classical Sneha Kalpana medicated oil therapy",
        },
        {
          label: "Enduring physical fortitude & restorative Ojas",
          dosha: "kapha",
          desc: "Requires traditional Ayurvedic Avaleha with pure Kashmir Kesar",
        },
      ],
    },
  ];

  const doshaProfiles = {
    vata: {
      name: "Vata Dominant (Air & Space)",
      sanskrit: "वात प्रकृति • Mobility & Prana",
      tagline: "Needs Deep Grounding, Warmth & Rasayana Vitality",
      description:
        "Your constitution is guided by the principle of kinetic motion and nervous transmission. Classical Charaka Samhita texts recommend heavy, unctuous Rasayanas rich in purified Shilajit and Ashwagandha to replenish vital essence (Ojas) and calm stress response.",
      recommendedProduct: "Rati Shakti Maharaja Kit (90 Capsules)",
      reason:
        "Formulated specifically to ground excess Vata, stabilize endocrine response, and build enduring physical endurance.",
    },
    pitta: {
      name: "Pitta Dominant (Fire & Water)",
      sanskrit: "पित्त प्रकृति • Metabolism & Transformation",
      tagline: "Needs Harmonizing Balance, Cooling Herbs & Tissue Nourishment",
      description:
        "Your constitution is guided by transformation and intense metabolic fire (Agni). You flourish when external and internal vitality is supported by synergistic lipid extractions and cooling Rasayanas such as Gokshura and Jaiphal.",
      recommendedProduct: "Rati Shakti Ayurvedic Massage Oil & Capsules",
      reason:
        "Combines deep dermal lipid absorption (Taila Paka) with adaptogenic cellular stamina.",
    },
    kapha: {
      name: "Kapha Dominant (Earth & Water)",
      sanskrit: "कफ प्रकृति • Structure & Lubrication",
      tagline: "Needs Invigoration, Warming Aromatic Herbs & Saffron",
      description:
        "Your constitution is blessed with innate structural stamina and calm resilience. Classical texts recommend warming, slow-cooked herbal confections infused with pure Kashmiri Saffron and Akarkara to awaken micro-circulation and metabolism.",
      recommendedProduct: "Rati Shakti Classical Majun (100 gm Amber Jar)",
      reason:
        "Crafted with slow-cooked herbal paste and saffron stigmas to stimulate deep vitality without provoking heaviness.",
    },
  };

  const handleSelectOption = (dosha) => {
    const updatedAnswers = { ...answers, [currentStep]: dosha };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate dominant dosha
      const counts = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(updatedAnswers).forEach((d) => counts[d]++);
      let dominant = "vata";
      let maxCount = -1;
      Object.entries(counts).forEach(([d, c]) => {
        if (c > maxCount) {
          maxCount = c;
          dominant = d;
        }
      });
      setResult(doshaProfiles[dominant]);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const currentQ = questions[currentStep];

  return (
    <section
      id="dosha-consultation"
      style={{
        padding: "6.5rem 0",
        background: "radial-gradient(ellipse at 50% 30%, #0d2a1e 0%, #051610 80%)",
        position: "relative",
        borderTop: "1px solid rgba(203, 168, 100, 0.2)",
        borderBottom: "1px solid rgba(203, 168, 100, 0.2)",
      }}
    >
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Sparkles size={12} />
            <span>INTERACTIVE AYURVEDIC ASSESSMENT</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Discover Your Ayurvedic Constitution
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            Answer 3 brief questions based on Charaka Samhita Tridosha principles to unveil
            your physiological balance and recommended classical formulation.
          </p>
        </div>

        {/* Assessment Card */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(16, 48, 35, 0.75) 0%, rgba(8, 26, 18, 0.95) 100%)",
            border: "1px solid var(--border-gold-strong)",
            borderRadius: "18px",
            padding: "3rem 2.5rem",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.55)",
            position: "relative",
            overflow: "hidden",
          }}
          className="assessment-card"
        >
          {/* Subtle Golden Mandala Watermark in background */}
          <div
            style={{
              position: "absolute",
              right: "-10%",
              top: "-15%",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              border: "1px dashed rgba(203, 168, 100, 0.15)",
              pointerEvents: "none",
            }}
          />

          {!result ? (
            <div>
              {/* Stepper Progress Bar */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.8rem",
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
                    Question {currentStep + 1} of {questions.length}
                  </span>

                  <span style={{ fontSize: "0.78rem", color: "var(--text-light-muted)" }}>
                    {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((currentStep + 1) / questions.length) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #cba864, #dfbe78)",
                      transition: "width 300ms ease",
                    }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <h3
                style={{
                  fontSize: "1.65rem",
                  color: "#faf8f2",
                  marginBottom: "0.5rem",
                  lineHeight: 1.25,
                }}
              >
                {currentQ.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--accent-gold-light)",
                  marginBottom: "2rem",
                }}
              >
                {currentQ.subtitle}
              </p>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.dosha)}
                    style={{
                      padding: "1.4rem 1.6rem",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(203, 168, 100, 0.22)",
                      textAlign: "left",
                      color: "#faf8f2",
                      cursor: "pointer",
                      transition: "all 250ms ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                    className="quiz-option"
                  >
                    <div>
                      <strong style={{ fontSize: "1.05rem", display: "block", marginBottom: "0.25rem" }}>
                        {opt.label}
                      </strong>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-light-muted)" }}>
                        {opt.desc}
                      </span>
                    </div>

                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        background: "rgba(203, 168, 100, 0.12)",
                        border: "1px solid var(--border-gold-subtle)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-gold-light)",
                        flexShrink: 0,
                      }}
                    >
                      <ArrowRight size={14} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Reveal */
            <div className="animate-fade-in">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(203, 168, 100, 0.15)",
                  color: "var(--accent-gold-light)",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-serif-accent)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                }}
              >
                <Check size={13} />
                <span>DIAGNOSTIC SYNTHESIS COMPLETE</span>
              </div>

              <span
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  color: "var(--accent-gold-primary)",
                  fontStyle: "italic",
                  marginBottom: "0.4rem",
                }}
              >
                {result.sanskrit}
              </span>

              <h3
                style={{
                  fontSize: "2.1rem",
                  color: "#faf8f2",
                  marginBottom: "0.6rem",
                  lineHeight: 1.2,
                }}
              >
                {result.name}
              </h3>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--accent-gold-light)",
                  fontWeight: 500,
                  marginBottom: "1.5rem",
                }}
              >
                {result.tagline}
              </p>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-light-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                {result.description}
              </p>

              {/* Recommended Formulation Card */}
              <div
                style={{
                  background: "rgba(7, 24, 17, 0.85)",
                  border: "1px solid var(--border-gold-strong)",
                  borderRadius: "12px",
                  padding: "1.5rem 1.8rem",
                  marginBottom: "2.2rem",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif-accent)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    color: "var(--accent-gold-primary)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                    fontWeight: 600,
                  }}
                >
                  Optimal Classical Formulation:
                </span>
                <h4 style={{ fontSize: "1.35rem", color: "#faf8f2", marginBottom: "0.4rem" }}>
                  {result.recommendedProduct}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--text-light-muted)", lineHeight: 1.55 }}>
                  {result.reason}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a
                  href={`https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Charak Ayurveda, I completed the Ayurvedic Dosha Assessment on your site. My constitution is ${result.name}. Please connect me with physician guidance regarding ${result.recommendedProduct}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ flex: 1, minWidth: "220px" }}
                >
                  <MessageCircle size={16} />
                  <span>Send Dosha to Doctor Desk</span>
                </a>

                <button
                  onClick={() => onOpenEnquiry(`Dosha Diagnosis Consultation: ${result.name}`)}
                  className="btn-secondary"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <FileText size={15} />
                  <span>Request Physician Regimen</span>
                </button>

                <button
                  onClick={handleReset}
                  className="btn-secondary"
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <RotateCcw size={14} />
                  <span>Retake</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .quiz-option:hover {
          background: rgba(203, 168, 100, 0.12) !important;
          border-color: var(--accent-gold-primary) !important;
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
