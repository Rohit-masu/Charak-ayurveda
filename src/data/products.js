// Product wording comes only from the client or from what is printed on the packs.
// Do not add benefits, claims, ingredients, prices or certifications here unless the client supplies them.
// Empty fields (line, labels, ingredients, directions) hide their UI.
import menStage from "../assets/img/v3/rati-shakti-men-stage.webp";
import menLight from "../assets/img/v3/rati-shakti-men-light.webp";
import womenStage from "../assets/img/v3/rati-shakti-women-stage.webp";
import womenLight from "../assets/img/v3/rati-shakti-women-light.webp";
import sceneMen from "../assets/img/v3/scene-men.webp";
import sceneWomen from "../assets/img/v3/scene-women.webp";
import heroDuo from "../assets/img/v3/hero-duo.webp";
import manuscript from "../assets/img/v3/heritage-manuscript.webp";
import craft from "../assets/img/v3/heritage-craft.webp";

export const images = { heroDuo, manuscript, craft };

// Adding a product = one entry here plus its images. Nothing in the components changes.
//
// theme   — the product's own colours, exposed to components as CSS variables (see productVars below)
//   deep:   panel / dialog background (match the stage photo's backdrop)
//   accent: chips, rules and highlights on the deep colour
//   tint:   light stage colour (match the light photo's backdrop)
//   glow:   soft light behind the pack
// concept — true while the images are AI concept visuals; the UI says so
// stage   — tall photo on the product's deep colour (4:5)
// light   — square photo on a light backdrop (1:1)
// scene   — wide atmospheric texture shown behind the details on hover (16:9), no product in it
// packs   — `label` may stay empty until the client confirms pack sizes
export const products = [
  {
    id: "rati-shakti-men",
    numeral: "I",
    name: "Rati Shakti Men",
    category: "For men",
    line: "An Ayurvedic formulation from Charak Ayurveda.",
    labels: [],
    ingredients: [],
    directions: "",
    concept: true,
    theme: { deep: "#141210", accent: "#C9A774", tint: "#EFE3D2", glow: "rgba(201,167,116,0.28)" },
    images: { stage: menStage, light: menLight, scene: sceneMen },
    packs: [{ label: "", image: menStage, light: menLight }],
  },
  {
    id: "rati-shakti-women",
    numeral: "II",
    name: "Rati Shakti Women",
    category: "For women",
    line: "An Ayurvedic formulation from Charak Ayurveda.",
    labels: [],
    ingredients: [],
    directions: "",
    concept: true,
    theme: { deep: "#5B2530", accent: "#E2A9A6", tint: "#EFE3D2", glow: "rgba(226,169,166,0.26)" },
    images: { stage: womenStage, light: womenLight, scene: sceneWomen },
    packs: [{ label: "", image: womenStage, light: womenLight }],
  },
];

// Inline style that exposes a product's theme to Tailwind arbitrary values,
// e.g. bg-[var(--p-deep)], text-[var(--p-accent)].
export const productVars = (p) => ({
  "--p-deep": p.theme.deep,
  "--p-accent": p.theme.accent,
  "--p-tint": p.theme.tint,
  "--p-glow": p.theme.glow,
});

// "Shop by concern" circles (client's reference layout). `products` lists product ids from above.
// A concern with no products shows "Coming soon" and is not clickable — add ids here as new products arrive.
// `icon` keys map to lucide icons in components/sections/Concerns.jsx.
// Keep labels to general wellness areas; never name a disease or promise a result (Drugs & Magic Remedies Act).
export const concerns = [
  { id: "vitality", label: "Strength & Vitality", icon: "flame", products: ["rati-shakti-men", "rati-shakti-women"] },
  { id: "digestive", label: "Digestive Health", icon: "digestive", products: [] },
  { id: "joint", label: "Joint Care", icon: "joint", products: [] },
  { id: "energy", label: "Stress & Energy", icon: "energy", products: [] },
  { id: "balance", label: "Body Balance", icon: "balance", products: [] },
  { id: "hair", label: "Hair Care", icon: "hair", products: [] },
  { id: "kids", label: "Kids Nutrition", icon: "kids", products: [] },
  { id: "weight", label: "Weight Management", icon: "weight", products: [] },
];

export const productsFor = (concern) => concern.products.map((id) => products.find((p) => p.id === id)).filter(Boolean);

// Combo offers — empty until the client confirms pairings; the section hides itself while empty.
// Shape: { id, name, items: [{ product: <product object>, pack: <index> }], price: number|null, mrp: number|null }
// With price and mrp the card shows the discount; with neither it shows "Price on request".
export const combos = [];

// Classical Ayurvedic botanicals — names and Devanagari spellings only, no therapeutic descriptions.
// They decorate the hero wheel. The Botanicals section only appears once a product lists one of them in `ingredients`.
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

export const listedBotanicals = () => botanicals.filter((b) => productsWith(b).length > 0);
