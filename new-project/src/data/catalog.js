import heroGreen from "../assets/images/products/hero-lineup-green.png";
import heroBlack from "../assets/images/products/hero-lineup-black.png";
import maharajaBottle from "../assets/images/products/rati-shakti-maharaja-90.png";
import bottle60 from "../assets/images/products/rati-shakti-bottle-60.png";
import bottle30 from "../assets/images/products/rati-shakti-bottle-30.png";
import box30 from "../assets/images/products/rati-shakti-box-30.png";
import trial15 from "../assets/images/products/rati-shakti-trial-15.png";
import oil30ml from "../assets/images/products/rati-shakti-oil-30ml.png";
import majun100g from "../assets/images/products/rati-shakti-majun-100g.png";

export const brandAssets = {
  heroGreen,
  heroBlack,
  brandName: "Charak Ayurveda",
  sanskritMotto: "चरकसंहिता परम् प्रमाणम्",
  englishTagline: "The Wisdom of Ayurveda, Carried Forward",
  secondaryTagline: "Rooted in Tradition. Presented for Today.",
  sinceNote: "Classical Heritage • Contemporary Discipline"
};

export const categories = [
  {
    id: "all",
    name: "All Formulations",
    count: 5,
    tagline: "Explore the verified Charak Ayurveda portfolio"
  },
  {
    id: "capsules",
    name: "Restorative Capsules",
    count: 2,
    tagline: "Standardized herbal extracts in pure vegetarian capsules",
    desc: "Crafted with concentrated herbal decoctions to preserve active botanical polyphenols and fulvic fractions.",
    featuredImage: bottle60
  },
  {
    id: "oils",
    name: "Medicated Oils",
    count: 1,
    tagline: "Potent classical oils infused with Clove, Jaiphal & Ashwagandha",
    desc: "Prepared through traditional Sneha Kalpana (lipid extraction) for targeted topical stimulation and cellular nourishment.",
    featuredImage: oil30ml
  },
  {
    id: "majun",
    name: "Classical Majun",
    count: 1,
    tagline: "Slow-cooked herbal preserves with authentic Kashmiri Saffron",
    desc: "A classical confection (Avaleha) blending purified minerals, saffron stigmas, and tonic roots in an artisanal base.",
    featuredImage: majun100g
  },
  {
    id: "regimens",
    name: "Comprehensive Regimens",
    count: 1,
    tagline: "The 90-capsule Maharaja protocol for sustained vitality",
    desc: "A physician-formulated multi-week course structured for progressive strength, cellular resilience, and restorative balance.",
    featuredImage: maharajaBottle
  }
];

