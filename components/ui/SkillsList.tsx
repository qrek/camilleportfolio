"use client";

import { useEffect, useRef, useState } from "react";

type Skill = { label: string; color: string; prefix?: string };

const SKILLS: Skill[] = [
  { label: "Art direction", color: "#1a4dff" },
  { label: "Visual identity", color: "#7c3aed" },
  { label: "Photography & post-production", color: "#e11d74" },
  { label: "Graphic design", color: "#f97316" },
  { label: "Motion design", color: "#10b981" },
  { label: "A bit of print and packaging.", color: "#ef4444", prefix: "±" },
];

/**
 * Liste de compétences : chaque ligne apparaît en cascade quand la section
 * entre dans le viewport, puis révèle sa couleur (flèche + soulignement
 * animé + teinte) au survol.
 */
export function SkillsList() {
  const ref = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className={`skills ${shown ? "is-visible" : ""}`}>
      {SKILLS.map((s, i) => (
        <li
          key={s.label}
          className="skill-item"
          style={{ ["--c" as string]: s.color, ["--i" as string]: i } as React.CSSProperties}
        >
          <span className="skill-inner">
            <span className="skill-arrow" aria-hidden>
              →
            </span>
            <span className="skill-label">
              {s.prefix ? (
                <span className="skill-prefix" aria-hidden>
                  {s.prefix}{" "}
                </span>
              ) : null}
              {s.label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
