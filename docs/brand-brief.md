# Charak Ayurveda: Landing Page Brief (Vite + React, for Gemini agent)

## Team ke liye (Gemini ko mat dena)

1. Terminal me ye chalao, phir folder Gemini agent me kholo:
   ```
   npm create vite@latest charak-ayurveda -- --template react
   cd charak-ayurveda && npm install
   ```
2. Neeche `PASTE FROM HERE` ke baad ka poora text Gemini ko paste karo.
3. Images `src/assets/images/products/` me rakho. Abhi 2 photos hain (bottle, box). Transparent PNG/WebP aate hi usi naam se replace kar do, code nahi badlega.
4. Local dekhne ke liye `npm run dev`. Client ko dikhane ke liye `npm run build`, phir `dist/` ke andar ki files Hostinger `public_html` me upload karo.
5. Design reference sites (section 7) team khud khol ke screenshot le le aur Gemini ko bhi de de agar uska browser tool hai. Agent ko sirf text mile toh bhi neeche likha description kaafi hai.
6. Client se kya chahiye, uski checklist file ke end me hai.

---

## PASTE FROM HERE

# 1. Task

You are a senior front-end designer-developer. Build a responsive, production-quality **landing page** for **Charak Ayurveda**, an Indian Ayurvedic medicine brand, using **Vite + React**. This is phase 1. The client will review a prototype and request edits. After approval, an admin panel and an MR (medical representative) app will be built, so the code must be clean, component-based, data-driven and easy to extend.

# 2. Context

- Charak Ayurveda sells proprietary Ayurvedic products. MRs visit doctors with catalogs and samples, and doctors and chemists place orders. The site is **not an online store**. It is a brand and catalog site for two audiences:
  1. **Doctors, chemists and distributors** who want to see the range and enquire.
  2. **Customers** who want to know what the brand and products are.
- The name comes from the *Charaka Samhita*, a classical Ayurvedic text. The product box shows an open book with neem leaves, a strong heritage cue.
- 4 categories (**Capsules, Massage Oil, Majun, Supplements**), 5 products. Only 1 product (Rati Shakti, two pack sizes) has real content and photos now. The other 4 are placeholders.
- Current product photos have white backgrounds. Transparent photos will replace them. Every image container must look right with **both**.

# 3. Compliance rules (strict, override any design idea)

1. Describe products **only** with wording printed on the packs (given in the data below). Do not invent benefits.
2. No claims about sexual performance or pleasure, treatment, cure, prevention, "guaranteed" or "clinically proven" results, before/after content, or doctor endorsements.
3. No prices, discounts, ratings, review counts, fake testimonials, awards or statistics.
4. Show no FSSAI, AYUSH, GMP or licence claim or number unless provided in `config.js`. Render those lines only when the value is non-empty. Do not copy the licence number visible in the box photo.
5. Required footer disclaimer: "These products are Ayurvedic proprietary medicines. Use as directed by an Ayurvedic physician. Individual results may vary. Keep out of reach of children."
6. Reference sites use claim-heavy copy. **Do not imitate their wording.**
7. Short, plain English, sentence case. All visible copy lives in `src/data/content.js` so it can be translated to Hindi later.

# 4. Tech stack (fixed)

| Area | Choice |
|---|---|
| Build tool | **Vite** (latest stable) |
| UI | **React 18**, function components and hooks, JavaScript (not TypeScript) |
| Routing | `react-router-dom` v6, only for `/` and `/privacy` |
| Styling | **Tailwind CSS v3.4** with design tokens in `tailwind.config.js` (colours, fonts, spacing, shadows). Small custom CSS only for keyframes and the SVG pattern, in `src/index.css` |
| Fonts | Self-hosted via `@fontsource` (Marcellus for headings, Hind for body, both with Devanagari support). No Google Fonts links |
| Icons | `lucide-react` for UI icons only. Brand ornaments (neem sprig, open book, corner paisley, dividers) are custom inline SVG components you draw |
| Helpers | `clsx` |
| Animation | CSS keyframes/transitions plus an `IntersectionObserver` hook. **No** framer-motion, GSAP, three.js, WebGL or Lottie |
| Forms | No backend in phase 1 (opens WhatsApp). Write `EnquiryForm` so a `fetch()` POST to a PHP/Laravel endpoint can be added later without a rewrite |
| Hosting target | Static files on Hostinger shared hosting (`npm run build`, upload `dist/`) |