export const products = [
  {
    id: "rati-shakti-maharaja",
    name: "Rati Shakti Maharaja Kit",
    category: "regimens",
    badge: "Flagship Regimen",
    packSummary: "90 Capsules • Maharaja Reserve",
    heroImage: maharajaBottle,
    headline: "The complete 90-capsule classical protocol for enduring vitality & resilience.",
    overview: "Rati Shakti Maharaja is an intensive Ayurvedic restorative regimen formulated for individuals seeking sustained physical stamina, mental clarity, and tissue regeneration. Utilizing purified Himalayan Shilajit and concentrated Ashwagandha root, it delivers deep Rasayana (rejuvenative) benefits according to Charaka Samhita tenets.",
    keyHerbs: [
      { name: "Shilajit", role: "Purified Himalayan bio-mineral rich in fulvic acid for cellular energy" },
      { name: "Ashwagandha", role: "Potent adaptogen that nourishes nervous vitality and physical endurance" },
      { name: "Safed Musli", role: "Restorative root known for strengthening deeper bodily tissues (Dhatus)" },
      { name: "Kaunch Beej", role: "Traditional botanical supporting neuromuscular coordination" },
      { name: "Gokshura", role: "Balancing herb supporting metabolic vigor and urinary tract tone" }
    ],
    labels: ["Proprietary Ayurvedic Medicine", "90 Capsules Course", "100% Vegetarian"],
    dosage: "Take 1 to 2 capsules daily after the evening meal with lukewarm milk or water, or as advised by an Ayurvedic physician.",
    storage: "Store in a cool, dry place away from direct sunlight and ambient humidity. Reseal cap tightly after each use.",
    variants: [
      { label: "Maharaja 90 Capsules (Reserve Bottle)", file: maharajaBottle, note: "Full 90-day recommended restorative course" }
    ]
  },
  {
    id: "rati-shakti-capsules",
    name: "Rati Shakti Vitality Capsules",
    category: "capsules",
    badge: "Core Formulation",
    packSummary: "60 Capsules Bottle • 1000 mg",
    heroImage: bottle60,
    headline: "Targeted botanical synergy formulated for daily vitality, vigor, and strength.",
    overview: "Prepared with disciplined botanical extraction techniques, Rati Shakti Capsules harmonize Vata and Kapha doshas. Each capsule encapsulates balanced proportions of standardized Ayurvedic extracts designed to combat daily fatigue, support natural stamina, and nourish the nervous system.",
    keyHerbs: [
      { name: "Shilajit", role: "Bio-active fulvic carrier enhancing nutrient absorption" },
      { name: "Ashwagandha", role: "Root extract stabilizing stress response and muscle tone" },
      { name: "Safed Musli", role: "Classical tonic supporting stamina and regenerative vigor" },
      { name: "Kaunch Beej", role: "Seed extract renowned for vitality enhancement" },
      { name: "Gokshura", role: "Harmonizing tonic supporting systemic rejuvenation" }
    ],
    labels: ["100% Ayurvedic Supplement", "Natural & Vegetarian", "Batch Assayed"],
    dosage: "1 to 2 capsules twice daily with warm milk or water after meals, or as prescribed by a qualified practitioner.",
    storage: "Store below 30°C in a dry environment. Keep securely closed and out of reach of children.",
    variants: [
      { label: "60 Capsules Bottle (1000 mg)", file: bottle60, note: "Extended 30-60 day regimen" },
      { label: "30 Capsules Box (Blister Pack)", file: box30, note: "Compact travel-ready blister carton" },
      { label: "30 Capsules Amber Bottle", file: bottle30, note: "Standard monthly dispenser" },
      { label: "15 Capsules Trial Pack", file: trial15, note: "Introductory evaluation format" }
    ]
  },
  {
    id: "rati-shakti-oil",
    name: "Rati Shakti Ayurvedic Massage Oil",
    category: "oils",
    badge: "External Formulation",
    packSummary: "30 ml Precision Dispenser & Outer Carton",
    heroImage: oil30ml,
    headline: "Classical medicated oil formulated for local stimulation, tone, and tissue nutrition.",
    overview: "Crafted through the traditional Ayurvedic oil-cooking method (Taila Paka), this formulation blends concentrated Ashwagandha extract and mineral Shilajit into a base of nutrient-rich botanical oils, infused with warming Clove bud oil and aromatic Jaiphal (nutmeg). Specially calibrated for soothing external massage.",
    keyHerbs: [
      { name: "Ashwagandha Oil", role: "Deeply penetrating herbal oil for muscle and tissue tone" },
      { name: "Shilajit Extract", role: "Purified resin fraction delivering bio-available minerals" },
      { name: "Clove Bud Oil", role: "Warming essential oil promoting healthy localized micro-circulation" },
      { name: "Jaiphal (Nutmeg)", role: "Aromatic botanical providing soothing sensory warmth" }
    ],
    labels: ["Traditional Taila Formulation", "100% Natural Botanicals", "External Application Only"],
    dosage: "Dispense 5 to 7 drops into clean palms. Massage gently over the targeted area using light, circular strokes until absorbed. Use twice daily or as directed.",
    storage: "Store in a cool, dark place away from heat and open flame. Keep container tightly sealed.",
    variants: [
      { label: "30 ml Precision Pump & Protective Box", file: oil30ml, note: "Lightweight glass bottle with metered pump" }
    ]
  },
  {
    id: "rati-shakti-majun",
    name: "Rati Shakti Classical Majun",
    category: "majun",
    badge: "Artisanal Avaleha",
    packSummary: "100 gm UV-Shielded Amber Jar",
    heroImage: majun100g,
    headline: "Classical herbal confection slow-cooked with pure Kashmiri Saffron & natural honey.",
    overview: "Majun (herbal confection) is one of Ayurveda’s most venerable delivery formats, designed for optimal gastric assimilation and sustained release. This proprietary recipe integrates grade-A saffron stigmas, Himalayan mineral resin, and vitalizing roots into a smooth herbal paste with exceptional therapeutic depth.",
    keyHerbs: [
      { name: "Kashmiri Kesar", role: "Hand-harvested saffron stigmas enhancing ojas and sensory vitality" },
      { name: "Shilajit", role: "Traditional mineral catalyst supporting deep regenerative nourishment" },
      { name: "Safed Musli", role: "Classical Rasayana root promoting natural vitality" },
      { name: "Ashwagandha", role: "Root extract supporting physical fortitude" },
      { name: "Akarkara", role: "Precious root prized in ancient texts for sensory warmth" }
    ],
    labels: ["Authentic Avaleha Technique", "Contains Kashmiri Saffron", "No Synthetic Preservatives"],
    dosage: "Take 3 to 5 grams (approx. half teaspoon) once or twice daily followed by a glass of lukewarm milk, or as directed by an Ayurvedic doctor.",
    storage: "Keep in a cool, dry place. Reseal the amber jar tightly after every single use to preserve freshness.",
    variants: [
      { label: "100 gm Traditional Amber Jar", file: majun100g, note: "Apothecary jar protecting herbal volatile oils" }
    ]
  }
];

