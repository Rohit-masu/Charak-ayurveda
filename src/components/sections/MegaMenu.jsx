import { ArrowUpRight } from "lucide-react";
import HerbIcon from "../ui/HerbIcons";
import { audienceIcons } from "../ui/audienceIcons";
import { botanicals, products } from "../../data/products";
import { audiences } from "../../data/site";

const intro = {
  collection: ["The Collection", "Four formats of Rati Shakti — capsules, oil, majun and the Maharaja kit."],
  botanicals: ["The Botanicals", "Nine botanicals named across the labels of the range."],
  professionals: ["For Professionals", "Doctors, chemists and distributors — choose your path."],
};

function Intro({ id, onGo, href }) {
  const [title, text] = intro[id];
  return (
    <div className="flex flex-col justify-between border-r border-ivory/10 pr-10">
      <div>
        <p className="font-display text-4xl font-light text-ivory">{title}</p>
        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-ivory/55">{text}</p>
      </div>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onGo(href);
        }}
        className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold"
      >
        View section
        <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
      </a>
    </div>
  );
}

// Desktop hover panel under the navbar. `active` is the nav item's `menu` key.
export default function MegaMenu({ active, onGo, onOpenProduct, onChooseType }) {
  if (!active) return null;
  const href = `#${active}`;

  return (
    <div className="shell grid grid-cols-[260px_1fr] gap-10 py-10">
      <Intro id={active} href={href} onGo={onGo} />

      {active === "collection" && (
        <ul className="grid grid-cols-4 gap-4">
          {products.map((p, i) => (
            <li key={p.id} data-mega-item>
              <button
                type="button"
                onClick={() => onOpenProduct(p, 0)}
                className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-ivory/10 bg-ivory/[0.03] p-5 text-left transition-colors duration-700 hover:border-gold/40"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-gold/25 via-forest-light to-forest-light transition-transform duration-700 ease-lux group-hover/card:scale-y-100" />
                <span className="relative block h-36">
                  <img
                    src={p.packs[0].image}
                    alt=""
                    className="h-full w-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-lux group-hover/card:-translate-y-2 group-hover/card:scale-110"
                  />
                </span>
                <span className="label relative mt-4 text-[9.5px] text-gold">
                  {p.numeral} — {p.category}
                </span>
                <span className="relative mt-1.5 font-display text-xl leading-tight text-ivory">{p.name}</span>
                <span className="relative mt-auto pt-3 text-xs text-ivory/45 transition-colors group-hover/card:text-ivory/80">
                  {i === 0 ? `${p.packs.length} packs` : p.packs[0].label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active === "botanicals" && (
        <ul className="grid grid-cols-3 gap-x-6 gap-y-2">
          {botanicals.map((b) => (
            <li key={b.name} data-mega-item>
              <a
                href="#botanicals"
                onClick={(e) => {
                  e.preventDefault();
                  onGo("#botanicals");
                }}
                className="group/herb flex items-center gap-4 rounded-2xl p-3 transition-colors duration-500 hover:bg-ivory/[0.05]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 p-2 text-gold transition-colors duration-500 group-hover/herb:bg-gold group-hover/herb:text-ink">
                  <HerbIcon name={b.name} className="h-full w-full" />
                </span>
                <span>
                  <span className="block font-display text-xl text-ivory">{b.name}</span>
                  <span className="block font-deva text-sm text-gold/70">{b.deva}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {active === "professionals" && (
        <ul className="grid grid-cols-3 gap-4">
          {audiences.map((a) => {
            const Icon = audienceIcons[a.icon];
            return (
              <li key={a.who} data-mega-item>
                <button
                  type="button"
                  onClick={() => onChooseType(a.type)}
                  className="group/aud flex h-full w-full flex-col rounded-3xl border border-ivory/10 p-6 text-left transition-colors duration-500 hover:border-gold/40 hover:bg-ivory/[0.04]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover/aud:bg-gold group-hover/aud:text-ink">
                    <Icon size={20} strokeWidth={1.3} />
                  </span>
                  <span className="mt-6 font-display text-2xl leading-tight text-ivory">{a.who}</span>
                  <span className="mt-2 text-sm leading-relaxed text-ivory/55">{a.text}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    Start an enquiry <ArrowUpRight size={14} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
