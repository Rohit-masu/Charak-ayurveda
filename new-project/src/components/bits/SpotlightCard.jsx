// Card with a soft gold light that follows the pointer.
export default function SpotlightCard({ children, className = "" }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      className={`group relative overflow-hidden ${className}`}
      style={{ "--mx": "50%", "--my": "50%" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: "radial-gradient(520px circle at var(--mx) var(--my), rgba(201,164,92,0.16), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}