export const botanicals = [
  {
    name: "Shilajit",
    sanskrit: "शिलाजित् (Shilajatu)",
    botanicalName: "Purified Himalayan Asphaltum",
    properties: "Rasa: Tikta, Katu | Virya: Ushna | Vipaka: Katu",
    description: "Revered in Charaka Samhita as the master rejuvenator (Rasayana). Sourced from high-altitude Himalayan rock fissures, our Shilajit undergoes classical Shodhana (multi-stage purification) with Triphala decoctions to isolate pure fulvic minerals that facilitate cellular nutrient transport.",
    badge: "Purified Grade"
  },
  {
    name: "Ashwagandha",
    sanskrit: "अश्वगन्धा (Withania Somnifera)",
    botanicalName: "Withania somnifera Dunal",
    properties: "Rasa: Tikta, Kashaya | Virya: Ushna | Vipaka: Madhura",
    description: "The pillar of Ayurvedic adaptogenic pharmacology. Known to pacify aggravated Vata and Kapha, Ashwagandha provides deep nourishment to the Dhatus (bodily tissues), encouraging calm resilience, enhanced endurance, and mental clarity.",
    badge: "Root Extract"
  },
  {
    name: "Kashmiri Kesar",
    sanskrit: "कुङ्कुम (Crocus Sativus)",
    botanicalName: "Crocus sativus L.",
    properties: "Rasa: Katu, Tikta | Virya: Ushna | Vipaka: Katu",
    description: "Hand-plucked crimson stigmas from the high-altitude valleys of Kashmir. Rich in crocin and safranal, saffron enriches our Majun formulation with antioxidant potency and micro-circulatory support.",
    badge: "GI Origin Saffron"
  },
  {
    name: "Safed Musli",
    sanskrit: "श्वेत मूसली (Chlorophytum Borivilianum)",
    botanicalName: "Chlorophytum borivilianum",
    properties: "Rasa: Madhura | Virya: Sheeta | Vipaka: Madhura",
    description: "A cherished bio-tonic celebrated in classical scriptures for its restorative properties. High in natural saponins and polysaccharides, Safed Musli promotes physical stamina and tissue replenishment.",
    badge: "Purity Tested"
  },
  {
    name: "Kaunch Beej",
    sanskrit: "कपिकच्छू (Mucuna Pruriens)",
    botanicalName: "Mucuna pruriens (L.) DC.",
    properties: "Rasa: Madhura, Tikta | Virya: Ushna | Vipaka: Madhura",
    description: "Traditional seeds renowned for their natural L-Dopa concentration, supporting the nervous system, muscular strength, and harmonious reproductive function.",
    badge: "Decorticated Seeds"
  },
  {
    name: "Gokshura",
    sanskrit: "गोक्षुर (Tribulus Terrestris)",
    botanicalName: "Tribulus terrestris L.",
    properties: "Rasa: Madhura | Virya: Sheeta | Vipaka: Madhura",
    description: "A balancing diuretic and Rasayana botanical that pacifies Pitta and Vata, promoting urinary system wellness and physical endurance.",
    badge: "Standardized Fruit"
  }
];

