import { useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { productEnquiryUrl } from "../../lib/whatsapp";
import { images, products } from "../../data/products";

// Light tinted panels; `scene` washes the hover photo back into the panel colour.
const tones = {
  forest: {
    panel: "bg-mist",
    glow: "rgba(47,106,76,0.25)",
    scene: "radial-gradient(circle at 50% 55%, rgba(212,228,204,0.25), rgba(212,228,204,0.92) 75%)",
  },
  amber: {
    panel: "bg-[#E3EBCF]",
    glow: "rgba(214,142,60,0.3)",
    scene: "radial-gradient(circle at 50% 55%, rgba(227,235,207,0.25), rgba(227,235,207,0.93) 75%)",
  },
  moss: {
    panel: "bg-card",
    glow: "rgba(201,164,92,0.3)",
    scene: "radial-gradient(circle at 50% 55%, rgba(244,249,240,0.25), rgba(244,249,240,0.92) 75%)",
  },
  noir: {
    panel: "bg-[#DCE8D7]",
    glow: "rgba(201,164,92,0.35)",
    scene: "radial-gradient(circle at 50% 55%, rgba(220,232,215,0.25), rgba(220,232,215,0.93) 75%)",
  },
};

// Hover scene behind the product: the product's own video if supplied, otherwise a slow-panning botanical still.
function StageScene({ product, tone, videoRef }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-lux group-hover/panel:opacity-100 group-focus-within/panel:opacity-100"
    >
      {product.video ? (
        <video ref={videoRef} src={product.video} muted loop playsInline preload="none" className="h-full w-full object-cover" />
      ) : (
        <img
          src={images.garden}
          alt=""
          loading="lazy"
          className="h-full w-full scale-110 object-cover group-hover/panel:animate-[ken-burns_14s_ease-in-out_infinite_alternate]"
        />
      )}
      <div className="absolute inset-0" style={{ background: tone.scene }} />
    </div>
  );
}

