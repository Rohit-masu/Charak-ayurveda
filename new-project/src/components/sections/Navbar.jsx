import { useEffect, useRef, useState } from "react";
import Crest from "../ui/Crest";
import ArrowLink from "../ui/ArrowLink";
import { gsap, ScrollTrigger, scrollToHash } from "../../lib/motion";
import { contact, nav, site } from "../../data/site";

export default function Navbar() {
  const bar = useRef(null);
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const wasOpen = useRef(false);

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
    setTimeout(() => scrollToHash(href), open ? 350 : 0);
  };
  const go = (e, href) => {
    e.preventDefault();
    goTo(href);
  };

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-700 ${
            solid && !open ? "border-b border-gold/10 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
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

            <ul className="hidden items-center gap-9 lg:flex">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
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
        </div>
      </header>

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
