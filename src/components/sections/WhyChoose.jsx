import { BookOpen, Handshake, Leaf, ScrollText, Sprout, Stethoscope } from "lucide-react";
import SplitText from "../bits/SplitText";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { reasons, site } from "../../data/site";

const icons = { book: BookOpen, leaf: Leaf, sprout: Sprout, scroll: ScrollText, stethoscope: Stethoscope, handshake: Handshake };

export default function WhyChoose() {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-reason]"), {
      y: 50,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: el.querySelector("[data-reasons]"), start: "top 85%", once: true },
    });
  });

  return (
    <section ref={ref} id="why" className="bg-ivory-deep py-24 text-ink sm:py-32">
      <div className="shell">
        <div className="text-center">
          <p className="label text-gold-dark">Why {site.brand}</p>
          <SplitText className="display mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,4.6vw,4.6rem)] text-forest">
            Why choose <em className="gold-text font-normal">Charak Ayurveda?</em>
          </SplitText>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink/60">
            A classical Ayurvedic tradition, carried into a focused range made for everyday life.
          </p>
        </div>

        <ul data-reasons className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => {
            const Icon = icons[r.icon];
            return (
              <li
                key={r.title}
                data-reason
                className="group rounded-[24px] border border-gold/20 bg-white p-8 transition-[transform,border-color,box-shadow] duration-700 ease-lux hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_30px_50px_-35px_rgba(11,42,29,0.4)] sm:p-9"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold-dark transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold">
                  <Icon size={24} strokeWidth={1.3} />
                </span>
                <h3 className="mt-7 font-display text-[1.7rem] leading-tight text-forest">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{r.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
