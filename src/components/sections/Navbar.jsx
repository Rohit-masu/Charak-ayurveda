import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Crest from "../ui/Crest";
import ArrowLink from "../ui/ArrowLink";
import MegaMenu from "./MegaMenu";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToHash } from "../../lib/motion";
import { contact, nav, site } from "../../data/site";

export default function Navbar({ onOpenProduct, onChooseType }) {
  const bar = useRef(null);
  const menu = useRef(null);
  const panel = useRef(null);
  const closeTimer = useRef(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [mega, setMega] = useState(null);
  const [shown, setShown] = useState(null);
  const wasOpen = useRef(false);

  const openMega = (key) => {
    clearTimeout(closeTimer.current);
    setMega(key);
    if (key) setShown(key);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 160);
  };

  useEffect(() => {
    if (!mega) return undefined;
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        panel.current.querySelectorAll("[data-mega-item]"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.8, overwrite: true }
      );
    }
    const onKey = (e) => e.key === "Escape" && setMega(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Hide on scroll down, reveal on scroll up; go solid once past the hero fold.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        setSolid(self.scroll() > 80);
        gsap.to(bar.current, {
          yPercent: self.direction === 1 && self.scroll() > 400 ? -110 : 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const el = menu.current;
    if (!el || (!open && !wasOpen.current)) return undefined;
    wasOpen.current = open;
    if (open) {
      window.lenis?.stop();
      gsap
        .timeline()
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 1.1, ease: "expo.inOut" })
        .from(el.querySelectorAll("[data-menu-item]"), { yPercent: 110, stagger: 0.06, duration: 1 }, "-=0.55");
      const onKey = (e) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    window.lenis?.start();
    gsap.to(el, {
      clipPath: "circle(0% at 100% 0%)",
      duration: 0.8,
      ease: "expo.inOut",
      onComplete: () => gsap.set(el, { visibility: "hidden" }),
    });
    return undefined;
  }, [open]);

  const goTo = (href) => {
    setOpen(false);
    setMega(null);
    setTimeout(() => scrollToHash(href), open ? 350 : 0);
  };
  const openProduct = (product, pack) => {
    setMega(null);
    onOpenProduct(product, pack);
  };
  const chooseType = (type) => {
    onChooseType(type);
    goTo("#contact");
  };
  const go = (e, href) => {
    e.preventDefault();
    goTo(href);
  };

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-50" onPointerLeave={closeMega}>
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-700 ${
            mega
              ? "border-b border-gold/15 bg-ink/95 backdrop-blur-xl"
              : solid && !open
                ? "border-b border-gold/10 bg-ink/70 backdrop-blur-xl"
                : "border-b border-transparent"
          }`}
        >
          <nav className="shell flex h-20 items-center justify-between" aria-label="Primary">
            <a href="#top" onClick={(e) => go(e, "#top")} className="flex items-center gap-3 text-gold">
              <Crest className="h-10 w-10" />
              <span className="leading-none">
                <span className="block font-display text-[19px] tracking-[0.22em] text-ivory">CHARAK</span>
                <span className="label mt-1 block text-[8.5px] text-gold">Ayurveda</span>
              </span>
            </a>

            <ul className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => {
                const active = item.menu && mega === item.menu;
                return (
                  <li key={item.href} onPointerEnter={() => openMega(item.menu || null)} onFocus={() => openMega(item.menu || null)}>
                    <a
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      aria-expanded={item.menu ? active : undefined}
                      aria-haspopup={item.menu ? "true" : undefined}
                      className={`group relative flex items-center gap-1.5 py-7 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors hover:text-ivory ${
                        active ? "text-ivory" : "text-ivory/75"
                      }`}
                    >
                      {item.label}
                      {item.menu && (
                        <ChevronDown size={13} className={`text-gold transition-transform duration-500 ${active ? "rotate-180" : ""}`} />
                      )}
                      <span
                        className={`absolute inset-x-0 bottom-6 h-px origin-right bg-gold transition-transform duration-500 ease-lux group-hover:origin-left group-hover:scale-x-100 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                className="hidden rounded-full border border-gold/50 px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink sm:inline-block"
              >
                Enquire
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="relative z-[60] grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory lg:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
                <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
              </button>
            </div>
          </nav>

          <div
            ref={panel}
            onPointerEnter={() => clearTimeout(closeTimer.current)}
            className={`hidden transition-[grid-template-rows,opacity] duration-700 ease-lux lg:grid ${
              mega ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
            }`}
            aria-hidden={!mega}
          >
            <div className="overflow-hidden border-t border-ivory/10" inert={mega ? undefined : ""}>
              <MegaMenu active={shown} onGo={goTo} onOpenProduct={openProduct} onChooseType={chooseType} />
            </div>
          </div>
        </div>
      </header>

      {mega && (
        <div aria-hidden="true" className="fixed inset-0 z-40 hidden bg-ink/50 backdrop-blur-sm lg:block" onPointerEnter={closeMega} />
      )}

      <div
        ref={menu}
        id="site-menu"
        className="invisible fixed inset-0 z-[45] flex flex-col justify-between bg-forest px-6 pb-10 pt-28"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {nav.map((item, i) => (
            <li key={item.href} className="overflow-hidden">
              <a
                data-menu-item
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={(e) => go(e, item.href)}
                className="flex items-baseline gap-4 font-display text-[13vw] font-light leading-[1.05] text-ivory sm:text-6xl"
              >
                <span className="font-sans text-xs text-gold">0{i + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-6">
          <ArrowLink href="#contact" onClick={() => goTo("#contact")}>
            Send an enquiry
          </ArrowLink>
          <p className="text-sm text-ivory/60">
            {contact.email}
            <br />
            {site.sanskrit}
          </p>
        </div>
      </div>
    </>
  );
}