No other dependencies. No UI kits (no MUI, Chakra, shadcn), no carousel libraries, no stock images.

Quality floor: semantic HTML, visible keyboard focus, alt text on all images, WCAG AA contrast, `prefers-reduced-motion` respected, lazy-loaded below-the-fold images with explicit width/height, meta description and Open Graph tags, no console warnings, Lighthouse mobile performance 90+ and accessibility 95+.

# 5. Folder structure (fixed)

```
charak-ayurveda/
├─ index.html                      (meta, OG tags, root div)
├─ package.json
├─ vite.config.js
├─ tailwind.config.js              (design tokens live here)
├─ postcss.config.js
├─ public/
│  ├─ favicon.svg
│  ├─ og-image.jpg                 (placeholder; client logo + tagline later)
│  ├─ robots.txt
│  ├─ .htaccess                    (SPA rewrite so /privacy works on Hostinger, see below)
│  └─ downloads/
│     └─ catalog.pdf               (optional; hide the button if missing)
└─ src/
   ├─ main.jsx                     (React root, Router)
   ├─ App.jsx                      (routes)
   ├─ index.css                    (Tailwind layers, keyframes, pattern, reduced-motion rules)
   ├─ assets/
   │  ├─ images/
   │  │  ├─ logo/                  (logo.png; may be missing, text logo is the fallback)
   │  │  └─ products/              (rati-shakti-bottle-60.png, rati-shakti-box-30.png)
   │  └─ svg/                      (neem-sprig.svg, open-book.svg, corner-ornament.svg,
   │                                divider.svg, pattern-paisley.svg, category icons)
   ├─ data/
   │  ├─ config.js                 (phone, WhatsApp, email, address, licences, social)
   │  ├─ content.js                (all visible copy, grouped by section)
   │  ├─ products.js               (categories and products)
   │  └─ faq.js
   ├─ components/
   │  ├─ layout/                   (AnnouncementBar, Header, MobileMenu, Footer, FloatingWhatsApp)
   │  ├─ sections/                 (Hero, TrustStrip, Categories, Products, About,
   │  │                             Ingredients, ForDoctors, Faq, Contact)
   │  ├─ products/                 (ProductCard, ProductModal, PackSwitcher, CategoryTabs)
   │  ├─ form/                     (EnquiryForm, Field)
   │  └─ ui/                       (Button, Container, SectionHeading, Ornament, ProductStage, Reveal, Logo)
   ├─ hooks/                       (useReveal, useScrolled, useReducedMotion)
   ├─ lib/                         (whatsapp.js, validators.js, images.js)
   └─ pages/                       (Home.jsx, Privacy.jsx)
```

