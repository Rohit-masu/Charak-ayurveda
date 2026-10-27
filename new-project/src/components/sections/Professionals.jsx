import { ArrowUpRight, Stethoscope, Store, Truck } from "lucide-react";
import SplitText from "../bits/SplitText";
import SpotlightCard from "../bits/SpotlightCard";
import { gsap, prefersReducedMotion, scrollToHash, useGsap } from "../../lib/motion";

const audiences = [
  {
    icon: Stethoscope,
    who: "Ayurvedic doctors & clinics",
    text: "Request the product catalogue and a conversation with our team about the range.",
    type: "Ayurvedic doctor / clinic",
  },
  {
    icon: Store,
    who: "Chemists & pharmacies",
    text: "Ask about stocking the Rati Shakti range for customers in your area.",
    type: "Chemist / pharmacy",
  },
  {
    icon: Truck,
    who: "Distributors & stockists",
    text: "Tell us your region and network, and we will get in touch about distribution.",
    type: "Distributor / stockist",
  },
];

const steps = [
  { t: "Send your details", d: "Use the enquiry form or WhatsApp." },
  { t: "We reach out", d: "Our team contacts you directly." },
  { t: "Receive the catalogue", d: "Review the range and next steps." },
];

export default function Professionals({ onChooseType }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-card]"), {
      y: 80,
      opacity: 0,
      stagger: 0.12,
      scrollTrigger: { trigger: el.querySelector("[data-cards]"), start: "top 80%", once: true },
    });
    gsap.fromTo(
      "[data-step-line]",
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 85%", end: "bottom 60%", scrub: true } }
    );
  });

  const choose = (type) => {
    onChooseType(type);
    scrollToHash("#contact");
  };

  return (
    <section ref={ref} id="professionals" className="relative overflow-hidden bg-forest py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,164,92,0.18), transparent 65%)" }}
      />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label text-gold">Chapter 05 — For Professionals</p>
            <SplitText className="display mt-8 text-[clamp(3rem,6.2vw,6.8rem)]">
              For doctors, chemists
              <br />
              <em className="gold-text font-normal">&amp; distributors.</em>
            </SplitText>
          </div>
          <p className="self-end text-[15px] leading-relaxed text-ivory/65 lg:col-span-3 lg:col-start-10">
            Charak Ayurveda works with healthcare professionals and trade partners. Choose your path and we will take it from
            there.
          </p>
        </div>

        <div data-cards className="mt-20 grid gap-5 md:grid-cols-3">
          {audiences.map(({ icon: Icon, who, text, type }, i) => (
            <SpotlightCard key={who} className="rounded-[28px] border border-gold/15 bg-ink/40">
              <button
                type="button"
                data-card
                onClick={() => choose(type)}
                className="relative flex h-full min-h-[340px] w-full flex-col justify-between p-8 text-left sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={22} strokeWidth={1.3} />
                  </span>
                  <span className="font-display text-6xl font-light italic text-ivory/10">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-3xl leading-tight text-ivory">{who}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/60">{text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    Start an enquiry
                    <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            </SpotlightCard>
          ))}
        </div>

        <ol data-steps className="relative mt-24 grid gap-10 sm:grid-cols-3">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-px bg-ivory/10 sm:block">
            <span data-step-line className="block h-full origin-left bg-gold" />
          </span>
          {steps.map((s, i) => (
            <li key={s.t} className="relative">
              <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-gold text-[10px] font-bold text-ink">
                {i + 1}
              </span>
              <p className="mt-6 font-display text-2xl text-ivory">{s.t}</p>
              <p className="mt-1 text-sm text-ivory/55">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
