import React, { useState, useEffect } from "react";
import { X, MessageCircle, Send, CheckCircle2, Sparkles } from "lucide-react";
import { contactDetails } from "../data/catalog";

export default function QuickEnquiryModal({ isOpen, initialType, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    enquiryType: initialType || "Doctor / Clinical Practice",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = "Valid phone number required";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*New Charak Ayurveda Enquiry*\n\n*Name:* ${formData.name || "N/A"}\n*Phone:* ${
      formData.phone || "N/A"
    }\n*Email:* ${formData.email || "N/A"}\n*Type:* ${formData.enquiryType}\n*Notes:* ${
      formData.message || "Enquiring about Charak Ayurveda formulations."
    }`;
    return `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 110,
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
          maxWidth: "540px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75)",
          color: "#faf8f2",
          position: "relative",
          padding: "2.4rem 2rem",
        }}
        className="animate-modal-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            width: "2.2rem",
            height: "2.2rem",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(203, 168, 100, 0.3)",
            color: "var(--accent-gold-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: "1.8rem" }}>
          <div className="gold-badge" style={{ marginBottom: "0.6rem" }}>
            <Sparkles size={11} />
            <span>DIRECT CONNECT</span>
          </div>
          <h3 style={{ fontSize: "1.65rem", color: "#faf8f2", lineHeight: 1.2 }}>
            Connect with Official Desk
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-light-muted)", marginTop: "0.4rem" }}>
            Dedicated channel for doctors, distributors, and formulation inquiries.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem 0",
            }}
          >
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                background: "rgba(37, 211, 102, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#25D366",
                margin: "0 auto 1rem",
              }}
            >
              <CheckCircle2 size={24} />
            </div>
            <h4 style={{ fontSize: "1.25rem", color: "#faf8f2", marginBottom: "0.5rem" }}>
              Enquiry Format Generated
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-light-secondary)",
                lineHeight: 1.55,
                marginBottom: "1.6rem",
              }}
            >
              Thank you, <strong>{formData.name}</strong>. Connect directly with our official
              WhatsApp representative now for immediate dossier or terms dispatch.
            </p>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginBottom: "0.8rem" }}
            >
              <MessageCircle size={16} />
              <span>Send via WhatsApp Desk</span>
            </a>

            <button
              onClick={onClose}
              style={{
                color: "var(--text-light-muted)",
                fontSize: "0.82rem",
                textDecoration: "underline",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-light-secondary)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Rajesh Sharma / Rohit Kumar"
                style={{
                  width: "100%",
                  padding: "0.7rem 0.9rem",
                  background: "rgba(5, 22, 16, 0.6)",
                  border: errors.name
                    ? "1px solid #e53e3e"
                    : "1px solid rgba(203, 168, 100, 0.25)",
                  borderRadius: "6px",
                  color: "#faf8f2",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                }}
              />
              {errors.name && (
                <span style={{ color: "#fc8181", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-light-secondary)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                style={{
                  width: "100%",
                  padding: "0.7rem 0.9rem",
                  background: "rgba(5, 22, 16, 0.6)",
                  border: errors.phone
                    ? "1px solid #e53e3e"
                    : "1px solid rgba(203, 168, 100, 0.25)",
                  borderRadius: "6px",
                  color: "#faf8f2",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                }}
              />
              {errors.phone && (
                <span style={{ color: "#fc8181", fontSize: "0.75rem", marginTop: "0.25rem", display: "block" }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-light-secondary)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Nature of Enquiry
              </label>
              <select
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.7rem 0.9rem",
                  background: "#082117",
                  border: "1px solid rgba(203, 168, 100, 0.25)",
                  borderRadius: "6px",
                  color: "#faf8f2",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                }}
              >
                <option value="Doctor / Clinical Practice">Ayurvedic Physician / Clinic Supply</option>
                <option value="Distributor / Trade Enquiry">Pharmaceutical Distributor / Stockist</option>
                <option value="Retail Chemist">Retail Pharmacy / Chemist Network</option>
                <option value="Individual Product Inquiry">Individual Formulation Inquiry</option>
              </select>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-light-secondary)",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                Requirement or Territory Details
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention specific product interest, sample requests, or clinic location..."
                style={{
                  width: "100%",
                  padding: "0.7rem 0.9rem",
                  background: "rgba(5, 22, 16, 0.6)",
                  border: "1px solid rgba(203, 168, 100, 0.25)",
                  borderRadius: "6px",
                  color: "#faf8f2",
                  fontSize: "0.9rem",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Send size={15} />
                <span>Submit Details</span>
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <MessageCircle size={15} style={{ color: "#25D366" }} />
                <span>Instant WhatsApp Connect</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