Rules for the code:
- Editing or adding a product, category, pack, FAQ item or contact detail must need **only a data-file edit**, never component changes.
- **Image lookup:** `lib/images.js` uses `import.meta.glob('../assets/images/**/*', { eager: true, query: '?url', import: 'default' })` and resolves images by filename. `products.js` therefore only stores filenames such as `"rati-shakti-bottle-60.png"`. A missing file must render a graceful placeholder, never a broken image icon.
- **WhatsApp:** every WhatsApp link (header, floating button, product enquiry, form, contact, footer) is built by `lib/whatsapp.js`, so the number and message format change in one place.
- **Empty config values** hide their UI element instead of showing a blank label.
- Use small, single-purpose components. No component over about 150 lines.
- **`public/.htaccess`** content:
  ```
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

# 6. Sections (in order) and why

Chosen after studying **Dr Vaidya's** (drvaidyas.com, a B2C Ayurvedic store) and **Oushadhi** (oushadhi.org, a large manufacturer with a "Doctors Sign Up/Login"), plus general premium Ayurvedic brand sites.

| # | Section | Reason and notes |
|---|---|---|
| 1 | Announcement bar (thin, dismissible) | Dr Vaidya's uses one. Use it for "Doctor and distributor enquiries open". No offers or prices |
| 2 | Header | Logo, nav (About, Products, For doctors, FAQ, Contact), WhatsApp button, and an optional "Doctor / MR login" link controlled by `config.showDoctorLogin` (hidden for now, Oushadhi has this) |
| 3 | Hero | One clear job: brand line, buttons "View products" and "Doctor or distributor enquiry", product visual |
| 4 | Trust strip | Icon facts. Only facts printed on packs or provided in config: Ayurvedic formulation, vegetarian, made by Charak Ayurveda |
| 5 | Categories | Four tiles that filter the products. **No** "shop by health concern" (claims risk) |
| 6 | Products | Filter tabs, card grid, details modal with pack switcher, ingredients, dosage, storage, enquire button. No cart, price or reviews |
| 7 | About and heritage | Short story tied to the Charaka Samhita. A milestones timeline is built but hidden until the client gives real dates |
| 8 | Key ingredients | Names only, as chips. No benefit text until verified by the client. Hide if empty |
| 9 | For doctors, chemists and distributors | The real sales channel. 3-step process, "Download catalog" button (hidden if no PDF), button to the form |
| 10 | FAQ | 5 to 6 neutral questions in an accessible accordion: where to buy, become a stockist, contact, how to take (label text only), storage, is it vegetarian |
| 11 | Contact and enquiry | Contact details from config, enquiry form to WhatsApp, "Open in Maps" link only (no embedded map script) |
| 12 | Footer | Logo, quick links, contact, social links, licence line (if provided), disclaimer, privacy link, auto year |

**Skipped in phase 1 (mention in your report as later options, build no stubs):** cart or checkout, prices, ratings and testimonials, blog, newsletter, marketplace logos, consultation booking, health-concern navigation.

## WhatsApp (a thread through the page, not one section)

1. Header button. 2. Floating button, **mobile only**, safe-area aware. 3. "Enquire on WhatsApp" in every product modal with product and pack prefilled. 4. The enquiry form (see below). 5. Contact section and footer.

Plain `https://wa.me/<number>?text=<encoded>` links only. No WhatsApp API, scripts or widgets.

**Enquiry form fields:** name (required), I am a (Doctor, Chemist or distributor, Customer, Other), city (required), phone (required, valid 10-digit Indian mobile), product of interest (built from `products.js` plus "General enquiry"), message (optional), consent checkbox (required, links to `/privacy`). On submit: validate, open WhatsApp in a new tab with a neatly formatted multi-line message, show an inline confirmation with a fallback link. Inline error messages say exactly what to fix. No `alert()`.

**`/privacy` page:** short privacy policy template with clearly marked placeholders (what data the form collects, that it is sent via WhatsApp, how to ask for deletion, contact). Mark it "Draft, to be reviewed".

# 7. Design direction and references

## 7.1 Mood and concept

Calm, premium, trustworthy: a **bound book of herbal knowledge**, not a pharmacy flyer and not a generic wellness template. Deep green and antique gold on clean white, matching the packaging (black/gold bottle, green/gold box). Heritage cues come from the box: open book, neem sprig, fine gold borders with paisley corners.

**Write a short design plan before coding** (palette, type roles, layout idea per section, the one memorable element). Check it against this section and fix anything that looks templated.

## 7.2 Reference sites (open these and study the feel; copy no layout, text or imagery)

