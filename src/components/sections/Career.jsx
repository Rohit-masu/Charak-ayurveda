import { MapPin } from "lucide-react";
import SplitText from "../bits/SplitText";
import ArrowLink from "../ui/ArrowLink";
import { gsap, prefersReducedMotion, scrollToHash, useGsap } from "../../lib/motion";
import { careerType, careers } from "../../data/site";

// "Career": MR recruitment. Openings come from `careers.roles` in data/site.js and stay hidden while empty.
export default function Career({ onChooseType }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-career-step]"), {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: el.querySelector("[data-career-steps]"), start: "top 85%", once: true },
    });
  });

  const apply = () => {
    onChooseType(careerType);
    scrollToHash("#connect");
  };

  return (
    <section ref={ref} id="career" className="relative overflow-hidden bg-ivory py-28 text-charcoal sm:py-40">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-16 select-none font-deva text-[16vw] leading-none text-charcoal/[0.035]"
      >
        सेवा
      </span>
      <div className="shell relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="label text-bronze-dark">Chapter 05 — Career</p>
          <SplitText className="display mt-8 text-[clamp(3rem,6vw,6.4rem)] text-charcoal">
            Grow with
            <br />
            <em className="font-normal italic text-bronze-dark">Charak Ayurveda.</em>
          </SplitText>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-charcoal/65">{careers.intro}</p>
          <div className="mt-10">
            <ArrowLink variant="dark" onClick={apply}>
              Apply as an MR
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {careers.roles.length > 0 && (
            <ul className="mb-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
              {careers.roles.map((r) => (
                <li key={`${r.title}-${r.place}`} className="flex items-baseline justify-between gap-6 py-5">
                  <span>
                    <span className="block font-display text-2xl">{r.title}</span>
                    {r.note && <span className="mt-1 block text-sm text-charcoal/55">{r.note}</span>}
                  </span>
                  {r.place && (
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-bronze-dark">
                      <MapPin size={13} /> {r.place}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="rounded-[28px] border border-sandstone bg-sand p-8 sm:p-10">
            <p className="label text-charcoal/50">How to apply</p>
            <ol data-career-steps className="mt-8 space-y-8">
              {careers.steps.map((s, i) => (
                <li key={s.t} data-career-step className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-display text-3xl italic leading-none text-bronze-dark">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-2xl leading-tight">{s.t}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-charcoal/60">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
