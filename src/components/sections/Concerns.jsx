import { Baby, Bone, Brain, Droplets, Flame, PersonStanding, Salad, Scale } from "lucide-react";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, scrollToHash, useGsap } from "../../lib/motion";
import { concerns, productsFor } from "../../data/products";

const icons = {
  flame: Flame,
  digestive: Salad,
  joint: Bone,
  energy: Brain,
  balance: PersonStanding,
  hair: Droplets,
  kids: Baby,
  weight: Scale,
};

// "Shop by concern": forest roundels from data/products.js `concerns`.
// One product opens its details, several scroll to the collection, none shows "Coming soon".
export default function Concerns({ onOpen }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-concern]"), {
      y: 40,
      opacity: 0,
      stagger: 0.06,
      scrollTrigger: { trigger: el.querySelector("[data-concerns]"), start: "top 85%", once: true },
    });
  });

  const choose = (list) => (list.length === 1 ? onOpen(list[0], 0) : scrollToHash("#collection"));

  return (
    <section ref={ref} id="concerns" className="bg-ivory-deep py-24 text-ink sm:py-32">
      <div className="shell text-center">
        <p className="label text-gold-dark">Shop by concern</p>
        <SplitText className="display mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,4.6vw,4.6rem)] text-forest">
          Ayurvedic wellness, <em className="font-normal italic text-gold-dark">by concern.</em>
        </SplitText>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">
          Find Charak Ayurveda formulations for the wellness needs that matter to you. More ranges are on the way.
        </p>

        <ul data-concerns className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-4 lg:grid-cols-8">
          {concerns.map((c) => {
            const Icon = icons[c.icon];
            const list = productsFor(c);
            const live = list.length > 0;
            return (
              <li key={c.id} data-concern>
                <button
                  type="button"
                  disabled={!live}
                  onClick={() => choose(list)}
                  className="group mx-auto flex flex-col items-center disabled:cursor-default"
                >
                  <span
                    className={`grid aspect-square w-28 place-items-center rounded-full outline-dashed outline-1 outline-offset-[5px] transition-[transform,outline-offset,background-color] duration-700 ease-lux sm:w-32 ${
                      live
                        ? "bg-forest text-ivory outline-gold/70 group-hover:-translate-y-1.5 group-hover:bg-forest-light group-hover:outline-offset-[9px]"
                        : "bg-forest/70 text-ivory/70 outline-gold/40"
                    }`}
                  >
                    <Icon size={44} strokeWidth={1.25} className={live ? "transition-transform duration-700 ease-lux group-hover:scale-110" : ""} />
                  </span>
                  <span className="mt-5 font-display text-xl leading-tight text-forest">{c.label}</span>
                  <span className={`mt-1 text-xs ${live ? "text-ink/50 group-hover:text-gold-dark" : "text-gold-dark/80"}`}>
                    {live ? `${list.length} ${list.length === 1 ? "product" : "products"}` : "Coming soon"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
