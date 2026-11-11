import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { formats } from "../../data/products";

// "Shop by format": one forest roundel per product format, opening that product's details.
export default function Formats({ onOpen }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-format]"), {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: el.querySelector("[data-formats]"), start: "top 85%", once: true },
    });
  });

  return (
    <section ref={ref} id="formats" className="bg-white py-24 text-ink sm:py-32">
      <div className="shell text-center">
        <p className="label text-gold-dark">Shop by format</p>
        <SplitText className="display mx-auto mt-6 max-w-3xl text-[clamp(2.4rem,4.6vw,4.6rem)] text-forest">
          Find your <em className="gold-text font-normal">Rati Shakti.</em>
        </SplitText>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">
          Capsules, a massage oil, a classical majun and the Maharaja kit. Tap a format to see its packs and ingredients.
        </p>

        <ul data-formats className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {formats.map((f) => (
            <li key={f.id} data-format>
              <button type="button" onClick={() => onOpen(f.product, 0)} className="group mx-auto flex flex-col items-center">
                <span className="relative block aspect-square w-36 shrink-0 rounded-full bg-forest outline-dashed outline-1 outline-offset-[6px] outline-gold/70 transition-[transform,outline-offset] duration-700 ease-lux group-hover:-translate-y-1.5 group-hover:outline-offset-[10px] sm:w-44">
                  <span
                    aria-hidden="true"
                    className="absolute inset-[12%] rounded-full opacity-70 blur-xl"
                    style={{ background: "radial-gradient(circle, rgba(201,164,92,0.45), transparent 70%)" }}
                  />
                  <img
                    src={f.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-[14%] h-[72%] w-[72%] object-contain drop-shadow-[0_14px_14px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-lux group-hover:scale-110"
                  />
                </span>
                <span className="mt-6 font-display text-2xl text-forest">{f.label}</span>
                <span className="mt-1 text-xs text-ink/50 transition-colors group-hover:text-gold-dark">{f.product.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
