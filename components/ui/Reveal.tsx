"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Révèle ses enfants quand ils entrent dans le viewport : ils apparaissent
 * « depuis le fond » (échelle réduite + opacité) pour s'approcher de nous.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "depth",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "depth" = échelle + opacité (profondeur) ; "up" = glissement vertical. */
  variant?: "depth" | "up";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant} ${shown ? "is-in" : ""} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
