# Charak Ayurveda — V2 Landing Page Redesign Brief for Gemini Agent

## Objective

Build a **fresh, premium, responsive landing page** for Charak Ayurveda in **React + Vite**. This is a brand showcase website, not an e-commerce storefront and not the internal admin/MR application.

The existing landing page should remain untouched. Create the new implementation in a **sibling/parallel directory named `v2`** alongside the current project, following the existing repository's conventions where practical.

Example only:

```text
project-root/
├── existing-app/          # Keep the current implementation intact
└── v2/                    # New landing page implementation
    ├── package.json
    ├── index.html
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── components/
    │   ├── data/
    │   ├── styles/
    │   └── assets/
    └── public/
```

**Do not blindly create this exact structure if the repository has a better existing convention.** Inspect the repository first, understand where the current app lives, and create `v2` as a parallel directory without overwriting or breaking the existing app. Do not nest `v2` inside the current app's `src` directory.

## First: inspect before coding

1. Inspect the repository and identify the current React + Vite setup, scripts, dependencies, assets, and current app location.
2. Locate all supplied Charak Ayurveda product photos, logo files, and the current landing-page screenshot.
3. Keep the current implementation intact.
4. Report briefly where `v2` will be created and how it will run.
5. Then implement the new version. Do not stop at a plan or a mockup.

If the repository root is itself the existing Vite app, create `v2` as a sibling of its app directory where the workspace permits. If a sibling directory cannot be created because of the supplied workspace layout, explain the constraint and choose the safest parallel location that does not overwrite existing files.

## Brand and business context

- Brand: Charak Ayurveda.
- Primary goal: showcase the brand and its product range professionally.
- Approximately **5 actual products** have been identified so far.
- Approximately **4 product categories** are expected.
- Products may include oils, capsules, supplements, and other formulations, but exact names and classification are not yet confirmed.
- Some product photos are available. Full catalog, final logo, complete descriptions, and official contact/location details may still be missing.
- A separate admin panel and Medical Representative (MR) panel are part of the broader business-digitization project. They are **not** part of this landing-page task.

Do not invent product names, prices, sizes, ingredients, health claims, founding year, company history, certifications, testimonials, statistics, contact details, or business promises. Keep unknown content clearly editable and mark missing details in the final implementation summary.

## Creative direction

Use a **premium Ayurvedic brand + botanical editorial + modern Indian brand identity** aesthetic.

The previously shared reference image in the conversation is an inspiration for the intended direction: a forest-green and warm-ivory page, elegant serif headings, muted gold details, botanical photography, prominent product imagery, an editorial story section, product category tiles, product cards, business-enquiry blocks, a contact form, and a polished footer.

Treat that reference as **visual direction, not a pixel-perfect template**. Create a distinctive layout with better hierarchy and a clear rhythm between sections. Do not copy a website or blindly recreate every element from the reference.

### Suggested palette

- Deep forest green: `#0B3025`
- Botanical green: `#245541`
- Warm ivory: `#FAF8F1`
- Soft sage: `#E8F0E8`
- Muted gold: `#C6A66A`
- Deep charcoal: `#26352D`
- Muted olive: `#727B6E`

Adjust if necessary to complement the actual logo and packaging.

### Typography

Use an elegant serif for editorial headings and a clean sans-serif for body/UI text. Possible pairings: Cormorant Garamond + DM Sans, or Playfair Display + Inter. Prefer existing fonts if suitable. Avoid loading lots of font families.

### Visual rules

- Large, sharp product imagery; never make products tiny in huge empty containers.
- Asymmetric editorial layouts and generous whitespace.
- Alternate dark green and light sections.
- Use botanical imagery where it supports the story.
- Use gold sparingly for small highlights and details.
- Avoid the same centered heading + four-card grid in every section.
- Avoid excessive pill buttons, shadows, gradients, glassmorphism, decorative blobs, and animation.
- Do not use emojis as visual decoration.
- The result must feel premium and art-directed, not like a generic healthcare template.

## Recommended page structure

