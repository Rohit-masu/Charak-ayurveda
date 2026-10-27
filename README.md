# Charak Ayurveda — landing page

React 18 + Vite + Tailwind, animated with GSAP (ScrollTrigger, SplitText) and Lenis smooth scroll.

```bash
npm install
npm run dev      # http://localhost:5174
npm run lint
npm run build    # static files in dist/ — upload to Hostinger public_html
```

Run these with Node from inside WSL (nvm), not the Windows install — `node_modules` built on one
OS will not run on the other.

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
certifications or testimonials unless the client supplies them — see `docs/brand-brief.md` for the
full compliance rules. The contact details in `site.js` still need client confirmation. The enquiry
form opens WhatsApp with a prefilled message; there is no form backend yet.

The previous v1 site and the earlier v2 draft are preserved under the `v1-archive` git tag.
