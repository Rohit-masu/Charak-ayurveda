// Open book with a neem sprig — echoes the emblem on the packs.
// Strokes carry data-draw so the preloader can animate them in.
const leaf = (cx, cy, rot, s = 1) => (
  <path
    data-draw
    key={`${cx}-${cy}-${rot}`}
    d={`M0 0 C ${4 * s} ${-5 * s}, ${4 * s} ${-12 * s}, 0 ${-17 * s} C ${-4 * s} ${-12 * s}, ${-4 * s} ${-5 * s}, 0 0 Z M0 0 L0 ${-16 * s}`}
    transform={`translate(${cx} ${cy}) rotate(${rot})`}
  />
);

export default function Crest({ className = "", title = "Charak Ayurveda" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
    >
      <circle data-draw cx="60" cy="60" r="56" strokeWidth="1" />
      <circle data-draw cx="60" cy="60" r="51" strokeWidth="0.6" strokeDasharray="1 3" />
      {/* neem sprig */}
      <path data-draw d="M60 70 L60 26" />
      {leaf(60, 30, 0, 1.1)}
      {leaf(60, 42, -38)}
      {leaf(60, 42, 38)}
      {leaf(60, 52, -52, 0.95)}
      {leaf(60, 52, 52, 0.95)}
      {leaf(60, 61, -64, 0.85)}
      {leaf(60, 61, 64, 0.85)}
      {/* open book */}
      <path data-draw d="M60 92 C 50 86, 38 85, 26 87 L26 70 C 38 68, 50 69, 60 75 C 70 69, 82 68, 94 70 L94 87 C 82 85, 70 86, 60 92 Z" />
      <path data-draw d="M60 75 L60 92" />
      <path data-draw d="M32 75 C 40 74, 48 75, 54 78 M32 80 C 40 79, 48 80, 54 83" strokeWidth="0.8" />
      <path data-draw d="M88 75 C 80 74, 72 75, 66 78 M88 80 C 80 79, 72 80, 66 83" strokeWidth="0.8" />
    </svg>
  );
}
