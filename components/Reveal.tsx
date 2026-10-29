"use client";

import { useEffect, useRef } from "react";

type Effect = "fade" | "glide" | "glide-half" | "shape";

/**
 * Plays an entrance animation once the element scrolls into view (see globals.css).
 * The observer watches an in-flow wrapper, because the animated element itself starts
 * translated outside its section and would be clipped out of the intersection check.
 */
export default function Reveal({
  children,
  effect = "fade",
  className = "",
}: {
  children: React.ReactNode;
  effect?: Effect;
  className?: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapper.current;
    const inner = target.current;
    if (!el || !inner) return;
    if (!("IntersectionObserver" in window)) {
      inner.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inner.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapper} className={className}>
      <div ref={target} data-reveal={effect}>
        {children}
      </div>
    </div>
  );
}
