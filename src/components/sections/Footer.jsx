import { ArrowUp } from "lucide-react";
import Crest from "../ui/Crest";
import ArrowLink from "../ui/ArrowLink";
import { gsap, prefersReducedMotion, scrollToHash, useGsap } from "../../lib/motion";
import { contact, nav, site } from "../../data/site";
import { products } from "../../data/products";

const year = new Date().getFullYear();

export default function Footer({ onOpen }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.from(el.querySelectorAll("[data-mark] span"), {
      yPercent: 100,
      stagger: 0.05,
      duration: 1.4,
      scrollTrigger: { trigger: el.querySelector("[data-mark]"), start: "top 95%", once: true },
    });
  });

  const go = (e, href) => {
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink pt-24">
      <div className="shell">
        <div className="flex flex-col justify-between gap-10 border-b border-ivory/10 pb-16 lg:flex-row lg:items-end">
          <p className="display max-w-2xl text-[clamp(2.4rem,4.6vw,4.6rem)]">
            Bring the range to your <em className="gold-text font-normal">clinic or counter.</em>
          </p>
          <ArrowLink href="#contact">Send an enquiry</ArrowLink>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Crest className="h-14 w-14 text-gold" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">{site.tagline}.</p>
            <p className="mt-3 font-deva text-lg text-gold/70">{site.sanskrit}</p>
          </div>
          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="label text-ivory/35">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} onClick={(e) => go(e, n.href)} className="text-sm text-ivory/75 transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className="label text-ivory/35">The range</p>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => onOpen(p, 0)} className="text-left text-sm text-ivory/75 transition-colors hover:text-gold">
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="label text-ivory/35">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li>
                <a href={contact.phoneHref} className="hover:text-gold">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-gold">
                  {contact.email}
                </a>
              </li>
              <li className="text-ivory/55">{contact.address}</li>
            </ul>
          </div>
        </div>

        <p className="border-t border-ivory/10 py-8 text-xs leading-relaxed text-ivory/45">{site.disclaimer}</p>
      </div>

      <p
        data-mark
        aria-hidden="true"
        className="flex select-none justify-center overflow-hidden font-display text-[25vw] font-light leading-[0.78] tracking-[-0.04em]"
      >
        {"Charak".split("").map((c, i) => (
          <span key={i} className="gold-text inline-block">
            {c}
          </span>
        ))}
      </p>

      <div className="shell flex items-center justify-between py-6 text-[11px] uppercase tracking-[0.2em] text-ivory/40">
        <span>
          © {year} {site.brand}
        </span>
        <a href="#top" onClick={(e) => go(e, "#top")} className="inline-flex items-center gap-2 hover:text-gold">
          Back to top <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  );
}
