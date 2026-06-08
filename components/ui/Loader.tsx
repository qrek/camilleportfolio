"use client";

import { useEffect, useState } from "react";

/** Masque CSS du logo CAM (même forme/taille pour le ghost et le remplissage). */
const LOGO_MASK = {
  WebkitMaskImage: "url(/cam-logo.svg)",
  maskImage: "url(/cam-logo.svg)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

/**
 * Loader d'accueil (homepage, première visite de la session uniquement) :
 * le logo CAM droit, en gris, se remplit d'un dégradé bleu de gauche à
 * droite sur fond blanc. Une fois terminé, il marque `intro-ready` sur
 * <html> pour déclencher l'apparition des textes.
 */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Déjà vu dans la session → on saute le loader (anti-flash via inline script).
    if (document.documentElement.classList.contains("cam-skip-loader")) {
      document.documentElement.classList.add("intro-ready");
      setRemoved(true);
      return;
    }

    const DURATION = 1800;
    let startTime: number | null = null;
    let raf = 0;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const t = Math.min(1, (now - startTime) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("cam_loaded", "1");
        } catch {}
        window.setTimeout(() => {
          setFading(true);
          document.documentElement.classList.add("intro-ready");
        }, 200);
        window.setTimeout(() => setRemoved(true), 200 + 650);
      }
    };

    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (fading) document.body.style.overflow = "";
  }, [fading]);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className={`loader-overlay fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-[650ms] ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="relative w-[58vw] max-w-[440px]"
        style={{ aspectRatio: "1610.47 / 593.804" }}
      >
        {/* Ghost gris (même taille que le logo). */}
        <div className="absolute inset-0 bg-black/[0.12]" style={LOGO_MASK} />
        {/* Vrai logo, dégradé bleu, révélé de gauche à droite. */}
        <div
          className="absolute inset-0"
          style={{
            ...LOGO_MASK,
            backgroundImage:
              "linear-gradient(120deg, #7aa0ff 0%, #2f56f2 45%, #1633c4 100%)",
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
          }}
        />
      </div>
    </div>
  );
}