| Reference | What to look at | Take | Avoid |
|---|---|---|---|
| **Forest Essentials** (search the name) | Dark green and gold luxury Indian brand, products on a clean stage | Restrained palette, fine gold hairlines, serif headings, generous spacing | Shop clutter, offer banners |
| **Kama Ayurveda** (search the name) | Editorial product presentation, ingredient storytelling, warm calm tone | Product-on-stage composition, story blocks with plenty of air | Skincare-specific content |
| **Aesop** (search the name) | Typography-led layouts, quiet interactions, lots of whitespace | Confident type scale, restraint, simple hover states | Its brown/cream palette |
| **Kerala Ayurveda** (search the name) | Heritage and trust for a large Ayurvedic maker | How a heritage story and range overview sit together | Dense, text-heavy pages |
| **Dr Vaidya's** (drvaidyas.com) | Information structure of a B2C Ayurvedic brand | Announcement bar, category and best-seller tabs, icon trust row, WhatsApp in header | Discounts, claim-heavy copy, busy grids |
| **Oushadhi** (oushadhi.org) | B2B manufacturer site | Doctor login link, milestones timeline, downloads, dealer focus | Dated visual style |

Mood-board search terms for Dribbble/Behance/Pinterest: "ayurveda website luxury", "herbal brand landing page dark green gold", "premium supplement landing page serif", "heritage pharma website".

## 7.3 Design tokens (put these in `tailwind.config.js`)

| Token | Value | Use |
|---|---|---|
| `neem` | `#0F2E21` | Dark sections, header on scroll, footer |
| `forest` | `#1B4332` | Primary buttons, links, accents |
| `gold` | `#B8923F` | Hairlines, borders, icons, outline buttons |
| `gold-soft` | `#DDBF73` | Gold text on dark backgrounds, hover |
| `paper` | `#FCFBF7` | Main background (mostly white) |
| `mist` | `#E8F0EA` | Alternate sections, image stages |
| `ink` | `#16251C` | Body text |

You may fine-tune values, but keep this family. No beige page, terracotta, neon, or decorative gradients. Flat gold lines only.

- **Fonts:** `font-display`: Marcellus (single weight, so create hierarchy with size and spacing). `font-body`: Hind 400/500/600.
- **Type scale (fluid with `clamp`):** h1 about 2.5rem to 4.75rem, line-height 1.05. h2 about 2rem to 3.25rem, line-height 1.15. Body 1.0625rem, line-height 1.65, max 65ch. Sentence case everywhere. No all-caps eyebrow labels. No single highlighted word in a headline.
- **Spacing:** 8px scale. Section padding `py-20 md:py-28`. Container `max-w-7xl px-5 sm:px-8`.
- **Shape:** buttons and tiles use small radii (2 to 4px) with a gold hairline for a "printed label" feel. Chips use full pill radius. Product cards and the hero use an **arched top** (`rounded-t-[999px]`) because it echoes traditional arched windows. Not every block should be the same rounded card.
- **Shadows:** one soft, low-opacity, green-tinted shadow for product stages. No heavy drop shadows.
- **Buttons:** primary = forest background, paper text (on dark sections: gold-soft background with neem text). Secondary = 1px gold outline. Visible focus ring in gold-soft with 2px offset.

## 7.4 Section rhythm (colour order)

Announcement (neem) -> Header over Hero (neem) -> Trust strip (paper) -> Categories (paper) -> Products (mist) -> About (paper) -> Ingredients (mist) -> For doctors (neem) -> FAQ (paper) -> Contact (mist, with a white framed panel) -> Footer (neem). Never put two dark sections next to each other.

## 7.5 Layout sketches (guides, not pixel specs)

Hero (desktop; stacks on mobile with the image above the text):
```
+--------------------------------------------------------------+
| logo        About  Products  For doctors  FAQ  Contact  [WA]  |
|                                                              |
|  Headline (large serif)              .--------------.         |
|  One supporting sentence             |   arched     |  leaf   |
|  [View products] [Doctor enquiry]    |   gold frame |  sprig  |
|                                      |  bottle + box|         |
|  trust: Ayurvedic | Vegetarian | Made by Charak   '----------' |
+--------------------------------------------------------------+
```

Product card and modal:
```
 card:                     modal (dialog):
 .-----------.             +------------------+--------------------+
 |  arched   |             |  stage + image   | Name, category      |
 |  stage    |             |  [60 caps][30]   | label line          |
 '-----------'             |                  | Ingredients (chips) |
 Rati Shakti               |                  | Dosage / storage    |
 Capsules                  |                  | [Enquire on WhatsApp]|
 One label line            +------------------+--------------------+
 [View details]
```

