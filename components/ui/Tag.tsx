import { cn } from "@/lib/cn";

/**
 * Pastille (pill) de tag projet — fond blanc translucide, bordure et texte noirs
 * (specs Figma : bg rgba(255,255,255,.6), border noire fine, ~13px).
 * Lisible aussi bien sur photo que sur fond foncé.
 */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/80 bg-white/70 px-3 py-1 text-xs font-light leading-none text-black backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
