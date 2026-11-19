import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { productEnquiryUrl } from "../../lib/whatsapp";
import { products, productVars } from "../../data/products";
import { site } from "../../data/site";

const words = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const countWord = (n) => words[n] || String(n);
const names = new Intl.ListFormat("en", { type: "conjunction" }).format(products.map((p) => p.name));

// Rings the product's ingredients on hover. Renders nothing until the client supplies ingredients.
function IngredientOrbit({ items }) {
  if (!items.length) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-[8%] z-20 scale-90 opacity-0 transition-all duration-1000 ease-lux group-hover/panel:scale-100 group-hover/panel:opacity-100"
    >
      <div className="relative h-full w-full animate-[spin-slow_60s_linear_infinite]">
        {items.map((name, i) => {
          const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + Math.cos(a) * 46}%`, top: `${50 + Math.sin(a) * 46}%` }}
            >
              <span className="block animate-[spin-slow_60s_linear_infinite_reverse] whitespace-nowrap rounded-full border border-ivory/20 bg-black/50 px-3 py-1.5 font-display text-sm italic text-[color:var(--p-accent)] backdrop-blur">
                {name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ProductPanel({ product, index, onOpen }) {
  const [pack, setPack] = useState(0);
  const current = product.packs[pack];
  const hasDetails = product.labels.length > 0 || product.ingredients.length > 0;

  return (
    <article
      data-panel
      style={productVars(product)}
      className="group/panel relative flex shrink-0 flex-col overflow-hidden rounded-[32px] bg-[var(--p-deep)] text-ivory shadow-[0_50px_90px_-50px_rgba(30,28,26,0.7)] lg:h-[80vh] lg:w-[min(86vw,1320px)] lg:flex-row"
    >
      {/* photo stage */}
      <div className="relative h-[440px] overflow-hidden sm:h-[560px] lg:h-full lg:w-[52%]">
        <div data-parallax className="absolute inset-[-6%]">
          <img
            key={current.image}
            src={current.image}
            alt={`${product.name}${current.label ? ` — ${current.label}` : ""}${product.concept ? " (concept visual)" : ""}`}
            loading="lazy"
            className="h-full w-full animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)] object-cover transition-transform duration-[1400ms] ease-lux group-hover/panel:scale-[1.05]"
            style={{ objectPosition: "50% 72%" }}
          />
        </div>
        <IngredientOrbit items={product.ingredients} />
        {/* soften the seam into the details column */}
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-r from-transparent to-[var(--p-deep)] lg:block" />
        {product.concept && (
          <p className="absolute bottom-5 left-5 rounded-full border border-ivory/15 bg-black/30 px-3 py-1.5 text-[10px] tracking-wide text-ivory/70 backdrop-blur">
            {site.conceptNote}
          </p>
        )}
      </div>

      {/* details */}
      <div className="relative flex flex-1 flex-col justify-between gap-6 overflow-hidden p-7 sm:p-10 lg:px-12 lg:py-10 [@media(min-width:1024px)_and_(max-height:820px)]:py-7">
        {/* hover texture */}
        <div aria-hidden="true" className="absolute inset-0 opacity-25 transition-opacity duration-1000 ease-lux group-hover/panel:opacity-60">
          <img
            src={product.images.scene}
            alt=""
            loading="lazy"
            className="h-full w-full scale-105 object-cover group-hover/panel:animate-[ken-burns_14s_ease-in-out_infinite_alternate]"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, var(--p-deep) 15%, color-mix(in srgb, var(--p-deep) 70%, transparent) 55%, transparent)" }}
          />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[18rem] font-light leading-none text-transparent"
          style={{ WebkitTextStroke: "1px color-mix(in srgb, var(--p-accent) 28%, transparent)" }}
        >
          {product.numeral}
        </span>

        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="label text-[color:var(--p-accent)]">
              {product.numeral} — {product.category}
            </p>
            <p className="label text-ivory/40">
              0{index + 1} / 0{products.length}
            </p>
          </div>
          <h3 className="mt-5 font-display text-[clamp(2.4rem,min(3.8vw,7vh),4.2rem)] font-light leading-[0.98] text-ivory">{product.name}</h3>
          {product.line && <p className="mt-4 max-w-md font-display text-xl italic text-[color:var(--p-accent)] xl:text-2xl">{product.line}</p>}

          {product.labels.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.labels.map((l) => (
                <li key={l} className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-[11px] tracking-wide text-ivory/75">
                  {l}
                </li>
              ))}
            </ul>
          )}

          {product.ingredients.length > 0 && (
            <div className="mt-7">
              <p className="label text-ivory/40">Ingredients</p>
              <p className="mt-2 font-display text-lg leading-snug text-ivory/90 xl:text-xl">{product.ingredients.join("  ·  ")}</p>
            </div>
          )}

          {!hasDetails && (
            <p className="mt-8 max-w-sm border-t border-ivory/10 pt-6 text-sm leading-relaxed text-ivory/60">
              Ingredients, directions and pack sizes will be listed here from the label. Until then, ask us on WhatsApp.
            </p>
          )}
        </div>

        <div className="relative space-y-5">
          {product.packs.length > 1 && (
            <div>
              <p className="label text-ivory/40">Pack · {current.label}</p>
              <div className="mt-3 flex gap-2" role="group" aria-label={`${product.name} packs`}>
                {product.packs.map((p, i) => (
                  <button
                    key={p.label || i}
                    type="button"
                    onClick={() => setPack(i)}
                    aria-pressed={i === pack}
                    aria-label={p.label || `Pack ${i + 1}`}
                    className={`grid h-14 w-12 place-items-center overflow-hidden rounded-2xl border transition-all duration-500 ${
                      i === pack ? "border-[color:var(--p-accent)]" : "border-ivory/10 hover:border-ivory/30"
                    }`}
                  >
                    <img src={p.light || p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpen(product, pack)}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ivory pl-6 pr-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors duration-500 hover:bg-[var(--p-accent)]"
            >
              View details
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--p-deep)] text-[color:var(--p-accent)] transition-transform duration-500 group-hover:rotate-90">
                <Plus size={15} />
              </span>
            </button>
            <a
              href={productEnquiryUrl(product.name, current.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--p-accent)]"
            >
              Enquire
              <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Collection({ onOpen }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = el.querySelector("[data-track]");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const scroll = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
      el.querySelectorAll("[data-panel]").forEach((panel) => {
        gsap.fromTo(
          panel.querySelector("[data-parallax]"),
          { xPercent: 5 },
          {
            xPercent: -5,
            ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
          }
        );
      });
    });
    mm.add("(max-width: 1023px)", () => {
      el.querySelectorAll("[data-panel]").forEach((panel) => {
        gsap.from(panel, { y: 80, opacity: 0, scrollTrigger: { trigger: panel, start: "top 85%", once: true } });
      });
    });
  });

  return (
    <section ref={ref} id="products" className="relative overflow-hidden bg-ivory py-24 text-charcoal lg:flex lg:h-screen lg:items-center lg:py-0">
      <div data-track className="flex flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pl-14 lg:pr-[7vw]">
        {/* intro panel */}
        <div className="flex shrink-0 flex-col justify-between gap-8 pb-8 lg:h-[78vh] lg:w-[34vw] lg:pb-0">
          <div>
            <p className="label text-bronze-dark">Chapter 02 — The Products</p>
            <SplitText className="display mt-8 text-[clamp(3.2rem,6.4vw,7rem)] text-charcoal">
              {countWord(products.length)} formulations.
              <br />
              <em className="font-normal italic text-bronze-dark">One tradition.</em>
            </SplitText>
          </div>

          <ul className="flex gap-4">
            {products.slice(0, 3).map((p) => (
              <li key={p.id} className="w-full max-w-[11rem]">
                <button type="button" onClick={() => onOpen(p, 0)} className="group block w-full text-left">
                  <span className="block aspect-[4/5] overflow-hidden arch border border-sandstone bg-sand">
                    <img
                      src={p.images.light}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-3 block font-display text-lg leading-tight text-charcoal transition-colors group-hover:text-bronze-dark">
                    {p.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="max-w-sm space-y-6">
            <p className="text-[15px] leading-relaxed text-charcoal/65">{names}, each made by Charak Ayurveda.</p>
            <p className="label hidden items-center gap-3 text-charcoal/40 lg:flex">
              Keep scrolling <span className="h-px w-10 bg-bronze" />
            </p>
          </div>
        </div>

        {products.map((p, i) => (
          <ProductPanel key={p.id} product={p} index={i} onOpen={onOpen} />
        ))}
      </div>

      <div className="absolute bottom-8 left-14 right-14 hidden h-px bg-charcoal/10 lg:block">
        <span data-progress className="block h-full origin-left scale-x-0 bg-bronze" />
      </div>
    </section>
  );
}
