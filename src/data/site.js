// Single source of truth for brand copy and contact details.
// Contact values below are carried over from the v1 config and are NOT yet verified
// by the client — replace them before going live.
export const site = {
  brand: "Charak Ayurveda",
  sanskrit: "चरक आयुर्वेद",
  tagline: "The Wisdom of Ayurveda, Carried Forward",
  disclaimer:
    "These products are Ayurvedic proprietary medicines. Use as directed by an Ayurvedic physician. Individual results may vary. Keep out of reach of children.",
};

export const contact = {
  whatsappNumber: "919876543210",
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "care@charakayurveda.in",
  address: "Industrial Area, Haridwar, Uttarakhand 249401, India",
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM",
  // Leave empty until the client confirms the office location.
  mapsUrl: "",
};

export const nav = [
  { label: "Collection", href: "#collection" },
  { label: "Botanicals", href: "#botanicals" },
  { label: "Heritage", href: "#heritage" },
  { label: "For Professionals", href: "#professionals" },
  { label: "Contact", href: "#contact" },
];

export const enquiryTypes = [
  "Ayurvedic doctor / clinic",
  "Chemist / pharmacy",
  "Distributor / stockist",
  "Customer",
];

export const faqs = [
  {
    q: "Can I buy Charak Ayurveda products on this website?",
    a: "Not yet. This site introduces the brand and its range. Send an enquiry and our team will tell you where the products are available near you.",
  },
  {
    q: "I am a doctor, chemist or distributor. How do I get the catalogue?",
    a: "Choose your profile in the enquiry form below. Our team will contact you with the product catalogue and next steps.",
  },
  {
    q: "How should the products be used?",
    a: "Each pack carries its own directions. Use as directed on the label or by an Ayurvedic physician.",
  },
  {
    q: "Is the massage oil for internal use?",
    a: "No. Rati Shakti Ayurvedic Massage Oil is for external use only, as printed on the pack.",
  },
];
