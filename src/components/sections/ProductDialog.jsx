import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { doctorConsultUrl, productEnquiryUrl } from "../../lib/whatsapp";
import { doctor, site } from "../../data/site";

export default function ProductDialog({ product, initialPack = 0, onClose }) {
  const closeBtn = useRef(null);
  const [pack, setPack] = useState(initialPack);
  const current = product.packs[pack];

  const root = useGsap(() => {
    if (prefersReducedMotion()) return;
    gsap
      .timeline()
      .from("[data-dlg-backdrop]", { opacity: 0, duration: 0.5, ease: "power2.out" })
      .from("[data-dlg-sheet]", { yPercent: 12, opacity: 0, duration: 0.9 }, 0.05)
      .from("[data-dlg-item]", { y: 24, opacity: 0, stagger: 0.05, duration: 0.8 }, 0.25);
  });

  useEffect(() => {
    window.lenis?.stop();
    const opener = document.activeElement;
    const dialog = root.current;
    closeBtn.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const nodes = dialog.querySelectorAll("button, a[href]");
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.lenis?.start();
      opener?.focus?.();
    };
  }, [onClose, root]);

  return (
    <div ref={root} className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
      <div data-dlg-backdrop className="absolute inset-0 bg-forest/40 backdrop-blur-md" onClick={onClose} />
      <div
        data-dlg-sheet
        data-lenis-prevent
        className="relative grid max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-t-[32px] border border-gold/30 bg-ivory text-ink shadow-[0_40px_80px_-30px_rgba(11,42,29,0.45)] sm:rounded-[32px] lg:grid-cols-2"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-forest transition-colors hover:bg-forest hover:text-ivory"
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </button>

        <div className="relative flex min-h-[340px] items-center justify-center bg-mist p-10">
          <div
            aria-hidden="true"
            className="absolute inset-[15%] rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(201,164,92,0.32), transparent 70%)" }}
          />
          <img
            key={current.image}
            src={current.image}
            alt={`${product.name} — ${current.label}`}
            className="relative max-h-[52vh] w-auto max-w-full animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)] object-contain drop-shadow-[0_30px_30px_rgba(11,42,29,0.28)]"
          />
        </div>

        <div className="space-y-8 p-7 sm:p-12">
          <div data-dlg-item>
            <p className="label text-gold-dark">{product.category}</p>
            <h2 id="dlg-title" className="mt-4 font-display text-4xl font-light leading-tight text-forest sm:text-5xl">
              {product.name}
            </h2>
            <p className="mt-3 font-display text-xl italic text-gold-dark">{product.line}</p>
          </div>

          {product.packs.length > 1 && (
            <div data-dlg-item>
              <p className="label text-ink/45">Available packs</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.packs.map((p, i) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setPack(i)}
                    aria-pressed={i === pack}
                    className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                      i === pack ? "border-forest bg-forest text-ivory" : "border-ink/15 bg-white text-ink/80 hover:border-gold-dark/60"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <dl data-dlg-item className="divide-y divide-ink/10 border-y border-ink/10">
            {[
              ["Pack", current.label],
              ["Ingredients", product.ingredients.join(", ")],
              ["On the label", product.labels.join(" · ")],
              ["Directions", product.directions],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]">
                <dt className="label pt-0.5 text-ink/45">{k}</dt>
                <dd className="text-[15px] leading-relaxed text-ink/85">{v}</dd>
              </div>
            ))}
          </dl>

          <div data-dlg-item className="space-y-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={productEnquiryUrl(product.name, current.label)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-forest py-2 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-ink"
              >
                Enquire on WhatsApp
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>
              <a
                href={doctorConsultUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-forest underline decoration-gold/60 underline-offset-8 transition-colors hover:text-gold-dark"
              >
                Ask our doctor{doctor.free ? " — free" : ""}
              </a>
            </div>
            <p className="text-xs leading-relaxed text-ink/50">{site.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