export const brandStory = {
  heading: "Rooted in Tradition. Presented for Today.",
  leadText: "Taking its philosophical inspiration from the Charaka Samhita—one of the oldest foundational scriptures of Ayurvedic medicine—Charak Ayurveda exists to bridge ancient herbal mastery with modern manufacturing transparency.",
  body1: "For millennia, traditional Ayurvedic healers recognized that plants carry profound restorative codes when extracted in harmony with their natural properties. We honor these classical tenets by adhering to authentic time-honored preparations: Sneha Kalpana (lipid decoctions), Avaleha (herbal confections), and gentle Bhavana (trituration).",
  body2: "Simultaneously, we recognize the necessity of rigorous quality assurance for contemporary medical practitioners. Every batch produced undergoes standardized botanical assays, heavy-metal screening, and microbiological checks at our Haridwar manufacturing hub.",
  quote: "“The physician who knows how to administer medicine with due regard to season and constitution never fails to achieve therapeutic excellence.”",
  quoteSource: "— Charaka Samhita, Sutrasthana"
};

export const b2bPortals = [
  {
    id: "doctors",
    role: "Registered Ayurvedic Physicians & Clinics",
    badge: "Clinical Practice",
    title: "Partner with Us in Clinical Care",
    description: "We provide licensed practitioners (B.A.M.S., M.D. Ayu) with comprehensive clinical monographs, formulation profiles, and direct institutional supply for clinical dispensing.",
    benefits: [
      "Authentic batch Certificates of Analysis (COA)",
      "Complimentary clinical evaluation packs for registered doctors",
      "Direct technical liaison with our chief Ayurvedic formulator",
      "Institutional clinic pricing & priority logistics"
    ],
    ctaText: "Request Practitioner Dossier",
    enquiryType: "Doctor / Clinical Practice"
  },
  {
    id: "distributors",
    role: "Wholesale Chemists & Regional Distributors",
    badge: "Trade & Distribution",
    title: "Pan-India Distribution Opportunities",
    description: "Charak Ayurveda is expanding its distribution presence across North, West, and South Indian pharmaceutical networks. We invite established stockists to partner with us.",
    benefits: [
      "Exclusive territory distribution arrangements for verified partners",
      "High-turnover, premium-margin Ayurvedic formulations",
      "Full promotional collateral, product brochures & digital assets",
      "Streamlined dispatch from our Haridwar industrial depot"
    ],
    ctaText: "Enquire for Distribution Rights",
    enquiryType: "Distributor / Trade Enquiry"
  }
];

export const faqs = [
  {
    question: "Are Charak Ayurveda formulations 100% vegetarian?",
    answer: "Yes. All our capsules (including Rati Shakti 60, 30, and Maharaja 90) use 100% plant-derived HPMC cellulose capsules. Our Majun herbal confection and massage oil formulations contain only authentic botanicals, mineral extracts, and natural sweeteners. No animal gelatin or synthetic fillers are used."
  },
  {
    question: "What standards are maintained at the manufacturing facility?",
    answer: "Our formulations are prepared in dedicated facilities located in the industrial Ayurvedic corridor of Haridwar, Uttarakhand. We adhere strictly to classical classical text directions combined with standardized testing for identity, purity, heavy metals, and microbiological stability."
  },
  {
    question: "Can Ayurvedic physicians request sample batches for clinical review?",
    answer: "Yes. Registered medical practitioners (B.A.M.S. / M.D. Ayu) may request sample evaluation packages and formulation dossiers through our Healthcare Professional Enquiries form or by contacting our medical representative desk on WhatsApp."
  },
  {
    question: "Are these formulations available for online direct purchase?",
    answer: "Charak Ayurveda currently operates as a brand showcase and professional distribution network. We supply registered medical practitioners, pharmacies, and licensed regional distributors. For individual inquiries, please connect directly with our desk to locate an authorized dispensing clinic."
  },
  {
    question: "How should the Rati Shakti Majun be consumed?",
    answer: "Rati Shakti Majun is a traditional herbal paste. The standard recommended serving is 3 to 5 grams (approximately half a teaspoon) taken once or twice daily followed by a cup of lukewarm milk or water, preferably 30 minutes after meals or as advised by your Ayurvedic physician."
  }
];

export const contactDetails = {
  addressLine1: "Charak Ayurveda Heritage Research",
  addressLine2: "Industrial Area, Haridwar, Uttarakhand 249401, India",
  phoneDisplay: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsappNumber: "919876543210",
  email: "care@charakayurveda.in",
  workingHours: "Monday – Saturday: 9:00 AM – 6:00 PM IST",
  mapQueryUrl: "https://maps.google.com/?q=Industrial+Area,+Haridwar,+Uttarakhand+249401",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110595.6881958444!2d78.06644264350352!3d29.970221319760742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909470eb8ee53c9%3A0x824986516d9270e5!2sHaridwar%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};