Adapt or combine sections based on actual available content. Do not add filler sections just to make the page longer.

### 1. Navigation
- Existing logo/wordmark if available.
- Links: Home, Our Products, Our Story, Contact.
- Optional Our Philosophy link if that section has real content.
- Business Enquiry CTA.
- Responsive mobile menu with working links.
- If the logo is missing, use a temporary text wordmark and make replacement easy. Do not invent a logo.

### 2. Hero
Create an asymmetric editorial hero:
- Left: small brand descriptor, strong headline, short introduction, primary CTA `Explore Our Products`, secondary CTA `Discover Our Story`.
- Right: large, attractive image of an actual supplied product, integrated with botanical imagery or a tasteful background composition.
- Suggested temporary headline: **“The Wisdom of Ayurveda, Carried Forward.”**
- Suggested temporary copy: “Discover Charak Ayurveda’s range of Ayurvedic formulations, thoughtfully presented for today’s world.”
- Keep all copy easy to edit.
- No fake claims about heritage, efficacy, certification, or years of experience.

### 3. Brand attribute strip
A slim strip with 3–4 attributes, such as product range, Ayurvedic formulations, brand philosophy, or professional enquiries. Use only accurate or clearly provisional wording. Prefer line icons and subtle dividers over large cards.

### 4. Product categories
Show approximately four categories in a visually interesting editorial grid. Use category names and imagery only when supported by available assets or client information. Make category data easy to update. Use clear `Explore` links that scroll to a real section or route.

### 5. Product showcase
Show the approximately five real products identified so far. Use a data-driven product list so products can be updated centrally. Each card can include:
- Actual product photo.
- Product name.
- Category.
- Short factual description, if available.
- Pack size, only if confirmed.
- `View Product` or `Enquire About Product` CTA.

Do not invent products to fill empty spaces. Do not add prices, shopping cart, checkout, or `Buy Now` unless the project requirements explicitly support online sales. Make product images consistent in size and visually prominent.

### 6. Brand story
Use an editorial split layout with a real brand/product/botanical photo and a concise brand introduction. Temporary heading direction: **“Rooted in Tradition. Presented for Today.”** Do not invent founding dates, founders, lineage, or company history. If the brand story is not supplied, keep copy general and editable.

### 7. Philosophy / botanical ingredients (optional)
Include only if there is enough genuine content. Do not invent ingredient lists or therapeutic benefits. If ingredients are not confirmed, omit the ingredient explorer or use a clearly provisional, easy-to-replace section. Combine philosophy with the brand story if that avoids filler.

### 8. Healthcare professional and business enquiries
A distinctive dark-green section with two pathways:
- Healthcare Professional Enquiries.
- Business / Distribution Enquiries.

Keep copy factual and general. Do not imply services, professional resources, or partnerships that the client has not confirmed. Do not build admin/MR login screens here.

### 9. Contact section with location/map
Use a clean enquiry form and the official contact information available in the repository or provided by the client. Suggested fields: Name, Email, Phone, Enquiry Type, Message.

**Google Maps iframe recommendation:** Include a map only if the official office/business address is known and confirmed. Do not guess the location or use a random map. Put the embed URL/address in a single easy-to-edit config/data file. Use a responsive 16:9 or similarly appropriate map container with lazy loading, a descriptive `title`, and `referrerPolicy="no-referrer-when-downgrade"` if compatible. Add a visible `Open in Google Maps` link as a fallback. If the address or valid embed URL is missing, do not embed a generic map—show a neat location/contact placeholder that can be enabled once the client supplies the correct details. Do not require a Google Maps API key for a basic embed unless there is a clear reason.

If no real form backend exists, provide honest validation and an explicit “form integration required” note in the implementation summary. Do not show a fake success message for an unsent enquiry.

### 10. Footer
Brand, product links, company/story links, business enquiry links, contact details, and relevant legal links only when supplied. Avoid invented phone numbers, email addresses, addresses, or legal policies.

## Modern interactions and animations

Use tasteful, performance-conscious interactions that support the brand rather than distract from it:

