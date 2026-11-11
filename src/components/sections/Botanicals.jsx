import { useEffect, useRef, useState } from "react";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { botanicals, productsWith } from "../../data/products";

export default function Botanicals() {
  const preview = useRef(null);
  const [active, setActive] = useState(null);
  const activeProducts = active === null ? [] : productsWith(botanicals[active]);

  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-row]"), {
      y: 50,
      opacity: 0,
      stagger: 0.06,
      scrollTrigger: { trigger: el.querySelector("[data-rows]"), start: "top 80%", once: true },
    });
  });

  // Floating preview that trails the cursor across the list.
  useEffect(() => {
    const el = preview.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    gsap.to(preview.current, {
      scale: active === null ? 0 : 1,
      opacity: active === null ? 0 : 1,
      duration: 0.6,
      ease: "expo.out",
    });
  }, [active]);

  return (
    <section ref={ref} id="botanicals" className="relative bg-ivory-deep py-28 text-ink sm:py-40">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-gold-dark">Chapter 03 — The Botanicals</p>
            <SplitText className="display mt-8 text-[clamp(3rem,6.5vw,7rem)]">
              Read from
              <br />
              <em className="font-normal italic text-gold-dark">the label.</em>
            </SplitText>
          </div>
          <p className="self-end text-[15px] leading-relaxed text-ink/60 lg:col-span-4 lg:col-start-9">
            Nine botanicals named across the Rati Shakti range. Hover over each one to see which formulations list it.
          </p>
        </div>

        <ul data-rows className="mt-20 border-t border-ink/15" onPointerLeave={() => setActive(null)}>
          {botanicals.map((b, i) => {
            const used = productsWith(b);
            return (
              <li
                key={b.name}
                data-row
                onPointerEnter={() => setActive(i)}
                className="group relative grid cursor-default grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-ink/15 py-6 sm:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-lux group-hover:scale-y-100"
                />
                <span className="relative col-span-2 font-sans text-xs text-ink/40 transition-colors duration-500 group-hover:text-gold sm:col-span-1 sm:pl-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative col-span-10 font-display text-[clamp(2rem,4.6vw,4.4rem)] font-light leading-none transition-[color,transform] duration-700 ease-lux group-hover:translate-x-3 group-hover:text-ivory sm:col-span-5">
                  {b.name}
                </span>
                <span className="relative col-span-6 col-start-3 font-deva text-xl text-gold-dark transition-colors duration-500 group-hover:text-gold sm:col-span-2 sm:col-start-auto">
                  {b.deva}
                </span>
                <span className="relative col-span-4 text-right font-display text-lg italic text-ink/50 transition-colors duration-500 group-hover:text-ivory/60 sm:col-span-2 sm:text-left">
                  {b.latin}
                </span>
                <span className="relative col-span-10 col-start-3 text-xs uppercase tracking-[0.18em] text-ink/45 transition-colors duration-500 group-hover:text-ivory/70 sm:col-span-2 sm:col-start-auto sm:pr-4 sm:text-right">
                  {used.length} {used.length === 1 ? "formulation" : "formulations"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* cursor preview */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden opacity-0 [@media(pointer:fine)]:block"
        style={{ transform: "scale(0)" }}
      >
        <div className="-translate-y-1/2 translate-x-10 rounded-[24px] border border-gold/30 bg-forest p-4 shadow-2xl">
          <div className="flex items-end gap-3">
            {activeProducts.map((p) => (
              <figure key={p.id} className="flex w-24 flex-col items-center">
                <img src={p.packs[0].image} alt="" className="h-28 w-auto object-contain" />
                <figcaption className="mt-2 text-center text-[10px] leading-tight text-ivory/70">{p.category}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
