import { ArrowUpRight } from "lucide-react";
import Magnet from "../bits/Magnet";
import { scrollToHash } from "../../lib/motion";

// Pill CTA with a sliding fill. In-page hashes scroll smoothly via Lenis.
export default function ArrowLink({ href, children, variant = "bronze", className = "", onClick, external }) {
  const styles = {
    bronze: "bg-bronze text-charcoal",
    ghost: "border border-ivory/25 text-ivory",
    dark: "bg-charcoal text-ivory",
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
        href={href || "#connect"}
        onClick={handle}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-7 pr-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${styles[variant]} ${className}`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-lux group-hover:scale-y-100 ${variant === "bronze" ? "bg-ivory" : "bg-bronze"}`}
        />
        <span className={`relative transition-colors duration-500 ${variant === "bronze" ? "" : "group-hover:text-charcoal"}`}>{children}</span>
        <span
          className={`relative grid h-10 w-10 place-items-center rounded-full transition-transform duration-700 ease-lux group-hover:rotate-45 ${variant === "bronze" ? "bg-charcoal text-bronze" : "bg-bronze text-charcoal group-hover:bg-charcoal group-hover:text-bronze"}`}
        >
          <ArrowUpRight size={16} strokeWidth={1.6} />
        </span>
      </a>
    </Magnet>
  );
}
