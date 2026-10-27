import { ArrowUpRight } from "lucide-react";
import Magnet from "../bits/Magnet";
import { scrollToHash } from "../../lib/motion";

// Pill CTA with a sliding gold fill. In-page hashes scroll smoothly via Lenis.
export default function ArrowLink({ href, children, variant = "gold", className = "", onClick, external }) {
  const styles = {
    gold: "bg-gold text-ink",
    ghost: "border border-ivory/25 text-ivory",
    dark: "bg-ink text-ivory",
  };
  const handle = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
    }
  };
  return (
    <Magnet strength={0.25}>
      <a
        href={href || "#contact"}
        onClick={handle}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-7 pr-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${styles[variant]} ${className}`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-lux group-hover:scale-y-100 ${variant === "gold" ? "bg-ivory" : "bg-gold"}`}
        />
        <span className={`relative transition-colors duration-500 ${variant === "gold" ? "" : "group-hover:text-ink"}`}>{children}</span>
        <span
          className={`relative grid h-10 w-10 place-items-center rounded-full transition-transform duration-700 ease-lux group-hover:rotate-45 ${variant === "gold" ? "bg-ink text-gold" : "bg-gold text-ink group-hover:bg-ink group-hover:text-gold"}`}
        >
          <ArrowUpRight size={16} strokeWidth={1.6} />
        </span>
      </a>
    </Magnet>
  );
}
