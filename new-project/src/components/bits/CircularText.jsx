import { useId } from "react";

// Slowly rotating text set on a circle, with an optional centre mark.
export default function CircularText({ text, size = 140, className = "", children }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`relative grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin-slow_22s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path id={id} d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text className="fill-current font-sans text-[7.2px] font-semibold uppercase" style={{ letterSpacing: "0.32em" }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
