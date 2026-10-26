export const categories = [
  { id: "all",         name: "All Products" },
  { id: "capsules",    name: "Capsules" },
  { id: "massage-oil", name: "Massage Oil" },
  { id: "majun",       name: "Majun" },
  { id: "supplements", name: "Supplements" }
];

export const products = [
  {
    id: "rati-shakti-capsules",
    name: "Rati Shakti Capsules",
    shortName: "Rati Shakti",
    category: "capsules",
    status: "live",
    line: "Natural vitality and strength",
    labelText: [
      "100% Ayurvedic",
      "Herbal supplement • Natural • Vegetarian",
      "A proprietary Ayurvedic medicine"
    ],
    ingredients: ["Shilajit", "Ashwagandha", "Safed Musli", "Kaunch Beej", "Gokshura"],
    dosage: "Take 1-2 capsules twice daily with warm milk or water, or as directed by an Ayurvedic physician.",
    storage: "Store in a cool, dry place away from direct sunlight. Keep out of reach of children.",
    packs: [
      { label: "60 capsules, bottle (1000 mg)", file: "rati-shakti-bottle-60.png", transparent: false },
      { label: "30 capsules, box",              file: "rati-shakti-box-30.png",    transparent: false },
      { label: "30 capsules, bottle",           file: "rati-shakti-bottle-30.png", transparent: false },
      { label: "15 capsules, trial pack",       file: "rati-shakti-trial-15.png",  transparent: false }
    ]
  },
  {
    id: "rati-shakti-oil",
    name: "Rati Shakti Ayurvedic Massage Oil",
    shortName: "Massage Oil",
    category: "massage-oil",
    status: "live",
    line: "Traditional Ayurvedic formulation for vitality and wellness",
    labelText: [
      "Traditional Ayurvedic Formulation",
      "Premium strength • 100% Natural",
      "For external use only"
    ],
    ingredients: ["Ashwagandha Oil", "Shilajit", "Clove Oil", "Jaiphal"],
    dosage: "Gently massage a few drops onto the desired area in circular motions, or as directed by an Ayurvedic practitioner.",
    storage: "Store in a cool, dry place away from direct heat and sunlight. Keep container tightly closed.",
    packs: [
      { label: "30 ml pump bottle & carton", file: "rati-shakti-oil-30ml.png", transparent: false }
    ]
  },
  {
    id: "rati-shakti-majun",
    name: "Rati Shakti Majun",
    shortName: "Majun",
    category: "majun",
    status: "live",
    line: "Classic herbal formulation prepared in authentic Ayurvedic majun paste",
    labelText: [
      "100% Ayurvedic",
      "Traditional Herbal Formulation",
      "A proprietary Ayurvedic medicine"
    ],
    ingredients: ["Shilajit", "Safed Musli", "Ashwagandha", "Kesar", "Akarkara"],
    dosage: "Take 3-5 grams (half a teaspoon) twice daily with lukewarm milk, or as directed by an Ayurvedic physician.",
    storage: "Store in a cool, dry place. Keep jar tightly closed after each use.",
    packs: [
      { label: "100 gm amber jar", file: "rati-shakti-majun-100g.png", transparent: false }
    ]
  },
  {
    id: "rati-shakti-maharaja",
    name: "Rati Shakti Maharaja Kit",
    shortName: "Maharaja Kit",
    category: "supplements",
    status: "live",
    line: "Complete 90-capsule Ayurvedic regimen for vitality & stamina",
    labelText: [
      "Ayurvedic Medicine • 90 Capsules",
      "Herbal Supplement • Vitality & Strength",
      "Natural • Safe • Effective • Since 1947"
    ],
    ingredients: ["Shilajit", "Ashwagandha", "Safed Musli", "Kaunch Beej", "Gokshura"],
    dosage: "Take 1-2 capsules daily after meals with warm milk, or as advised by an Ayurvedic physician.",
    storage: "Store in a cool, dark place away from moisture and heat. Keep out of reach of children.",
    packs: [
      { label: "90 capsules, Maharaja bottle", file: "rati-shakti-maharaja-90.png", transparent: false }
    ]
  }
];