For doctors (neem background, text left, steps right):
```
 Heading + short paragraph       1 Send your details
 [Enquire]  [Download catalog]   2 We contact you
                                 3 See the range and samples
```

## 7.6 Imagery

- Product photos on a `ProductStage` component: fixed aspect ratio, `object-contain`, soft light background with a faint radial glow, soft shadow under the pack. It must work for a tall bottle (about 1:2) and a landscape box (about 3:2) without stretching.
- White-background photos: place on a light stage and add `mix-blend-mode: multiply` so the white melts in. Transparent photos: the same stage, no blend mode needed. Do this with a prop, not duplicate components.
- Never place white-background photos directly on a dark green background. In the hero, the product sits inside the light arched frame.
- Optional subtle paisley SVG pattern at 4 to 6% opacity on dark sections only, never behind body text.
- No stock photography. All ornament is custom SVG.

## 7.7 Motion (small, intentional)

- **Hero (once on load):** gold line draws the arch frame (stroke-dashoffset, about 1.2s ease-out), then the product fades up and settles (about 0.8s, 0.9s delay). Neem leaf sprigs sway very slowly (7s alternate loop, rotation about 2.5 degrees).
- **Scroll reveal:** 24px rise and fade, 0.6s, once, on section headings and a few key blocks only. Not on everything.
- **Interactions:** product card lifts 4px with a gold hairline on hover/focus (250ms). Filter tab change fades the grid (200ms). Modal fades and scales from 0.98 (200ms). FAQ accordion opens smoothly.
- **Not allowed:** carousels, marquees, number counters, parallax, auto-playing anything.
- Under `prefers-reduced-motion: reduce`, disable all non-essential animation and show the final state immediately.

## 7.8 Responsive

Test at 360, 768, 1024 and 1440 px. No horizontal scroll. Touch targets at least 44px. Mobile header collapses to a menu with focus trap and Escape to close. Product grid: 1 column on mobile, 2 on tablet, 3 on desktop.

# 8. Data to use

`src/data/config.js`

```js
export const config = {
  brandName: "Charak Ayurveda",
  whatsappNumber: "",     // digits with country code, e.g. "919876543210"
  phone: "",
  email: "",
  address: "",
  mapsUrl: "",
  hours: "",
  licenceNumber: "",      // leave empty until the client provides it
  gmpCertified: false,    // set true only when the client confirms
  social: { instagram: "", facebook: "", youtube: "" },
  showDoctorLogin: false, // turn on when the doctor/MR panel exists
  doctorLoginUrl: "",
  catalogPdf: "/downloads/catalog.pdf",
  logoFile: "logo.png"    // looked up in src/assets/images/logo/
};
```

`src/data/products.js`

```js
export const categories = [
  { id: "capsules",    name: "Capsules" },
  { id: "massage-oil", name: "Massage Oil" },
  { id: "majun",       name: "Majun" },
  { id: "supplements", name: "Supplements" }
];

// status "live" = full details, "placeholder" = "Image coming soon" card
export const products = [
  {
    id: "rati-shakti",
    name: "Rati Shakti",
    category: "capsules",
    status: "live",
    line: "Natural vitality and strength",
    // Only wording printed on the packs:
    labelText: ["100% Ayurvedic", "Herbal supplement. Natural. Vegetarian.", "A proprietary Ayurvedic medicine"],
    ingredients: ["Shilajit", "Ashwagandha", "Safed Musli", "Kaunch Beej", "Gokshura"],
    dosage: "Take 1-2 capsules twice daily with warm milk or water, or as directed by an Ayurvedic physician.",
    storage: "Store in a cool, dry place away from direct sunlight. Keep out of reach of children.",
    packs: [
      { label: "60 capsules, bottle (1000 mg)", file: "rati-shakti-bottle-60.png", transparent: false },
      { label: "30 capsules, box",              file: "rati-shakti-box-30.png",    transparent: false }
    ]
  },
  { id: "product-2", name: "Product name to come", category: "massage-oil", status: "placeholder" },
  { id: "product-3", name: "Product name to come", category: "majun",       status: "placeholder" },
  { id: "product-4", name: "Product name to come", category: "supplements", status: "placeholder" },
  { id: "product-5", name: "Product name to come", category: "capsules",    status: "placeholder" }
];
```