function IngredientOrbit({ items }) {
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
              <span className="block animate-[spin-slow_60s_linear_infinite_reverse] whitespace-nowrap rounded-full border border-gold/50 bg-card/85 px-3 py-1.5 font-display text-sm italic text-forest shadow-sm backdrop-blur">
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
  const video = useRef(null);
  const tone = tones[index === 2 ? "moss" : product.tone];
  const current = product.packs[pack];

  return (
    <article
      data-panel
      onPointerEnter={() => video.current?.play().catch(() => {})}
      onPointerLeave={() => video.current?.pause()}
      className={`group/panel relative flex shrink-0 flex-col overflow-hidden rounded-[32px] border border-gold/25 shadow-[0_30px_60px_-35px_rgba(11,42,29,0.35)] ${tone.panel} lg:h-[80vh] lg:w-[86vw] lg:max-w-[1320px] lg:flex-row`}
    >
      {/* image stage */}
      <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden lg:h-full lg:w-[52%]">
        <StageScene product={product} tone={tone} videoRef={video} />
        <span
          aria-hidden="true"
          className="absolute -left-4 top-1/2 -translate-y-1/2 select-none font-display text-[46vw] font-light leading-none text-transparent transition-opacity duration-700 group-hover/panel:opacity-0 lg:text-[24vw]"
          style={{ WebkitTextStroke: "1px rgba(127,97,40,0.25)" }}
        >
          {product.numeral}
        </span>
        <div
          aria-hidden="true"
          className="absolute inset-[12%] rounded-full blur-2xl"
          style={{ background: `radial-gradient(circle, ${tone.glow}, transparent 70%)` }}
        />
        <IngredientOrbit items={product.ingredients} />
        <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-1000 ease-lux group-hover/panel:-translate-y-3 group-hover/panel:scale-[1.06]">
          <div data-parallax className="flex h-full w-full items-center justify-center">
            <img
              key={current.image}
              src={current.image}
              alt={`${product.name} — ${current.label}`}
              loading="lazy"
              className="max-h-[300px] w-auto max-w-[70%] animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)] object-contain drop-shadow-[0_35px_35px_rgba(11,42,29,0.28)] lg:max-h-[54vh]"
            />
          </div>
        </div>
      </div>

      {/* details */}
      <div className="relative flex flex-1 flex-col justify-between gap-6 border-t border-ink/10 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-10 [@media(min-width:1024px)_and_(max-height:820px)]:py-7">
        <div>
          <div className="flex items-center justify-between">
            <p className="label text-gold-dark">
              {product.numeral} — {product.category}
            </p>
            <p className="label text-ink/45">0{index + 1} / 0{products.length}</p>
          </div>
          <h3 className="mt-5 font-display text-[clamp(2.2rem,min(3.4vw,6.4vh),3.8rem)] font-light leading-[0.98] text-forest">
            {product.name}
          </h3>
          <p className="mt-3 font-display text-xl italic text-gold-dark xl:text-2xl">{product.line}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {product.labels.map((l) => (
              <li key={l} className="rounded-full border border-ink/15 bg-card/60 px-3.5 py-1.5 text-[11px] tracking-wide text-ink/75">
                {l}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="label text-ink/45">Ingredients</p>
            <p className="mt-2 font-display text-lg leading-snug text-ink/85 xl:text-xl">{product.ingredients.join("  ·  ")}</p>
          </div>
        </div>

        <div className="space-y-5">
          {product.packs.length > 1 && (
            <div>
              <p className="label text-ink/45">Pack · {current.label}</p>
              <div className="mt-3 flex gap-2" role="group" aria-label={`${product.name} packs`}>
                {product.packs.map((p, i) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPack(i)}
                    aria-pressed={i === pack}
                    aria-label={p.label}
                    className={`grid h-14 w-12 place-items-center rounded-2xl border transition-all duration-500 ${
                      i === pack ? "border-gold-dark bg-card" : "border-ink/10 hover:border-ink/30"
                    }`}
                  >
                    <img src={p.image} alt="" loading="lazy" className="max-h-10 max-w-9 object-contain" />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpen(product, pack)}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-forest pl-6 pr-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors duration-500 hover:bg-gold hover:text-ink"
            >
              View details
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-90">
                <Plus size={15} />
              </span>
            </button>
            <a
              href={productEnquiryUrl(product.name, current.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark"
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
      const distance = () => track.scrollWidth - window.innerWidth;
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
          { xPercent: 14, rotate: 4 },
          {
            xPercent: -8,
            rotate: -2,
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
    <section ref={ref} id="collection" className="relative overflow-hidden bg-paper-deep py-24 lg:flex lg:h-screen lg:items-center lg:py-0">
      <div data-track className="flex flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:pl-14 lg:pr-[7vw]">
        {/* intro panel */}
        <div className="flex shrink-0 flex-col justify-between pb-8 lg:h-[78vh] lg:w-[34vw] lg:pb-0">
          <div>
            <p className="label text-gold-dark">Chapter 02 — The Collection</p>
            <SplitText className="display mt-8 text-[clamp(3.2rem,7vw,7.5rem)] text-forest">
              Four formats.
              <br />
              <em className="gold-text font-normal">One tradition.</em>
            </SplitText>
          </div>
          <img
            src={images.lineupGreen}
            alt="Rati Shakti capsule bottles in four sizes"
            width="1400"
            height="981"
            loading="lazy"
            className="mt-8 w-full max-w-md drop-shadow-[0_25px_30px_rgba(11,42,29,0.25)] lg:mt-0"
          />
          <div className="mt-8 max-w-sm space-y-6 lg:mt-0">
            <p className="text-[15px] leading-relaxed text-ink/65">
              Capsules, a massage oil, a classical majun and the Maharaja kit — each named Rati Shakti, each made by Charak
              Ayurveda.
            </p>
            <p className="label hidden items-center gap-3 text-ink/45 lg:flex">
              Keep scrolling <span className="h-px w-10 bg-gold-dark" />
            </p>
          </div>
        </div>

        {products.map((p, i) => (
          <ProductPanel key={p.id} product={p} index={i} onOpen={onOpen} />
        ))}
      </div>

      <div className="absolute bottom-8 left-14 right-14 hidden h-px bg-ink/10 lg:block">
        <span data-progress className="block h-full origin-left scale-x-0 bg-gold-dark" />
      </div>
    </section>
  );
}
