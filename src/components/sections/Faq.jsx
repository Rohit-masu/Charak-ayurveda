import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import SplitText from "../bits/SplitText";
import { faqIntro, faqs } from "../../data/site";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-card py-24 text-ink sm:py-32">
      <div className="shell">
        <div className="text-center">
          <p className="label text-gold-dark">Questions</p>
          <SplitText className="display mt-6 text-[clamp(2.4rem,4.4vw,4.4rem)] text-forest">
            Frequently asked <em className="gold-text font-normal">questions.</em>
          </SplitText>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink/60">{faqIntro}</p>
        </div>

        <ul className="mx-auto mt-14 max-w-3xl border-t border-ink/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const Icon = isOpen ? Minus : Plus;
            return (
              <li key={f.q} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    id={`faq-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[1.45rem] leading-snug text-forest transition-colors hover:text-gold-dark sm:text-[1.6rem]"
                  >
                    {f.q}
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                        isOpen ? "border-forest bg-forest text-ivory" : "border-ink/20 text-forest"
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-lux ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-ink/65">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