When transparent photos arrive, the team replaces the files and sets `transparent: true`. Nothing else changes.

`src/data/content.js` holds all headings and paragraphs per section. Heritage line you may use: "Charak takes its name from the Charaka Samhita, one of the oldest texts of Ayurveda." Hero line example: "Ayurvedic care, rooted in tradition." Adapt freely, but stay claim-free.

# 9. Process

1. Write the design plan (one screen) and confirm it matches sections 6 and 7.
2. Install dependencies, set up Tailwind tokens, fonts, routing and the folder structure.
3. Build `ui/` primitives and the data files, then sections top to bottom.
4. Build product grid, modal, form, WhatsApp helper and the `/privacy` page.
5. Add the hero motion and interaction polish.
6. Test at the four widths: no horizontal scroll, modal focus trap and Escape, keyboard-only use, form validation and WhatsApp link, missing logo fallback, placeholder products, empty config values, reduced motion. Run `npm run build` and `npm run preview` to check the production build. Fix what you find.
7. Report briefly: what you built, what you assumed, what the team must fill in, and the exact deploy steps.

# 10. Acceptance checklist

- [ ] `npm run dev` and `npm run build` both succeed with no errors or warnings.
- [ ] All 12 sections exist, in order, driven from the data files.
- [ ] Rati Shakti modal works with a 60 / 30 pack switcher.
- [ ] Placeholder products show "Image coming soon" and are not clickable.
- [ ] Category tiles and filter tabs stay in sync.
- [ ] Every WhatsApp link comes from `lib/whatsapp.js`. The form sends a clean prefilled message.
- [ ] Empty config values hide their UI. A missing logo or image shows a graceful fallback.
- [ ] `/privacy` works after build with the provided `.htaccess`.
- [ ] No prices, testimonials, ratings, health or sexual-performance claims, or licence numbers anywhere.
- [ ] Looks polished from 360px to 1440px, keyboard accessible, reduced motion respected.
- [ ] Works with white-background and transparent product images.

# 11. Out of scope

Admin panel, MR app, login, payment gateway, backend or database, cart, blog, newsletter, reviews. Do not build them or leave stubs in the UI (the optional doctor-login link is controlled by a config flag and stays hidden).

---

## Team ke liye: client se kya chahiye

| Cheez | Kyun chahiye |
|---|---|
| Logo (PNG, transparent, high quality) | Header, footer, favicon |
| Business address, phone, email, **WhatsApp number** | Contact aur saari WhatsApp links |
| Brand ki 3 to 4 line ki kahani | About section (verified, claim-free) |
| 5 products: naam, category, pack sizes, ingredients, dosage, **transparent photos** | Products section |
| Pack pe jo likha hai bas wahi description | Compliance, koi extra claim nahi |
| Real FSSAI / AYUSH / licence number (agar dikhana ho) | Footer aur trust strip |
| GMP certified hai ya nahi (haan bole toh certificate) | Trust strip |
| Catalog PDF (agar hai) | "Download catalog" button |
| Social links | Footer |
| Domain name pakka (jaise charakayurveda.in) | Hosting setup |
| Site sirf doctors/distributors ke liye ya customers ke liye bhi? | Hero aur FAQ ki copy |

**WhatsApp ke liye:** client ke paas ek number chahiye. Free **WhatsApp Business app** use karna better hai (business profile, greeting message, catalog). Koi paid API nahi lagti.

**Deploy:** `npm run build` chalao, phir `dist/` folder ke andar ki saari files Hostinger ke `public_html` me upload karo (folder nahi, uske andar ki files).
