"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Active le smooth scroll (Lenis) sur toute l'app. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Ancres internes (#work…) : défilement fluide si la cible est sur la page.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const hash = href.slice(href.indexOf("#"));
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return; // cible absente → navigation normale
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
