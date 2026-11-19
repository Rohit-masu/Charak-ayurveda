import { ArrowUpRight, Plus } from "lucide-react";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { comboEnquiryUrl } from "../../lib/whatsapp";
import { combos } from "../../data/products";

const rupees = (n) => `₹${n.toLocaleString("en-IN")}`;
const discount = ({ price, mrp }) => (price != null && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

function Price({ combo }) {
  if (combo.price == null) return <p className="font-display text-2xl text-charcoal">Price on request</p>;
  return (
    <p className="flex items-baseline gap-3">
      <span className="font-display text-3xl text-charcoal">{rupees(combo.price)}</span>
      {discount(combo) > 0 && <span className="text-sm text-charcoal/45 line-through">{rupees(combo.mrp)}</span>}
    </p>
  );
}

function ComboCard({ combo }) {
  const off = discount(combo);

  return (
    <article
      data-combo
      className="group flex flex-col overflow-hidden rounded-[28px] border border-bronze/25 bg-sand shadow-[0_30px_60px_-45px_rgba(30,28,26,0.4)] transition-[transform,border-color] duration-700 ease-lux hover:-translate-y-1.5 hover:border-bronze/60"
    >
      <div className="relative flex h-64 items-end justify-center gap-2 overflow-hidden bg-charcoal px-6 pb-6 pt-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-[15%] inset-y-[10%] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(179,144,95,0.35), transparent 70%)" }}
        />
        {off > 0 && (
          <span className="absolute left-5 top-5 rounded-full bg-bronze px-3 py-1 text-[11px] font-semibold tracking-wide text-charcoal">
            {off}% off
          </span>
        )}
        {combo.items.map(({ product, pack }, i) => (
          <img
            key={product.id}
            src={product.packs[pack].image}
            alt={`${product.name} — ${product.packs[pack].label}`}
            loading="lazy"
            className={`relative max-h-full w-auto max-w-[46%] object-contain drop-shadow-[0_20px_18px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-lux ${
              i === 0 ? "group-hover:-translate-x-1 group-hover:-rotate-3" : "group-hover:translate-x-1 group-hover:rotate-3"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-[1.7rem] leading-tight text-charcoal">{combo.name}</h3>
        <ul className="mt-4 space-y-2 border-t border-charcoal/10 pt-4">
          {combo.items.map(({ product, pack }, i) => (
            <li key={product.id} className="flex items-start gap-3 text-sm text-charcoal/70">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-bronze/50 text-bronze-dark">
                {i === 0 ? <span className="h-1 w-1 rounded-full bg-current" /> : <Plus size={11} />}
              </span>
              <span>
                {product.name}
                <span className="block text-xs text-charcoal/45">{product.packs[pack].label}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
          <Price combo={combo} />
          <a
            href={comboEnquiryUrl(combo)}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-charcoal pl-5 pr-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-bronze hover:text-charcoal"
          >
            Order on WhatsApp
            <span className="grid h-8 w-8 place-items-center rounded-full bg-bronze text-charcoal transition-transform duration-500 group-hover/btn:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Combos() {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-combo]"), {
      y: 60,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: el.querySelector("[data-combos]"), start: "top 85%", once: true },
    });
  });

  if (!combos.length) return null;

  return (
    <section ref={ref} id="combos" className="bg-ivory py-24 text-charcoal sm:py-32">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-bronze-dark">Combos</p>
            <SplitText className="display mt-6 text-[clamp(2.6rem,5vw,5.2rem)] text-charcoal">
              Better <em className="font-normal italic text-bronze-dark">together.</em>
            </SplitText>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-charcoal/60 lg:col-span-4 lg:col-start-9">
            Two formats from the Rati Shakti range, packed as one order. Message us on WhatsApp to order or to ask about
            availability.
          </p>
        </div>

        <div data-combos className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {combos.map((c) => (
            <ComboCard key={c.id} combo={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
