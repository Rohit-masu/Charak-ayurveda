import { useState } from "react";
import { Plus } from "lucide-react";
import SplitText from "../bits/SplitText";
import { faqs } from "../../data/site";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-ivory pb-28 text-ink sm:pb-40">
      <div className="shell grid gap-12 border-t border-ink/10 pt-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-gold-dark">Questions</p>
          <SplitText className="display mt-6 text-[clamp(2.6rem,4.4vw,4.6rem)]">
            Good to <em className="font-normal italic text-gold-dark">know.</em>
          </SplitText>
        </div>
        <ul className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-ink/10">
                <h3>
                  <button
                    type="button"
                    id={`faq-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left font-display text-2xl leading-snug transition-colors hover:text-gold-dark sm:text-[1.7rem]"
                  >
                    {f.q}
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-lux ${
                        isOpen ? "rotate-45 border-ink bg-ink text-ivory" : "border-ink/20"
                      }`}
                    >
                      <Plus size={16} />
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
                    <p className="max-w-xl pb-8 text-[15px] leading-relaxed text-ink/65">{f.a}</p>
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
