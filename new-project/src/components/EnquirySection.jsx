import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { contactDetails } from "../data/catalog";

export default function EnquirySection({ defaultType }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: defaultType || "Doctor / Clinical Practice",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState(null); // 'success' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = "Please provide a valid phone number";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email address";
    }
    if (!formData.message.trim()) errs.message = "Please write a brief message or requirement";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmittedStatus("success");
  };

  const generateWhatsAppUrl = () => {
    const text = `*New Charak Ayurveda Enquiry*\n\n*Name:* ${formData.name || "N/A"}\n*Phone:* ${
      formData.phone || "N/A"
    }\n*Email:* ${formData.email || "N/A"}\n*Type:* ${formData.enquiryType}\n*Message:* ${
      formData.message || "Enquiry regarding formulations and distribution."
    }`;
    return `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="contact"
      style={{
        padding: "6.5rem 0",
        background: "#071c14",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 4rem" }}>
          <div className="gold-badge" style={{ marginBottom: "1rem" }}>
            <Mail size={12} />
            <span>OFFICIAL DESK</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#faf8f2",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            Connect with Charak Ayurveda
          </h2>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-light-secondary)",
              lineHeight: 1.6,
            }}
          >
            For practitioner sample requests, institutional clinic supply, or regional
            pharmaceutical distribution, reach our official desk directly.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
          className="enquiry-grid"
        >
          {/* Left Column: Official Contact & Location Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <div
              style={{
                background: "linear-gradient(180deg, rgba(16, 46, 34, 0.7) 0%, rgba(9, 28, 20, 0.95) 100%)",
                border: "1px solid var(--border-gold-subtle)",
                borderRadius: "14px",
                padding: "2.4rem 2rem",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.45rem",
                  color: "#faf8f2",
                  marginBottom: "1.4rem",
                }}
              >
                Official Facility & Desk
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "8px",
                      background: "rgba(203, 168, 100, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold-light)",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                      Manufacturing & Research Unit:
                    </strong>
                    <span style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem", lineHeight: 1.45 }}>
                      {contactDetails.addressLine1},<br />
                      {contactDetails.addressLine2}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "8px",
                      background: "rgba(203, 168, 100, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold-light)",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                      Direct Desk:
                    </strong>
                    <a
                      href={`tel:${contactDetails.phoneRaw}`}
                      style={{ color: "var(--accent-gold-light)", fontSize: "0.88rem" }}
                    >
                      {contactDetails.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "8px",
                      background: "rgba(203, 168, 100, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold-light)",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                      Official Inquiries:
                    </strong>
                    <a
                      href={`mailto:${contactDetails.email}`}
                      style={{ color: "var(--accent-gold-light)", fontSize: "0.88rem" }}
                    >
                      {contactDetails.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "8px",
                      background: "rgba(203, 168, 100, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-gold-light)",
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong style={{ color: "#faf8f2", fontSize: "0.92rem", display: "block" }}>
                      Operating Schedule:
                    </strong>
                    <span style={{ color: "var(--text-light-secondary)", fontSize: "0.88rem" }}>
                      {contactDetails.workingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Container with Fallback */}
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid var(--border-gold-subtle)",
                background: "#082117",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%", // 16:9 ratio
                  height: 0,
                }}
              >
                <iframe
                  title="Charak Ayurveda Facility Location, Haridwar, Uttarakhand"
                  src={contactDetails.mapEmbedUrl}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                    filter: "contrast(1.05) saturate(0.9)",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Map Footer Bar with Fallback Link */}
              <div
                style={{
                  padding: "0.85rem 1.25rem",
                  background: "rgba(10, 32, 23, 0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "0.82rem", color: "var(--text-light-muted)" }}>
                  Industrial Corridor • Haridwar, Uttarakhand
                </span>
                <a
                  href={contactDetails.mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--accent-gold-light)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Enquiry Form */}
          <div
            style={{
              background: "linear-gradient(180deg, rgba(16, 46, 34, 0.7) 0%, rgba(9, 28, 20, 0.95) 100%)",
              border: "1px solid var(--border-gold-subtle)",
              borderRadius: "14px",
              padding: "2.6rem 2.2rem",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h3
              style={{
                fontSize: "1.55rem",
                color: "#faf8f2",
                marginBottom: "0.5rem",
              }}
            >
              Direct Enquiry Desk
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-light-muted)",
                marginBottom: "2rem",
              }}
            >
              Please enter your details below. You can submit directly or pre-fill a formatted
              message directly to our WhatsApp representative.
            </p>

            {submittedStatus === "success" ? (
              <div
                style={{
                  background: "rgba(37, 211, 102, 0.12)",
                  border: "1px solid rgba(37, 211, 102, 0.35)",
                  borderRadius: "10px",
                  padding: "2rem 1.5rem",
                  textAlign: "center",
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
                  Enquiry Prepared Successfully
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-light-secondary)",
                    lineHeight: 1.55,
                    marginBottom: "1.5rem",
                  }}
                >
                  Thank you, <strong>{formData.name}</strong>. For instant confirmation,
                  connect directly with our official WhatsApp desk using your prefilled enquiry.
                </p>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginBottom: "0.8rem" }}
                >
                  <MessageCircle size={16} />
                  <span>Send via WhatsApp Desk Now</span>
                </a>

                <button
                  onClick={() => setSubmittedStatus(null)}
                  style={{
                    color: "var(--text-light-muted)",
                    fontSize: "0.82rem",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name Field */}
                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--text-light-secondary)",
                      marginBottom: "0.45rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Sharma / Rohit Kumar"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(5, 22, 16, 0.6)",
                      border: errors.name
                        ? "1px solid #e53e3e"
                        : "1px solid rgba(203, 168, 100, 0.25)",
                      borderRadius: "6px",
                      color: "#faf8f2",
                      fontSize: "0.92rem",
                      fontFamily: "inherit",
                    }}
                  />
                  {errors.name && (
                    <span style={{ color: "#fc8181", fontSize: "0.76rem", marginTop: "0.3rem", display: "block" }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1.2rem",
                  }}
                  className="form-row-2"
                >
                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--text-light-secondary)",
                        marginBottom: "0.45rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(5, 22, 16, 0.6)",
                        border: errors.phone
                          ? "1px solid #e53e3e"
                          : "1px solid rgba(203, 168, 100, 0.25)",
                        borderRadius: "6px",
                        color: "#faf8f2",
                        fontSize: "0.92rem",
                        fontFamily: "inherit",
                      }}
                    />
                    {errors.phone && (
                      <span style={{ color: "#fc8181", fontSize: "0.76rem", marginTop: "0.3rem", display: "block" }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "var(--text-light-secondary)",
                        marginBottom: "0.45rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="clinic@example.com"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(5, 22, 16, 0.6)",
                        border: errors.email
                          ? "1px solid #e53e3e"
                          : "1px solid rgba(203, 168, 100, 0.25)",
                        borderRadius: "6px",
                        color: "#faf8f2",
                        fontSize: "0.92rem",
                        fontFamily: "inherit",
                      }}
                    />
                    {errors.email && (
                      <span style={{ color: "#fc8181", fontSize: "0.76rem", marginTop: "0.3rem", display: "block" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Enquiry Pathway Selection */}
                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    htmlFor="enquiryType"
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--text-light-secondary)",
                      marginBottom: "0.45rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Nature of Enquiry *
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "#082117",
                      border: "1px solid rgba(203, 168, 100, 0.25)",
                      borderRadius: "6px",
                      color: "#faf8f2",
                      fontSize: "0.92rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <option value="Doctor / Clinical Practice">Ayurvedic Physician / Clinic Dispensing</option>
                    <option value="Distributor / Trade Enquiry">Pharmaceutical Distributor / Stockist</option>
                    <option value="Retail Chemist">Retail Pharmacy / Chemist Network</option>
                    <option value="Individual Product Inquiry">Individual Formulation & Dosage Guidance</option>
                    <option value="General Corporate">General Corporate / Institutional</option>
                  </select>
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: "1.8rem" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--text-light-secondary)",
                      marginBottom: "0.45rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Requirement or Clinical Query *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify target territory, clinic requirements, formulation questions, or sample pack requests..."
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(5, 22, 16, 0.6)",
                      border: errors.message
                        ? "1px solid #e53e3e"
                        : "1px solid rgba(203, 168, 100, 0.25)",
                      borderRadius: "6px",
                      color: "#faf8f2",
                      fontSize: "0.92rem",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                  {errors.message && (
                    <span style={{ color: "#fc8181", fontSize: "0.76rem", marginTop: "0.3rem", display: "block" }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Dual Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Send size={16} />
                    <span>Submit Official Enquiry</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <MessageCircle size={16} style={{ color: "#25D366" }} />
                    <span>Prefill & Send on WhatsApp</span>
                  </a>
                </div>

                {/* Honest Integration Note */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1.2rem",
                    fontSize: "0.74rem",
                    color: "var(--text-light-muted)",
                  }}
                >
                  <AlertCircle size={13} style={{ flexShrink: 0 }} />
                  <span>
                    Note: Form submits via direct WhatsApp desk prefill or recorded client query. Form backend integration is pending client CRM credentials.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .enquiry-grid {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
