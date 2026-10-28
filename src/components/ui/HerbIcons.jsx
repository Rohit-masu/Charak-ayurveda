// Gold line-art botanicals drawn on a 64×64 grid. Keyed by the names used in data/products.js.
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

const leaf = (x, y, rot, l = 12) => (
  <path
    key={`${x}${y}${rot}`}
    d={`M0 0 C ${l * 0.35} ${-l * 0.3}, ${l * 0.35} ${-l * 0.75}, 0 ${-l} C ${-l * 0.35} ${-l * 0.75}, ${-l * 0.35} ${-l * 0.3}, 0 0 Z`}
    transform={`translate(${x} ${y}) rotate(${rot})`}
  />
);

const herbIcons = {
  // resin-bearing rock with a drop
  Shilajit: (
    <g {...s}>
      <path d="M14 44 L22 26 L36 20 L50 28 L52 44 L40 52 L22 52 Z" />
      <path d="M22 26 L30 38 L36 20 M30 38 L50 28 M30 38 L40 52 M30 38 L22 52" strokeWidth="0.9" />
      <path d="M44 10 C 44 14, 40 16, 40 19 A4 4 0 0 0 48 19 C 48 16, 44 14, 44 10 Z" />
    </g>
  ),
  Ashwagandha: (
    <g {...s}>
      <path d="M32 6 L32 18" />
      {leaf(32, 14, -60, 14)}
      {leaf(32, 12, 55, 12)}
      <path d="M32 18 C 18 22, 16 40, 32 56 C 48 40, 46 22, 32 18 Z" />
      <path d="M32 18 C 26 28, 26 44, 32 56 M32 18 C 38 28, 38 44, 32 56" strokeWidth="0.8" />
      <circle cx="32" cy="38" r="5" fill="currentColor" fillOpacity="0.25" />
    </g>
  ),
  "Safed Musli": (
    <g {...s}>
      {leaf(32, 24, -24, 18)}
      {leaf(32, 24, 22, 18)}
      {leaf(32, 24, 0, 20)}
      <path d="M32 24 C 28 34, 20 40, 16 56 M32 24 C 32 36, 30 44, 30 58 M32 24 C 36 34, 44 42, 48 56" />
      <path d="M16 56 C 18 52, 20 50, 22 46 M48 56 C 46 52, 43 49, 40 44" strokeWidth="0.8" />
    </g>
  ),
  "Kaunch Beej": (
    <g {...s}>
      <path d="M14 52 C 10 34, 22 12, 46 8 C 54 8, 54 14, 48 16 C 28 22, 22 36, 22 52 C 22 58, 14 58, 14 52 Z" />
      <ellipse cx="20" cy="44" rx="3" ry="4" />
      <ellipse cx="26" cy="30" rx="3" ry="4" transform="rotate(30 26 30)" />
      <ellipse cx="36" cy="19" rx="3" ry="4" transform="rotate(60 36 19)" />
    </g>
  ),
  Gokshura: (
    <g {...s}>
      <path d="M32 12 L37 24 L50 22 L42 32 L50 42 L37 40 L32 52 L27 40 L14 42 L22 32 L14 22 L27 24 Z" />
      <circle cx="32" cy="32" r="5" />
      <path d="M32 12 L32 6 M50 22 L55 19 M50 42 L55 45 M32 52 L32 58 M14 42 L9 45 M14 22 L9 19" strokeWidth="0.9" />
    </g>
  ),
  Kesar: (
    <g {...s}>
      <path d="M32 58 L32 34" />
      <path d="M32 36 C 22 32, 18 20, 22 10 C 28 14, 31 24, 32 36 Z" />
      <path d="M32 36 C 42 32, 46 20, 42 10 C 36 14, 33 24, 32 36 Z" />
      <path d="M32 36 C 28 26, 28 14, 32 6 C 36 14, 36 26, 32 36 Z" />
      <path d="M32 30 L26 18 M32 30 L32 16 M32 30 L38 18" stroke="#c4472b" strokeWidth="1.4" />
      {leaf(32, 58, -30, 16)}
    </g>
  ),
  Akarkara: (
    <g {...s}>
      <circle cx="32" cy="22" r="6" fill="currentColor" fillOpacity="0.2" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((r) => (
        <path key={r} d="M32 14 C 30 10, 30 6, 32 4 C 34 6, 34 10, 32 14 Z" transform={`rotate(${r} 32 22)`} />
      ))}
      <path d="M32 28 C 31 40, 34 48, 30 58" />
      {leaf(31, 46, 50, 12)}
    </g>
  ),
  Clove: (
    <g {...s}>
      <path d="M32 58 L32 26" strokeWidth="2.2" />
      <path d="M32 26 L22 18 M32 26 L42 18 M32 26 L26 14 M32 26 L38 14" />
      <circle cx="32" cy="14" r="6" />
      <path d="M28 12 C 30 10, 34 10, 36 12" strokeWidth="0.8" />
    </g>
  ),
  Jaiphal: (
    <g {...s}>
      <ellipse cx="32" cy="34" rx="16" ry="20" />
      <path d="M22 20 C 30 28, 26 40, 34 52 M30 15 C 38 24, 34 36, 42 46 M40 18 C 44 26, 42 32, 46 38 M18 30 C 22 38, 20 44, 24 50" strokeWidth="0.9" stroke="#c4472b" />
    </g>
  ),
};

export default function HerbIcon({ name, className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {herbIcons[name]}
    </svg>
  );
}
