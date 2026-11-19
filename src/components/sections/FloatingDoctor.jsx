import { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";
import { ScrollTrigger } from "../../lib/motion";
import { doctorConsultUrl } from "../../lib/whatsapp";
import { doctor } from "../../data/site";

// Site-wide "Ask our doctor" pill. Appears once the hero has scrolled away, hides over the footer.
export default function FloatingDoctor() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: () => window.innerHeight * 0.8,
      end: () => document.querySelector("footer")?.offsetTop - window.innerHeight * 0.6,
      onToggle: (self) => setShown(self.isActive),
    });
    return () => st.kill();
  }, []);

  return (
    <a
      href={doctorConsultUrl()}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] inline-flex items-center gap-3 rounded-full border border-bronze/40 bg-charcoal py-2 pl-2 pr-5 text-ivory shadow-[0_20px_40px_-12px_rgba(30,28,26,0.55)] transition-[opacity,transform] duration-500 ease-lux hover:bg-graphite-light sm:right-8 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-bronze text-charcoal">
        <Stethoscope size={18} strokeWidth={1.6} />
      </span>
      <span className="leading-tight">
        <span className="block text-[10.5px] font-semibold uppercase tracking-[0.2em]">Ask our doctor</span>
        {doctor.free && <span className="block text-[11px] text-bronze-light">Free on WhatsApp</span>}
      </span>
    </a>
  );
}
