# Charak Ayurveda — v2 landing page

React 18 + Vite + Tailwind, animated with GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

```bash
cd new-project
npm install
npm run dev      # http://localhost:5174
npm run build    # static files in dist/ — upload to Hostinger public_html
```

## Where to edit

| What | File |
| --- | --- |
| Brand copy, contact details, nav, FAQ, disclaimer | `src/data/site.js` |
| Products, packs, ingredients, botanicals | `src/data/products.js` |
| Colours and fonts | `tailwind.config.js` |
| Product images (WebP, transparent) | `src/assets/img/` |

Page order lives in `src/App.jsx`. Reusable animation pieces (split text, scroll-velocity marquee,
scroll reveal, magnet, circular text, spotlight card, cursor) are in `src/components/bits/`.

## Content rules

Product wording comes only from what is printed on the packs. Do not add benefits, prices,
certifications or testimonials unless the client supplies them. The contact details in
`site.js` are carried over from v1 and still need client confirmation. The enquiry form opens
WhatsApp with a prefilled message; there is no form backend yet.
