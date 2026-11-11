// Single source of truth for brand copy and contact details.
// Phone/WhatsApp and address confirmed by the client (Nov 2026). The email is still the v1 placeholder.
export const site = {
  brand: "Charak Ayurveda",
  sanskrit: "चरक आयुर्वेद",
  tagline: "The Wisdom of Ayurveda, Carried Forward",
  disclaimer:
    "These products are Ayurvedic proprietary medicines. Use as directed by an Ayurvedic physician. Individual results may vary. Keep out of reach of children.",
};

export const contact = {
  whatsappNumber: "918860157142",
  phoneDisplay: "+91 88601 57142",
  phoneHref: "tel:+918860157142",
  email: "care@charakayurveda.in",
  address: "Nawada, New Delhi, India",
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM",
  // Leave empty until the client confirms the office location.
  mapsUrl: "",
};

// "Ask our doctor" WhatsApp consultation. Client asked for a free BAMS consultation (Nov 2026).
// Leave whatsappNumber empty to use the main business number above; set it once the doctor's number is confirmed.
export const doctor = {
  whatsappNumber: "",
  title: "BAMS doctor",
  free: true,
  // Wording the client asked for — keep it exactly this soft (Drugs & Magic Remedies Act).
  line: "Rati Shakti supports strength & vitality.",
};

// `menu` opens a hover mega-panel in the desktop navbar.
export const nav = [
  { label: "Collection", href: "#collection", menu: "collection" },
  { label: "Combos", href: "#combos" },
  { label: "Botanicals", href: "#botanicals", menu: "botanicals" },
  { label: "Heritage", href: "#heritage" },
  { label: "For Professionals", href: "#professionals", menu: "professionals" },
  { label: "Contact", href: "#contact" },
];

export const enquiryTypes = [
  "Ayurvedic doctor / clinic",
  "Chemist / pharmacy",
  "Distributor / stockist",
  "Customer",
];

export const audiences = [
  {
    icon: "stethoscope",
    who: "Ayurvedic doctors & clinics",
    text: "Request the product catalogue and a conversation with our team about the range.",
    type: enquiryTypes[0],
  },
  {
    icon: "store",
    who: "Chemists & pharmacies",
    text: "Ask about stocking the Rati Shakti range for customers in your area.",
    type: enquiryTypes[1],
  },
  {
    icon: "truck",
    who: "Distributors & stockists",
    text: "Tell us your region and network, and we will get in touch about distribution.",
    type: enquiryTypes[2],
  },
];

// "Why choose Charak Ayurveda" cards. Facts only from the packs or from the client — no health claims.
// `icon` keys map to lucide icons in components/sections/WhyChoose.jsx.
export const reasons = [
  {
    icon: "book",
    title: "Rooted in the Charaka Samhita",
    text: "Our name and our crest come from one of the classical texts of Ayurveda.",
  },
  {
    icon: "leaf",
    title: "100% Ayurvedic",
    text: "Proprietary Ayurvedic formulations, made and packed under the Charak Ayurveda name.",
  },
  {
    icon: "sprout",
    title: "Herbal & vegetarian",
    text: "Rati Shakti capsules are labelled herbal, natural and vegetarian.",
  },
  {
    icon: "scroll",
    title: "Ingredients on the label",
    text: "Every botanical in the range is printed plainly on its pack, so you know what is inside.",
  },
  {
    icon: "stethoscope",
    title: "Ask an Ayurvedic doctor",
    text: "Talk to our BAMS doctor on WhatsApp before you choose — free of charge.",
  },
  {
    icon: "handshake",
    title: "Direct from the maker",
    text: "Doctors, chemists and distributors deal directly with our own team.",
  },
];

export const faqIntro = "What customers, doctors and trade partners usually ask us.";

export const faqs = [
  {
    q: "Can I buy Charak Ayurveda products on this website?",
    a: "Orders are taken on WhatsApp. Message us with the product or combo you want, and our team will confirm the price and availability, or tell you where the products are available near you.",
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
  {
    q: "Can I speak to a doctor before choosing a product?",
    a: "Yes. Tap “Ask our doctor” to start a free WhatsApp consultation with our BAMS doctor.",
  },
  {
    q: "Are the Rati Shakti capsules vegetarian?",
    a: "Yes. The capsule packs are labelled herbal, natural and vegetarian.",
  },
  {
    q: "Do you offer combo packs?",
    a: "Yes. See the combos section above and message us on WhatsApp for the current price and availability.",
  },
  {
    q: "How do I become a stockist or distributor?",
    a: "Choose “Distributor / stockist” in the enquiry form, tell us your city and region, and our team will contact you.",
  },
];
