// Product wording is taken only from what is printed on the packs.
// Do not add benefits, claims, prices or certifications here unless the client supplies them.
import bottle60 from "../assets/img/rati-shakti-bottle-60.webp";
import bottle30 from "../assets/img/rati-shakti-bottle-30.webp";
import box30 from "../assets/img/rati-shakti-box-30.webp";
import trial15 from "../assets/img/rati-shakti-trial-15.webp";
import oil30 from "../assets/img/rati-shakti-oil-30ml.webp";
import majun100 from "../assets/img/rati-shakti-majun-100g.webp";
import maharaja90 from "../assets/img/rati-shakti-maharaja-90.webp";
import lineupGreen from "../assets/img/hero-lineup-green.webp";
import lineupBlack from "../assets/img/hero-lineup-black.webp";
import garden from "../assets/img/garden.webp";

export const images = { lineupGreen, lineupBlack, garden };

export const products = [
  {
    id: "capsules",
    numeral: "I",
    name: "Rati Shakti Capsules",
    category: "Capsules",
    line: "Natural vitality & strength",
    labels: ["100% Ayurvedic", "Herbal supplement", "Natural", "Vegetarian"],
    ingredients: ["Shilajit", "Ashwagandha", "Safed Musli", "Kaunch Beej", "Gokshura"],
    directions: "Take 1–2 capsules twice daily with warm milk or water, or as directed by an Ayurvedic physician.",
    tone: "forest",
    packs: [
      { label: "60 capsules · bottle", image: bottle60 },
      { label: "30 capsules · box", image: box30 },
      { label: "30 capsules · bottle", image: bottle30 },
      { label: "15 capsules · trial pack", image: trial15 },
    ],
  },
  {
    id: "oil",
    numeral: "II",
    name: "Rati Shakti Ayurvedic Massage Oil",
    category: "Massage Oil",
    line: "Traditional Ayurvedic formulation",
    labels: ["Premium strength", "100% Natural", "For external use only"],
    ingredients: ["Ashwagandha Oil", "Shilajit", "Clove Oil", "Jaiphal"],
    directions: "For external use only. Use as directed on the pack or by an Ayurvedic practitioner.",
    tone: "amber",
    packs: [{ label: "30 ml · pump bottle & carton", image: oil30 }],
  },
  {
    id: "majun",
    numeral: "III",
    name: "Rati Shakti Majun",
    category: "Majun",
    line: "A classical Ayurvedic majun",
    labels: ["100% Ayurvedic", "Proprietary Ayurvedic medicine"],
    ingredients: ["Shilajit", "Safed Musli", "Ashwagandha", "Kesar", "Akarkara"],
    directions: "Use as directed on the pack or by an Ayurvedic physician.",
    tone: "forest",
    packs: [{ label: "100 gm · jar", image: majun100 }],
  },
  {
    id: "maharaja",
    numeral: "IV",
    name: "Rati Shakti Maharaja Kit",
    category: "Supplements",
    line: "Ayurvedic medicine · 90 capsules",
    labels: ["Traditional Ayurvedic formulation", "Herbal supplement", "Net content: 90 capsules"],
    ingredients: ["Shilajit", "Ashwagandha", "Safed Musli", "Kaunch Beej", "Gokshura"],
    directions: "Use as directed on the pack or by an Ayurvedic physician.",
    tone: "noir",
    packs: [{ label: "90 capsules · Maharaja bottle", image: maharaja90 }],
  },
];

// Names and Devanagari spellings only — no therapeutic descriptions.
export const botanicals = [
  { name: "Shilajit", deva: "शिलाजीत", latin: "Asphaltum punjabianum" },
  { name: "Ashwagandha", deva: "अश्वगंधा", latin: "Withania somnifera" },
  { name: "Safed Musli", deva: "सफ़ेद मूसली", latin: "Chlorophytum borivilianum" },
  { name: "Kaunch Beej", deva: "कौंच बीज", latin: "Mucuna pruriens" },
  { name: "Gokshura", deva: "गोक्षुर", latin: "Tribulus terrestris" },
  { name: "Kesar", deva: "केसर", latin: "Crocus sativus" },
  { name: "Akarkara", deva: "अकरकरा", latin: "Anacyclus pyrethrum" },
  { name: "Clove", deva: "लौंग", latin: "Syzygium aromaticum", match: "Clove Oil" },
  { name: "Jaiphal", deva: "जायफल", latin: "Myristica fragrans" },
];

export function productsWith(botanical) {
  const key = botanical.match || botanical.name;
  return products.filter((p) => p.ingredients.some((i) => i === key || i.startsWith(key + " ")));
}
