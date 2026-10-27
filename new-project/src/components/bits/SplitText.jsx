import { gsap, ScrollTrigger, SplitText as GsapSplit, prefersReducedMotion, useGsap } from "../../lib/motion";

// Masked line/word/char reveal. `trigger="scroll"` plays when it enters view,
// `trigger="ready"` waits for the preloader to finish (charak:ready event).
export default function SplitText({
  as: Tag = "h2",
  children,
  className = "",
  type = "lines",
  stagger = 0.08,
  delay = 0,
  trigger = "scroll",
}) {
  const ref = useGsap((el) => {
    if (prefersReducedMotion()) return;
    let st;
    const split = GsapSplit.create(el, {
      type: type === "lines" ? "lines" : `lines,${type}`,
      linesClass: "split-line",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        const targets = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
        const tween = gsap.from(targets, {
          yPercent: 110,
          rotate: type === "chars" ? 6 : 2,
          duration: 1.4,
          stagger,
          delay,
          paused: true,
        });
        if (trigger === "ready") {
          const play = () => tween.play();
          if (document.documentElement.dataset.ready) play();
          else window.addEventListener("charak:ready", play, { once: true });
        } else {
          st?.kill();
          st = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => tween.play() });
        }
        return tween;
      },
    });
    return () => {
      st?.kill();
      split.revert();
    };
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