1. **Scroll reveal:** subtle fade-up or fade-in for section content using Intersection Observer or an existing lightweight solution. Respect `prefers-reduced-motion`.
2. **Product card hover:** slight image scale and a small arrow/CTA movement. Keep motion restrained.
3. **Category hover:** subtle image zoom or overlay change.
4. **Sticky navigation:** a modest background/shadow transition after scrolling, if it improves readability.
5. **Smooth anchor navigation:** only where appropriate; respect reduced-motion preferences.
6. **Product carousel:** optional. With only five products, a clean responsive grid may be better. If a carousel is used, it must work with keyboard and touch, show visible controls, and not trap focus.
7. **FAQ accordion:** only if an FAQ section is useful; make it keyboard-accessible with correct button semantics and expanded state.
8. **Mobile menu:** fully functional, closes after selecting a section, and supports keyboard interaction.
9. **Form states:** clear required-field validation, error state, and success state only when a real submission succeeds.
10. **Small botanical motion:** optional and very subtle. Avoid heavy parallax, continuous spinning, large animated backgrounds, or motion that hurts readability/performance.

Do not add animation libraries automatically. First check the existing dependencies. CSS transitions and Intersection Observer are enough for most of this page. If an animation dependency is already installed, use it only where useful.

## React + Vite implementation requirements

- Use the existing React + Vite conventions and scripts where practical.
- Build real, reusable React components; do not put the entire website into one enormous component.
- Keep product/category content in a centralized data file.
- Keep design tokens in CSS custom properties or the project's existing styling system.
- Follow the project's existing linting and formatting conventions.
- Use semantic HTML and accessible interactive elements.
- All navigation and CTA links must work.
- Avoid unnecessary dependencies.
- Do not use placeholder links such as `href="#"` for controls that appear functional.
- No dead code, unused imports, abandoned components, or unused CSS.
- **Do not create empty folders.** Every directory created must contain files that are actually used.
- Do not create duplicate implementations of the same component.
- Do not leave the page half-implemented with TODOs for core visual elements.
- Do not overwrite or break the original landing page.
- Make `v2` independently runnable with a clear `package.json` and documented command, while avoiding unnecessary duplication of large dependencies or assets where the workspace supports safe reuse.
- Ensure Vite asset paths work correctly from the new `v2` directory.
- Do not move/delete the existing app's files or assets unless explicitly necessary and approved.

## Responsive design

Design intentionally for:
- Large desktop.
- Laptop.
- Tablet.
- Mobile.

Requirements:
- No horizontal overflow.
- Mobile navigation works.
- Hero reflows cleanly and retains a strong product image.
- Category tiles and product cards adapt to viewport width.
- Typography scales fluidly.
- Form fields remain easy to use.
- Map, if included, remains responsive.
- Buttons have comfortable touch targets.
- Images use appropriate sizing and `object-fit`.
- No content is clipped at common breakpoints.

## Accessibility and performance

- Semantic landmarks and logical heading hierarchy.
- Keyboard-accessible navigation and controls.
- Visible focus states.
- Meaningful alt text for product images.
- Sufficient color contrast.
- Respect `prefers-reduced-motion`.
- Lazy-load below-the-fold images.
- Avoid layout shifts by reserving image dimensions/aspect ratios.
- Avoid unnecessary JavaScript and dependencies.
- Keep transitions short and smooth.

## Verification / definition of done

After implementation:
1. Run the available build command from `v2`.
2. Run lint/tests if configured.
3. Fix errors introduced by the redesign.
4. Check the page at desktop and mobile widths.
5. Check for horizontal overflow and broken images.
6. Test every navigation link and CTA.
7. Verify that the original implementation remains intact.
8. Verify that there are no unused imports, dead components, empty directories, or placeholder `#` links.
9. Confirm the `v2` run command in the final summary.
10. List missing client assets/content (e.g. logo, exact product/category names, verified descriptions, official address/map URL, contact details, form backend).

Implement the actual working React + Vite page, not just a design proposal. Keep the design fresh and distinctive while protecting the existing implementation.
