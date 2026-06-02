import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

/**
 * Primitive bouton. Stylée uniquement via les tokens Tailwind (bg-accent, text-fg…).
 * Sert de base — adapter les variantes au design Figma au fur et à mesure.
 */
export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-accent text-white hover:bg-accent/90",
        variant === "outline" &&
          "border border-border bg-transparent text-fg hover:bg-fg/5",
        className,
      )}
      {...props}
    />
  );
}
