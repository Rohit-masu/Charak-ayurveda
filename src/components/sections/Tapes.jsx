import ScrollVelocity from "../bits/ScrollVelocity";
import { products } from "../../data/products";

const Star = ({ className }) => (
  <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 shrink-0 ${className}`} aria-hidden="true">
    <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
  </svg>
);

const front = [...products.map((p) => p.name), "Charak Ayurveda", "Inspired by the Charaka Samhita"];
const back = ["चरक संहिता", "Ayurveda", "आयुर्वेद", "For him", "For her", "चरक आयुर्वेद", "Tradition"];

// Two crossing tapes between the hero and the first chapter.
export default function Tapes() {
  return (
    <div className="relative z-10 -my-6 h-40 overflow-hidden sm:h-48" aria-label="Product range">
      <ScrollVelocity
        items={back}
        direction={-1}
        baseSpeed={30}
        separator={<Star className="text-bronze-light/70" />}
        className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 rotate-[3deg] border-y border-bronze/25 bg-charcoal py-3 font-display text-xl italic text-ivory/75 sm:text-2xl"
      />
      <ScrollVelocity
        items={front}
        baseSpeed={45}
        separator={<Star className="text-charcoal" />}
        className="absolute left-[-5%] top-1/2 w-[110%] -translate-y-1/2 -rotate-[2.5deg] bg-bronze py-4 text-[13px] font-bold uppercase tracking-[0.28em] text-charcoal shadow-[0_20px_50px_-15px_rgba(30,28,26,0.45)] sm:text-sm"
      />
    </div>
  );
}
