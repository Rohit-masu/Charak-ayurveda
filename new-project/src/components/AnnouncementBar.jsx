import React, { useState } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";

export default function AnnouncementBar({ onOpenEnquiry }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside
      aria-label="Announcement"
      style={{
        background: "linear-gradient(90deg, #092117 0%, #164030 50%, #092117 100%)",
        borderBottom: "1px solid rgba(203, 168, 100, 0.25)",
        color: "#f5edd8",
        fontSize: "0.82rem",
        padding: "0.55rem 1rem",
        position: "relative",
        zIndex: 60,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            flexWrap: "wrap",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              background: "rgba(203, 168, 100, 0.15)",
              color: "var(--accent-gold-light)",
              padding: "0.15rem 0.6rem",
              borderRadius: "9999px",
              fontFamily: "var(--font-serif-accent)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid rgba(203, 168, 100, 0.3)",
            }}
          >
            <Sparkles size={11} /> PAN-INDIA SUPPLY
          </span>
          <span style={{ color: "#e4efe8", fontWeight: 400 }}>
            Ayurvedic practitioner sample dossiers & regional trade distribution enquiries now open.
          </span>
          <button
            onClick={() => onOpenEnquiry("Doctor / Clinical Practice")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "var(--accent-gold-light)",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            Connect with Medical Desk <ArrowRight size={13} />
          </button>
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss announcement"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255, 255, 255, 0.55)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.2rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.55)")}
        >
          <X size={15} />
        </button>
      </div>
    </aside>
  );
}
