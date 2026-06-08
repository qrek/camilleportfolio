"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Parallaxe au scroll : translate l'enfant en fonction de sa position dans
 * le viewport × `speed`. L'élément mesuré (outer) n'est pas transformé pour
 * éviter tout feedback ; seul l'enfant interne bouge.
 *
 * `cover` : pour une image dans un conteneur overflow-hidden — l'enfant est
 * sur-dimensionné (inset négatif) pour qu'aucun bord ne se découvre.
 */
export function Parallax({
  children,
  speed = 0.15,
  cover = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  cover?: boolean;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = outer.current;
    const target = inner.current;
    if (!el || !target) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      const y = progress * speed * -100;
      target.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={outer} className={cover ? "absolute inset-0 overflow-hidden" : className}>
      <div
        ref={inner}
        className={cover ? "absolute inset-x-0 -inset-y-[14%]" : undefined}
        style={{ willChange: "transform", height: cover ? undefined : "100%" }}
      >
        {children}
      </div>
    </div>
  );
}
