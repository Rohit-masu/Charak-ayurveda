# Charak Ayurveda — v3 redesign plan

Branch: `v3`, cut from `v2`. The live demo (`main`) is untouched.

## The brief in one line

The client likes the layouts and the animations. What they don't like is the **colour and the vibe**: the dark forest-green, leaf-heavy look doesn't fit the products. v3 is a **re-theme, not a rebuild**. It keeps the structure and motion, changes the palette, type and imagery, and lets each product bring its own colour.

## Ground rules

- Always write the brand as **Charak Ayurveda**, never "Charak" on its own. References to the *Charaka Samhita* text are fine.
- There are two product lines for now:
  - **Rati Shakti Men**, black/dark.
  - **Rati Shakti Women**, muted rose/red.

  More will follow, so everything product-related stays data-driven.
- There are no real product photos yet. We use Gemini concept visuals (see [GEMINI_ASSET_BRIEF.md](GEMINI_ASSET_BRIEF.md)) and label them on the page as concept visuals.
- Product details come only from the client. No invented ingredients, benefits, certifications, prices or testimonials. Empty fields hide their UI.
- The current animation style stays. Animations still run when the OS asks for reduced motion (`RESPECT_OS_REDUCED_MOTION = false`).

---

## 1. Design system

### Colour tokens (`tailwind.config.js`)

The tokens get semantic names, so this is the last palette change that needs a code sweep.

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#F7F3EC` | Main page background |
| `paper` | `#FCFAF6` | Raised cards, inputs, dialogs on light |
| `sand` | `#EEE6D9` | Alternate sections, soft cards |
| `sandstone` | `#DCCDB6` | Borders, dividers, plinths |
| `charcoal` | `#1E1C1A` | Headings, body text, dark sections |
| `charcoal-2` | `#2B2825` | Raised cards on dark sections |
| `stone` | `#6F675E` | Captions, meta text (AA on ivory) |
| `bronze` | `#9C7848` | Hairlines, icons, large accent text |
| `bronze-deep` | `#7A5A33` | Small bronze text and links on light (AA) |
| `bronze-light` | `#C9AA7C` | Bronze on charcoal |

Rough proportions: 70% ivory and sand, 20–25% charcoal, 5% bronze. The animated `.gold-text` sheen becomes a **flat bronze italic** (`.accent-text`), with no gradient shine.

### Product theming (scales to future products)

Each product in `src/data/products.js` gets a `theme` object. The components read it as CSS variables (`--p-deep`, `--p-accent`, `--p-tint`, `--p-ink`), and this replaces the hard-coded `tones` map in `Collection.jsx`.

| Product | deep (panel) | accent | tint (light stage) | ink (text on deep) |
|---|---|---|---|---|
| Rati Shakti Men | `#121212` | `#9C7848` | `#E7E2DA` | `#F7F3EC` |
| Rati Shakti Women | `#5E2832` | `#B4636B` | `#F3E3E0` | `#FBF1EF` |

The site chrome stays neutral (ivory, charcoal, bronze). Product colour only appears on that product's panel, stage, chips and CTA. A new product needs one data entry and its images, nothing more.

### Typography

- **Display:** **Fraunces** (variable, self-hosted via `@fontsource-variable/fraunces`). It replaces Cormorant Garamond: warmer and more modern, less "old-world luxury". The italic is kept for accent words.
- **Body and UI:** **Manrope** (unchanged).
- **Devanagari:** **Tiro Devanagari Sanskrit** (unchanged), for small accents only.
- The type scale, the `label` style and the `SplitText` reveals stay as they are. Sizes may be tuned for Fraunces's larger x-height.

### Surface and texture

- **Grain:** the page grain overlay stays, at a lower opacity (about 0.04) so ivory reads as paper.
- **Lines:** bronze or sandstone hairlines instead of gold. Soft warm shadows (`rgba(30,28,26,0.12)`) only under products.
- **Botanicals:** become fine single-line SVG drawings at 6–10% opacity. The existing `HerbIcons` get restyled; no Gemini images are needed for these. No leaf piles and no garden photos.

---

## 2. Current status: keep, change, remove

