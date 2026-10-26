import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { contactDetails } from "../data/catalog";

export default function Navbar({ onOpenEnquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Heritage", href: "#heritage" },
    { label: "Formulations", href: "#formulations" },
    { label: "Categories", href: "#categories" },
    { label: "Botanicals", href: "#botanicals" },
    { label: "Practitioners & Trade", href: "#practitioners" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const whatsappLink = `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(
    "Hello Charak Ayurveda, I would like to enquire about your Ayurvedic formulations and professional distribution."
  )}`;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled
          ? "rgba(7, 28, 20, 0.94)"
          : "rgba(7, 28, 20, 0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: scrolled
          ? "1px solid rgba(203, 168, 100, 0.28)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        transition: "all 300ms ease",
        boxShadow: scrolled ? "0 8px 30px rgba(0, 0, 0, 0.45)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4.75rem",
        }}
      >
        {/* Brand Identity / Wordmark */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            textDecoration: "none",
          }}
        >
          {/* Botanical Crest Emblem */}
          <div
            style={{
              width: "2.6rem",
              height: "2.6rem",
              borderRadius: "50%",
              background: "radial-gradient(circle, #1a4d38 0%, #0c2b1f 100%)",
              border: "1.5px solid var(--accent-gold-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(203, 168, 100, 0.25)",
              flexShrink: 0,
            }}
          >
            <svg
              width="22"
              height="22"
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: "var(--font-serif-accent)",
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#faf7f0",
                lineHeight: 1.15,
              }}
            >
              CHARAK <span style={{ color: "var(--accent-gold-light)", fontWeight: 500 }}>AYURVEDA</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans-body)",
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                color: "var(--accent-gold-primary)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              चरकसंहिता परम् प्रमाणम् • Estd. Tradition
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: "none",
            alignItems: "center",
            gap: "1.85rem",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "0.88rem",
                fontWeight: 500,
                color: "var(--text-light-secondary)",
                transition: "color 200ms ease",
                position: "relative",
                padding: "0.3rem 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-light-secondary)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: "0.85rem",
          }}
          className="desktop-actions"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              padding: "0.6rem 1.15rem",
              fontSize: "0.84rem",
              borderRadius: "6px",
            }}
          >
            <MessageCircle size={15} style={{ color: "#25D366" }} />
            <span>WhatsApp Desk</span>
          </a>

          <button
            onClick={() => onOpenEnquiry("General / Product Enquiry")}
            className="btn-primary"
            style={{
              padding: "0.6rem 1.35rem",
              fontSize: "0.84rem",
              borderRadius: "6px",
            }}
          >
            <span>Enquire Now</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.6rem",
            height: "2.6rem",
            borderRadius: "6px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(203, 168, 100, 0.3)",
            color: "var(--accent-gold-light)",
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: "rgba(7, 24, 17, 0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-gold-subtle)",
            padding: "1.5rem 1.25rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
          className="animate-fade-in"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  color: "#f5f3ec",
                  padding: "0.4rem 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{link.label}</span>
                <span style={{ color: "var(--accent-gold-primary)", fontSize: "0.85rem" }}>→</span>
              </a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry("General / Product Enquiry");
              }}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Enquire Directly <ArrowUpRight size={15} />
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <MessageCircle size={16} style={{ color: "#25D366" }} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive Media Query Helper */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
