import { gsap, prefersReducedMotion, useGsap } from "../../lib/motion";

// Words brighten one by one as the paragraph scrolls through the viewport.
export default function ScrollReveal({ text, accent = [], className = "" }) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      el.querySelectorAll("[data-word]"),
      { opacity: 0.14, filter: "blur(3px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
      }
    );
  });

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          data-word
          className={`inline-block ${accent.includes(word.replace(/[.,]/g, "")) ? "gold-text italic" : ""}`}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
