import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";
import { doctorConsultUrl, productEnquiryUrl } from "../../lib/whatsapp";
import { productVars } from "../../data/products";
import DoctorNote from "../ui/DoctorNote";
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

  // Rows with no client-supplied value are left out.
  const rows = [
    ["Pack", current.label],
    ["Ingredients", product.ingredients.join(", ")],
    ["On the label", product.labels.join(" · ")],
    ["Directions", product.directions],
  ].filter(([, v]) => v);

  return (
    <div
      ref={root}
      style={productVars(product)}
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dlg-title"
    >
      <div data-dlg-backdrop className="absolute inset-0 bg-charcoal/70 backdrop-blur-md" onClick={onClose} />
      <div
        data-dlg-sheet
        data-lenis-prevent
        className="relative grid max-h-[92svh] w-full max-w-6xl overflow-y-auto rounded-t-[32px] bg-[var(--p-deep)] text-ivory sm:rounded-[32px] lg:grid-cols-2"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full border border-ivory/25 bg-black/20 text-ivory backdrop-blur transition-colors hover:bg-ivory hover:text-charcoal"
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </button>

        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[620px]">
          <img
            key={current.image}
            src={current.image}
            alt={`${product.name}${current.label ? ` — ${current.label}` : ""}${product.concept ? " (concept visual)" : ""}`}
            className="absolute inset-0 h-full w-full animate-[fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)] object-cover"
            style={{ objectPosition: "50% 72%" }}
          />
          {product.concept && (
            <p className="absolute bottom-5 left-5 rounded-full border border-ivory/15 bg-black/30 px-3 py-1.5 text-[10px] tracking-wide text-ivory/70 backdrop-blur">
              {site.conceptNote}
            </p>
          )}
        </div>

        <div className="space-y-8 p-7 sm:p-12">
          <div data-dlg-item>
            <p className="label text-[color:var(--p-accent)]">{product.category}</p>
            <h2 id="dlg-title" className="mt-4 font-display text-4xl font-light leading-tight text-ivory sm:text-5xl">
              {product.name}
            </h2>
            {product.line && <p className="mt-3 font-display text-xl italic text-[color:var(--p-accent)]">{product.line}</p>}
          </div>

          {product.packs.length > 1 && (
            <div data-dlg-item>
              <p className="label text-ivory/40">Available packs</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.packs.map((p, i) => (
                  <button
                    key={p.label || i}
                    type="button"
                    onClick={() => setPack(i)}
                    aria-pressed={i === pack}
                    className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                      i === pack
                        ? "border-[color:var(--p-accent)] bg-[var(--p-accent)] text-charcoal"
                        : "border-ivory/15 text-ivory/80 hover:border-ivory/40"
                    }`}
                  >
                    {p.label || `Pack ${i + 1}`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {rows.length > 0 ? (
            <dl data-dlg-item className="divide-y divide-ivory/10 border-y border-ivory/10">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]">
                  <dt className="label pt-0.5 text-ivory/40">{k}</dt>
                  <dd className="text-[15px] leading-relaxed text-ivory/85">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div data-dlg-item>
              <DoctorNote product={product} />
            </div>
          )}

          <div data-dlg-item className="space-y-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={productEnquiryUrl(product.name, current.label)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-ivory py-2 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal transition-colors hover:bg-[var(--p-accent)]"
              >
                Enquire on WhatsApp
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--p-deep)] text-[color:var(--p-accent)] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>
              {/* With no label details the DoctorNote card above already offers the consultation. */}
              {rows.length > 0 && (
                <a
                  href={doctorConsultUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--p-accent)] underline decoration-ivory/30 underline-offset-8 transition-colors hover:text-ivory"
                >
                  Ask our doctor{doctor.free ? " — free" : ""}
                </a>
              )}
            </div>
            <p className="text-xs leading-relaxed text-ivory/50">{site.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
