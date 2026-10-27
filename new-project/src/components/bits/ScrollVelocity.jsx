import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/motion";

// Infinite marquee that speeds up (and flips direction) with scroll velocity.
export default function ScrollVelocity({ items, baseSpeed = 40, direction = 1, className = "", separator }) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return undefined;
    let x = 0;
    let dir = direction;
    let boost = 0;
    const half = () => el.scrollWidth / 2;

    const st = ScrollTrigger.create({
      onUpdate(self) {
        dir = self.direction === 1 ? direction : -direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 120, 14);
      },
    });

    const tick = (_, delta) => {
      boost *= 0.94;
      x -= ((baseSpeed + boost * baseSpeed) * dir * delta) / 1000;
      const w = half();
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, [baseSpeed, direction]);

  const row = items.map((item, i) => (
    <span key={i} className="flex shrink-0 items-center">
      <span className="px-6 sm:px-10">{item}</span>
      {separator}
    </span>
  ));

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform" aria-hidden="true">
        {row}
        {row}
      </div>
      <p className="sr-only">{items.join(", ")}</p>
    </div>
  );
}