| # | Section (file) | Now | v3 |
|---|---|---|---|
| — | Preloader (`Preloader.jsx`) | Ink background, gold crest | **Keep animation.** Ivory background, charcoal wordmark, bronze crest and line |
| — | Cursor, grain (`Cursor.jsx`, `index.css`) | Gold | **Keep.** Recolour to bronze and charcoal, lighter grain |
| — | Navbar and mega-menu (`Navbar.jsx`, `MegaMenu.jsx`) | Collection / Combos / Botanicals / Heritage / For Professionals / Contact | **Keep behaviour, new items:** Home · About · Products (mega-menu) · Career · Associate (mega-menu) · Connect With Us. Light-on-ivory at the top, solid ivory on scroll |
| 1 | Hero (`Hero.jsx`, `HerbWheel.jsx`) | Ink background, garden photo, herb wheel | **Keep layout and wheel motion.** Ivory background, charcoal headline, bronze accent. The wheel centre shows the Men and Women concept still (`hero-duo`). Herb ring becomes line art. The garden background goes |
| 2 | Tapes (`Tapes.jsx`) | Forest tape + gold tape | **Keep.** Charcoal tape + sand/bronze tape. Text: Rati Shakti Men · Rati Shakti Women · Charak Ayurveda · आयुर्वेद · 100% Ayurvedic |
| 3 | Manifesto (`Manifesto.jsx`) | Ivory | **Keep.** It becomes the **About** anchor (`#about`). New tokens, floating pack becomes the concept pack |
| 4 | Shop by concern (`Concerns.jsx`) | 8 circles, only vitality filled | **Keep, data-driven.** It's re-mapped to the new product ids. Circles with no product still show "Coming soon" |
| 5 | Collection (`Collection.jsx`) | Pinned horizontal panels, green/amber tones, garden hover scene | **Keep pinned scroll.** It becomes the **Products** anchor (`#products`). Each panel uses its product's `theme`; the hover scene uses `scene-<product>` instead of garden |
| 6 | Combos (`Combos.jsx`) | 3 draft pairings of old SKUs | **Keep component.** Hidden (renders nothing) while `combos` is empty, until the client confirms pairings |
| 7 | Ask our doctor (`DoctorCta.jsx`, `FloatingDoctor.jsx`) | Forest | **Keep.** Charcoal band, bronze accents |
| 8 | Why choose (`WhyChoose.jsx`) | Ivory, forest headings | **Keep.** Charcoal headings, bronze icons. The `leaf` / `sprout` icons get swapped for neutral ones |
| 9 | Botanicals (`Botanicals.jsx`) | Ingredient list of the old SKUs | **Keep and restyle on sand.** It shows only ingredients listed on the current products. Hidden when no product has ingredients |
| 10 | Heritage (`Heritage.jsx`) | Ink, garden photo reveal, green lineup | **Keep pinned reveal.** Charcoal. Image becomes `heritage-manuscript`; the craft block becomes `heritage-craft` |
| 11 | **Career (new, `Career.jsx`)** | — | **New, small.** "Join our field team" for MRs: short intro, two or three role lines once the client confirms them, and an apply button that opens Contact with the enquiry type "Career / MR application". Ivory |
| 12 | Associate (`Professionals.jsx`) | Forest, 3 spotlight cards | **Keep.** Renamed **Associate** (`#associate`) for doctors, chemists and distributors. Charcoal, cards on `charcoal-2` |
| 13 | Connect With Us (`Contact.jsx`) | Ivory, WhatsApp form | **Keep.** Anchor `#connect`. Adds the enquiry type "Career / MR application" |
| 14 | FAQ (`Faq.jsx`) | Ivory | **Keep.** Sand background. Product-specific answers get updated for Men/Women |
| 15 | Footer (`Footer.jsx`) | Ink, giant gold **"Charak"** | **Keep, fix the brand.** The giant mark reads **"Charak Ayurveda"** in flat bronze on charcoal |
| — | Product dialog (`ProductDialog.jsx`) | Ink panel | **Keep.** Uses the product's `theme`. Shows a "Concept visual" caption while `concept: true` |

Section rhythm is light → dark tape → light → light → product colour → light → **dark** → light → sand → **dark** → light → **dark** → light → sand → **dark footer**. Two dark sections never sit next to each other.

### Retire after the new assets arrive

`garden.webp`, `hero-lineup-green.webp`, `hero-lineup-black.webp`, and the old `rati-shakti-*.webp` pack shots, unless the client wants them kept as real SKUs (see open questions).

---

## 3. Data changes

- **`site.js`:**
  - Nav items as above.
  - New `careers` block with intro text and a `roles` list that hides while empty.
  - `enquiryTypes` gains "Career / MR application".
  - FAQ copy updated.
- **`products.js`:**
  - Two products, `rati-shakti-men` and `rati-shakti-women`, each with `theme`, `concept: true`, and `images: { stage, light, scene }`.
  - Text fields (`line`, `labels`, `ingredients`, `directions`) stay empty until the client sends label text, and the UI hides whatever is empty.
  - `concerns` gets re-mapped, and `combos` is left empty.
- **`tailwind.config.js`:** new tokens and fonts. The old token names (`ink`, `forest`, `gold`, `sage`, `noir`) are removed, so leftovers fail loudly in review.

## 4. Build order

1. Tokens, fonts and `index.css` (grain, accent text, selection, focus).
2. A sweep across all sections for the token rename and dark/light section colours.
3. Product `theme` variables in Collection, ProductDialog, MegaMenu, Concerns and Combos.
4. Hero and HerbWheel restyle, plus line-art herbs.
5. Nav and anchors, the Career section, the Associate rename, the Footer brand fix.
6. Drop in the Gemini assets (WebP, sized as in the brief).
7. Review pass at 1845×863, 1440, 1024, 768 and 360. Then `npm run lint` and `npm run build`.

## 5. Open questions for the client

1. **Rati Shakti Men:** is it the same as the existing Rati Shakti range (capsules, oil, majun, Maharaja Kit)? If yes, we can reuse that label text and SKU list under Men.
2. **Rati Shakti Women:** name, format, pack sizes and label text.
3. **Career and Associate:** confirm that Career means MR hiring and Associate means doctor, chemist and distributor tie-ups. What should Career list (roles, cities, how to apply)?
4. **Combos:** confirmed pairings with price and MRP, or drop the section.
5. Real email address, and the doctor's WhatsApp number.
