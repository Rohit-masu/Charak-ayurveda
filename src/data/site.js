// Single source of truth for brand copy and contact details.
// Always write the brand as "Charak Ayurveda" — never "Charak" on its own (client, Nov 2026).
// Phone/WhatsApp and address confirmed by the client (Nov 2026). The email is still the v1 placeholder.
export const site = {
  brand: "Charak Ayurveda",
  sanskrit: "चरक आयुर्वेद",
  tagline: "The Wisdom of Ayurveda, Carried Forward",
  disclaimer:
    "These products are Ayurvedic proprietary medicines. Use as directed by an Ayurvedic physician. Individual results may vary. Keep out of reach of children.",
  conceptNote: "Concept visual — final packaging may differ.",
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

// `menu` opens a hover mega-panel in the desktop navbar (keys handled in MegaMenu.jsx).
export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products", menu: "products" },
  { label: "Career", href: "#career" },
  { label: "Associate", href: "#associate", menu: "associate" },
  { label: "Connect With Us", href: "#connect" },
];

export const enquiryTypes = [
  "Ayurvedic doctor / clinic",
  "Chemist / pharmacy",
  "Distributor / stockist",
  "Customer",
  "Career / MR application",
];

export const careerType = enquiryTypes[4];

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

// Career section. `roles` stays empty until the client confirms openings — the list hides while empty.
// Role shape: { title: "Medical Representative", place: "Delhi NCR", note: "" }
export const careers = {
  intro:
    "Charak Ayurveda is building its field team. If you would like to represent our range to doctors and chemists in your city, share your details and our team will be in touch.",
  roles: [],
  steps: [
    { t: "Share your details", d: "Choose “Career / MR application” in the form below." },
    { t: "We review", d: "Our team looks at your experience and city." },
    { t: "We call you", d: "If there is a fit, we arrange a conversation." },
  ],
};

// "Why choose Charak Ayurveda" cards. Facts only from the packs or from the client — no health claims.
// `icon` keys map to lucide icons in components/sections/WhyChoose.jsx.
export const reasons = [
  {
    icon: "book",
    title: "Rooted in the Charaka Samhita",
    text: "Our name and our crest come from one of the classical texts of Ayurveda.",
  },
  {
    icon: "flask",
    title: "Ayurvedic formulations",
    text: "Proprietary Ayurvedic formulations, made and packed under the Charak Ayurveda name.",
  },
  {
    icon: "users",
    title: "For men and for women",
    text: "Rati Shakti comes as two separate formulations — one for men, one for women.",
  },
  {
    icon: "scroll",
    title: "Ingredients on the label",
    text: "Every ingredient is printed plainly on its pack, so you know what is inside.",
  },
  {
    icon: "stethoscope",
    title: "Ask an Ayurvedic doctor",
    text: "Talk to our BAMS doctor on WhatsApp before you choose — free of charge.",
  },
  {
    icon: "handshake",
    title: "Direct from the maker",
    text: "Doctors, chemists and distributors deal directly with the Charak Ayurveda team.",
  },
];

export const faqIntro = "What customers, doctors and trade partners usually ask us.";

export const faqs = [
  {
    q: "Can I buy Charak Ayurveda products on this website?",
    a: "Orders are taken on WhatsApp. Message us with the product you want, and our team will confirm the price and availability, or tell you where the products are available near you.",
  },
  {
    q: "What is the difference between Rati Shakti Men and Rati Shakti Women?",
    a: "They are two separate formulations in the Rati Shakti range — one made for men and one made for women. Each pack carries its own ingredients and directions.",
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
    q: "Can I speak to a doctor before choosing a product?",
    a: "Yes. Tap “Ask our doctor” to start a free WhatsApp consultation with our BAMS doctor.",
  },
  {
    q: "How do I become a stockist or distributor?",
    a: "Choose “Distributor / stockist” in the enquiry form, tell us your city and region, and our team will contact you.",
  },
  {
    q: "How do I apply to join as a medical representative?",
    a: "Choose “Career / MR application” in the enquiry form, add your city and a short note about your experience, and our team will get in touch.",
  },
];
