import { ArrowUpRight, Stethoscope } from "lucide-react";
import { doctorConsultUrl } from "../../lib/whatsapp";
import { doctor } from "../../data/site";

// Shown inside a product panel or dialog while the product's label details are not yet supplied.
// Reads the product colours from the CSS variables set by productVars().
export default function DoctorNote({ product, className = "" }) {
  return (
    <a
      href={doctorConsultUrl(product.name)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/doc flex items-center gap-4 rounded-2xl border border-ivory/15 bg-black/20 p-4 pr-5 backdrop-blur transition-colors duration-500 hover:border-ivory/35 hover:bg-black/30 ${className}`}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--p-accent)] text-charcoal">
        <Stethoscope size={18} strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg leading-snug text-ivory">Questions about {product.name}?</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-ivory/65">
          Ask our {doctor.title} on WhatsApp{doctor.free ? ", free of charge" : ""}. Full label details are coming soon.
        </span>
      </span>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-[color:var(--p-accent)] transition-transform duration-500 group-hover/doc:-translate-y-0.5 group-hover/doc:translate-x-0.5"
      />
    </a>
  );
}
