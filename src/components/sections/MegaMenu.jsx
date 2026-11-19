import { ArrowUpRight } from "lucide-react";
import { audienceIcons } from "../ui/audienceIcons";
import { products, productVars } from "../../data/products";
import { audiences } from "../../data/site";

const intro = {
  products: ["The Products", "Rati Shakti for men and for women, from Charak Ayurveda. More formulations are on the way."],
  associate: ["Associate with us", "Doctors, chemists and distributors: choose your path."],
};

function Intro({ id, onGo, href }) {
  const [title, text] = intro[id];
  return (
    <div className="flex flex-col justify-between border-r border-charcoal/10 pr-10">
      <div>
        <p className="font-display text-4xl font-light text-charcoal">{title}</p>
        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-charcoal/60">{text}</p>
      </div>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onGo(href);
        }}
        className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze-dark"
      >
        View section
        <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
      </a>
    </div>
  );
}

// Desktop hover panel under the navbar. `active` is the nav item's `menu` key.
export default function MegaMenu({ active, onGo, onOpenProduct, onChooseType }) {
  if (!active || !intro[active]) return null;
  const href = `#${active}`;

  return (
    <div className="shell grid grid-cols-[260px_1fr] gap-10 py-10">
      <Intro id={active} href={href} onGo={onGo} />

      {active === "products" && (
        <ul className="grid grid-cols-4 gap-4">
          {products.map((p) => (
            <li key={p.id} data-mega-item style={productVars(p)}>
              <button
                type="button"
                onClick={() => onOpenProduct(p, 0)}
                className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-sandstone bg-sand text-left transition-colors duration-700 hover:border-bronze/60"
              >
                <span className="relative block aspect-square overflow-hidden">
                  <img
                    src={p.images.light}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-lux group-hover/card:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--p-deep)] transition-transform duration-700 ease-lux group-hover/card:scale-x-100" />
                </span>
                <span className="block p-5">
                  <span className="label block text-[9.5px] text-bronze-dark">
                    {p.numeral} — {p.category}
                  </span>
                  <span className="mt-1.5 block font-display text-xl leading-tight text-charcoal">{p.name}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active === "associate" && (
        <ul className="grid grid-cols-3 gap-4">
          {audiences.map((a) => {
            const Icon = audienceIcons[a.icon];
            return (
              <li key={a.who} data-mega-item>
                <button
                  type="button"
                  onClick={() => onChooseType(a.type)}
                  className="group/aud flex h-full w-full flex-col rounded-3xl border border-charcoal/10 p-6 text-left transition-colors duration-500 hover:border-bronze/50 hover:bg-sand"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-bronze/40 text-bronze-dark transition-colors duration-500 group-hover/aud:bg-charcoal group-hover/aud:text-bronze">
                    <Icon size={20} strokeWidth={1.3} />
                  </span>
                  <span className="mt-6 font-display text-2xl leading-tight text-charcoal">{a.who}</span>
                  <span className="mt-2 text-sm leading-relaxed text-charcoal/60">{a.text}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze-dark">
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
